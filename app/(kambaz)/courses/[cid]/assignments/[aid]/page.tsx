export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" defaultValue="A1 - ENV + HTML" />
      <br />
      <br />
      <textarea
        id="wd-description"
        defaultValue="The assignment is available online"
      />
      <br />
      <table>
        <tbody>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" defaultValue={100} />
            </td>
          </tr>
          {/* Complete on your own - see checklist below */}
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Group</label>
            </td>
            <td>
              <select defaultValue="ASSIGNMENTS" id="wd-group">
                <option value="ASSIGNMENTS">Assignments</option>
                <option value="QUIZZES">Quizzes</option>
                <option value="EXAMS">Exams</option>
                <option value="PROJECT">Project</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </td>
            <td>
              <select defaultValue="PRECENTAGE" id="wd-display-grade-as">
                <option value="PRECENTAGE">Precentage</option>
                <option value="POINTS">Points</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select defaultValue="ONLINE" id="wd-submission-type">
                <option value="ONLINE">Online</option>
                <option value="FILE">File Upload</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top"></td>
            <td>
              <b>Online Entry Options</b>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top"></td>
            <td>
              <input type="checkbox" id="wd-text-entry" />
              <label htmlFor="wd-text-entry">Text Entry</label>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top"></td>
            <td>
              <input type="checkbox" id="wd-website-url" />
              <label htmlFor="wd-website-url">Website URL</label>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top"></td>
            <td>
              <input type="checkbox" id="wd-media-recordings" />
              <label htmlFor="wd-media-recordings">Media Recordings</label>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top"></td>
            <td>
              <input type="checkbox" id="wd-student-annotation" />
              <label htmlFor="wd-student-annotation">Student Annotation</label>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top"></td>
            <td>
              <input type="checkbox" id="wd-file-upload" />
              <label htmlFor="wd-file-upload">File Uploads</label>
              <label htmlFor="wd-file-upload">File Uploads</label>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              Assign
            </td>
            <td>
              <label htmlFor="wd-assign-to">
                <b>Assign to</b>
              </label>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top"></td>
            <td>
              <select multiple id="wd-assign-to">
                <option value="EVERYONE">Everyone</option>
                <option value="PERSON1">Person 1</option>
                <option value="PERSON2">Person 2</option>
                <option value="PERSON3">Person 3</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top"></td>
            <td>
              <label htmlFor="wd-due-date">
                <b>Due</b>
              </label>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top"></td>
            <td>
              <input
                type="datetime-local"
                id="wd-due-date"
                defaultValue="2026-09-21T20:00"
              />
            </td>
          </tr>
          <tr>
            <td align="right"></td>
            <td align="left" valign="top">
              <label htmlFor="wd-available-from">
                <b>Available from</b>
              </label>
            </td>
            <td align="left" valign="top">
              <label htmlFor="wd-available-until">
                <b>Until</b>
              </label>
            </td>
          </tr>
          <tr>
            <td align="right"></td>
            <td align="left" valign="top">
              <input
                type="datetime-local"
                id="wd-availble-from"
                defaultValue="2026-09-20T20:00"
              />
            </td>
            <td align="left" valign="top">
              <input
                type="datetime-local"
                id="wd-availble-until"
                defaultValue="2026-09-25T21:00"
              />
            </td>
          </tr>
          <tr>
            <td align="right"></td>
            <td align="right"></td>
            <td align="right" valign="top">
              <hr />
              <button id="wd-cancel">Cancel</button>&nbsp;
              <button type="submit" id="wd-save">
                Save
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
