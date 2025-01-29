# Fruit Nutritional Value Finder 🍎🍌

This web application allows users to search for fruits and view their nutritional values using data fetched from an external API. Built with Python, Flask, and a third-party API, it provides an intuitive interface for exploring the health benefits of various fruits.

## Features
- **Search Fruits**: Enter the name of a fruit to get its nutritional values.
- **Fruit Comparison**: Compare the nutritional value of two fruits

## Project Setup
Create a `.env` file and fill it with the Pexels API Key. Save the variable: `PEXELS_API_KEY=`.

## Requirements
- Python 3.12
- Flask
- Requests library

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/TimotheChiesi/Fruit-Ninja.git
    cd fruit-ninja
    ```

2. Create and activate a virtual environment:
    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. Install the dependencies:
    ```sh
    pip install -r requirements.txt
    ```

4. Create a  file and add your Pexels API Key:
    ```sh
    echo "PEXELS_API_KEY=your_pexels_api_key" > .env
    ```

5. Run the application:
    ```sh
    python app.py
    ```

## External API
This project uses the [Fruityvice API](https://www.fruityvice.com/) to fetch nutritional data for fruits. The Fruityvice API is free to use and provides detailed nutritional information, including calories, carbohydrates, proteins, and more.
It also uses the [Pexels Apis](https://www.pexels.com/) to get fruit images.