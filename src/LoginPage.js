import React from "react";
import { Link } from "@reach/router";
export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    // console.log(sampleData);
    this.state = {
      emailInput: "",
      passwordInput: "",
      showEmailPrompt: false,
      showPaswordPrompt: false,
      emailPlaceholder: "",
      passwordPlaceholder: ""
    };
  }

  componentDidMount() {
    console.log("login page mounted");
  }

  onEmailInputChange = e => {
    this.setState({ emailPlaceholder: "", emailInput: e.target.value });
  };

  onPasswordInputChange = e => {
    this.setState({ passwordPlaceholder: "", passwordInput: e.target.value });
  };

  onLoginPressed = async () => {
    // const username = this.state.emailInput;
    // const password = this.state.passwordInput;

    const testdata = {
      email: "mary.smith@sakilacustomer.org",
      password: "pass123",
      role: "customer"
    };

    const email = testdata.email;
    const password = testdata.password;
    const role = testdata.role;

    console.log("logging in with creds: ", { email, password, role });

    if (email == "") {
      this.setState({ emailPlaceholder: "Please enter your email." });
    }

    if (password == "") {
      this.setState({ passwordPlaceholder: "Please enter your password." });
    }

    try {
      const response = await fetch(`http://localhost:3001/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
          role
        })
      });

      if (!response.ok) {
        console.log("login failed");
        return;
      }
      const data = await response.json();
      console.log("login ok");
      console.log(data);
      this.props.setUserDetails(data);
    } catch (err) {
      console.log("login error: ", err);
      return;
    }
  };

  render() {
    return (
      <div id="login-main">
        <div id="login-form">
          <h1>Customer Login</h1>
          <div>
            <div>Email:</div>
            <input
              id="emailInput"
              onChange={this.onEmailInputChange}
              value={this.state.emailInput}
              placeholder={this.state.emailPlaceholder}
            />
          </div>
          <div>
            <div>Password:</div>
            <input
              id="passwordInput"
              type="password"
              onChange={this.onPasswordInputChange}
              value={this.state.passwordInput}
              placeholder={this.state.passwordPlaceholder}
            />
          </div>
          <div id="login-form-bottom">
            <button onClick={this.onLoginPressed}>Login</button>
            <Link to="/">
              <button>Cancel</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
