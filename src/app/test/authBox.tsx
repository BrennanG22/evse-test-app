import { useEffect, useState } from "react";

interface authBoxProps{
  currentState:number | null;
}

const AuthBox:React.FC<authBoxProps> = ({currentState}) => {
  const stateMap: string[] = [
    "Idle", 
    "Auth",
    "Parameter discovery",
    "Cable check",
    "Precharge",
    "Start Charging",
    "Charging",
    "Stopping Charge"
  ];

  const [stateText, setStateText] = useState<string | null>(null);

  useEffect(() => {
    console.log(stateMap);
    if(currentState != null){
      setStateText(stateMap[currentState])
    }
  }, [currentState]);

  return (
    <div className="justify-items-center">
      <input className="mt-2 border-solid border-2 box-border" type="text" placeholder="User Name"></input>
      <select className="box-border">
        <option>CCS</option>
      </select>
      <div className="w-full flex items-center">
        <button className="w-1/2 bg-green-500 rounded-full m-2">Auth</button>
        <button className="w-1/2 bg-red-500 rounded-full m-2">Stop</button>
      </div>
      <strong>State:</strong>
      <h1>{currentState!==null ? stateText : "Loading..."}</h1>
    </div>
  );
};
export default AuthBox;