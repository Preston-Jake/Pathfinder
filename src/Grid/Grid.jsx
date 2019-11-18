import React, { useState } from "react";
import Node from "../Node/Node";
import "./Grid.css";
import { dijkstra, getShortestPath } from "../Algorithms /Dijkstra";
import { aStar } from "../Algorithms /A*";

// create a function that where you can move the stat  and end node by dragging it

// optimize the speed == refactor to many rendering of the grid

// instead of rendering the grid figure out a way to just render the node

// work on more Algorithms

// fix where the rows are actually rows

//when I place to many walls the function will not run

//TODO
//1. Fix Mouse inputs
//2. Movable start and finish nodes on drag
//3. optimize the render method to render the child node and not the parent
//4. clear grid

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
  let [grid, setGrid] = useState(createGrid(20, 20));
  let [mousePressed, setMousePressed] = useState(false);

  const handleMouseDown = (row, col) => {
    setMousePressed(true);
    let node = grid[row][col];
    if (!node.isStart && !node.isFinish) {
      handleToggleWall(row, col);
    }
  };

  const handleMouseUp = () => {
    setMousePressed(false);
  };

  const handleMouseEnter = (row, col) => {
    let node = grid[row][col];
    if (mousePressed && !node.isStart && !node.isFinish) {
      handleToggleWall(row, col);
    }
  };

  const handleMouseLeave = (row, col) => {
    let node = grid[row][col];
    return node;
  };

  const handleToggleWall = (row, col) => {
    let newGrid = [...grid];
    let node = newGrid[col][row];
    node.isWall = node.isWall ? false : true;
    setGrid(newGrid);
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
    for (let i = 0; i <= visitedNodes.length; i++) {
      setTimeout(function timer() {
        if (visitedNodes[i] !== undefined) {
          visitedNodes[i].isVisited = true;
          setGrid([...grid]);
          if (visitedNodes[i].isFinish === true) {
            animateShortestPath(shortestPath);
          }
        }
      }, i * 20);
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

  const visualizeAStar = () => {
    const startNode = grid[startRow][startCol];
    const finishNode = grid[finishRow][finishCol];
    aStar(grid, startNode, finishNode);
    // const visitedNodes = dijkstra(grid, startNode, finishNode, setGrid);
    // const shortestPath = getShortestPath(finishNode);
    // animateDijkstra(visitedNodes, shortestPath);
  };

  return (
    <div className="pathfinder-wrapper" onMouseUp={() => handleMouseUp()}>
      <button
        onClick={() => {
          visualizeDijkstra();
        }}
      >
        visualizeDijkstra
      </button>

      <div className="Grid">
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
                    mouseDown={handleMouseDown}
                    mouseEnter={handleMouseEnter}
                    mouseLeave={handleMouseLeave}
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
