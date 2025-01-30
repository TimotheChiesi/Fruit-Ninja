from flask import request, jsonify, render_template
import requests
from app.utils.fruit_image import get_fruit_image  # Import the fruit image function

def init_routes(app):
    @app.route('/')
    def index():
        return render_template('index.html')

    @app.route('/api/fruit', methods=['GET'])
    def get_fruit():
        fruit_name = request.args.get('name')
        if not fruit_name:
            return jsonify({"error": "No fruit provided. Please specify a fruit."}), 400

        api_url = f"https://fruityvice.com/api/fruit/{fruit_name.lower()}"

        try:
            response = requests.get(api_url)
            response.raise_for_status()
            data = response.json()

            if response.status_code == 200:
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
            return jsonify({"error": "An unexpected error occurred."}), 500

    @app.route('/api/compare', methods=['GET'])
    def compare_fruits():
        fruit1_name = request.args.get('fruit1')
        fruit2_name = request.args.get('fruit2')
        if not fruit1_name or not fruit2_name:
            return jsonify({"error": "Please provide two fruits to compare."}), 400

        api_url1 = f"https://fruityvice.com/api/fruit/{fruit1_name.lower()}"
        api_url2 = f"https://fruityvice.com/api/fruit/{fruit2_name.lower()}"

        try:
            response1 = requests.get(api_url1)
            response1.raise_for_status()
            data1 = response1.json()

            response2 = requests.get(api_url2)
            response2.raise_for_status()
            data2 = response2.json()

            # Get the fruit image URLs from the Pexels API
            image_url1 = get_fruit_image(fruit1_name)
            image_url2 = get_fruit_image(fruit2_name)

            # Add the image URLs to the response data
            data1['image_url'] = image_url1
            data2['image_url'] = image_url2

            return jsonify({"fruit1": data1, "fruit2": data2}), 200
        except requests.exceptions.HTTPError as e:
            if response1.status_code == 404 or response2.status_code == 404:
                return jsonify({"error": "One or both fruits not found. Please try again."}), 404
            return jsonify({"error": "An error occurred while fetching data."}), 500
        except Exception as e:
            print(f"Unexpected error: {e}")
            return jsonify({"error": "An unexpected error occurred."}), 500