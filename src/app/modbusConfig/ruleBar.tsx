'use client';

import { SetStateAction, useEffect, useState } from "react";
import { ruleData } from "./ruleTable";

interface RuleBarProps {
  data: ruleData;
  updateRuleCallback: (data:ruleData) => void;
}

/**
 * Rule bar that will allow users to make a new rule, or edit an existing one for modbus calls
 * Read rule: Interval (ms), modbus address, transformation step, api to send it to
 * Write rule: Interval (ms), API to call, parse instructions, register to write to
 */
const RuleBar: React.FC<RuleBarProps> = ({ data, updateRuleCallback }) => {


  const [selectedType, setSelectedType] = useState(data.type);
  const [interval, setInterval] = useState(data.interval);
  const [localData, setLocalData] = useState<ruleData>(data);

  useEffect(() => {
    localData.interval = interval;
    // console.log(localData)
    updateRuleCallback(localData);
  }, [interval]);


  const ruleTypeChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedType(event.target.value);
    setLocalData((prevData) => {prevData.type = event.target.value.toString(); return prevData})
    updateRuleCallback(localData);
  };

  return (
    <div className="flex items-center bg-slate-300/100 p-3 space-x-2 border-2">
      <div>
        <h3>Rule Status</h3>
        <h3>{data.apiEndpoint}</h3>
      </div>
      <div>
        <h3>Rule Type</h3>
        <select className="w-full" value={selectedType} onChange={ruleTypeChange}>
          <option value="read">Read</option>
          <option value="write">Write</option>
        </select>
      </div>
      <div>
        <h3>Interval (ms)</h3>
        <input className="focus:outline-0 w-[7ch]" value={interval} onChange={e => setInterval(e.target.value)}></input>
      </div>
      <div>
        <h3>Modbus Address</h3>
        <input className="focus:outline-0"></input>
      </div>
      <div>
        <h3>Data Parse Step</h3>
        <select className="w-full">
          <option>None</option>
        </select>
      </div>
      <div>
        <h3>API Endpoint</h3>
        <input className="focus:outline-0"></input>
      </div>
      <h3>Remove Icon</h3>
    </div>
  );
}

export default RuleBar;