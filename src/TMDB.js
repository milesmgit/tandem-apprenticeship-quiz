import dotenv from "dotenv";
dotenv.config();

const TMDB = {
  api_key: process.env.REACT_APP_TMDB,
};

export default TMDB;
