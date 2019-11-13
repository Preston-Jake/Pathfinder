import React, { useState, useEffect } from "react";
import Node from "../Node/Node";
import "./Grid.css";
import dijkstra from "../Algorithms /Dijkstra";

// TODO* create handler for choosing start and finish node
const startRow = 5;
const startCol = 5;
const finishRow = 15;
const finishCol = 15;

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === startRow && col === startCol,
    isFinish: row === finishRow && col === finishCol,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null
  };
};

const createGrid = (rows, cols) => {
  let grid = [];
  for (let row = 0; row < rows; row++) {
    let currRow = [];
    for (let col = 0; col < cols; col++) {
      currRow.push(createNode(row, col));
    }
    grid.push(currRow);
  }
  return grid;
};

const Grid = () => {
  let [grid, setGrid] = useState(createGrid(20, 20));
  let [mousePressed, setMousePressed] = useState(false);

  const handleToggleWall = (row, col) => {
    let newGrid = [...grid];
    let node = newGrid[col][row];
    node.isWall = node.isWall ? false : true;
    setGrid(newGrid);
  };

  const handleMouseDown = () => {
    setMousePressed(true);
  };
  const handleMouseUp = () => {
    setMousePressed(false);
  };
  const handleMouseEnter = (row, col) => {
    if (mousePressed) {
      handleToggleWall(row, col);
    }
  };

  dijkstra(grid);

  return (
    <div
      className="Grid"
      onMouseDown={() => {
        handleMouseDown();
      }}
      onMouseUp={() => {
        handleMouseUp();
      }}
    >
      {grid.map((row, rowIdx) => {
        return (
          <div key={rowIdx} className="Row">
            {row.map((node, nodeIdx) => {
              const { row, col, isFinish, isStart, isWall } = node;
              return (
                <Node
                  key={nodeIdx}
                  row={row}
                  col={col}
                  isStart={isStart}
                  isFinish={isFinish}
                  isWall={isWall}
                  mouseEnter={handleMouseEnter}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
