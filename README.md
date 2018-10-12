# Summary
This microservice is to help Bob calculate how much he will spend on bananas given a starting date, a number of days into the future that he will be purchasing, and some bizarre yet predictable market conditions.

# Install
 - This microservice requires you to have NodeJS installed. If you do not, please follow instructions here: https://nodejs.org/en/download/
 - Once you have Node installed, from the root directory of this filesystem, run: `yarn` or `npm install`

# Test
This microservice comes with a (very incomplete) suite of unit tests.
To run the tests, from the root directory of this filesystem, run: `yarn test` or `npm test`

# Run
We have the option of running in either development mode or production mode.
In development mode we have 2 servers running: the NodeJS server serving the backend, and webpack dev server serving the front end code (this provides hot reloading). The Node server uses nodemon, which automatically restarts the server any time server side code changes.
In production mode we have only the node server running. The client side code is bundled into static files using webpack, and is served by the NodeJS server.

To start the service in development mode, run: `yarn dev` or `npm run dev`
To start the service in production mode, run: `yarn start` or `npm start`

# Use
If running the microservice in development mode, your default browser should automatically open a new tab directed to `localhost:3000`
If running in production mode, direct your browser to `localhost:8080`

Bob can select a starting date, and a number of days into the future that he plans to be buying bananas.

The UI intended to save Bob as much confusion as possible. For example:
 - The starting date defaults to the present day
 - Bob is unable to select a starting date in the past
 - Bob is unable to select a starting date that does not exist
 - Bob can only run the calculation after entering a valid number of days
 - When Bob changes the starting date or number of days, the result of the last calculation is cleared
