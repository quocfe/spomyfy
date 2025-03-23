export function calculateSongTime(seconds: number): string {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}
