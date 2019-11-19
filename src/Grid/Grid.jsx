import React, { useState, useEffect } from "react";
import Node from "../Node/Node";
import "./Grid.css";
import { dijkstra, getShortestPath } from "../Algorithms /Dijkstra";
import { aStar, getShortestPathAstar } from "../Algorithms /A*";

const startRow = 7;
const startCol = 3;
const finishRow = 15;
const finishCol = 15;

const createNode = (row, col) => {
  return {
    col,
    distance: Infinity,
    row,
    isFinish: row === finishRow && col === finishCol,
    isPath: false,
    isStart: row === startRow && col === startCol,
    isVisited: false,
    isWall: false,
    previousNode: null,
    totalCost: Infinity,
    heuristic: Infinity
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
  const [grid, setGrid] = useState(createGrid(20, 20));
  const [mousePressed, setMousePressed] = useState(false);

  const handleMouseDown = (row, col) => {
    setMousePressed(true);
    let node = grid[row][col];
    if (!node.isStart && !node.isFinish) {
      handleToggleWall(row, col);
    }
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
    let node = newGrid[row][col];
    node.isWall = node.isWall ? false : true;
    setGrid(newGrid);
  };

  const visualizeDijkstra = () => {
    const startNode = grid[startRow][startCol];
    const finishNode = grid[finishRow][finishCol];
    const visitedNodes = dijkstra(grid, startNode, finishNode, setGrid);
    const shortestPath = getShortestPath(finishNode);
    animateDijkstra(visitedNodes, shortestPath);
  };

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
      }, i * 30);
    }
  };

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
    const visitedNodes = aStar(grid, startNode, finishNode);
    const shortestPath = getShortestPathAstar(finishNode);
    animateDijkstra(visitedNodes, shortestPath);
  };

  return (
    <div
      className="pathfinder-wrapper"
      onMouseUp={() => setMousePressed(false)}
    >
      <button
        onClick={() => {
          visualizeDijkstra();
        }}
      >
        visualizeDijkstra
      </button>
      <button
        onClick={() => {
          visualizeAStar();
        }}
      >
        visualize AStar
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
