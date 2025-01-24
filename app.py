from flask import Flask
from app.routes import init_routes
import os

application = Flask(__name__, template_folder=os.path.join('app', 'templates'))

# Initialize routes
init_routes(application)

if __name__ == '__main__':
    application.run(debug=True, host="0.0.0.0", port=5000)