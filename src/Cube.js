import React, { Component } from "react";
import Question from "./Question";
import ButtonRedeem from "./ButtonRedeem";
import { Button } from "reactstrap";

class Cube extends Component {
  constructor(props) {
    super();
    this.state = {
      // game state [if active = false disable board]

      currentQuestion: Question.questions[0],
      currentAnswerChoiceBlue: Question.questions[0].blue,
      currentAnswerChoiceOrange: Question.questions[0].orange,
      currentAnswerChoiceYellow: Question.questions[0].yellow,
      currentAnswerChoiceRed: Question.questions[0].red,
      view: -1,
      timerTime: 35,
    };

    this.right = 0;
    this.counter = 0;
    this.colorClicked = null;
    this.myClick = this.myClick.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.noAnswer = this.noAnswer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.reset = this.reset.bind(this);
  }

  reset() {
    this.setState({
      view: -1,
      timerTime: 35,
      colorClicked: null,
      currentQuestion: Question.questions[0],
      currentAnswerChoiceBlue: Question.questions[0].blue,
      currentAnswerChoiceOrange: Question.questions[0].orange,
      currentAnswerChoiceYellow: Question.questions[0].yellow,
      currentAnswerChoiceRed: Question.questions[0].red,
    });
    this.counter = 0;
    this.right = 0;
  }

  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      view: 0,
    });
    this.timer = setInterval(() => {
      const newTime = this.state.timerTime - 1;
      if (newTime >= 0) {
        this.setState({
          timerTime: newTime,
        });
      } else {
        clearInterval(this.timer);
        this.noAnswer();
        if (this.counter < Question.questions.length - 1) {
          this.counter += 1;
          this.setState({
            currentQuestion: Question.questions[this.counter],
            currentAnswerChoiceBlue: Question.questions[this.counter].blue,
            currentAnswerChoiceOrange: Question.questions[this.counter].orange,
            currentAnswerChoiceYellow: Question.questions[this.counter].yellow,
            currentAnswerChoiceRed: Question.questions[this.counter].red,
            timerTime: 35,
          });
          this.startTimer();
        } else if (
          this.counter === Question.questions.length - 1 &&
          this.right !== 10
        ) {
          this.setState({
            timerTime: 0,
            timerOn: false,
            view: 2,
          });
        }
      }
    }, 1000);
  };

  //  grabbing the color clicked and mapping it to colorClicked
  myClick(e) {
    console.log(e.target.id);

    this.colorClicked = e.target.id;
  }
  // I am using bracket notation for this bit ${Question.questions[this.counter][renderAnswer]}
  // so that I can access an object via a string input.

  checkAnswer() {
    let renderAnswer = Question.questions[this.counter].correct;
    const displayAnswer = document.getElementById("display");
    let questionNumber = this.counter;
    questionNumber = questionNumber + 1;
    displayAnswer.innerHTML = `Question ${questionNumber}: 
    ${Question.questions[this.counter].question} - Correct Answer - 
      ${Question.questions[this.counter][renderAnswer]}
    `;
    if (this.counter < Question.questions.length) {
      this.counter += 1;
      if (this.colorClicked === this.state.currentQuestion.correct) {
        this.right += 1;
        console.log("right " + this.right);
      }

      if (this.counter < Question.questions.length) {
        this.setState({
          currentQuestion: Question.questions[this.counter],
          currentAnswerChoiceBlue: Question.questions[this.counter].blue,
          currentAnswerChoiceOrange: Question.questions[this.counter].orange,
          currentAnswerChoiceYellow: Question.questions[this.counter].yellow,
          currentAnswerChoiceRed: Question.questions[this.counter].red,
          timerTime: 35,
        });
      } else if (this.counter === Question.questions.length) {
        this.setState({
          currentQuestion: Question.questions[Question.questions.length - 1],
          currentAnswerChoiceBlue:
            Question.questions[Question.questions.length - 1].blue,
          currentAnswerChoiceOrange:
            Question.questions[Question.questions.length - 1].orange,
          currentAnswerChoiceYellow:
            Question.questions[Question.questions.length - 1].yellow,
          currentAnswerChoiceRed:
            Question.questions[Question.questions.length - 1].red,
          timerTime: 0,
        });
        if (this.right === Question.questions.length) {
          this.setState({ view: 1 });
        } else {
          this.setState({ view: 2 });
        }
      }
      console.log("counter " + this.counter);
    }
  }

  noAnswer() {
    let renderAnswer = Question.questions[this.counter].correct;
    const displayAnswer = document.getElementById("display");
    let questionNumber = this.counter + 1;
    displayAnswer.innerHTML = `Question ${questionNumber}: 
    ${Question.questions[this.counter].question} - Correct Answer - 
      ${Question.questions[this.counter][renderAnswer]}
    `;
  }

  render() {
    // variable to hold states of my view
    let view = this.state.view;

    if (view === -1) {
      return (
        <Button
          color="primary"
          onClick={() => this.startTimer()}
          id="start-game"
        >
          Start Game
        </Button>
      );
    }

    if (view === 0) {
      return (
        <div id="render-cube-class">
          <div id="show-active">
            <div id="start-timer">Time Remaining: {this.state.timerTime}</div>
            <div className="question">
              <div id="answersCorrect">Correct Answers = {this.right}</div>
              <div id="display"></div>
              <span>Question:{this.state.currentQuestion.id}</span>&nbsp;
              {this.state.currentQuestion.question}
            </div>
            <div id="answer">
              <div id="blue-question" className="question">
                {this.state.currentAnswerChoiceBlue}
              </div>
              <div id="orange-question" className="question">
                {this.state.currentAnswerChoiceOrange}
              </div>
              <div id="yellow-question" className="question">
                {this.state.currentAnswerChoiceYellow}
              </div>
              <div id="red-question" className="question">
                {this.state.currentAnswerChoiceRed}
              </div>
            </div>
            <Button
              color="success"
              onClick={(e) => this.checkAnswer(e)}
              id="submit-answer"
            >
              Submit Answer
            </Button>

            <div className="cube">
              <div className="rotating-box">
                <div className="single-rb">
                  <div className="front-side">
                    <div
                      className="grid"
                      onClick={(e) => this.myClick(e)}
                      id="blue"
                    ></div>
                  </div>

                  <div className="back-side">
                    <div
                      className="grid"
                      onClick={(e) => this.myClick(e)}
                      id="orange"
                    ></div>
                  </div>
                  <div className="left-side">
                    <div
                      className="grid"
                      onClick={(e) => this.myClick(e)}
                      id="red"
                    ></div>
                  </div>
                  <div className="right-side">
                    <div
                      className="grid"
                      onClick={(e) => this.myClick(e)}
                      id="yellow"
                    ></div>
                  </div>
                  <div className="top-side"></div>
                  <div className="bottom-side"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (view === 1) {
      return (
        <div>
          <ButtonRedeem right={this.right} reset={this.reset} />

          {/* <Button color="primary" onClick={() => this.reset()} id="reset-game2">
            Reset Game
          </Button> */}
        </div>
      );
    } else {
      return (
        <div className="loserDiv">
          <h1 className="betterLuck">Better Luck Next Time!</h1>
          <h3 className="betterLuck">
            You got {this.right} answers correct! You will need to answer every
            question correctly to receive a prize.
          </h3>
          <Button color="primary" onClick={() => this.reset()} id="reset-game">
            Reset Game
          </Button>
        </div>
      );
    }
  }
}
export default Cube;
