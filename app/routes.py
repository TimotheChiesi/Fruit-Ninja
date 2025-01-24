from flask import request, jsonify, render_template
import requests
from app.utils.fruit_image import get_fruit_image  # Import the fruit image function

def init_routes(app):
    @app.route('/')
    def index():
        return render_template('index.html')

    @app.route('/get_nutrition', methods=['POST'])
    def get_nutrition():
        fruit_name = request.form.get('fruit')
        if not fruit_name:
            return jsonify({"error": "No fruit provided. Please specify a fruit."}), 400

        api_url = f"https://fruityvice.com/api/fruit/{fruit_name.lower()}"

        try:
            response = requests.get(api_url)
            response.raise_for_status()
            data = response.json()

            # Get the fruit image URL from the Pexels API
            image_url = get_fruit_image(fruit_name)

            # Add the image URL to the response data
            data['image_url'] = image_url
            
            return jsonify(data), response.status_code
        except requests.exceptions.HTTPError as e:
            if response.status_code == 404:
                return jsonify({"error": "Fruit not found. Please try again."}), response.status_code
            return jsonify({"error": "An error occurred while fetching data."}), response.status_code
        except Exception as e:
            print(f"Unexpected error: {e}")
            return jsonify({"error": "An unexpected error occurred."}), response.status_code