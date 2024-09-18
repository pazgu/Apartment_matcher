Apartment Matcher
A web application that allows users to filter apartments for buying or renting and utilizes a Machine Learning model to find the best apartments based on user preferences.

Table of Contents
Features
Demo
Installation
Usage
Project Structure
Technologies Used
Contributing
License
Contact

Features
Apartment Filtering: Search and filter apartments for sale or rent in Tel Aviv, Jerusalem, and Haifa.
Machine Learning Recommendations: Get personalized apartment recommendations based on your preferences.
Interactive UI: User-friendly interface built with React for seamless navigation.
Data-Driven Insights: Apartments data scraped and processed from madlan.co.il.

Installation
Clone the repository and navigate to the project directory:
git clone https://github.com/yourusername/apartment-matcher.git

cd apartment-matcher
Run the setup script to install all dependencies and start the application:
./setup.sh
Note: Ensure you have npm, pip, and bash installed on your system.

Usage
Open your browser and navigate to http://localhost:3000.
Use the filter options to search for apartments to buy or rent.
Fill out the form to receive personalized apartment recommendations.
Browse through the top 20 apartment matches tailored to your preferences.
Project Structure

Technologies Used
Frontend: React
Backend: Node.js, Express.js
Database: MongoDB
Machine Learning: Python, scikit-learn, pandas, NumPy
Data Scraping: Python, BeautifulSoup, requests
Data Visualization: Jupyter Notebooks
Others: StandardScaler, KMeans, t-SNE, Euclidean distances
