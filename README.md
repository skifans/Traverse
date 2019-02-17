# Traverse
Traverse is a web app which aims to simplify and aid in the planning of complex UK train journeys. We take into account factors to do with your journey beyond just origin and destination, such as the need for wheelchair access or extra flexibility implicitly attached to a ticket. We then present you with what we believe to be the most relevant fares for your journey.

## How to run our app
1. Start by downloading and installing [node.js](https://nodejs.org/en/download/)
   - Ensure this happened successfully by running `node -v` and `npm -v`
2. Start the UI development server:
   1. `cd` to the `traverse-react` folder in _Command Line_ or _Terminal_
   2. Run `npm start`
   3. You should be navigated to `localhost:3000` in your browser, do it manually if this doesn't happen
3. While the UI server starts, start the backend server:
   1. `cd` to the `server` folder
   2. Run `npm start` (try `node index.js` if that fails)

**NB**: If only the backend server needs to be used, just run that. However, use of the UI will require running both servers.
