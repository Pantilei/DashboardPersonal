import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { formLogIn as onLogInSubmit } from "../actions";
import { Link } from "react-router-dom";
import HomeButton from "./HomeButton";

class Login extends React.Component {
  renderInput = formProps => {
    return (
      <div>
        <label>{formProps.label}</label>
        <input
          type={formProps.type}
          placeholder={formProps.placeholder}
          {...formProps.input}
        />
      </div>
    );
  };

  onSubmit = formValues => {
    console.log(formValues);
    this.props.onLogInSubmit(formValues); // Create this action
  };

  render() {
    return (
      <div>
        <HomeButton />
        <h1 className="loginHeading">Hackathon</h1>
        <form
          className="form"
          onSubmit={this.props.handleSubmit(this.onSubmit)}
        >
          <div className="flex">
            <Field
              name="email"
              component={this.renderInput}
              type="email"
              placeholder="Email"
            />
            <Field
              name="password"
              component={this.renderInput}
              type="password"
              placeholder="Password"
            />
          </div>
          <button className="loginButton"></button>
          <h2>
            New to Hackathon?
            <span>
              <Link to="/signup">Sign Up</Link>
            </span>
          </h2>
        </form>
      </div>
    );
  }
}

const logInForm = reduxForm({
  form: "LogInForm"
})(Login);

export default connect(null, { onLogInSubmit })(logInForm);
