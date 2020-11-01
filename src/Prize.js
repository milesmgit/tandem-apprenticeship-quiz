import React from "react";
import { Button } from "reactstrap";
import "./Prize.css";

const Prize = (props) => {
  return (
    <div className="image-div">
      <Button color="primary" onClick={() => props.reset()} id="reset-game2">
        Reset Game
      </Button>
      <img src={props.movie} alt={props.title} />
    </div>
  );
};
export default Prize;
