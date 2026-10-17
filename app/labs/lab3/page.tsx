import Add from "./Add";
import AddingAndRemovingToFromArrays from "./AddingAndRemovingToFromArrays";
import ArrayIndexAndLength from "./ArrayIndexAndLength";
import ArrowFunctions from "./ArrowFunctions";
import BooleanVariables from "./BooleanVariables";
import Classes from "./Classes";
import ClientComponentDemo from "./ClientComponentDemo";
import ConditionalOutputIfElse from "./ConditionalOutputIfElse";
import ConditionalOutputInline from "./ConditionalOutputInline";
import DestructingImports from "./DestructingImports";
import Destructing from "./Destructuring";
import FilterFunction from "./FilterFunction";
import FindFunction from "./FindFunction";
import FindIndex from "./FindIndex";
import ForLoops from "./ForLoops";
import FunctionDestructing from "./FunctionDestructing";
import Highlight from "./Highlight";
import House from "./House";
import IfElse from "./IfElse";
import ImpliedReturn from "./ImpliedReturn";
import IncludesSomeEvery from "./IncludesSomeEvery";
import JsonStringify from "./JsonStringify";
import LegacyFunctions from "./LegacyFunctions";
import MapFunction from "./MapFunction";
import NullUndefined from "./NullUndefined";
import OptionalChaining from "./OptionalChaining";
import PathParameters from "./PathParameters";
import ReduceFunction from "./ReduceFunction";
import ServerComponentDemo from "./ServerComponentDemo";
import SimpleArrays from "./SimpleArrays";
import Spreading from "./Spreader";
import Square from "./Square";
import Styles from "./Styles";
import TemplateLiterals from "./TemplateLiterals";
import TernaryOperator from "./TernaryOperator";
import TodoList from "./todos/TodoList";
import VariablesAndConstants from "./VariablesAndConstants";
import VariableTypes from "./VariableTypes";

export default function Lab3() {
  console.log("Hello World!");
  return (
    <div id="wd-lab3">
      <h2>Lab 3</h2>
      <VariablesAndConstants />
      <VariableTypes />
      <BooleanVariables />
      <IfElse />
      <TernaryOperator />
      <ConditionalOutputIfElse />
      <ConditionalOutputInline />
      <hr />
      <NullUndefined />
      <LegacyFunctions />
      <ArrowFunctions />
      <ImpliedReturn />
      <TemplateLiterals />
      <SimpleArrays />
      <ArrayIndexAndLength />
      <AddingAndRemovingToFromArrays />
      <ForLoops />
      <MapFunction />
      <FindFunction />
      <FindIndex />
      <FilterFunction />
      <IncludesSomeEvery />
      <ReduceFunction />
      <JsonStringify />
      <House />
      <Spreading />
      <Destructing />
      <FunctionDestructing />
      <DestructingImports />
      <OptionalChaining />
      <Classes />
      <Styles />
      <ClientComponentDemo />
      <ServerComponentDemo />
      <Add a={3} b={4} />
      <Add a={10} b={20} />
      <Add a={7} b={8} />
      <h4>Square of 4</h4>
      <Square>4</Square>
      <h4>Square of 9</h4>
      <Square>9</Square>
      <p>
        Square of 5 = <Square>5</Square>
      </p>
      <hr />
      <Highlight>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis natus
        dolores incidunt quasi ipsa, itaque quae iste eum. Inventore, velit
        earum consequatur distinctio sunt ad vel asperiores aliquid quisquam
        eius.
      </Highlight>
      <hr />
      <Highlight>Children can be any JSX</Highlight>
      <hr />
      <PathParameters />
      <hr />
      <TodoList />
    </div>
  );
}
