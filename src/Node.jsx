import React, { useState } from "react";
import "./Node.css";
// #09d3ac;
const Node = () => {
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [isVisited, setVisited] = useState(false);
  const [isStart, setStart] = useState(false);
  const [isFinish, setFinish] = useState(false);
  const [isWall, setWall] = useState(false);

  const extraClassName = isFinish
    ? "node-finish"
    : isStart
    ? "node-start"
    : isWall
    ? "node-wall"
    : "";

  return (
    <div id={`node-${row}-${col}`} className={`Node ${extraClassName}`}></div>
  );
};

export default Node;
