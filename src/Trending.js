import React, { Component } from "react";
import TMDB from "./TMDB";
import axios from "axios";

class Trending extends Component {
  constructor() {
    super();
    this.state = {
      trending: [],
    };
    this.showTrending = this.showTrending.bind(this);
  }

  // this is a way to load a method when the component loads, or mounts;
  // bind the method to the class
  componentDidMount() {
    console.log("component Did mount");
    this.showTrending();
  }

  showTrending() {
    // const url = `https://api.themoviedb.org/3/movie/${film}?api_key=${TMDB.api_key}&append_to_response=videos,images&language=en`;
    const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB.api_key}&append_to_response=videos,images&language=en`;
    axios({
      method: "GET",
      url: url,
    }).then((response) => {
      console.log(response.data.results); // take a look at the array you get back!
      this.setState({
        trending: response.data.results,
      });
    });
  }
  render() {
    let posterLink = "https://image.tmdb.org/t/p/w780";
    let trendingFilms = this.state.trending.map((film, index) => {
      return (
        <img src={posterLink + film.poster_path} alt={film.title} key={index} />
      );
    });
    return (
      <div className="about">
        <h1 id="trending">Trending</h1>
        {trendingFilms}
      </div>
    );
  }
}

export default Trending;
