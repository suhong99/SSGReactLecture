import SecondComp from "./SecondComp";

function FirstComp({ name }) {
  return (
    <div>
      <h1>FirstComp{name}</h1>
      <SecondComp name={name}></SecondComp>
    </div>
  );
}
export default FirstComp;
