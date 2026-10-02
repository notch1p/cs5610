export default function Dimensions() {
  return (
    <div id="wd-css-dimensions">
      <h2>Dimension</h2>
      <div>
        <div className="wd-dimension-portrait wd-bg-color-yellow">Portrait</div>
        <div className="wd-dimension-landscape wd-bg-color-blue wd-fg-color-white">
          Landscape
        </div>
        <div className="wd-dimension-square wd-bg-color-red">Square</div>
        <div className="wd-dimension-square-2 wd-bg-color-red">
          we are given width 200px and height 100px so the text overflows but
          the size of the block stays put
        </div>
        <div
          id="wd-ai-dimension"
          className="wd-ai-dimension-120-60 wd-bg-color-yellow"
        >
          The quick brown fox jumps over the lazy dog
        </div>
      </div>
    </div>
  );
}
