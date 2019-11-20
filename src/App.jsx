import React, { useState } from "react";
import "./App.css";
import Grid from "./Grid/Grid";
function App() {
  const [startRow, setStartRow] = useState(5);
  const [startCol, setStartCol] = useState(5);
  const [finishRow, setFinishRow] = useState(15);
  const [finishCol, setFinishCol] = useState(15);

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

  const handleCreateGrid = (rows, cols) => {
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
  return (
    <div className="App">
      <Grid
        createGrid={handleCreateGrid}
        startRow={startRow}
        startCol={startCol}
        finishRow={finishRow}
        finishCol={finishCol}
      />
    </div>
  );
}

export default App;
