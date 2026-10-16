export default function VariablesAndConstants() {
  // eslint-disable-next-line no-var
  var functionScoped = 2;
  // eslint-disable-next-line prefer-const
  let blockScoped = 5;
  // eslint-disable-next-line prefer-const
  let name = "Zhenming Gao";
  const greeting = `Helloo ${name}!`;
  const constant1 = functionScoped - blockScoped;
  const sampleSum = functionScoped + blockScoped;
  return (
    <div id="wd-variables-and-constants">
      <h4>Variables and Constants</h4>
      functionScoped = {functionScoped}
      <br />
      blockScoped = {blockScoped}
      <br />
      constant1 = {constant1}
      <br />
      name = {name}
      <br />
      greeting = {greeting}
      <br />
      sampleSum = {sampleSum}
      <hr />
    </div>
  );
}
