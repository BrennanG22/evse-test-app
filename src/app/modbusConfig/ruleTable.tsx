'use client';

import { JSX, useState } from "react";
import RuleBar from "./ruleBar";

const RuleTable = () => {
  
  const [rules, setRules] = useState<JSX.Element[]>([]);

  //Connection details
  const [ipAddress, setIpAddress] = useState<string>("");
  const [port, setPort] = useState<string>("");
  const [clientId, setClientId] = useState<string>("");

  function addRule(){
    setRules((prevRules) => [...prevRules, <RuleBar key={Date.now()}/>])
  }

  function startConnection(){
    fetch("http://localhost:2000/modbus/getModbusConnection", {
      method:"POST",
      body: JSON.stringify({
        address: ipAddress,
        port: port,
        id: clientId
      })
    });
  }
  
  return(
    <div>
      <div className="flex space-x-3">
        <button onClick={addRule}>Add Rule</button>
        <button onClick={startConnection}>Start Connection</button>
        <input placeholder="Ip Address" value={ipAddress} onChange={e => setIpAddress(e.target.value)}></input>
        <input placeholder="Port" value={port} onChange={e => setPort(e.target.value)}></input>
        <input placeholder="Client Id" value={clientId} onChange={e => setClientId(e.target.value)}></input>
        <button>Save Rules</button>
      </div>
      <div>
        {rules}
      </div>      
    </div>
  )
}

export default RuleTable;