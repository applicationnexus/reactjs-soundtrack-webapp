import React from 'react';
import UserService from '../../services/UserService/user.service';
import AlertMessages from '../AlertMessages/alert-messages';
interface State {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  showModalMessage: boolean;
  modalMessage: string;
  formValid: Boolean;
  errors: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  };
}
export default class SignUp extends React.Component {
  /**
   * Defining the states for the component
   */
  state = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    showModalMessage: false,
    modalMessage: '',
    formValid: false,

    errors: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    },
  };

  /**
   * @description - Function to handle the change of input element and set errors array
   * @param event - Input element event data to perform action on
   */
  handleChange = (event: any) => {
    event.preventDefault();
    this.setState({
      formValid: true,
    });
    const input = event.target;
    const errors = this.state.errors;
    const value = input.value;
    const id = input.id;
    /**
     * Setting the value for each form element by setting its state variable
     */
    this.setState({ [id]: value });
    const { name, inputValue } = event.target;
    /**
     * Regular expression for validation of email
     */
    const validEmailRegex = RegExp(
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
    );
    /**
     * Switch case to check every form element validation and set the errors message
     */
    switch (id) {
      case 'firstname':
        errors.firstname = value === '' ? 'Firstname is required' : '';
        break;
      case 'lastname':
        errors.lastname = value === '' ? 'Lastname is required' : '';
        break;
      case 'email':
        errors.email = validEmailRegex.test(value) ? '' : 'Email is not valid';
        break;
      case 'password':
        errors.password = value === '' ? 'Password is required' : '';
        break;
    }
    /**
     * Setting error state for form element
     */
    this.setState({ errors, [name]: inputValue });
  };

  /**
   * @description - Function to return the valid status of the singup form
   * @param errors - Form error array
   */
  validateForm = (errors: any) => {
    let valid = true;
    /**
     *  if we have an error string set valid to false
     */
    Object.values(errors).map((val: any) => val.length > 0 && (valid = false));
    return valid;
  };

  /**
   * @description - Function to submit the sign up form
   * @param event - form event data
   */
  handleSubmit = async (event: any) => {
    event.preventDefault();
    if (this.validateForm(this.state.errors) && this.state.formValid) {
      const userData = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        password: this.state.password,
      };
      /**
       * Get response from login http request
       */
      const response = await UserService.userSignUp(userData);
      console.log('response', response);
      if (response.code === 200) {
        this.setState({
          showModalMessage: true,
          modalMessage: response.msg,
        });
        window.location.href = '/login';
      } else {
        this.setState({
          showModalMessage: true,
          modalMessage: response.msg,
        });
      }
    } else {
      this.setState({
        showModalMessage: true,
        modalMessage: 'Please mark with * are required',
      });
    }
  };

  /**
   *@description - Function to dismiss the alert message window on button click
   */
  onModalMessageDismiss = () => {
    this.setState({
      showModalMessage: false,
    });
  };

  render() {
    return (
      <div className="container sign-up">
        <h2>SIGN UP</h2>
        <form className="login-form" onSubmit={this.handleSubmit} noValidate>
          <hr />
          <div className="form-group">
            <label htmlFor="firstname">
              Firstname <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              value={this.state.firstname}
              id="firstname"
              aria-describedby="emailHelp"
              onChange={this.handleChange}
            />
            {this.state.errors.firstname ? (
              <div className="alert alert-danger" role="alert">
                {this.state.errors.firstname}
              </div>
            ) : (
              ''
            )}
          </div>
          <div className="form-group">
            <label htmlFor="lastname">
              Lastname <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="lastname"
              aria-describedby="emailHelp"
              onChange={this.handleChange}
            />
            {this.state.errors.lastname ? (
              <div className="alert alert-danger" role="alert">
                {this.state.errors.lastname}
              </div>
            ) : (
              ''
            )}
          </div>
          <div className="form-group">
            <label htmlFor="email">
              Email address <span className="text-danger">*</span>
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              onChange={this.handleChange}
            />
            {this.state.errors.email ? (
              <div className="alert alert-danger" role="alert">
                {this.state.errors.email}
              </div>
            ) : (
              ''
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">
              Password <span className="text-danger">*</span>
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              onChange={this.handleChange}
            />
            {this.state.errors.password ? (
              <div className="alert alert-danger" role="alert">
                {this.state.errors.password}
              </div>
            ) : (
              ''
            )}
          </div>
          <button className="btn btn-primary">SIGN UP</button>
          <AlertMessages
            msgTitle={this.state.modalMessage}
            showModal={this.state.showModalMessage}
            onClose={this.onModalMessageDismiss}
          />
        </form>
      </div>
    );
  }
}
