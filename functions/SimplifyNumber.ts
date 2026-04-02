export function simplifyNumbers(number: number): string {
  "worklet";

  if (number >= 1e6) {
    return number.toExponential(3);
  }

  if (number < 100) {
    return (Math.floor(number * 100) / 100).toString();
  }

  const int = Math.floor(number);
  const str = int.toString();

  if (int >= 1000) {
    const len = str.length;
    return str.slice(0, len - 3) + " " + str.slice(len - 3);
  }

  return str;
}
