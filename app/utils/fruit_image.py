import requests
import os

PEXELS_API_KEY = os.getenv('PEXELS_API_KEY')  # Make sure this is set in your .env file
PEXELS_URL = "https://api.pexels.com/v1/search"

def get_fruit_image(fruit_name):
    headers = {
        "Authorization": PEXELS_API_KEY
    }
    params = {
        "query": fruit_name,
        "per_page": 1
    }
    response = requests.get(PEXELS_URL, headers=headers, params=params)

    if response.status_code == 200:
        data = response.json()
        if data['photos']:
            image_url = data['photos'][0]['src']['original']  # Get the original image URL
            return image_url
        else:
            return "No image found for the specified fruit."
    else:
        return f"Error: {response.status_code}"

if __name__ == "__main__":
    fruit_name = "apple"  # You can change this to any fruit you'd like to test
    print(get_fruit_image(fruit_name))
