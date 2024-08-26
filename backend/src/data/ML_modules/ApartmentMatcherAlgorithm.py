import sys
import json
import pandas as pd
import numpy as np
from sklearn.metrics import pairwise_distances
from sklearn.manifold import TSNE
import pickle

import warnings
warnings.filterwarnings('ignore')


class DataReader:
    def __init__(self, df_path):
        """
        Initialize with the path to the apartment JSON file.
        """
        self.df_path = df_path
    
    def read_json_df(self):
        """
        Read the apartment data from a JSON file and select relevant features
        """
        json_data = pd.read_json(r"{}".format(self.df_path))
        df_apartments = json_data[['id', 'floor', 'beds', 'price', 'size_m2']]
        
        df_tags = json_data.explode('tags').dropna(subset=['tags'])
        df_tags['tag_category'] = df_tags['tags'].apply(lambda x: x['tag_category'])
        df_tags['tag_value'] = df_tags['tags'].apply(lambda x: x['tag_value'])
        
        df_tags = df_tags.pivot_table(index='id',
                                      columns='tag_category', 
                                      values='tag_value', 
                                      aggfunc='first').reset_index()
        
        df = df_apartments.merge(df_tags, on='id', how='left')
        return df
    
    def read_json_user(self, json_string):
        """
        Convert the user's preferences from a JSON string into a DataFrame.
        """
        data = json.loads(json_string)
        return pd.DataFrame([data])


class DataScaler:
    def __init__(self, scaler_path):
        """
        Load a pre-trained scaler to normalize the data.
        """
        self.scaler = pickle.load(open(scaler_path, "rb"))
    
    def scale_data(self, df):
        """
        Scale the data to ensure all features are on the same scale, necessary for clustering.
        """
        if df.columns[0] == "id":
            features = df.columns[1:]
        else:
            features = df.columns
        new_df = df[features]
        scaled_df = self.scaler.transform(new_df)
        return scaled_df


class ClusteringModel:
    def __init__(self, model_path):
        """
        Load pre-trained t-SNE and KMeans models for dimensionality reduction and clustering.
        """
        with open(model_path, 'rb') as f:
            clustering = pickle.load(f)
            self.tsne = TSNE(n_components=2, perplexity=30, random_state=42)
            self.kmeans = clustering['kmeans']
    
    def run_clustering(self, scaled_df, scaled_user):
        """
        Combine the scaled apartment data with the user's preferences.
        Use t-SNE and KMeans to find clusters, and determine which cluster the user's preferences fall into.
        """
        combined_data = np.vstack([scaled_df, scaled_user])
        tsne_combined_results = self.tsne.fit_transform(combined_data)
        tsne_results = tsne_combined_results[:-1]  # apartments without the user's data
        user_prefs_tsne_results = tsne_combined_results[-1]  # user's data only
        self.kmeans.algorithm = 'lloyd'
        self.kmeans.fit(tsne_results)
        labels = self.kmeans.labels_
        
        user_prefs_label = self.kmeans.predict(user_prefs_tsne_results.reshape(1, -1))
        user_cluster = user_prefs_label[0]
        
        user_cluster_indices = np.where(labels == user_cluster)[0]
        cluster_apartments_tsne = tsne_results[user_cluster_indices]
        
        return cluster_apartments_tsne, user_cluster_indices, user_prefs_tsne_results.reshape(1, -1)


class ApartmentMatcher:
    def __init__(self):
        pass
    
    def find_matching_apartments(self, df, filtered_by_cluster, user_cluster_indices, user_tsne_result):
        """
        Calculate how similar each apartment in the user's cluster is to the user's preferences.
        Return the top 25 most similar apartments.
        """
        distances = pairwise_distances(filtered_by_cluster, user_tsne_result, metric='euclidean').flatten()
        max_distance = distances.max()
        similarity_scores = 1 - (distances / max_distance)
        
        cluster_apartments = df.iloc[user_cluster_indices].copy()
        cluster_apartments['similarity_score'] = similarity_scores
        
        top_n_apartments = cluster_apartments.nlargest(20, 'similarity_score')
        return top_n_apartments


class ApartmentRecommender:
    def __init__(self, df_path, user_json, scaler_path, model_path):
        """
        Initialize the recommender system with paths to the data, scaler, and model.
        """
        self.data_reader = DataReader(df_path)
        self.data_scaler = DataScaler(scaler_path)
        self.clustering_model = ClusteringModel(model_path)
        self.apartment_matcher = ApartmentMatcher()
        self.user_json = user_json
    
    def recommend_apartments(self):
        """
        Run the entire recommendation process: 
        Read and process data, scale it, cluster it, and find the most similar apartments to the user's preferences.
        """
        df = self.data_reader.read_json_df()
        user_df = self.data_reader.read_json_user(self.user_json)
        
        scaled_df = self.data_scaler.scale_data(df)
        scaled_user = self.data_scaler.scale_data(user_df)
        
        filtered_by_cluster, user_cluster_indices, user_tsne_result = self.clustering_model.run_clustering(scaled_df, scaled_user)
        
        top_n_apartments = self.apartment_matcher.find_matching_apartments(
            df,
            filtered_by_cluster,
            user_cluster_indices,
            user_tsne_result
        )
        
        recommendations_json = top_n_apartments.to_json(orient='records')
        print(recommendations_json)  # Output the JSON directly


if __name__ == "__main__":
    df_path = sys.argv[1]  # Path to the apartment data JSON
    user_json = sys.argv[2]  # User preferences as JSON string
    scaler_path = sys.argv[3]  # Path to the scaler .pkl file
    model_path = sys.argv[4]  # Path to the model .pkl file
    
    recommender = ApartmentRecommender(df_path, user_json, scaler_path, model_path)
    recommendations = recommender.recommend_apartments()
