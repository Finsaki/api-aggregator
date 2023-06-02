# About

The purpose of this project is to create an API aggregator -application which would fetch data from multiple external API endpoints and then combine them into one result.

To note: This is a hobby project, made only because of my own interest to learn new stuff.

## How to use

### Building the application

> npm build

### Starting the application

> npm start

If no cache database is present, the application will create one

### Testing the application

> npm test

Test will use mocked data instead of relying on external APIs

Tests will use a separate test cache database

### Sending API requests

> GET http://localhost:3000/api/ping

> GET http://localhost:3000/api/user-todo/1

It would seem that only user with id of 1 has todos and comments in jsonplaceholder API, this is still enough to test API aggregation

## Implementation

- The application responds to API call and sends back a result which is aggregated from multiple external APIs.
- To reduce amount of external API calls made, similar requests should be fetched from local cache instead.
- External API data should be validated before attempting to save to cache database.
- Id should be validated before making requests with it. (number, min, max)
- Tests should be implemented by mocking the external API responses.
- GitHub actions should be set up for automated tests on changes.

> Currently application is configured in a way that prevents use of partial data from the external API. If we want to allow partial data (ie. save user-data without todo- and comments-data), then Axios needs to be configured to not throw error if no data is found. This can be done with axios validateStatus config. Also Joi validation needs to be modified.

## External API

- External API will be jsonplaceholder.typicode.com. It provides access to fake data about users, users posts, users comments, users photos, users albums and users todos. It also requires no API key for the requests and such is perfect for testing this kind of aggregator application.
- We will aggregate a new todo object by querying different API endpoints.

The new todo object is as follows

```

id (Integer)         : As the search term
name (String)        : from https://jsonplaceholder.typicode.com/users/{id}/
username (String)    : from https://jsonplaceholder.typicode.com/users/{id}/
title (String)       : from https://jsonplaceholder.typicode.com/users/{id}/todos?id=1/
completed (Boolean)  : from https://jsonplaceholder.typicode.com/users/{id}/todos?id=1/
description (String) : from https://jsonplaceholder.typicode.com/users/{id}/comments?id=1/

```

> So as seen by the above layout, we would aggregate our own fake API data by fetching data from three different API points in jsonplaceholder (users, users/todos and users/comments)

## Tecnology stack

- JavaScript
- Node.js
- SQLite as cache database
- sqlite3 as the node library to use SQLite
- sqlite as the node library to use promises instead of callbacks with SQLite
- Jest + Supertest for testing
- Express for building APIs
- Axios for external API calls
- cross-env to allow environment (dev, prod, test...) detection regardless of platform
- morgan for easy API call logging and comparing request times between cache and external calls
- Joi for external API response validation
- Nodemon for automatic server restarts when developing
- GitHub Actions for automated CI workflow (build/test)

## About destructuring and defaults (NOT IMPORTANT)

I use a lot of destructuring and setting defaults when making axios calls to external API. This might be hard to read for some so I will explain it here

> const { data: { name, username } = {} } = await axios.get(`${URI}/${id}/`);

> const { data: [{ title, completed } = {}, ...restOfPossibleTodos] = [] } = await axios.get(`${URI}/${id}/todos?id=1`);

Axios always returns data in an object that has an object called data inside it. We can destructure data out of this return object by calling {data}. This can also be renamed to something else by calling {data: user} for example. But in the above cases we further destuct the objects inside already destructured data object. We can also set a default to such destructured object incase no such object with that name (name, username, title completed) was there, this prevents SYNTAX ERROR. In the case of the latter example the data inside data-object is not an object but an array. We can destucture the objects inside the array by simply setting [] symbols around the object key names. For arrays we can also set [{ a, b } = {}, ...rest]. The ...rest means we only use the first object in the array to destructure a and b. Rest of the objects will be combined into a new array called rest. We have no use for it but it prevents any additional data leaking in. We can also set a default value for an array (= []) just like we did with an object.
