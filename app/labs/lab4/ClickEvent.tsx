"use client";

const hello = () => {
  alert("Hello World!");
};

const hello2 = () => alert("Hello, Zhenming Gao");

const goodbye = () => alert("Goodbye world!");

export default function ClickEvent() {
  return (
    <div id="wd-click-event">
      <h2>Click Event</h2>
      <button
        type="button"
        onClick={hello}
        id="wd-onclick-hello"
        className="rounded bg-red-700 px-3 py-1.5 text-sm font-medium text-white"
      >
        Click Hello
      </button>
      &nbsp;
      <button
        type="button"
        onClick={hello2}
        id="wd-onclick-greet"
        className="rounded bg-red-700 px-3 py-1.5 text-sm font-medium text-white"
      >
        Greet
      </button>
      &nbsp;
      <button
        type="button"
        onClick={goodbye}
        id="wd-onclick-goodbye"
        className="rounded bg-red-700 px-3 py-1.5 text-sm font-medium text-white"
      >
        Goodbye
      </button>
      <hr />
    </div>
  );
}
