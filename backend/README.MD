# Backend Documentation

This document outlines the structure and functionality of the backend codebase, including the newly added user authentication features.

## Controllers

### user.controllers.js

This file contains the logic for handling user registration, login, and authentication.

#### registerUser

* Method: POST
* Route: `/register`
* Description: Registers a new user in the database.
* Request Body:
	+ `req.body`: The user details to be registered.
* Response:
	+ `201`: User registered successfully.
	+ `500`: Error registering user.

Example Request:
```json
POST /register HTTP/1.1
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```
Example Response:
```json
HTTP/1.1 201 Created
Content-Type: application/json

{
  "message": "User registered successfully",
  "user": {
    "_id": "5f6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123",
    "__v": 0
  }
}

#### loginUser

* Method: POST
* Route: `/login`
* Description: Logs in an existing user.
* Request Body:
	+ `req.body`: The user credentials for login.
* Response:
	+ `200`: User logged in successfully.
	+ `400`: Validation errors.
	+ `401`: Invalid email or password.

Example Request:
```json
POST /login HTTP/1.1
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "password123"
}
```
Example Response:
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "token": "your_token_here",
  "user": {
    "_id": "5f6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2",
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
}

