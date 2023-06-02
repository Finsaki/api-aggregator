# About

The purpose of this project is to create an API aggregator -application which would fetch data from multiple external API endpoints and then combine them into one result.

## How to use

Building the application

> npm build

Starting the application

> npm start

Testing the application

> npm test

Sending API requests

> GET http://localhost:3000/api/ping

> GET http://localhost:3000/api/user-todo/1

It would seem that only user with id of 1 has todos and comments in jsonplaceholder API, this is still enough to test API aggregation

## Initial guidelines

- The application responds to API call and sends back a result which is aggregated from multiple external APIs. - DONE
- To reduce amount of external API calls made, similar requests should be fetched from local cache instead. - DONE
- External API data should be validated before attempting to save to cache database.
- Id should be validated before making requests with it. (number, min, max)
- Tests should be implemented by mocking the external API responses. - PARTLY DONE (add validation tests)
- GitHub actions should be set up for automated tests on changes. - DONE

## Initial ideas (can change)

- External API will be jsonplaceholder.typicode.com. It provides access to fake data about users, users posts, users comments, users photos, users albums and users todos. It also requires no API key for the requests and such is perfect for testing this kind of aggregator application.

- We will aggregate a new todo object by querying different API endpoints.

- The new todo object could be as follows

```

id (Integer)         : As the search term
name (String)        : from https://jsonplaceholder.typicode.com/users/{id}/
username (String)    : from https://jsonplaceholder.typicode.com/users/{id}/
title (String)       : from https://jsonplaceholder.typicode.com/users/{id}/todos?id=1/
completed (Boolean)  : from https://jsonplaceholder.typicode.com/users/{id}/todos?id=1/
description (String) : from https://jsonplaceholder.typicode.com/users/{id}/comments?id=1/

```

> So as seen by the above layout, we would aggregate our own fake API data by fetching data from three different API points in jsonplaceholder (users, users/todos and users/comments)

- Tecnologies used
  - Node.js
  - JavaScript
  - SQLite as cache database
  - sqlite3 as the node library to use SQLite
  - sqlite as the node library to use promises instead of callbacks with SQLite
  - Jest + Supertest for testing
  - Express for building APIs
  - Axios for external API calls
  - cross-env to allow environment (dev, prod, test...) detection regardless of platform
  - morgan for easy API call logging and comparing request times between cache and external calls

## Notes

This is a hobby project, made only because of my own interest to learn new stuff.
