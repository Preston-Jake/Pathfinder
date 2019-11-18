export function aStar(grid, startNode, finishNode) {
  const visited = [];
  const unvisited = getUnvisitedNodes(grid);
  startNode.distance = 0;
  startNode.totalCost = 0;

  while (!!unvisited.length) {}
}
// const sortNodesByDistance = unvisited => {
//   unvisited.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
// };

const getNodesTotalCost = () => {};

const getUnvisitedNodes = grid => {
  let nodes = [];
  for (let row of grid) {
    for (let node of row) {
      nodes.push(node);
    }
  }
  return nodes;
};
