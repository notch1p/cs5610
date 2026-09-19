export default function Tables() {
  return (
    <div id="wd-tables">
      <h4>Table Tag</h4>
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
          <tr>
            <td>Q2</td>
            <td align="center">CSS</td>
            <td align="center">2/10/21</td>
            <td align="right">90</td>
          </tr>
          <tr>
            <td>Q3</td>
            <td align="center">JavaScript</td>
            <td align="center">2/17/21</td>
            <td align="right">95</td>
          </tr>
          <tr>
            <td>Q4</td>
            <td align="center">HTML</td>
            <td align="center">2/3/21</td>
            <td align="right">85</td>
          </tr>
          <tr>
            <td>Q5</td>
            <td align="center">CSS</td>
            <td align="center">2/10/21</td>
            <td align="right">90</td>
          </tr>
          <tr>
            <td>Q6</td>
            <td align="center">JavaScript</td>
            <td align="center">2/13/21</td>
            <td align="right">93</td>
          </tr>
          <tr>
            <td>Q7</td>
            <td align="center">JavaScript</td>
            <td align="center">2/14/21</td>
            <td align="right">85</td>
          </tr>
          <tr>
            <td>Q8</td>
            <td align="center">JavaScript</td>
            <td align="center">2/15/21</td>
            <td align="right">75</td>
          </tr>
          <tr>
            <td>Q9</td>
            <td align="center">JavaScript</td>
            <td align="center">2/16/21</td>
            <td align="right">65</td>
          </tr>
          <tr>
            <td>Q10</td>
            <td align="center">JavaScript</td>
            <td align="center">2/18/21</td>
            <td align="right">99</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}>Average</td>
            <td align="right">86.2</td>
          </tr>
        </tfoot>
      </table>
      <h5>My course schedule</h5>
      <table id="wd-your-table" border={1} width="100%">
        <thead>
          <tr>
            <th>Time</th>
            <th align="center">Mon</th>
            <th align="center">Tue</th>
            <th align="center">Wed</th>
            <th align="center">Thu</th>
            <th align="center">Fri</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th align="left">Morning</th>
            <td align="center">Free</td>
            <td align="center">
              CS5010
              <br />
              Richards-458
            </td>
            <td align="center" colSpan={2}>
              Free
            </td>
            <td align="center">
              CS5010
              <br />
              Richards-458
            </td>
          </tr>
          <tr>
            <th align="left">Afternoon</th>
            <td align="center">
              CS5011
              <br />
              Hastings-211
            </td>
            <td align="center" colSpan={4}>
              Free
            </td>
          </tr>
          <tr>
            <th align="left">Night</th>
            <td align="center">
              CS5610
              <br />
              Shillman-105
            </td>
            <td align="center" colSpan={4}>
              Free
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
