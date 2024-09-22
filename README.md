# Smart Dengue Alert Backend

## Overview

The Smart Dengue Alert Backend is a Node.js application that provides APIs for fetching weather data, predicting dengue risk, and storing prediction results. It interacts with a weather API and a machine learning model to deliver accurate predictions based on current weather conditions.

## Features

- **Fetch Current Weather Data**: Retrieves real-time weather information for a specified location.
- **Get Dengue Risk Prediction**: Analyzes weather data to predict the risk of dengue outbreaks.
- **Store Predictions**: Saves prediction results associated with user IDs in a MongoDB database.

## Technologies

- **Node.js**: JavaScript runtime used for building the backend.
- **Express**: Web framework for creating the RESTful API.
- **MongoDB**: NoSQL database for storing weather and prediction data.
- **Axios**: HTTP client for making API requests.
- **JSON Web Tokens (JWT)**: Used for authentication and authorization.

## Setup

### Prerequisites

- Node.js (version 14 or later)
- MongoDB
- API keys for weather and ML services

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/SmartDengueAlert/SmartDengueAlert-backend.git
   ```
2. Navigate to the project directory:
   ```bash
   cd SmartDengueAlert-backend
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

4. Start the application:

  ```bash
  npm start
  ```
