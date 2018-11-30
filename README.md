# Udacity Final Project (React)
## Google Maps API and Foursquare API

### [See Demo](https://react-google-maps.netlify.com/)

<img src="/src/assets/screenshot.png" width="400px" border="3">
<img src="/src/assets/screenshot2.png" width="400px" border="3">

## Features
* Project [Rubics](https://review.udacity.com/#!/rubrics/1351/view)
* Full display of Google Maps with 5 default Markers of interesting places around Seatle
* User has the ability to click on a marker and see related image from Foursquare API
* User also has the ability to click on the name of the location and go to its external website
* Hamburger list menu on the top left corner enables user to see a list view of locations
* User can search and filter locations
* Clicking anywhere outside the drawer closes the drawer. Clicking anywhere on the map closes any active info display.
* Fully responsive design
* PWA offline usage with service workers

## How to run the app in development mode
* Clone the repo
* `npm install`
* `npm start`
* Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## How to run the app in production mode
* `serve -s build`
* `npm run serve`
* Open [http://localhost:5000](http://localhost:3000) to view it in the browser.

#### Deploy via Github pages:
* `npm install gh-pages --save-dev`
* In package.json, add:
  * `"homepage": "http://gitname.github.io/react-gh-pages"`
  * `"scripts": { /*...*/, "predeploy": "npm run build", "deploy": "gh-pages -d build" }`
* `npm run deploy`

## Credits
* Project Coach [Doug Brown](https://github.com/thefinitemonkey/fend-maps-walkthrough)
* Google Font API - Roboto
* Font Awesome for the hamburger icon
* React Material-UI for the Drawer
* `google-maps-react` external library
* `@material-ui/core` external library
* Bootstrapped with [Create React App](https://github.com/facebook/create-react-app)
