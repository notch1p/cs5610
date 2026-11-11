"use client";
import { useState } from "react";

export function QueryParameters() {
  const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
  const [a, setA] = useState("34");
  const [b, setB] = useState("23");
  return (
    <>
      <h4>Query Parameters</h4>
      <input
        type="number"
        className="rounded p-1 mb-2 me-3"
        onChange={(e) => setA(e.target.value)}
        defaultValue={a}
      />
      <input
        className="rounded p-1 mb-2"
        type="number"
        onChange={(e) => setB(e.target.value)}
        defaultValue={b}
      />
      <div className="flex gap-3">
        <a
          id="wd-query-parameter-add"
          className="rounded bg-blue-600 no-underline text-white p-1 px-2"
          href={`${HTTP_SERVER}/lab5/calculator?operation=add&a=${a}&b=${b}`}
        >
          Add {a} + {b}
        </a>
        <a
          id="wd-query-parameter-subtract"
          className="rounded bg-red-600 no-underline text-white p-1 px-2"
          href={`${HTTP_SERVER}/lab5/calculator?operation=subtract&a=${a}&b=${b}`}
        >
          Subtract {a} - {b}
        </a>
        <a
          id="wd-query-parameter-multiply"
          className="rounded bg-green-600 no-underline text-white p-1 px-2"
          href={`${HTTP_SERVER}/lab5/calculator?operation=multiply&a=${a}&b=${b}`}
        >
          Multiply {a} * {b}
        </a>
        <a
          id="wd-query-parameter-divide"
          className="rounded bg-orange-600 no-underline text-white p-1 px-2"
          href={`${HTTP_SERVER}/lab5/calculator?operation=divide&a=${a}&b=${b}`}
        >
          Divide {a} / {b}
        </a>
      </div>
    </>
  );
}
