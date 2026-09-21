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
        </tbody>
      </table>
    </div>
  );
}
