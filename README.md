# About

The purpose of this project is to create an API aggregator -application which would fetch data from multiple external API endpoints and then combine them into one result.

## How to use

Building the application

> npm build

Starting the application

> npm start

Testing the application (no tests yet)

> npm test

Sending API requests

> GET http://localhost:3000/api/ping

> GET http://localhost:3000/api/weather-data/Helsinki

> GET http://localhost:3000/api/axios-test

## Initial guidelines

- The application responds to API call and sends back a result which is aggregated from multiple external APIs.
- To reduce amount of external API calls made, similar requests should be fetched from local cache instead
- Tests should be implemented by mocking the external API responses.
- GitHub actions should be set up for automated tests on changes.

## Initial ideas (can change)

- External APIs could be weather APIs.

  > The "reason" for application could be that as a cautious programmer living in our dark coding bunker we do not want to open the windows to check the temperature. Instead we want to get temperature from many different weather APIs to compare and see if they differ (would they actually differ though?)

  > Another idea would be to just combine temperature, humidity and so on, from different weather APIs, instead of getting it all from just one

- Tecnologies used
  - Node.js
  - JavaScript
  - SQLite as cache database
  - Jest + Supertest for testing
  - Express for building APIs
  - Axios for external API calls

## Notes

This is a hobby project, made only because of my own interest to learn new stuff.
