[![Github](github.png)](https://github.com/coderhimanshu1/Job-Search-API)



## Overview

The job search API allows users to manage and interact with user, job, and company data. It has various endpoints that handle authentication, user, company, and job operations.

All request and response bodies are in JSON format.

##Base URL

If you want to run this project locally, base URL is:<br />

```
http://localhost:3001/
```

I'll suggest using the following base URL which is already deployed:

```
https://jobly-backend-x9gn.onrender.com/
```

## Endpoints

### Authentication Endpoints

_POST /auth/token_

**Description**: Authenticates a user and returns a token.<br />
**Authorization**: None<br />
**Request Body**: { username, password }<br />
**Response Body**: { token }<br />

_POST /auth/register_

**Description**: Registers a new user and returns a token.<br />
**Authorization**: None<br />
**Request Body**: { username, password, firstName, lastName, email }<br />
**Response Body**: { token }<br />

### User Endpoints

_POST /users_

**Description**: Adds a new user (Admin only).<br />
**Authorization**: Admin<br />
**Request Body**: userNewSchema<br />
**Response Body**: {user: { username, firstName, lastName, email, isAdmin }, token }

_GET /users_

**Description**: Returns a list of all users (Admin only).<br />
**Authorization**: Admin<br />
**Response Body**: { users: [ {username, firstName, lastName, email }, ... ] }<br />

_GET /users/:username_

**Description**: Returns user data.<br />
**Authorization**: Admin or same user as :username<br />
**Response Body**: { username, firstName, lastName, isAdmin, jobs }<br />

_PATCH /users/:username_

**Description**: Updates user data.<br />
**Authorization**: Admin or same user as :username<br />
**Request Body**: { firstName, lastName, password, email }<br />
**Response Body**: { username, firstName, lastName, email, isAdmin }<br />

_DELETE /users/:username_

**Description**: Deletes a user.<br />
**Authorization**: Admin or same user as :username<br />
**Response Body**: { deleted: username }<br />

_POST /users/:username/jobs/:id_

**Description**: Allows a user to apply to a job.<br />
**Authorization**: Admin or same user as :username<br />
**Response Body**: { applied: jobId }<br />

### Job Endpoints

_POST /jobs_

**Description**: Adds a new job (Admin only).<br />
**Authorization**: Admin<br />
**Request Body**: { title, salary, equity, companyHandle }<br />
**Response Body**: { id, title, salary, equity, companyHandle }<br />

_GET /jobs_

**Description**: Returns a list of all jobs, optionally filtered by search parameters.<br />
**Authorization**: None<br />
**Request Body**: { minSalary, hasEquity, title }<br />
**Response Body**: { jobs: [ { id, title, salary, equity, companyHandle, companyName }, ...] }<br />

_GET /jobs/:id_

**Description**: Returns job data.<br />
**Authorization**: None<br />
**Response Body**: { id, title, salary, equity, company }<br />

_PATCH /jobs/:id_

**Description**: Updates job data (Admin only).<br />
**Authorization**: Admin<br />
**Request Body**: { title, salary, equity }<br />
**Response Body**: { id, title, salary, equity, companyHandle }<br />

_DELETE /jobs/:id_

**Description**: Deletes a job (Admin only).<br />
**Authorization**: Admin<br />
**Response Body**: { deleted: id }<br />

### Company Endpoints

_POST /companies_

**Description**: Adds a new company (Admin only).<br />
**Authorization**: Admin<br />
**Request Body**: { handle, name, Description, numEmployees, logoUrl }<br />
**Response Body**: { handle, name, Description, numEmployees, logoUrl }<br />

_GET /companies_

**Description**: Returns a list of all companies, optionally filtered by search parameters.<br />
**Authorization**: None<br />
**Request Body**: { minEmployees, maxEmployees, nameLike }<br />
**Response Body**: { companies: [ { handle, name, Description, numEmployees, logoUrl }, ...] }<br />

_GET /companies/:handle_

**Description**: Returns company data.<br />
**Authorization**: None<br />
**Response Body**: { handle, name, Description, numEmployees, logoUrl, jobs }<br />

_PATCH /companies/:handle_

**Description**: Updates company data (Admin only).<br />
**Authorization**: Admin<br />
**Request Body**: { name, Description, numEmployees, logo_url }<br />
**Response Body**: { handle, name, Description, numEmployees, logo_url } <br />

_DELETE /companies/:handle_

**Description**: Deletes a company (Admin only).<br />
**Authorization**: Admin<br />
**Response Body**: { deleted: handle }<br />

## To run this locally:

    node server.js

## To run the tests:

    jest -i
