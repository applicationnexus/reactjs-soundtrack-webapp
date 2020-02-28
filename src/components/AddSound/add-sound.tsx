import React from 'react';
import Modal from 'react-responsive-modal';
import SoundService from '../../services/SoundService/sound-service';
interface Props {
  open: boolean;
  onClose(): void;
  classNames: object;
}
interface State {
  songname: string;
  moviename: string;
  artistname: string;
  filepath: Blob;
  formValid: Boolean;
  errors: {
    songname: string;
    moviename: string;
    artistname: string;
    filepath: string;
  };
}
export default class AddSound extends React.Component<Props> {
  state = {
    songname: '',
    moviename: '',
    artistname: '',
    filepath: '',
    formValid: false,
    errors: {
      songname: '',
      moviename: '',
      artistname: '',
      filepath: '',
    },
  };

  /**
   * @description - Function to handle the close event of add sound modal
   */
  setModalClose = () => {
    this.props.onClose();
  };

  /**
   * @description - Function to handle the change of input element and set errors array
   * @param event - Input element event data to perform action on
   */
  handleChange = (event: any) => {
    this.setState({
      formValid: true,
    });
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
     * Switch case to check every form element validation and set the errors message
     */
    switch (id) {
      case 'songname':
        errors.songname = value === '' ? 'Songname is required' : '';
        break;
      case 'moviename':
        errors.moviename = value === '' ? 'Moviename is required' : '';
        break;
      case 'artistname':
        errors.artistname = value === '' ? 'Artistname is required' : '';
        break;
      case 'filepath':
        errors.filepath = value === '' ? 'Please upload sound file' : '';
        break;
    }
    /**
     * Setting error state for form element
     */
    this.setState({ errors, [name]: inputValue });
  };

  componentDidMount() {
    console.log(this.props);
  }

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
   * @description - Function to submit the add sound form
   * @param event - form event data
   */
  addSoundOnSubmit = async (event: any) => {
    event.preventDefault();
    if (this.validateForm(this.state.errors) && this.state.formValid) {
      /**
       * Get user data from local storage to pass user id with sound data
       */
      const userData = JSON.parse(window.localStorage.getItem('user') || '{}');
      const soundData = {
        userid: userData.user_id,
        songname: this.state.songname,
        moviename: this.state.moviename,
        artistname: this.state.artistname,
        fileData: `/${this.state.filepath}`,
      };
      console.log('soundData', soundData);

      const response = await SoundService.addNewSound(soundData);
      console.log('response', response);

      if (response.status === 200) {
        this.setModalClose();
        // window.location.reload();
      }
    } else {
      this.setState({
        showModalMessage: true,
        modalMessage: 'Please mark with * are required',
      });
    }
  };

  /**
   * @description - Function to upload the sound file on input file change
   * @param e - event data
   */
  uploadFile = async (e: any) => {
    const filename = this.state.songname;
    const fileData = e.target.files[0];
    fileData.filename = filename;
    console.log(fileData);
    const formData = new FormData();
    formData.append('file', fileData);
    const res = await SoundService.uploadSound(formData);
    if (res.data.code === 200) {
      this.state.filepath = res.data.data.filename;
    }
    console.log('filepath', this.state.filepath);
  };

  render() {
    return (
      <Modal open={this.props.open} onClose={this.setModalClose} classNames={this.props.classNames}>
        <div className="add-sound w-100 p-5">
          <h5 className="text-center">Add Your Sound</h5>
          <hr />
          <form onSubmit={this.addSoundOnSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="songname">Song name</label>
              <input
                type="text"
                className="form-control"
                id="songname"
                aria-describedby="emailHelp"
                onChange={this.handleChange}
                value={this.state.songname}
              />
              {this.state.errors.songname ? (
                <div className="alert alert-danger" role="alert">
                  {this.state.errors.songname}
                </div>
              ) : (
                ''
              )}
            </div>

            <div className="form-group">
              <label htmlFor="moviename">Movie name</label>
              <input
                type="text"
                className="form-control"
                id="moviename"
                aria-describedby="emailHelp"
                onChange={this.handleChange}
                value={this.state.moviename}
              />
              {this.state.errors.moviename ? (
                <div className="alert alert-danger" role="alert">
                  {this.state.errors.moviename}
                </div>
              ) : (
                ''
              )}
            </div>

            <div className="form-group">
              <label htmlFor="artistname">Artist name</label>
              <input
                type="text"
                className="form-control"
                id="artistname"
                aria-describedby="emailHelp"
                onChange={this.handleChange}
                value={this.state.artistname}
              />
              {this.state.errors.artistname ? (
                <div className="alert alert-danger" role="alert">
                  {this.state.errors.artistname}
                </div>
              ) : (
                ''
              )}
            </div>

            <div className="form-group">
              <label htmlFor="filepath">Upload File</label>
              <input
                type="file"
                className="form-control"
                id="filepath"
                aria-describedby="emailHelp"
                onChange={this.uploadFile}
              />
              {this.state.errors.filepath ? (
                <div className="alert alert-danger" role="alert">
                  {this.state.errors.filepath}
                </div>
              ) : (
                ''
              )}
            </div>
            <div className="row">
              <div className="col-md-4 offset-md-4">
                <button
                  type="submit"
                  className="btn btn-primary text-center"
                  style={{ backgroundColor: '#2d2b55' }}
                >
                  ADD
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    );
  }
}
