// visited
// unvisited
// start node
// finish node
// wall
// trapped
// shortest path

export function dijkstra(grid, startNode, finishNode) {
  let unvisited = getUnvisitedNodes(grid);
  startNode.distance = 0;
  let visited = [];
  while (!!unvisited.length) {
    sortNodesByDistance(unvisited);
    const closestNode = unvisited.shift();
    // encounter a wall
    if (closestNode.isWall) continue;
    //if closest node is Infinity then trapped
    if (closestNode.distance === Infinity) return visited;
    closestNode.isVisited = true;
    // visited then push
    visited.push(closestNode);
    //if finish then return visited
    if (closestNode === finishNode) return visited;
    updateNeighbors(closestNode, grid);
  }
}

export function getShortestPath(finishNode) {
  const shortestPath = [];
  let currNode = finishNode;
  while (currNode !== null) {
    shortestPath.unshift(currNode);
    currNode = currNode.previousNode;
  }
  console.log(shortestPath);
  return shortestPath;
}

const updateNeighbors = (node, grid) => {
  const neighbors = getNeighbors(node, grid);
  for (const neighbor of neighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
};

const getNeighbors = (node, grid) => {
  let neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[col][row - 1]);
  if (row < grid.length - 1) neighbors.push(grid[col][row + 1]);
  if (col > 0) neighbors.push(grid[col - 1][row]);
  if (col < grid[0].length - 1) neighbors.push(grid[col + 1][row]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
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

const sortNodesByDistance = unvisited => {
  unvisited.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};
