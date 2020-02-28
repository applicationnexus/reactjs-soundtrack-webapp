import React from 'react';
import axios from '../../config/config';

export default class SoundService extends React.Component {
  /**
   * @description - Http call to get sound data from database
   */
  static getSoundList = async (): Promise<any> => {
    const userData = JSON.parse(window.localStorage.getItem('user') || '{}');
    const sounds = await axios.get(`/sounds/getSoundList?userid=${userData.user_id}`);
    return sounds;
  };

  /**
   * @description - Http call to get user created sound from database
   */
  static getUserSounds = async (): Promise<any> => {
    const userData = JSON.parse(window.localStorage.getItem('user') || '{}');
    const sounds = await axios.get(`/sounds/getUserSounds?userid=${userData.user_id}`);
    return sounds;
  };

  /**
   * @description - Http call to a particular sound in a database
   * @param searchData - search data to use for searching the sound
   */
  static searchSoundList = async (searchData: any): Promise<any> => {
    const sounds = await axios.post('/sounds/searchSoundList', searchData);
    return sounds;
  };

  /**
   * @description - Http call to insert a new data in a database
   * @param soundData - sound data to be saved
   */
  static addNewSound = async (soundData: any): Promise<any> => {
    const sounds = await axios.post('/sounds/addNewSound', soundData);
    return sounds;
  };

  /**
   * @description - Http call to upload the sound data to server
   * @param soundData - sound file data to upload
   */
  static uploadSound = async (soundData: any): Promise<any> => {
    const sounds = await axios.post('/sounds/uploadSound', soundData);
    return sounds;
  };
}
