import React, { Component } from "react";
import "./App.css";
import Cube from "./Cube";
import Question from "./Question";
import Instructions from "./Instructions";
import Trending from "./Trending";

// this bit is to use routing; need to do a npm install react-router-dom
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// note to self: I need npm install dotenv for a local environment;  I also need a .env.local file in my root
// folder.
// note to self:  npm install axios if I'm going to make calls to axios for api or whatever.
class App extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    console.log(Question.questions[0].question);
    return (
      <Router>
        {/* place link tags inside the Router Tags */}
        <nav>
          <Link to="/tandem-apprenticeship-quiz/">Play Noobx Cube</Link>
          <Link to="/trending">Trending</Link>
          <Link to="/instructions">Instructions</Link>
        </nav>
        {/* passing props inside the router */}
        <div>
          <Route path="/trending" component={Trending} />
          {/* <Route exact path="/" component={ () =>  <Cube />} /> */}
          <Route exact path="/tandem-apprenticeship-quiz/" component={Cube} />
          <Route path="/instructions" component={Instructions} />
        </div>
      </Router>
    );
  }
}

export default App;
