import "./index.css";
import ForegroundColors from "./ForegroundColors";
import BackgroundColors from "./Background-Colors";
import Borders from "./Borders";
import Padding from "./Padding";
import Margin from "./Margin";
import BoxModel from "./BoxModel";
import Corners from "./Corners";
import Dimensions from "./Dimensions";
import Display from "./Display";
import Positions from "./Positions";
import Zindex from "./Zindex";
import Float from "./Float";
import GridLayout from "./GridLayout";
import Flex from "./Flex";
import MediaQueriesDemo from "./MediaQueriesDemo";
import ReactIconsSampler from "./ReactIconsSampler";
export default function Lab2() {
  return (
    <div id="wd-lab2">
      <h2>Lab 2 - Cascading Style Sheets</h2>
      <h3>Styling with the STYLE attribute</h3>
      <p>
        Style attribute allows configuring look and feel right on the element.
        Although it&apos;s very convenient it is considered bad practice and you
        should avoid using the style attribute
      </p>
      <p>
        Hello my name is Zhenming Gao <br />
        Some jibberish below...
      </p>
      <p id="wd-ai-style-attr">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit itaque
        velit accusantium provident iste odit libero modi quo a aspernatur, quod
        dolorem ducimus omnis voluptate hic in, non perferendis neque!
      </p>
      <div id="wd-css-id-selectors">
        <h3>ID selectors</h3>
        <p id="wd-id-selector-1">
          Instead of changing the look and feel of all the elements of the same
          name, e.g., P, we can refer to a specific element by its ID
        </p>
        <p id="wd-id-selector-2">
          Here&apos;s another paragraph using a different ID and a different
          look and feel
        </p>
        <p id="wd-ai-id-selector">AI2</p>
        <p id="wd-id-selector-3">Hi again.</p>
        <div id="wd-css-class-selectors">
          <h3>Class selectors</h3>
          <p className="wd-class-selector">
            Instead of using IDs to refer to elements, you can use an
            element&apos;s CLASS attribute
          </p>
          <h4 className="wd-class-selector">
            This heading has same style as paragraph above
          </h4>
          <p className="wd-your-class">wd-your-class here.</p>
          <h4 className="wd-your-class">wd-your-class above.</h4>
          <p className="wd-ai-class-selector">wd-ai-class-selector here</p>
          <h4 className="wd-ai-class-selector">wd-ai-class-selector above</h4>
        </div>
      </div>
      <div id="wd-css-document-structure">
        <div className="wd-selector-1">
          <h3>Document structure selectors</h3>
          <div className="wd-selector-2">
            Selectors can be combined to refer elements in particular places in
            the document
            <p className="wd-selector-3">
              This paragraph&apos;s red background is referenced as
              <br />
              .selector-2 .selector3
              <br />
              meaning the descendant of some ancestor.
              <br />
              <span className="wd-selector-4">
                Whereas this span is a direct child of its parent
              </span>
              <br />
              You can combine these relationships to create specific styles
              depending on the document structure
              <span className="wd-ai-selector-5">wd-ai-selector-5 here</span>
            </p>
            <p className="wd-selector-5">Nested depth is 5</p>
          </div>
        </div>
        <p id="wd-ai-cascade" className="wd-ai-cascade">
          wd-ai-cascade here
        </p>
      </div>
      <ForegroundColors />
      <BackgroundColors />
      <Borders />
      <Padding />
      <Margin />
      <BoxModel />
      <Corners />
      <Dimensions />
      <Display />
      <Positions />
      <Zindex />
      <Float />
      <GridLayout />
      <Flex />
      <MediaQueriesDemo />
      <ReactIconsSampler />
    </div>
  );
}
