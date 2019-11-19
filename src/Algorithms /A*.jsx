export function aStar(grid, startNode, finishNode) {
  const visited = [];
  const unvisited = getUnvisitedNodes(grid);
  startNode.distance = 0;
  startNode.totalCost = 0;
  while (!!unvisited.length) {
    sortNodesByCost(unvisited);
    const closestNode = unvisited.shift();
    // encounter a wall
    if (closestNode.isWall) continue;
    //if closest node is Infinity then trapped
    if (closestNode.distance === Infinity) return visited;
    // visited then push
    visited.push(closestNode);
    //if finish then return visited
    if (closestNode === finishNode) return visited;
    updateNeighbors(closestNode, grid, visited, finishNode);
  }
}
const sortNodesByCost = unvisited => {
  unvisited.sort((nodeA, nodeB) => nodeA.totalCost - nodeB.totalCost);
};

const updateNeighbors = (node, grid, visited, finishNode) => {
  const neighbors = getNeighbors(node, grid, visited);
  for (const neighbor of neighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
    neighbor.heuristic = getHeuristic(neighbor, finishNode);
    neighbor.totalCost = neighbor.heuristic + neighbor.distance;
    neighbor.previousNode = node;
  }
  return neighbors;
};

const getHeuristic = (node, finishNode) => {
  let heuristic = 0;
  const { row, col } = node;
  const a = Math.pow(finishNode.row - row, 2);
  const b = Math.pow(finishNode.col - col, 2);
  heuristic = a + b;
  return heuristic;
};

const getNeighbors = (node, grid, visited) => {
  let neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => {
    let bool = visited.includes(neighbor);
    if (bool === false) return neighbor;
  });
};

const getUnvisitedNodes = grid => {
  let nodes = [];
  for (let row of grid) {
    for (let node of row) {
      nodes.push(node);
    }
  }
  return nodes;
};

export function getShortestPathAstar(finishNode) {
  const shortestPath = [];
  let currNode = finishNode;
  while (currNode !== null) {
    shortestPath.unshift(currNode);
    currNode = currNode.previousNode;
  }
  return shortestPath;
}
