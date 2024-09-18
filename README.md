# Apartment Matcher 🏠🔍

A web application that allows users to filter apartments for buying or renting and utilizes a Machine Learning model to find the best apartments based on user preferences.


## Table of Contents
1. Features
2. Installation
3. Usage
4. Technologies Used
5. License
6. Contact

## Features ✨
* Apartment Filtering: Search and filter apartments for sale or rent in Tel Aviv, Jerusalem, and Haifa.

* Machine Learning Recommendations: Get personalized apartment recommendations based on your preferences.

* Interactive UI: User-friendly interface built with React for seamless navigation.

* Data-Driven Insights: Apartments data scraped and processed from madlan.co.il.

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

## Usage 🖥️
* Open your browser and navigate to http://localhost:3000.

* Explore apartments: Use the filter options to search for apartments to buy or rent.

* Get recommendations: Fill out the form to receive personalized apartment recommendations.


Browse matches: Explore the top 20 apartment matches tailored to your preferences.

## Technologies Used 🛠️
* **Frontend**: React

* **Backend**: Node.js, Express.js

* **Database**: MongoDB

* **Machine Learning**: Python, scikit-learn, pandas, NumPy

* **Data Scraping**: BeautifulSoup, requests

* **Data Visualization**: Jupyter Notebooks

* **Algorithms**: StandardScaler, KMeans, t-SNE, Euclidean distances

## License 📄
This project is licensed under the MIT License - see the LICENSE file for details.

## Authors 📝
* **Paz Gueta** - *Backend developing using Node.js and MongoDB*
* **Steve Holof** - *Frontend developing using React*
* **Hanna Sofer** - *Frontend developing*
* **Yotam Zeevi Federman** - *Data scraping, Data preparing, Machine learning engineering*

## How does the Machine Learning model work ❓
The model uses clustering algorithms like KMeans and t-SNE to group similar apartments. When you submit your preferences, it's treated as a "new apartment," and the model finds the closest cluster and recommends apartments based on Euclidean distances.
