import * as React from "react";

class App extends React.Component {
  render() {
    return (
      <div className="field has-addons">
        <div className="control is-expanded">
          <input className="input is-large" type="text" placeholder="Paste a URL" />
        </div>
        <div className="control">
          <a className="button is-info  is-large">
            Search
          </a>
        </div>
      </div>
    );
  }
}

export default App;
