import React, { Component } from "react";
import "./App.css";
import Prize from "./Prize";
import axios from "axios";
import TMDB from "./TMDB";
import { Button } from "reactstrap";

class ButtonRedeem extends Component {
  constructor(props) {
    super();
    this.state = {
      movie: null,
      view: 1,
      title: null,
    };
    this.fetchPrizeClick = this.fetchPrizeClick.bind(this);
  }

  fetchPrizeClick() {
    console.log("fetchPrizeClick Button Works!");
    // const url = `https://api.themoviedb.org/3/movie/${film}?api_key=${TMDB.api_key}&append_to_response=videos,images&language=en`;
    const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB.api_key}&append_to_response=videos,images&language=en`;
    axios({
      method: "GET",
      url: url,
    }).then((response) => {
      console.log(response); // take a look at what you get back!
      console.log("title = " + response.data.results[0].title);
      let posterLink = "https://image.tmdb.org/t/p/w780";
      let randomImg = Math.floor(Math.random() * 19);

      let imgPath = posterLink + response.data.results[randomImg].poster_path;
      let title = response.data.results[randomImg].title;
      this.setState({
        movie: imgPath,
        view: 2,
        title: title,
      });
    });
  }
  //   will later pass the movie api to Prize
  render() {
    if (this.state.view === 1) {
      return (
        <div>
          <Button
            color="primary"
            onClick={() => this.fetchPrizeClick()}
            className="button"
          >
            Redeem Your Prize!!!
          </Button>
          <h3>
            You got {this.props.right} answers correct! Click the redeem button
            to receive a prize.
          </h3>
        </div>
      );
    } else {
      return (
        <div>
          <Prize
            movie={this.state.movie}
            title={this.state.title}
            reset={this.props.reset}
          />
        </div>
      );
    }
  }
}

export default ButtonRedeem;
