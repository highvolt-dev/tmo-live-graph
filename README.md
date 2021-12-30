# tmo-live-graph

A simpe react app that plots a live view of the T-Mobile Home Internet Nokia 5G Gateway signal stats, helpful for optimizing signal.

This project should be considered to be in a pre-release state.

<img src="./screenshot-desktop.png" alt="desktop screenshot of tmo-live-graph" width="768">


## Getting Started

Ensure that you have nodejs installed on your machine, then run:

```
npm install
```

In order to properly fetch API responses from the Nokia Gateway in-browser, they must be proxied to work around CORS restrictions.

This is handled automatically when running the project in development mode using webpack-dev-server with the following command:

```
npm start
```

This will start the project at http://localhost:3000/

This project has not been prepared to handle proxying in a production-ready release mode.

## Summarized Statistics

### 4G LTE
- Connected band
- Carrier Aggregation (Download, Upload, Bands)
- Current/Best RSRP
- Current/Best SNR
- Current/Best RSRQ

### 5G NR
- Connected band
- Current/Best RSRP
- Current/Best SNR
- Current/Best RSRQ

## Visualized Statistics

### 4G LTE
- RSRP value with Min/Max reference lines
- SNR value with Min/Max reference lines
- RSRQ value with Min/Max reference lines

### 5G NR
- RSRP value with Min/Max reference lines
- SNR value with Min/Max reference lines
- RSRQ value with Min/Max reference lines

## Screenshots

### Desktop
<img src="./screenshot-desktop.png" alt="desktop screenshot of tmo-live-graph" width="768">

### Tablet
<img src="./screenshot-tablet.png" alt="tablet screenshot of tmo-live-graph" width="480">

### Mobile
<img src="./screenshot-mobile.png" alt="mobile screenshot of tmo-live-graph" width="480">

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
