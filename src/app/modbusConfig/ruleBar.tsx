'use client';

import { SetStateAction, useEffect, useState } from "react";

/**
 * Rule bar that will allow users to make a new rule, or edit an existing one for modbus calls
 * Read rule: Interval (ms), modbus address, transformation step, api to send it to
 * Write rule: Interval (ms), API to call, parse instructions, register to write to
 */
const RuleBar = () => {
  const readRuleValues =
    (<>
      <div>
        <h3>Interval (ms)</h3>
        <input className="focus:outline-0 w-[7ch]"></input>
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
    </>);

  const writeRuleValue = (
    <>
      <div>
        <h3>Interval (ms)</h3>
        <input className="focus:outline-0 w-[7ch]"></input>
      </div>
       <div>
        <h3>API Endpoint</h3>
        <input className="focus:outline-0"></input>
      </div>     
      <div>
        <h3>Data Parse Step</h3>
        <select className="w-full">
          <option>None</option>
        </select>
      </div>
      <div>
      <h3>Modbus Address</h3>
        <input className="focus:outline-0"></input>
      </div>
    </>
  );

  const [selectedValue, setSelectedValue] = useState("read");
  const [activeRuleComp, setActiveRuleComp] = useState(readRuleValues);

  const ruleTypeChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    if (selectedValue == "read") {
      setActiveRuleComp(readRuleValues);
    }
    else {
      setActiveRuleComp(writeRuleValue);
    }
  }, [selectedValue]);


  return (
    <div className="flex items-center bg-slate-300/100 p-3 space-x-2 border-2">
      <div>
        <h3>Rule Status</h3>
        <h3>Status Icon</h3>
      </div>
      <div>
        <h3>Rule Type</h3>
        <select className="w-full" value={selectedValue} onChange={ruleTypeChange}>
          <option value="read">Read</option>
          <option value="write">Write</option>
        </select>
      </div>
      {activeRuleComp}
      <h3>Remove Icon</h3>
    </div>
  );
}

export default RuleBar;