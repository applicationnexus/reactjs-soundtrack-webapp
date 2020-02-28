import React from 'react';
import UserService from '../../services/UserService/user.service';
import AlertMessages from '../AlertMessages/alert-messages';
interface State {
  email: string;
  password: string;
  showModalMessage: boolean;
  modalMessage: string;
  errors: {
    email: string;
    password: string;
  };
}
export default class Login extends React.Component {
  /**
   * Defining the states for the component
   */
  state = {
    email: '',
    password: '',
    showModalMessage: false,
    modalMessage: '',
    errors: {
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
    // if we have an error string set valid to false
    Object.values(errors).map((val: any) => val.length > 0 && (valid = false));
    return valid;
  };

  /**
   * @description - Function to submit the login form
   * @param event - form event data
   */
  handleSubmit = async (event: any) => {
    event.preventDefault();
    if (this.validateForm(this.state.errors)) {
      const userData = {
        email: this.state.email,
        password: this.state.password,
      };
      /**
       * Get response from login http request
       */
      const response = await UserService.userLogin(userData);
      if (response.data.length > 0) {
        /**
         * Set state flag and message for showing alert modal
         */
        this.setState({
          showModalMessage: true,
          modalMessage: 'Login Successful',
        });
        const user = response.data[0];
        const userData = {
          user_id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
        };
        /**
         * Set user data and login flag in local storage after successful login
         */
        window.localStorage.setItem('user', JSON.stringify(userData));
        window.localStorage.setItem('isUserLogin', 'true');
        window.location.href = '/home';
      } else {
        this.setState({
          showModalMessage: true,
          modalMessage: 'Error while login, Please check your details',
        });
      }
    } else {
      console.log('invalid form');
    }
  };

  /**
   * @description - Function to dismiss the alert message window on button click
   */
  onModalMessageDismiss = () => {
    this.setState({
      showModalMessage: false,
    });
  };

  render() {
    return (
      <div className="container login">
        <h3>Login</h3>
        <form className="login-form" onSubmit={this.handleSubmit} noValidate>
          <hr />
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              onChange={this.handleChange}
              value={this.state.email}
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
            {this.state.errors.password ? (
              <div className="alert alert-danger" role="alert">
                {this.state.errors.password}
              </div>
            ) : (
              ''
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <p>
            New User? <a href="/sign-up">REGISTER HERE</a>
          </p>
        </form>
        <AlertMessages
          msgTitle={this.state.modalMessage}
          showModal={this.state.showModalMessage}
          onClose={this.onModalMessageDismiss}
        />
      </div>
    );
  }
}
