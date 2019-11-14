import React, { useState, useEffect } from "react";
import "./Node.css";
// #09d3ac;
const Node = props => {
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [isStart, setStart] = useState(false);
  const [isFinish, setFinish] = useState(false);
  const [isWall, setWall] = useState(false);
  const [isVisited, setVisited] = useState(false);

  useEffect(() => {
    setCol(props.col);
    setRow(props.row);
    setStart(props.isStart);
    setFinish(props.isFinish);
    setWall(props.isWall);
    setVisited(props.isVisited);
  }, [
    props.col,
    props.row,
    props.isStart,
    props.isFinish,
    props.isWall,
    props.isVisited
  ]);

  const extraClassName = isFinish
    ? "node-finish"
    : isStart
    ? "node-start"
    : isWall
    ? "node-wall"
    : isVisited
    ? "node-visited"
    : "";

  return (
    <div
      className={`Node ${extraClassName}`}
      onMouseEnter={() => {
        props.mouseEnter(row, col);
      }}
    ></div>
  );
};

export default Node;
