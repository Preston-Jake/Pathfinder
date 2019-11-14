import React, { useState } from "react";
import Node from "../Node/Node";
import "./Grid.css";
import { dijkstra, getShortestPath } from "../Algorithms /Dijkstra";

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

  //handling walls Optimization
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
  // optmize visualizer

  const visualizeDijkstra = () => {
    const startNode = grid[startRow][startCol];
    const finishNode = grid[finishRow][finishCol];
    const visitedNodes = dijkstra(grid, startNode, finishNode, setGrid);
    const shortestPath = getShortestPath(finishNode);
    animateDijkstra(visitedNodes, shortestPath);
  };

  // working render
  // setTimeOut for animation
  const animateDijkstra = (visitedNodes, shortestPath) => {
    for (let node of visitedNodes) {
      node.isVisited = true;
      setGrid([...grid]);
    }
  };

  const animateShortestPath = nodesInShortestPathOrder => {};

  return (
    <div className="pathfinder-wrapper">
      <button
        onClick={() => {
          visualizeDijkstra();
        }}
      >
        visualizeDijkstra
      </button>
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
                const { row, col, isFinish, isStart, isWall, isVisited } = node;
                return (
                  <Node
                    key={nodeIdx}
                    row={row}
                    col={col}
                    isStart={isStart}
                    isFinish={isFinish}
                    isWall={isWall}
                    isVisited={isVisited}
                    mouseEnter={handleMouseEnter}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Grid;
