# Use official Python image as base
FROM python:3.11

# Set the working directory inside the container
WORKDIR /app

# Copy the Python script into the container
COPY certificate.py .

# Install dependencies
RUN pip install flask flask_cors reportlab

# Expose the port Flask will run on
EXPOSE 5002

# Command to run the script
CMD ["python", "certificate.py"]
