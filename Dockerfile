# Use the official Python image from Docker Hub
FROM python:3.12-slim

# Set the working directory inside the container
WORKDIR /app

# Install the dependencies inside the container
RUN pip install --no-cache-dir flask requests gunicorn

# Copy the rest of the application code into the container
COPY . .

# Expose port 5000 to the outside world
EXPOSE 5000

# Set environment variables for Flask
ENV FLASK_APP=app.py
ENV FLASK_ENV=production

# Use Gunicorn to serve the Flask app in production
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:application"]

