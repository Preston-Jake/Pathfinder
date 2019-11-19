// visited
// unvisited
// start node
// finish node
// wall
// trapped
// shortest path
//set timeout for
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
    // visited then push
    visited.push(closestNode);
    //if finish then return visited
    if (closestNode === finishNode) return visited;
    updateNeighbors(closestNode, grid, visited);
  }
}

export function getShortestPath(finishNode) {
  const shortestPath = [];
  let currNode = finishNode;
  while (currNode !== null) {
    shortestPath.unshift(currNode);
    currNode = currNode.previousNode;
  }
  return shortestPath;
}

const updateNeighbors = (node, grid, visited) => {
  const neighbors = getNeighbors(node, grid, visited);
  for (const neighbor of neighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
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

const sortNodesByDistance = unvisited => {
  unvisited.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};
