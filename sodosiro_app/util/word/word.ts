export function hasBatchim(word: string) {
  if (!word) return false;

  const lastChar = word.charCodeAt(word.length - 1);

  // 한글이 아니면 받침 없음으로 처리
  if (lastChar < 0xac00 || lastChar > 0xd7a3) {
    return false;
  }

  return (lastChar - 0xac00) % 28 !== 0;
}
