export default function StudentProfile() {
  return (
    <form id="wd-your-form" onSubmit={(e) => e.preventDefault()}>
      <h5>Student Information</h5>
      <TFields />
      <h5>Why I&apos;m taking this course</h5>
      <TArea />
      <h5>Class standing & Status</h5>
      <RButton />
      <h5>Interests</h5>
      <CBoxes />
      <h5>Major & Topics</h5>
      <Dropdown />
      <h5>Misc. Info</h5>
      <Miscs />
      <br />
      <SaveProfile />
    </form>
  );
}

const TFields = () => (
  <>
    <label htmlFor="wd-text-fields-firstname">First name:</label>
    <input placeholder="John" id="wd-text-fields-firstname" /> <br />
    <label htmlFor="wd-text-fields-lastname">Last name:</label>
    <input placeholder="Doe" id="wd-text-fields-lastname" /> <br />
    <label htmlFor="wd-text-fields-studentId">Student ID:</label>
    <input type="password" defaultValue="12345" id="wd-text-fields-studentId" />
  </>
);

const TArea = () => (
  <>
    <textarea
      id="wd-textarea"
      cols={30}
      rows={10}
      defaultValue="Because I think that the instructor and TAs are nice guys who upon reading this will give me a good grade."
    />
  </>
);

const RButton = () => (
  <>
    <label>Standing</label>
    <br />
    <input type="radio" name="radio-class-standing" id="wd-radio-freshman" />
    <label htmlFor="wd-radio-freshman">Freshman</label>
    <br />
    <input type="radio" name="radio-class-standing" id="wd-radio-sophomore" />
    <label htmlFor="wd-radio-sophomore">Sophomore</label>
    <br />
    <input type="radio" name="radio-class-standing" id="wd-radio-junior" />
    <label htmlFor="wd-radio-junior">Junior</label>
    <br />
    <input type="radio" name="radio-class-standing" id="wd-radio-senior" />
    <label htmlFor="wd-radio-senior">Senior</label>
    <br />
    <input type="radio" name="radio-class-standing" id="wd-radio-graduate" />
    <label htmlFor="wd-radio-graduate">Graduate</label>
    <br />
    <label>Status</label>
    <br />
    <label>
      <input type="radio" name="radio-status" id="wd-radio-parttime" />{" "}
      Part-time
      <input type="radio" name="radio-status" id="wd-radio-fulltime" />{" "}
      Full-time
    </label>
  </>
);

const CBoxes = () => (
  <>
    <p>Languages:</p>
    <label>
      <input type="checkbox" name="check-language" id="wd-chkbox-agda" /> Agda
      <input type="checkbox" name="check-language" id="wd-chkbox-coq" /> Coq
      <input type="checkbox" name="check-language" id="wd-chkbox-idris" /> Idris
      <input type="checkbox" name="check-language" id="wd-chkbox-lean" /> Lean
    </label>
    <p>Frameworks:</p>
    <label>
      <input type="checkbox" name="check-framework" id="wd-chkbox-wpf" /> WPF
      <input type="checkbox" name="check-framework" id="wd-chkbox-swift" />{" "}
      Swift UI
      <input
        type="checkbox"
        name="check-framework"
        id="wd-chkbox-compose"
      />{" "}
      Compose UI
    </label>
    <p>Career Goals:</p>
    <label>
      <input type="checkbox" name="check-goal" id="wd-chkbox-work" /> Work
      <input type="checkbox" name="check-goal" id="wd-chkbox-research" />{" "}
      Research
    </label>
  </>
);

const Dropdown = () => (
  <>
    <label htmlFor="wd-select-major">Major: </label>
    <br />
    <select id="wd-select-major" defaultValue="CS">
      <option value="CS">Computer Science</option>
      <option value="ECON">Economy</option>
    </select>
    <br />
    <label htmlFor="wd-select-topics">Topics of interest</label>
    <br />
    <select multiple id="wd-select-topics" defaultValue={["PL", "TT", "CAT"]}>
      <option value="PL">Programming Language</option>
      <option value="TT">Type Theorey</option>
      <option value="AI">Artificial Intelligence</option>
      <option value="CAT">Abstract Algebra & Category Theory</option>
    </select>
  </>
);

const Miscs = () => (
  <>
    <label htmlFor="wd-text-fields-email">Email: </label>
    <input
      type="email"
      placeholder="jdoe@somewhere.com"
      id="wd-text-fields-email"
    />
    <br />
    <label htmlFor="wd-text-fields-grad-year">Expected graduation year: </label>
    <input
      type="number"
      placeholder="2028"
      min={2026}
      id="wd-text-fields-grad-year"
    />
    <br />
    <label htmlFor="wd-text-fields-dob">Date of birth: </label>
    <input
      type="date"
      defaultValue="2004-01-20"
      min="1900-01-01"
      max="2026-9-18"
      id="wd-text-fields-dob"
    />
    <br />
    <label htmlFor="wd-text-fields-score">Excitement meter: </label>
    <input
      type="range"
      defaultValue="10"
      min="1"
      max="10"
      id="wd-text-fields-score"
    />
  </>
);

const SaveProfile = () => (
  <>
    <button id="wd-html-button-save" type="submit">
      Save profile
    </button>
    <button id="wd-html-button-cancel" type="button">
      Cancel
    </button>
  </>
);
