import React from "react";
import Node from "./Node";
import "./Grid.css";
const Grid = () => {
  const createGrid = (rows, cols) => {
    let grid = [];
    for (let row = 0; row < rows; row++) {
      let currRow = [];
      for (let col = 0; col < cols; col++) {
        currRow.push(col);
      }
      grid.push(currRow);
    }
    return grid;
  };

  let renderGrid = createGrid(25, 25);

  return (
    <div className="Grid">
      {renderGrid.map((row, rowIdx) => {
        return (
          <div key={rowIdx} className="Row">
            {row.map((col, colIdx) => {
              return (
                <Node row={rowIdx} col={colIdx} key={colIdx} isStart={true} />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
