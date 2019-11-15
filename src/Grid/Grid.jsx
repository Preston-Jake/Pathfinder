import React, { useState } from "react";
import Node from "../Node/Node";
import "./Grid.css";
import { dijkstra, getShortestPath } from "../Algorithms /Dijkstra";
// constants  for start and end nodes
const startRow = 5;
const startCol = 5;
const finishRow = 15;
const finishCol = 15;

// creates a Node with both Algorithmic and DOM props
const createNode = (col, row) => {
  return {
    col,
    distance: Infinity,
    row,
    isFinish: row === finishRow && col === finishCol,
    isPath: false,
    isStart: row === startRow && col === startCol,
    isVisited: false,
    isWall: false,
    previousNode: null
  };
};
// create the basic grid structure
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
  // default grid 20 X 20
  let [grid, setGrid] = useState(createGrid(20, 20));
  let [mousePressed, setMousePressed] = useState(false);

  // handle walls
  // needs opitization for on mouse events ****
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

  // visualiser
  const visualizeDijkstra = () => {
    const startNode = grid[startRow][startCol];
    const finishNode = grid[finishRow][finishCol];
    const visitedNodes = dijkstra(grid, startNode, finishNode, setGrid);
    const shortestPath = getShortestPath(finishNode);
    animateDijkstra(visitedNodes, shortestPath);
  };
  //-- working great!
  const animateDijkstra = (visitedNodes, shortestPath) => {
    for (let i = 1; i <= visitedNodes.length; i++) {
      setTimeout(function timer() {
        if (visitedNodes[i] !== undefined) {
          visitedNodes[i].isVisited = true;
          setGrid([...grid]);
          if (visitedNodes[i].isFinish === true) {
            animateShortestPath(shortestPath);
          }
        }
      }, i * 50);
    }
  };
  // shortest path is not rendering css to the DOM
  // seems like the state of the node isn't rendering
  const animateShortestPath = shortestPath => {
    for (let i = 1; i <= shortestPath.length; i++) {
      setTimeout(function timer() {
        if (shortestPath[i] !== undefined) {
          shortestPath[i].isVisited = false;
          shortestPath[i].isPath = true;
          setGrid([...grid]);
        }
      }, i * 50);
    }
  };

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
                const {
                  row,
                  col,
                  isFinish,
                  isStart,
                  isWall,
                  isVisited,
                  isPath
                } = node;
                return (
                  <Node
                    key={nodeIdx}
                    row={row}
                    col={col}
                    isStart={isStart}
                    isFinish={isFinish}
                    isWall={isWall}
                    isVisited={isVisited}
                    isPath={isPath}
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
