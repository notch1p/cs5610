export default function GridLayout() {
  return (
    <div id="wd-css-grid-layout">
      <h2>Grid layout</h2>
      <div className="wd-grid-row">
        <div className="wd-grid-col-half-page wd-bg-color-yellow">
          <h3>Left half</h3>
        </div>
        <div className="wd-grid-col-half-page wd-bg-color-blue wd-fg-color-white">
          <h3>Right half</h3>
        </div>
      </div>
      <div className="wd-grid-row">
        <div className="wd-grid-col-left-sidebar wd-bg-color-yellow">
          <h3>Side bar</h3>
        </div>
        <div className="wd-grid-col-main-content wd-bg-color-blue wd-fg-color-white">
          <h3>Main content</h3>
        </div>
        <div className="wd-grid-col-right-sidebar wd-bg-color-green wd-fg-color-white">
          <h3>Side bar</h3>
        </div>
      </div>
      <div className="wd-grid-row">
        <div className="wd-float-20 wd-bg-color-gray">20% float</div>
        <div className="wd-float-30 wd-bg-color-gray">50% float</div>
        <div className="wd-float-done" />
      </div>
      <div className="wd-grid-row" id="wd-ai-grid">
        <div className="wd-bg-color-blue wd-grid-col-third-page wd-dimension-square" />
        <div className="wd-bg-color-yellow wd-grid-col-two-thirds-page wd-dimension-square" />
      </div>
    </div>
  );
}
