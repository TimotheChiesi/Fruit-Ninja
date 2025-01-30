import unittest
from unittest.mock import patch
from app import create_app

class TestFruitApp(unittest.TestCase):

    # Set up the test client
    def setUp(self):
        self.app = create_app()
        self.client = self.app.test_client()
        self.app.config['TESTING'] = True

    # Test if the main page loads
    def test_index_page(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Fruit Nutritional Value Finder', response.data)

    @patch('app.routes.requests.get')
    def test_get_nutrition_valid_fruit(self, mock_get):
        # Mock the response for a valid fruit (with image)
        mock_response = unittest.mock.Mock()
        mock_response.status_code = 200
        mock_response.json.return_value = {
            'name': 'Apple',
            'nutritions': {
                'calories': 52,
                'carbohydrates': 14,
                'protein': 0.3,
                'fat': 0.2,
                'sugar': 10.4
            },
            'photos': [
                {
                    'src': {
                        'original': 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg'
                    }
                }
            ]
        }
        mock_get.return_value = mock_response

        # Perform the GET request
        response = self.client.get('/api/fruit?name=apple')

        # Check status and body content
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'"name":"Apple"', response.data)
        self.assertIn(b'"calories":52', response.data)
        self.assertIn(b'"image_url":"https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg"', response.data)

    @patch('app.routes.requests.get')
    def test_get_nutrition_invalid_fruit(self, mock_get):
        # Mock the response for a non-existent fruit
        mock_fruit_response = unittest.mock.Mock()
        mock_fruit_response.status_code = 404
        mock_fruit_response.json.return_value = {"error": "Fruit not found. Please try again."}
        mock_get.return_value = mock_fruit_response

        # Perform the GET request
        response = self.client.get('/api/fruit?name=nonexistentfruit')

        # Assertions
        self.assertEqual(response.status_code, 404)
        self.assertIn(b'Fruit not found. Please try again.', response.data)

    def test_get_nutrition_missing_fruit(self):
        # Perform the GET request without providing a fruit name
        response = self.client.get('/api/fruit')

        # Assertions
        self.assertEqual(response.status_code, 400)  # Bad request
        self.assertIn(b'No fruit provided. Please specify a fruit.', response.data)

if __name__ == '__main__':
    unittest.main()
