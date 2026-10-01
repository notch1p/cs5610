export default function BoxModel() {
  return (
    <div id="wd-css-box-model">
      <h2>Box model</h2>
      <div className="wd-box-model-parent">
        <div>parent background (shows through the margin)</div>
        <div className="wd-box-model-box">
          <span className="wd-box-model-border-label">
            border (the red ring)
          </span>
          <span className="wd-box-model-padding-label">padding</span>
          <div className="wd-box-model-content">content</div>
          <span className="wd-box-model-margin-label">
            margin: the 20px gray gap (transparent)
          </span>
        </div>
      </div>
      <h3>box-sizing</h3>
      <div className="wd-box-sizing-demo">
        <div className="wd-box-sizing-content">
          content-box: width 200px plus padding and border
        </div>
        <div className="wd-box-sizing-border">
          border-box: width 200px includes padding and border
        </div>
        {/* border-box keeps the declared width */}
        <div className="wd-box-sizing-border">ai: this box uses border-box</div>
        <div className="wd-box-sizing-border-2">
          border-box <br />
          <code>
            width: 500px; <br />
            height: 250px; <br />
            padding: 30px; <br />
            border: 10px solid magenta; <br />
            background-color: grey; <br />
            margin-bottom: 10px; <br />
            color: white
          </code>
        </div>
      </div>
    </div>
  );
}
