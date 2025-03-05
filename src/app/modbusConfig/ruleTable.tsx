'use client';

import { JSX, useEffect, useState } from "react";
import RuleBar from "./ruleBar";
import { rule } from "postcss";

export interface ruleData {
  id: number;
  active: boolean;
  type: string;
  interval: string;
  modbusAddress: string;
  dataParseStep: string;
  apiEndpoint: string;
}

const RuleTable = () => {

  
  const [rulesDisplay, setRulesDisplay] = useState<JSX.Element[]>([]);
  const [rules, setRules] = useState<ruleData[]>(() => {
    return typeof window !== "undefined" ? JSON.parse(localStorage.getItem("rules") || "[]") : []});

  //Connection details
  const [ipAddress, setIpAddress] = useState<string>(() => {return typeof window !== "undefined" ? localStorage.getItem("ip") || "" : ""});
  const [port, setPort] = useState<string>(() => {return typeof window !== "undefined" ? localStorage.getItem("port") || "" : ""});
  const [clientId, setClientId] = useState<string>(() => {return typeof window !== "undefined" ? localStorage.getItem("clientId") || "" : ""});
  

  function addRule(){
    const tempRule: ruleData = {
      id: Date.now(),
      active: true,
      type: "read",
      interval: "",
      modbusAddress: "",
      dataParseStep: "",
      apiEndpoint: ""
    };
    setRules((prevRules) => {const newRules = prevRules.concat(tempRule);
      return newRules;
    });
    // setRulesDisplay((prevRules) => [...prevRules, <RuleBar key={tempRule.id} data={tempRule} updateRuleCallback={updateRuleData}/>]);
    updateRuleRender()
    
  }

  function updateRuleRender(){
    console.log("Refresh Preformed")
    const tempRulesDisplay:JSX.Element[] = [];
    rules.forEach((rule) => {
      tempRulesDisplay.push(<RuleBar key={rule.id} data={rule} updateRuleCallback={updateRuleData}/>)
    })
    setRulesDisplay(tempRulesDisplay);
  }

  function updateRuleData(data: ruleData){
    const ruleToModify: ruleData | undefined = rules.find(rule => rule.id === data.id);

    if(ruleToModify){
      ruleToModify.id = data.id;
      ruleToModify.active = data.active;
      ruleToModify.type = data.type;
      ruleToModify.interval = data.interval;
      ruleToModify.modbusAddress = data.modbusAddress;
      ruleToModify.dataParseStep = data.dataParseStep;
      ruleToModify.apiEndpoint = data.apiEndpoint;
    }
  }

  useEffect(() => {
    localStorage.setItem("ip", ipAddress);
    localStorage.setItem("port", port);
    localStorage.setItem("clientId", clientId);
    localStorage.setItem("rules", JSON.stringify(rules));
  }, [ipAddress, port, clientId, rules])

  function saveRules(){
    rules.forEach((rule) => {
      const url = rule.type === "read"? "localhost:2000/modbus/setRecurringReadAPICallback" : 
      "localhost:2000/modbus/setRecurringWriteAPIGather";
      fetch(url, {
        method:"POST",
        body: JSON.stringify({
          interval: rule.interval,
          address: rule.modbusAddress,
          endpoint: rule.apiEndpoint
        })
      })
    });
  }

  function startConnection(){
    fetch("http://localhost:2000/modbus/getModbusConnection", {
      method:"POST",
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address: ipAddress,
        port: port,
        id: clientId
      }),
    })
    .catch((e) => console.log(e));
  };
  
  return(
    <div className="flex flex-col h-full">
      <div className="flex space-x-3">
        <button onClick={addRule}>Add Rule</button>
        <button onClick={startConnection}>Start Connection</button>
        <input placeholder="Ip Address" value={ipAddress} onChange={e => setIpAddress(e.target.value)}></input>
        <input placeholder="Port" value={port} onChange={e => setPort(e.target.value)}></input>
        <input placeholder="Client Id" value={clientId} onChange={e => setClientId(e.target.value)}></input>
        <button onClick={saveRules}>Save Rules</button>
      </div>
      <div className="overflow-scroll flex-1">
        {rulesDisplay}
      </div>      
    </div>
  )
}

export default RuleTable;