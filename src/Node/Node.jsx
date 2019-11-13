import React, { useState, useEffect } from "react";
import "./Node.css";
// #09d3ac;
const Node = props => {
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [isStart, setStart] = useState(false);
  const [isFinish, setFinish] = useState(false);
  const [isWall, setWall] = useState(false);

  useEffect(() => {
    setCol(props.col);
    setRow(props.row);
    setStart(props.isStart);
    setFinish(props.isFinish);
    setWall(props.isWall);
  }, [props.col, props.row, props.isStart, props.isFinish, props.isWall]);

  const extraClassName = isFinish
    ? "node-finish"
    : isStart
    ? "node-start"
    : isWall
    ? "node-wall"
    : "";

  return (
    <div
      id={`node-${row}-${col}`}
      className={`Node ${extraClassName}`}
      onMouseEnter={() => {
        props.mouseEnter(row, col);
      }}
    ></div>
  );
};

export default Node;
