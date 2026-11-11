"use client";

import * as client from "./client";
import { useState } from "react";

export default function CalculatorNextWebApiClient() {
  const [a, setA] = useState(0.0);
  const [b, setB] = useState(0.0);
  const [op, setOp] = useState("+");
  const [err, setErr] = useState(null);
  const [res, setRes] = useState("");
  const calc = async (a: number, b: number, op: string) => {
    try {
      const { result } = await client.calculate(a, b, op);
      setRes(result);
      setErr(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setErr(e.toString());
    }
  };
  return (
    <>
      <h4>Calculator (Next.js Route)</h4>
      <div className="mb-2">
        A:
        <input
          type="number"
          onChange={(e) => setA(parseFloat(e.target.value))}
          defaultValue={String(a)}
          className="ms-2 rounded p-0.5"
        />
      </div>
      <div>
        B:
        <input
          type="number"
          onChange={(e) => setB(parseFloat(e.target.value))}
          defaultValue={String(b)}
          className="ms-2 rounded p-0.5"
        />
      </div>
      <div>
        Operation:
        <select
          name="operation"
          id="wd-lab5-calc-op"
          className="rounded m-2 pt-0.5 pb-0.5"
          onChange={(e) => setOp(e.target.value)}
        >
          <option value="add" defaultChecked>
            +
          </option>
          <option value="subtract">-</option>
          <option value="multiply">×</option>
          <option value="divide">÷</option>
        </select>
      </div>
      <div className="flex gap-3">
        <button
          className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white flex-0"
          onClick={() => calc(a, b, op)}
        >
          Calculate
        </button>
        <span className="flex-0 pt-1">{res}</span>
        {err && <span className="flex-1 pt-1">{err}</span>}
      </div>
    </>
  );
}
