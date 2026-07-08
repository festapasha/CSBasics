const MOVES = [
  [2, 1],
  [2, -1],
  [-2, 1],
  [-2, -1],
  [1, 2],
  [1, -2],
  [-1, 2],
  [-1, -2],
];

function getPossibleMoves([x, y]) {
  const moves = [];

  for (const [dx, dy] of MOVES) {
    const newX = x + dx;
    const newY = y + dy;

    if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
      moves.push([newX, newY]);
    }
  }

  return moves;
}

export function knightMoves(start, end) {
  // Queue stores both the current position and
  // the path taken to reach that position.
  const queue = [
    {
      position: start,
      path: [start],
    },
  ];

  // Keep track of visited squares
  const visited = new Set();
  visited.add(start.toString());

  while (queue.length > 0) {
    const current = queue.shift();
    const [x, y] = current.position;

    // Destination reached
    if (x === end[0] && y === end[1]) {
      console.log(
        `You made it in ${current.path.length - 1} moves! Here's your path:`
      );

      current.path.forEach((square) => console.log(square));

      return current.path;
    }

    // Explore all legal knight moves
    const nextMoves = getPossibleMoves(current.position);

    for (const move of nextMoves) {
      const key = move.toString();

      if (!visited.has(key)) {
        visited.add(key);

        queue.push({
          position: move,
          path: [...current.path, move],
        });
      }
    }
  }

  return null;
}