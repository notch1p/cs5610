import CalculatorNextWebApiClient from "./Calculator";
import Environment from "./Environment";
import HttpResponse from "./HttpClient";
import { PathParameters } from "./PathParameters";
import { QueryParameters } from "./QueryParameters";
import WorkingWithRemoteArrays from "./WorkingWithRemoteArrays";
import WorkingWithRemoteArraysAsynchronously from "./WorkingWithRemoteArraysAsynchronously";
import WorkingWithRemoteObjects from "./WorkingWithRemoteObjects";
import WorkingWithRemoteObjectsAsynchronously from "./WorkingWithRemoteObjectsAsynchronously";

export default function Lab5() {
  return (
    <div id="wd-lab5">
      <h2>Lab 5</h2>
      <a
        className="text-blue-700 underline"
        href="http://localhost:4000/lab5/welcome"
      >
        Welcome
      </a>
      <Environment />
      <PathParameters />
      <QueryParameters />
      <WorkingWithRemoteObjects />
      <WorkingWithRemoteArrays />
      <HttpResponse />
      <WorkingWithRemoteObjectsAsynchronously />
      <WorkingWithRemoteArraysAsynchronously />
      <CalculatorNextWebApiClient />
    </div>
  );
}
