import React from 'react';
import SoundService from '../../services/SoundService/sound-service';
import Sound from '../../models/sound';
import { API } from '../../config/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import AlertMessages from '../AlertMessages/alert-messages';
interface State {
  soundData: Array<Sound>;
  searchTerm: string;
  likedTracks: Array<Sound>;
  modalMessage: String;
  showModalMessage: Boolean;
}

export default class Home extends React.Component {
  state = {
    soundData: [],
    searchTerms: '',
    likedTracks: [],
    modalMessage: '',
    showModalMessage: false,
  };

  /**
   * @description - Get the sound data when component finished mounting
   */
  componentDidMount() {
    this.getSoundData();
  }

  /**
   * @description - Function to get the sound list from database
   */
  getSoundData = async () => {
    const response = await SoundService.getSoundList();
    const data = response.data.data;
    const likedSoundData = JSON.parse(window.localStorage.getItem('LikedTracks') || '[]');
    if (likedSoundData.length > 0) {
      /**
       * Map throught sound data to set the liked sound flag
       */
      data.map((sound: Sound) => {
        const found = likedSoundData.some((el: Sound) => el._id === sound._id);
        if (found) {
          sound.isLiked = true;
        } else {
          sound.isLiked = false;
        }
      });
    } else {
      data.map((sound: Sound) => {
        sound.isLiked = false;
      });
    }
    /**
     * Setting the sound data to the state
     */
    this.setState({
      soundData: response.data.data,
    });
    console.log('soundData', this.state.soundData);
  };

  /**
   * @description - Function handle the change event of search field and return the search sound result
   * @param event - event data
   */
  handleChange = async (event: any) => {
    const input = event.target;
    const value = input.value;
    /**
     * Set the search value in the states
     */
    this.setState({
      searchTerms: value,
    });
    const searchData = {
      searchTerm: this.state.searchTerms,
    };
    /**
     * Make an http call to get the searched sound data
     */
    const response = await SoundService.searchSoundList(searchData);
    if (response.data.data.length > 0) {
      /**
       * Set the sound data to state variable
       */
      this.setState({
        soundData: response.data.data,
      });
    }
  };

  /**
   * @description - Function to add the a sound to liked list
   * @param sound - sound data to be add in liked list
   */
  addTrackToLikedList = (sound: Sound) => {
    this.state.soundData.map((soundElm: Sound) => {
      if (sound._id === soundElm._id && !soundElm.isLiked) {
        soundElm.isLiked = true;
        /**
         * Get the already liked tracks from local storage and push the new track to existing array
         */
        const likedTracks = JSON.parse(window.localStorage.getItem('LikedTracks') || '[]');
        likedTracks.push(sound);
        window.localStorage.setItem('LikedTracks', JSON.stringify(likedTracks));
        this.setState({
          showModalMessage: true,
          modalMessage: 'Track Added to Like List',
        });
      } else if (sound._id === soundElm._id) {
        /**
         * Set liked flag to false to display black icon
         */
        soundElm.isLiked = false;
        this.removeTrackFromLikeList(sound);
        this.setState({
          showModalMessage: true,
          modalMessage: 'Removed track from Like List',
        });
      }
    });
  };

  /**
   * @description - Function to dismiss the alert message window on button click
   */
  onModalMessageDismiss = () => {
    this.setState({
      showModalMessage: false,
    });
  };

  /**
   * @description - Removed track from local storage when unlike the track
   * @param sound - sound data to perform operation on
   */
  removeTrackFromLikeList = (sound: Sound) => {
    const likedTracks = JSON.parse(window.localStorage.getItem('LikedTracks') || '[]');
    const res = likedTracks.filter((elm: any) => {
      return sound._id !== elm._id;
    });
    window.localStorage.setItem('LikedTracks', JSON.stringify(res));
  };

  render() {
    return (
      <div className="container">
        <div className="searchbar text-center">
          <form className="form-inline my-2 my-lg-0 card border-0">
            <div className="row w-100">
              <div className="col-md-12">
                <input
                  className="form-control mr-sm-2 w-100"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={this.state.searchTerms}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </form>
        </div>
        <div className="soundlist mt-5">
          {this.state.soundData.length > 0 ? (
            this.state.soundData.map((sound: any) => (
              <div className="row" key={sound._id}>
                <div className="col-md-12">
                  <div className="card sound-card">
                    <div className="row align-items-center">
                      <div className={`col-md-2 thumb-div ${sound.isLiked ? 'green' : ''}`}>
                        <FontAwesomeIcon
                          icon={faThumbsUp}
                          size="2x"
                          onClick={() => this.addTrackToLikedList(sound)}
                          color={sound.isLiked ? 'green' : ''}
                        />
                      </div>
                      <div className="col-md-5">
                        <h5 className="card-title m-0">
                          {sound.songname} - {sound.moviename}
                        </h5>
                        <div className="row">
                          <div className="col-md-12">
                            <p className="text-muted m-0">{sound.artistname}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-5">
                        <audio controls>
                          <source src={`${API.serverUrl}${sound.filepath}`} type="audio/mp3" />
                        </audio>
                      </div>
                    </div>
                  </div>
                </div>
                <AlertMessages
                  msgTitle={this.state.modalMessage}
                  showModal={this.state.showModalMessage}
                  onClose={this.onModalMessageDismiss}
                />
              </div>
            ))
          ) : (
            <span />
          )}
        </div>
      </div>
    );
  }
}
