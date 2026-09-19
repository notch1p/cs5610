import type { ReactNode } from "react";
type HBox = {
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: string | number;
  borderRadius?: string | number;
  children?: ReactNode;
};
function HighlightedBox({
  backgroundColor = "lightyellow",
  borderColor = "orange",
  borderWidth = 2,
  borderRadius = 8,
  children,
}: HBox) {
  return (
    <div
      style={{
        backgroundColor,
        borderColor,
        borderWidth,
        borderStyle: "solid",
        borderRadius,
        padding: "0.75rem 1rem",
        marginBottom: "0.75rem",
      }}
    >
      {children}
    </div>
  );
}

export default function HighlightedBoxLab() {
  return (
    <div id="wd-highlighted-box">
      <h3>Highlighted Box</h3>
      <HighlightedBox
        backgroundColor="lavender"
        borderColor="purple"
        borderWidth={3}
        borderRadius={12}
      >
        <h4>Callout</h4>
        <p>
          This box wraps <strong>any</strong> children — headings, paragraphs,
          lists, and more.
        </p>
        <ul>
          <li>backgroundColor</li>
          <li>borderColor</li>
          <li>borderWidth</li>
          <li>borderRadius</li>
        </ul>
      </HighlightedBox>
      <HighlightedBox
        backgroundColor="#e8f5e9"
        borderColor="green"
        borderWidth={2}
        borderRadius={20}
      >
        <p>
          A second box with different style props wrapping different content.
        </p>
      </HighlightedBox>
      <HighlightedBox
        backgroundColor="lightblue"
        borderColor="navy"
        borderWidth={4}
        borderRadius={16}
      >
        <h4>Zhenming Gao: Goals of WebDev Course</h4>
        <ul>
          <li>Learn TypeScript</li>
          <li>Learn React</li>
          <li>Getting to know professional web developement</li>
        </ul>
      </HighlightedBox>
      <HighlightedBox
        backgroundColor="honeydew"
        borderColor="seagreen"
        borderWidth={4}
        borderRadius={16}
      >
        <h4>Sample nested content</h4>
        <ul>
          <p>This is a nested paragraph</p>
          <form>
            <label htmlFor="wd-text-fields-firstname">First name:</label>
            <input placeholder="John" id="wd-text-fields-firstname" /> <br />
          </form>
          <table border={1} width="100%">
            <thead>
              <tr>
                <th>Quiz</th>
                <th align="center">Topic</th>
                <th align="center">Date</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Q1</td>
                <td align="center">HTML</td>
                <td align="center">2/3/21</td>
                <td align="right">85</td>
              </tr>
            </tbody>
          </table>
        </ul>
      </HighlightedBox>
    </div>
  );
}
