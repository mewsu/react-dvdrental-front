import React from "react";

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // console.log(sampleData);
    this.state = {};
  }

  componentDidMount() {
    console.log("login page mounted");
  }

  render() {
    return (
      <div id="login-main">
        <div id="login-form">
          <h1>Customer Login</h1>
          <div>
            <label htmlFor="emailInput">Email:</label>
            <input id="emailInput" placeholder="Email" />
          </div>
          <div>
            <label htmlFor="passwordInput">Password:</label>
            <input id="passwordInput" placeholder="Password" />
          </div>
        </div>
      </div>
    );
  }
}
