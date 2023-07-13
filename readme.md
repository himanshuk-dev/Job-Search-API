# Jobly - Job Search API

## Overview
The job search API allows users to manage and interact with user, job, and company data. It has various endpoints that handle authentication, user, company, and job operations.

All request and response bodies are in JSON format.

##Base URL

If you want to run this project locally, base URL is:</br>
```
http://localhost:3001/companies
```

I'll suggest using the following base URL which is already deployed:

```
https://jobly-backend-x9gn.onrender.com/
```

##Endpoints

###Authentication Endpoints

*POST /auth/token*

**Description**: Authenticates a user and returns a token.</br>
**Authorization**: None</br>
**Request Body**: { username, password }</br>
**Response Body**: { token }</br>

*POST /auth/register*

**Description**: Registers a new user and returns a token.</br>
**Authorization**: None</br>
**Request Body**: { username, password, firstName, lastName, email }</br>
**Response Body**: { token }</br>


###User Endpoints

*POST /users*

**Description**: Adds a new user (Admin only).</br>
**Authorization**: Admin</br>
**Request Body**: userNewSchema</br>
**Response Body**: {user: { username, firstName, lastName, email, isAdmin }, token }

*GET /users*

**Description**: Returns a list of all users (Admin only).</br>
**Authorization**: Admin</br>
**Response Body**: { users: [ {username, firstName, lastName, email }, ... ] }</br>

*GET /users/:username*

**Description**: Returns user data.</br>
**Authorization**: Admin or same user as :username</br>
**Response Body**: { username, firstName, lastName, isAdmin, jobs }</br>

*PATCH /users/:username*

**Description**: Updates user data.</br>
**Authorization**: Admin or same user as :username</br>
**Request Body**: { firstName, lastName, password, email }</br>
**Response Body**: { username, firstName, lastName, email, isAdmin }</br>

*DELETE /users/:username*

**Description**: Deletes a user.</br>
**Authorization**: Admin or same user as :username</br>
**Response Body**: { deleted: username }</br>

*POST /users/:username/jobs/:id*

**Description**: Allows a user to apply to a job.</br>
**Authorization**: Admin or same user as :username</br>
**Response Body**: { applied: jobId }</br>

###Job Endpoints

*POST /jobs*

**Description**: Adds a new job (Admin only).</br>
**Authorization**: Admin</br>
**Request Body**: { title, salary, equity, companyHandle }</br>
**Response Body**: { id, title, salary, equity, companyHandle }</br>

*GET /jobs*

**Description**: Returns a list of all jobs, optionally filtered by search parameters.</br>
**Authorization**: None</br>
**Request Body**: { minSalary, hasEquity, title }</br>
**Response Body**: { jobs: [ { id, title, salary, equity, companyHandle, companyName }, ...] }</br>

*GET /jobs/:id*

**Description**: Returns job data.</br>
**Authorization**: None</br>
**Response Body**: { id, title, salary, equity, company }</br>

*PATCH /jobs/:id*

**Description**: Updates job data (Admin only).</br>
**Authorization**: Admin</br>
**Request Body**: { title, salary, equity }</br>
**Response Body**: { id, title, salary, equity, companyHandle }</br>

*DELETE /jobs/:id*

**Description**: Deletes a job (Admin only).</br>
**Authorization**: Admin</br>
**Response Body**: { deleted: id }</br>

###Company Endpoints

*POST /companies*

**Description**: Adds a new company (Admin only).</br>
**Authorization**: Admin</br>
**Request Body**: { handle, name, Description, numEmployees, logoUrl }</br>
**Response Body**: { handle, name, Description, numEmployees, logoUrl }</br>

*GET /companies*

**Description**: Returns a list of all companies, optionally filtered by search parameters.</br>
**Authorization**: None</br>
**Request Body**: { minEmployees, maxEmployees, nameLike }</br>
**Response Body**: { companies: [ { handle, name, Description, numEmployees, logoUrl }, ...] }</br>

*GET /companies/:handle*

**Description**: Returns company data.</br>
**Authorization**: None</br>
**Response Body**: { handle, name, Description, numEmployees, logoUrl, jobs }</br>

*PATCH /companies/:handle*

**Description**: Updates company data (Admin only).</br>
**Authorization**: Admin</br>
**Request Body**: { name, Description, numEmployees, logo\_url }</br>
**Response Body**: { handle, name, Description, numEmployees, logo\_url } </br>

*DELETE /companies/:handle*

**Description**: Deletes a company (Admin only).</br>
**Authorization**: Admin</br>
**Response Body**: { deleted: handle }</br>

##To run this locally:

    node server.js

##To run the tests:

    jest -i