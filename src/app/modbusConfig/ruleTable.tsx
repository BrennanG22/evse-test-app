'use client';

import { JSX, useState } from "react";
import RuleBar from "./ruleBar";
import { randomUUID } from "crypto";

const RuleTable = () => {
  
  const [rules, setRules] = useState<JSX.Element[]>([]);

  function addRule(){
    setRules((prevRules) => [...prevRules, <RuleBar key={Date.now()}/>])
  }
  
  return(
    <div>
      <div className="flex space-x-3">
        <button onClick={addRule}>Add Rule</button>
        <button>Save Rules</button>
      </div>
      <div>
        {rules}
      </div>      
    </div>
  )
}

export default RuleTable;