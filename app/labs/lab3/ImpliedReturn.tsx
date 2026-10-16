export default function ImpliedReturn() {
  const multiply = (a: number, b: number) => a * b;
  const square = (n: number): number => n * n;
  const divide = (a: number, b: number) => a / b;
  const fourTimesFive = multiply(4, 5);
  console.log(fourTimesFive);
  return (
    <div id="wd-implied-return">
      <h4>Implied return</h4>
      fourTimesFive = {fourTimesFive}
      <br />
      multiply(4, 5) = {multiply(4, 5)}
      <br />
      square(9) = {square(9)}
      <br />
      divide(4, 5) = {divide(4, 5)}
      <hr />
    </div>
  );
}
