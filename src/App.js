import React from "react";
import ReactDOM from "react-dom";
import { Router, Link } from "@reach/router";

import FilmPage from "./FilmPage";
import LoginPage from "./LoginPage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      userDetails: null
    };
  }

  setUserDetails = data => {
    console.log("setting user details: ", JSON.stringify(data));
    const userDetails = {
      firstName: data.first_name,
      lastName: data.firstName,
      email: data.email,
      addressId: data.address_id,
      role: data.role
    };

    if (data.role === "customer") {
      userDetails.id = data.customer_id;
    } else if (data.role === "staff") {
      userDetails.id = data.staff_id;
    }

    this.setState({ userDetails, isLoggedIn: true });
  };

  render() {
    return (
      <div>
        <TopNav isLoggedIn={this.state.isLoggedIn} />
        <Router>
          <FilmPage path="/" />
          <LoginPage path="login" setUserDetails={this.setUserDetails} />
        </Router>
      </div>
    );
  }
}

const TopNav = props => {
  return (
    <div id="top-nav">
      <Link to="profile">
        <button className="nav-button" disabled={!props.isLoggedIn}>
          My Profile
        </button>
      </Link>

      <Link to="login">
        <button className="nav-button" disabled={props.isLoggedIn}>
          Login
        </button>
      </Link>
      <Link to="logout">
        <button className="nav-button" disabled={!props.isLoggedIn}>
          Logout
        </button>
      </Link>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
