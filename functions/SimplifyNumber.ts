export function simplifyNumbers(number: number): string {
  if (number >= 1e6) {
    return number.toExponential(3);
  } else if (number < 100) {
    return (Math.floor(number * 100) / 100).toString();
  } else {
    let string = Math.floor(number).toString();

    if (number > 1000) {
      string = [
        string.slice(0, string.length - 3),
        " ",
        string.slice(string.length - 3),
      ].join("");
    }
    return string;
  }
}
