"use client";

import { useEffect, useState } from "react";
import * as client from "./client";
export default function HttpResponse() {
  const [welcomeOnLoad, setWelcomeOnLoad] = useState("");
  const [welcomeOnClick, setWelcomeOnClick] = useState("");
  const fetchWelcomeOnClick = async () => {
    const message = await client.fetchWelcomeMessage();
    setWelcomeOnClick(message);
  };
  const fetchWelcomeOnLoad = async () => {
    const welcome = await client.fetchWelcomeMessage();
    setWelcomeOnLoad(welcome);
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchWelcomeOnLoad();
  }, []);
  return (
    <>
      <h4>AJAX</h4>
      <h5 className="mb-0">Fetch on Click</h5>
      <button
        type="button"
        onClick={fetchWelcomeOnClick}
        className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white"
      >
        Fetch Welcome
      </button>
      <p>
        Response from server: <b>{welcomeOnClick}</b>
      </p>
      <h5 className="mb-0">Fetch on Load</h5>
      <p>
        Response from server: <b>{welcomeOnLoad}</b>
      </p>
    </>
  );
}
