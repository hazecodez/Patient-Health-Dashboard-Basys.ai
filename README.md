# Patient Health Dashboard for Prior Authorization

This is a Patient Health Dashboard app built using the MERN stack (MongoDB, Express, React, Node.js) for managing patient medical history and treatment authorizations. The app allows medical professionals to review patient information, request treatment authorization, and track the status of the authorizations.

### Live Link : [Live](https://patient-dashboard-eight.vercel.app)

## Admin Login Details

name: admin
password : 1234

## Features

- Manage patient profiles and medical history
- Request treatment authorization
- View treatment status (pending, approved, denied)
- RESTful APIs for handling CRUD operations

## Installation and Setup

Follow these steps to install and set up the app locally:
Clone the repository to your local machine

```bash
  git clone https://github.com/hazecodez/Patient-Health-Dashboard-Basys.ai.git
```

Go to the project BACKEND directory

```bash
  cd Backend
```

Install dependencies

```bash
  npm install
```

Create a .env file in the root directory and add your environment variables:

```bash
  MONGO_URI = "your_mongodb_atlas_uri"
  JWT_SECRET = "your_jwt_secret"

```

Start the backend server

```bash
  npm run start
```

Go to the project Frontend directory

```bash
  cd ..
```
```bash
  cd Frontend
```

Install dependencies

```bash
  npm install
```

Start the frontend server

```bash
  npm run dev
```


- The server will be running on [http://localhost:5173](http://localhost:5173)


## API Documentation

The app provides a set of RESTful API endpoints for managing patient data and treatment authorizations.

### Base URL

```bash
  http://localhost:5000/admin
```


1. **Login**
   - URL : /login
   - Method: POST
   - Login admin , generate and return jwt token

2. **Get All Patients**
   - URL : /patients
   - Method: GET
   - Retrieve a list of all patients in the system.

3. **Get a Patient details by ID**
   - URL : /patient_details/:id
   - Method: GET
   - Retrieve details of a specific patient.

4. **Add a New Patient**
   - URL : /add_patient
   - Method: POST
   - Add a new patient record.

5. **Request Treatment Authorization**
   - URL : /authorization
   - Method: POST
   - Request authorization for a patient's treatment.

6. **List all Request Authorizations**
   - URL : /authorizations
   - Method: POST
   - Retrieve a list of all Requested Authorizations.