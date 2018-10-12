# Summary
This microservice is to help Bob calculate how much he will spend on bananas given a starting date, a number of days into the future that he will be purchasing, and some bizarre yet predictable market conditions.

# Install
 - This microservice requires you to have NodeJS installed. If you do not, please follow instructions here: https://nodejs.org/en/download/
 - Once you have Node installed, from the root directory of this filesystem, run: `yarn` or `npm install`
 - The microservice unfortunately has no UI, so a program such as Postman will be useful to hit the server from your computer. Please find Postman here: https://www.getpostman.com/apps

# Test
This microservice comes with a (very incomplete) suite of unit tests.
To run the tests, from the root directory of this filesystem, run: `yarn test` or `npm test`

# Run
To start the service, run: `yarn start` or `npm start`

# Use
Once the service is started, the server is listening on TCP port 3000.
To calculate Bob's projected banan expenses:
  - Direct Postman to localhost:3000/api/bananas as a POST request
  - Under `body`, select `x-www-form-urlencoded`
  - Add a `startDate` of the form MM/DD/YYYY to the request body
  - Add a `numberOfDays` to the request body
  - Click `Send`
  - You should receive a response body of the form `{ "totalCost": Number }`. This represents the amount in $ that Bob will spend on Bananas over the specifed period.
  