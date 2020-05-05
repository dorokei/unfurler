import "../stylesheets/index.scss";
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/App.tsx";
import ReactGA from 'react-ga';

ReactGA.initialize(process.env.GA_TRACKING_ID + "", {
  debug: false
});
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(
  <App />,
  document.querySelector("#root")
);
