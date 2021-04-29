import React from "react";
import { signup } from "../api/apiCalls";
import Input from "../components/input";
class UserSignupPage extends React.Component {
  state = {
    username: null,
    displayName: null,
    password: null,
    passwordRepeat: null,
    pendingApiCall: false,
    errors: {},
  };

  onChange = (event) => {
    const { name, value } = event.target;
    const errors = { ...this.state.errors };
    errors[name] = undefined;
    this.setState({
      [name]: value,
      errors,
    });
  };

  onClickSignup = (event) => {
    event.preventDefault();
    const { username, displayName, password } = this.state;
    const body = {
      username,
      displayName,
      password,
    };
    this.setState({ pendingApiCall: true });

    signup(body)
      .then((response) => {
        this.setState({ pendingApiCall: false });
      })
      .catch((error) => {
        if (error.response.data.validationErrors) {
          this.setState({
            errors: error.response.data.validationErrors,
          });
        }
        this.setState({
          pendingApiCall: false,
        });
      });
  };

  render() {
    const { pendingApiCall, errors } = this.state;
    const { username, displayName, password } = errors;
    return (
      <div className="container">
        <form>
          <h1 className="text-center">Sign Up</h1>
          <Input
            label="Username"
            error={username}
            name="username"
            onChange={this.onChange}
          ></Input>
          <Input
            label="Display Name"
            error={displayName}
            name="displayName"
            onChange={this.onChange}
          ></Input>
          <Input
            label="Password"
            error={password}
            name="password"
            onChange={this.onChange}
            type="password"
          ></Input>
          <Input
            label="Password Repeat"
            name="passwordRepeat"
            onChange={this.onChange}
            type="password"
          ></Input>
          <div className="text-center">
            <button
              className="btn btn-primary"
              onClick={this.onClickSignup}
              disabled={pendingApiCall}
            >
              {pendingApiCall ? (
                <span class="spinner-border spinner-border-sm"></span>
              ) : (
                ""
              )}
              {!pendingApiCall ? <span>Sign Up</span> : ""}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default UserSignupPage;
