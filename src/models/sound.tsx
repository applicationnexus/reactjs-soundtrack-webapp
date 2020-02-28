export default interface Sound {
  _id?: string;
  songname: string;
  moviename: string;
  artistname: string;
  filepath?: string;
  fileData?: object;
  isLiked?: boolean;
}
