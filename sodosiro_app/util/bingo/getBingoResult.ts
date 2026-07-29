export function getBingoResult(bingoItems: BingoItem[]): BingoResult {
  const completedPositions = bingoItems
    .filter((item) => item.completed)
    .map((item) => item.position);

  // 3x3 빙고 라인
  const lines = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],

    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],

    [1, 5, 9],
    [3, 5, 7],
  ];

  const completedLines = lines.filter((line) =>
    line.every((position) => completedPositions.includes(position)),
  );

  return {
    completedLines: completedLines.length,
    isBingo: completedLines.length > 0,
    completedPositions: completedLines,
  };
}
