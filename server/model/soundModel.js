const schema = require('./schema');

class Sounds {
  /**
   * @description - This function is used to get the all sounds from database
   */
  async getSoundList(userid) {
    const userSounds = await this.getUserSounds(userid);
    const soundData = await schema.sounds.find({
      user_id: '1',
    });
    let result = [];
    if (userSounds.length > 0) {
      result = soundData.concat(userSounds);
    } else {
      result = soundData;
    }
    console.log(result);

    return result;
  }

  /**
   * @description - Searches the particular sound in the database
   * @param {*} searchData
   */
  searchSoundList(searchData) {
    const soundData = schema.sounds.find({
      songname: {
        $regex: searchData.searchTerm,
        $options: 'i',
      },
    });
    return soundData;
  }

  /**
   * @description - Function to add new sound in a database
   * @param {*} soundData - sound data to be insert
   */
  addNewSound(soundData) {
    console.log(soundData);
    const result = new schema.sounds({
      user_id: soundData.userid,
      songname: soundData.songname,
      moviename: soundData.moviename,
      artistname: soundData.artistname,
      filepath: soundData.fileData,
    });
    return result;
  }

  /**
   * @description - Function to get user added sounds from database
   * @param {*} userid - id of the user
   */
  getUserSounds(userid) {
    const soundData = schema.sounds.find({
      user_id: userid,
    });
    return soundData;
  }
}
module.exports = Sounds;
