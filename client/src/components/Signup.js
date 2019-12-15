import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { formSignUp as onSignUpSubmit } from "../actions";
import HomeButton from "./HomeButton";

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.fileInput = React.createRef();
  }

  renderError({ touched, error }) {
    if (error && touched) {
      return <div className="alert-danger">{error}</div>;
    }
  }

  componentDidMount() {
    /* console.log(this.props); */
  }

  renderInput = formProps => {
    return (
      <div>
        <label>{formProps.label}</label>
        <input
          type={formProps.type}
          placeholder={formProps.placeholder}
          {...formProps.input}
        />
        {this.renderError(formProps.meta)}
      </div>
    );
  };

  onSubmit = async formValues => {
    const fd = new FormData();
    fd.append("username", formValues.username);
    fd.append("email", formValues.email);
    fd.append("password", formValues.password);
    fd.append("image", this.fileInput.current.files[0]);
    console.log(fd);
    await this.props.onSignUpSubmit(fd);
    if (this.props.user.message) {
      alert(this.props.user.message);
    }
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
              name="username"
              component={this.renderInput}
              type="text"
              placeholder="Username"
            />
            <Field
              name="email"
              component={this.renderInput}
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="flex">
            <Field
              name="password"
              component={this.renderInput}
              type="password"
              placeholder="Password"
            />
            <Field
              name="confirmPassword"
              component={this.renderInput}
              type="password"
              placeholder="Confirm password"
            />
          </div>
          <label className="fileUpload" htmlFor="fileUpload">
            <h3>Add Picture</h3>
          </label>
          <input
            className="fileContainer"
            name="picture"
            id="fileUpload"
            type="file"
            placeholder="Add picture"
            accept="image/*"
            ref={this.fileInput}
          />
          <button className="registerButton"></button>
        </form>
      </div>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.username) {
    errors.username = "You must enter a username!";
  }
  if (!formValues.email) {
    errors.email = "You must enter an email";
  }
  if (!formValues.password) {
    errors.password = "You must enter a password!";
  }
  if (formValues.confirmPassword !== formValues.password) {
    errors.confirmPassword = "Passwords do not match!";
  }

  return errors;
};

const singUpForm = reduxForm({
  form: "signUpForm",
  validate: validate
})(Signup);

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(mapStateToProps, { onSignUpSubmit })(singUpForm);
