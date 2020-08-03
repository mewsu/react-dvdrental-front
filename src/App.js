import React from "react";
import ReactDOM from "react-dom";
import { Router, Link } from "@reach/router";

import FilmPage from "./FilmPage";
import LoginPage from "./LoginPage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  render() {
    return (
      <div>
        <TopNav isLoggedIn={this.state.isLoggedIn} />
        <Router>
          <FilmPage path="/" />
          <LoginPage path="login" />
        </Router>
      </div>
    );
  }
}

const TopNav = props => {
  return (
    <div id="top-nav">
      <Link to="login">
        <button disabled={props.isLoggedIn}>Login</button>
      </Link>
      <Link to="logout">
        <button disabled={!props.isLoggedIn}>Logout</button>
      </Link>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
