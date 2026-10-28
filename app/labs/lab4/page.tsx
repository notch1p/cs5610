"use client";

import ArrayStateVariable from "./ArrayStateVariable";
import BooleanStateVariables from "./BooleanStateVariables";
import ClickEvent from "./ClickEvent";
import ContextExamples from "./context/ContextExamples";
import ContextProfileForm from "./context/ContextProfileForm";
import ReactContextTodoList from "./context/ReactContextTodoList";
import Counter from "./Counter";
import CounterBroken from "./CounterBroken";
import DateStateVariable from "./DateStateVariable";
import Effect from "./Effect";
import HookProfileForm from "./hooks/HookProfileForm";
import IndependentToggles from "./hooks/IndependentToggles";
import LocalStorageDemo from "./hooks/LocalStorageDemo";
import HooksPage from "./hooks/page";
import ToggleDemo from "./hooks/ToggleDemo";
import WindowSizeDemo from "./hooks/WindowSizeDemo";
import ObjectStateVariable from "./ObjectStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import ProfileForm from "./profile/ProfileForm";
import PropDrilling from "./PropDrilling";
import ReduxExamples from "./redux/ReduxExamples";
import StringStateVariables from "./StringStateVariables";
import UrlEncoding from "./UrlEncoding";
import ZustandCounter from "./zustand/ZustandCounter";
import ZustandExamples from "./zustand/ZustandExamples";
import ZustandProfileForm from "./zustand/ZustandProfileForm";

const sayHello = (s: string) => alert(s);

export default function Lab4() {
  return (
    <div id="wd-lab4">
      <h2>Lab 4</h2>
      <ClickEvent />
      <PassingDataOnEvent />
      <PassingFunctions
        message="Hello from Lab 4"
        theFunction={sayHello}
        theOtherFunction={() => alert("Sample from parent")}
      />
      <CounterBroken />
      <Counter />
      <BooleanStateVariables />
      <StringStateVariables />
      <DateStateVariable />
      <ObjectStateVariable />
      <ArrayStateVariable />
      <ProfileForm />
      <ParentStateComponent />
      <PropDrilling />
      <UrlEncoding />
      <ContextExamples />
      <ReactContextTodoList />
      <ContextProfileForm />
      <ZustandCounter />
      <ZustandExamples />
      <ZustandProfileForm />
      <ReduxExamples />
      <Effect />
      <HooksPage />
    </div>
  );
}
