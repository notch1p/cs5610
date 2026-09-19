export default function RadioButtons() {
  return (
    <>
      <h5 id="wd-radio-buttons">Radio buttons</h5>
      <label>Favorite movie genre:</label>
      <br />
      <input type="radio" name="radio-genre" id="wd-radio-comedy" />
      <label htmlFor="wd-radio-comedy">Comedy</label>
      <br />
      <input type="radio" name="radio-genre" id="wd-radio-drama" />
      <label htmlFor="wd-radio-drama">Drama</label>
      <br />
      <input type="radio" name="radio-genre" id="wd-radio-scifi" />
      <label htmlFor="wd-radio-scifi">Science Fiction</label>
      <br />
      <input type="radio" name="radio-genre" id="wd-radio-fantasy" />
      <label htmlFor="wd-radio-fantasy">Fantasy</label>
      <br />
      <label>How often do you watch movies?</label>
      <br />
      <input type="radio" name="radio-frequency" id="wd-radio-daily" />
      <label htmlFor="wd-radio-daily">Daily</label>
      <br />
      <input type="radio" name="radio-frequency" id="wd-radio-weekly" />
      <label htmlFor="wd-radio-weekly">Weekly</label>
      <br />
      <input type="radio" name="radio-frequency" id="wd-radio-rarely" />
      <label htmlFor="wd-radio-rarely">Rarely</label>
      <h5>Sibling label + htmlFor</h5>
      <input type="radio" name="radio-beside" id="wd-radio-beside-yes" />
      <label htmlFor="wd-radio-beside-yes">Yes</label>

      <h5>Wrapping label w/o htmlFor</h5>
      <label>
        <input type="radio" name="radio-wrap" /> Yes
      </label>

      {/* Separate placement still works with htmlFor */}
      <label htmlFor="wd-radio-distant-a">Option A</label>
      {/* ... elsewhere in the layout ... */}
      <input type="radio" name="radio-distant" id="wd-radio-distant-a" />
    </>
  );
}
