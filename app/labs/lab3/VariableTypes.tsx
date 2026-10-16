/* eslint-disable prefer-const */
export default function VariableTypes() {
  let numberVariable = 123;
  let floatingPointNumber = 234.345;
  let stringVariable = "Hello World!";
  let booleanVariable = true;
  const [string2, bool2] = ["string2", false];
  let isNumber = typeof numberVariable;
  let isString = typeof stringVariable;
  let isBoolean = typeof booleanVariable;
  const [isString2, isBool2] = [typeof string2, typeof bool2];
  let sampleCount = 42;
  let sampleLabel = "Lab 3";
  let sampleCountT = typeof sampleCount;
  let sampleLabelT = typeof sampleLabel;
  return (
    <div id="wd-variable-types">
      <h4>Variables Types</h4>
      numberVariable = {numberVariable}
      <br />
      floatingPointNumber = {floatingPointNumber}
      <br />
      stringVariable = {stringVariable}
      <br />
      booleanVariable = {booleanVariable + ""}
      <br />
      isNumber = {isNumber}
      <br />
      isString = {isString}
      <br />
      isBoolean = {isBoolean}
      <br />
      string2, bool2 = {string2 + ", " + bool2}
      <br />
      isString2, isBool2 = {isString2 + ", " + isBool2}
      <br />
      sampleCount = {sampleCount}
      <br />
      sampleLabel = {sampleLabel}
      <br />
      sampleCountT = {sampleCountT}
      <br />
      sampleLabelT = {sampleLabelT}
      <hr />
    </div>
  );
}
