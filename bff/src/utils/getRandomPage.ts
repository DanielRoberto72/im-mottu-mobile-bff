export function getRandomPage(max = 42): number {
  return Math.floor(Math.random() * max) + 1;
}
