# Apartment Matcher 🏠🔍

A web application that allows users to filter apartments for buying or renting and utilizes a Machine Learning model to find the best apartments based on user preferences.

![<img src="frontend/src/assets/IdeaImg.JPG" width="25" height="25"/>](frontend/src/assets/IdeaImg.JPG)

## Table of Contents
1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Technologies Used](#technologies)
5. [Authors](#authors)
6. [Machine Learning Explanation](#ml) 

<a name="features"/></a>
## Features ✨
</a>
* Apartment Filtering: Search and filter apartments for sale or rent in Tel Aviv, Jerusalem, and Haifa.

* Machine Learning Recommendations: Get personalized apartment recommendations based on your preferences.

* Interactive UI: User-friendly interface built with React for seamless navigation.

* Data-Driven Insights: Apartments data scraped and processed from madlan.co.il.

<a name="installation"/></a>
## Installation ⚙️
Clone the repository and navigate to the project directory:

bash
```
git clone https://github.com/pazgu/Apartment_matcher.git
cd Apartment_matcher
```

Run the setup script to install all dependencies and start the application:

bash
```
./setup.sh
```

Note: Ensure you have npm, pip, and bash installed on your system.

<a name="usage"/></a>
## Usage 🖥️
* Open your browser and navigate to http://localhost:3000.

* Explore apartments: Use the filter options to search for apartments to buy or rent.

* Get recommendations: Fill out the form to receive personalized apartment recommendations.

* Browse matches: Explore the top 20 apartment matches tailored to your preferences.

<a name="technologies"/></a>
## Technologies Used 🛠️
* **Frontend**: React

* **Backend**: Node.js, Express.js

* **Database**: MongoDB

* **Machine Learning**: Python, scikit-learn, pandas, NumPy

* **Data Scraping**: BeautifulSoup, requests

* **Data Visualization**: Jupyter Notebooks

* **Algorithms**: StandardScaler, KMeans, t-SNE, Euclidean distances

<a name="authors"/></a>
## Authors 📝
* **Paz Gueta** - *Backend developing using Node.js and MongoDB*
* **Steve Holof** - *Frontend developing using React*
* **Hanna Sofer** - *Frontend developing using React*
* **Yotam Zeevi Federman** - *Data scraping, Data preparing, Machine learning engineering*

<a name="ml"/></a>
## How does the Machine Learning model work ❓
The model uses clustering algorithms like KMeans and t-SNE to group similar apartments. 

When you submit your preferences, it's treated as a "new apartment," the model finds the cluster the user's prefernces in, and using Euclidean distances it finds the 20 closest (most similar) apartments in the cluster to the user's preferences.

![<img src="backend/src/data/jupyter-notebooks/example_model.png" width="25" height="25"/>](backend/src/data/jupyter-notebooks/example_model.png)


