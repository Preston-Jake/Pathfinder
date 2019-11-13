// visited
// unvisited
// start node
// finish node
// wall
// trapped
// shortest path

export default function dijkstra(grid, startNode, finishNode) {
  let unvisited = getUnvisitedNodes(grid);
  startNode.distance = 0;
  console.log(startNode);
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
    updateNeighbors(closestNode, grid);
  }
}

const updateNeighbors = (node, grid) => {
  const neighbors = getNeighbors(node, grid);
  for (const neighbor of neighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
};

const getNeighbors = (node, grid) => {
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (row < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
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
