from flask import Flask
from app.routes import init_routes
import os


def create_app():
    app = Flask(__name__,
                template_folder = 'templates',
                static_folder = 'static')

    # Initialize routes
    init_routes(app)
    return app
