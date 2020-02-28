import React from 'react';
import Sound from '../../models/sound';
import { API } from '../../config/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddSound from '../AddSound/add-sound';
import SoundService from '../../services/SoundService/sound-service';

interface State {
  likedTracks: Array<Sound>;
  createdTracks: Array<Sound>;
  activeTab: string;
  showAddSoundModal: boolean;
  classNames: object;
}
export default class LikeList extends React.Component {
  state = {
    likedTracks: [],
    createdTracks: [],
    activeTab: '1',
    showAddSoundModal: false,
    classNames: {
      addSoundModalClass: 'addSound-Modal',
    },
  };

  /**
   *@description - Get the liked tracks and user created tracks when component finished mounting
   */
  componentDidMount() {
    this.getLikedTracks();
    this.getUserCreatedSounds();
  }

  /**
   * @description - Get liked sound data from local storage when component finished mount and setting state variable
   */
  getLikedTracks() {
    const soundData = JSON.parse(window.localStorage.getItem('LikedTracks') || '[]');
    this.setState({
      likedTracks: soundData,
    });
  }

  /**
   * @description - Function to get the user created sounds from Http call
   */
  async getUserCreatedSounds() {
    const response = await SoundService.getUserSounds();
    if (response.status === 200) {
      this.setState({
        createdTracks: response.data.data,
      });
    }
  }

  /**
   * @description - Set active tab on tab change
   * @param e - event data
   * @param tab - tab name to be set active
   */
  setActiveTab = (event: any, tab: string) => {
    event.preventDefault();
    this.setState({
      activeTab: tab,
    });
  };

  /**
   * @description - Function to open the add sound component
   * @param event - event data
   */
  openAddSound = (event: any) => {
    event.preventDefault();
    this.setState({
      showAddSoundModal: true,
    });
  };

  /**
   * @description - Function to dismiss the alert message window on button click
   */
  onModalDismiss = () => {
    this.setState({
      activeTab: '2',
      showAddSoundModal: false,
    });
    this.getUserCreatedSounds();
  };

  render() {
    return (
      <div className="container">
        <ul className="nav nav-tabs profile-tabs">
          <li className="nav-item">
            <a
              className={this.state.activeTab === '1' ? 'nav-link active' : 'nav-link'}
              href="# "
              onClick={e => this.setActiveTab(e, '1')}
            >
              <span>
                <FontAwesomeIcon icon={faThumbsUp} size="2x" className="text-success" />{' '}
              </span>
              <h5 className="d-inline ml-2">Liked Tracks</h5>
            </a>
          </li>
          <li className="nav-item" onClick={e => this.setActiveTab(e, '2')}>
            <a className={this.state.activeTab === '2' ? 'nav-link active' : 'nav-link'} href="# ">
              <FontAwesomeIcon icon={faMusic} size="2x" className="" />
              <h5 className="d-inline ml-2">Created Tracks</h5>
            </a>
          </li>
        </ul>
        {this.state.activeTab === '1' ? (
          <div className="liked-tracks mt-5">
            {this.state.likedTracks.length > 0 ? (
              this.state.likedTracks.map((sound: any) => (
                <div className="row" key={sound._id}>
                  <div className="col-md-12">
                    <div className="card sound-card">
                      <div className="row mb-3">
                        <div className="col-md-12">
                          <h5 className="card-title m-0">
                            {sound.songname} - {sound.moviename}{' '}
                            <span className="text-muted ml-4">- {sound.artistname}</span>
                          </h5>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <audio controls>
                            <source src={`${API.serverUrl}${sound.filepath}`} type="audio/mp3" />
                          </audio>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="row m-5 text-center">
                <div className="col-md-12">
                  <p>Currently You haven't liked any track</p>{' '}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="created-tracks mt-5">
            {this.state.createdTracks.length > 0 ? (
              <div className="row">
                <div className="col-md-12">
                  <a href="# " onClick={e => this.openAddSound(e)} className="float-right">
                    ADD NEW <FontAwesomeIcon icon={faPlus} />
                  </a>{' '}
                </div>
              </div>
            ) : (
              ''
            )}
            {this.state.createdTracks.length > 0 ? (
              this.state.createdTracks.map((sound: any) => (
                <div className="row" key={sound._id}>
                  <div className="col-md-12">
                    <div className="card sound-card mr-0">
                      <div className="row mb-3">
                        <div className="col-md-12">
                          <h5 className="card-title m-0">
                            {sound.songname} - {sound.moviename}{' '}
                            <span className="text-muted ml-4">- {sound.artistname}</span>
                          </h5>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <audio controls>
                            <source src={`${API.serverUrl}${sound.filepath}`} type="audio/mp3" />
                          </audio>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="row m-5 text-center">
                <div className="col-md-12">
                  <p>Currently You haven't created any track</p>
                  <p>
                    <a href="# " onClick={e => this.openAddSound(e)}>
                      CLICK HERE
                    </a>{' '}
                    to add
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
        <AddSound
          open={this.state.showAddSoundModal}
          onClose={this.onModalDismiss}
          classNames={this.state.classNames}
        />
      </div>
    );
  }
}
