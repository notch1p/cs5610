/* eslint-disable @next/next/no-img-element */
export default function Images() {
  return (
    <div id="wd-images">
      <h4>Image tag</h4>
      Loading an image from the internet:
      <br />
      <img
        id="wd-starship"
        width="400px"
        alt="Starship"
        src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
      />
      <br />
      Loading a local image:
      <br />
      <img
        id="wd-teslabot"
        src="/images/teslabot.jpg"
        height="200px"
        alt="Tesla Bot (Optimus) humanoid robot"
      />
      <br />
      Glenda from Plan 9:
      <br />
      <img
        id="wd-your-image"
        src="/images/Spaceglenda.svg"
        height="300px"
        alt="Glenda from Plan9"
      />
      <br />
      Breaking Bad:
      <br />
      <img
        id="wd-ai-image"
        src="https://i.kym-cdn.com/photos/images/original/002/254/546/ba7.jpg"
        alt="Huell rolling in money"
        width="200px"
      />
    </div>
  );
}
