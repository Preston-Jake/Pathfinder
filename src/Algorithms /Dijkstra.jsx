// visited
// unvisited
// start node
// finish node
// wall
// trapped
// shortest path

export default function dijkstra(grid) {
  let unvisited = getUnvisitedNodes(grid);

  let visited = [];
  let startNode;
  let finishNode;

  //get all unvisited nodes in the grid
}
const getUnvisitedNodes = grid => {
  let nodes = [];
  for (let row of grid) {
    for (let node of row) {
      nodes.push(node);
    }
  }
  return nodes;
};
