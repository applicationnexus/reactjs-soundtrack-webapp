import React from 'react';
import axios from '../../config/config';

export default class UserService extends React.Component {
  /**
   * @description - Http call create new user in database and sign up user
   * @param userObj - user data to be saved
   */
  static userSignUp = async (userObj: Object): Promise<any> => {
    const user = await axios.post(`/users/createUser`, userObj);
    return user.data;
  };

  /**
   * @description - Http call to login a user
   * @param userObj - user data
   */
  static userLogin = async (userObj: Object): Promise<any> => {
    const user = await axios.post('users/loginUser', userObj);
    return user.data;
  };
}
