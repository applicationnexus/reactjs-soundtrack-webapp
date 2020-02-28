import React from 'react';
import User from '../../models/user';

interface State {
  isLogin: boolean;
  username: string;
  userData: User;
}
export default class Header extends React.Component {
  state = {
    isLogin: false,
    username: '',
    userData: {
      firstname: '',
      lastname: '',
      email: '',
    },
  };

  /**
   * Function to sign out user and clear the user data from local storage
   */
  signOutUser = () => {
    window.localStorage.removeItem('user');
    window.localStorage.setItem('isUserLogin', 'false');
    window.location.href = '/home';
  };

  /**
   * Navigate on user profile page on image click
   */
  navigateToUserProfile = () => {
    window.location.href = '/liked-list';
  };

  /**
   * @description - Get user data from local storage when component finished mounting
   */
  componentDidMount() {
    const isUserLogin = window.localStorage.getItem('isUserLogin');
    const userData = JSON.parse(window.localStorage.getItem('user') || '{}');
    this.setState({
      userData: userData,
      isLogin: isUserLogin === 'true' ? true : false,
    });
  }

  render() {
    const user = this.state.userData;
    return (
      <div className="header-div w-100">
        <nav className="navbar navbar-expand-lg w-100">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="row w-100 align-items-center">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              {this.state.isLogin
                ? [
                    <React.Fragment key={1}>
                      <img
                        src={process.env.PUBLIC_URL + '/assets/profile-pic.png'}
                        alt="profile-pic"
                        className="img-responsive profile-pic"
                        onClick={this.navigateToUserProfile}
                      />
                      <span className="ml-3">
                        {user ? `${user.firstname} ${user.lastname}` : ''}
                      </span>
                    </React.Fragment>,
                  ]
                : null}
            </div>
            <div className="col-md-4">
              <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link" href="/home">
                      HOME
                    </a>
                  </li>

                  {!this.state.isLogin ? (
                    <li className="nav-item">
                      <a className="nav-link" href="/login">
                        LOGIN
                      </a>
                    </li>
                  ) : (
                    ''
                  )}

                  {!this.state.isLogin ? (
                    <li className="nav-item">
                      <a className="nav-link" href="/sign-up">
                        SIGN UP
                      </a>
                    </li>
                  ) : (
                    ''
                  )}

                  {this.state.isLogin ? (
                    <li className="nav-item" onClick={this.signOutUser}>
                      <a className="nav-link" href="/sign-up">
                        SIGN OUT
                      </a>
                    </li>
                  ) : (
                    ''
                  )}
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
