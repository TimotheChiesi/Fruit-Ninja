from flask import Flask
from app.routes import init_routes
import os

app = Flask(__name__, template_folder=os.path.join('app', 'templates'), static_folder=os.path.join('app', 'static'))

# Initialize routes
init_routes(app)

if __name__ == '__main__':
    app.run(debug=True)