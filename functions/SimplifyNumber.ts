export function simplifyNumbers(number: number): string {
  if (number > 1e6) {
    return number.toExponential(3);
  } else if (number < 100) {
    return (Math.floor(number * 100) / 100).toString();
  } else {
    return Math.floor(number).toString();
  }
}
