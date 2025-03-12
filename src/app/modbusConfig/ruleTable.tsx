'use client';

import { JSX, useEffect, useState } from "react";
import RuleBar from "./ruleBar";

export interface ruleData {
  id: number;
  active: boolean;
  type: string;
  registerType: string;
  interval: string;
  modbusAddress: string;
  dataParseStep: string;
  apiEndpoint: string;
}

const RuleTable = () => {


  const [rulesDisplay, setRulesDisplay] = useState<JSX.Element[]>([]);
  const [rules, setRules] = useState<ruleData[]>(() => {
    return typeof window !== "undefined" ? JSON.parse(localStorage.getItem("rules") || "[]") : []
  });

  //Connection details
  const [ipAddress, setIpAddress] = useState<string>(() => { return typeof window !== "undefined" ? localStorage.getItem("ip") || "" : "" });
  const [port, setPort] = useState<string>(() => { return typeof window !== "undefined" ? localStorage.getItem("port") || "" : "" });
  const [clientId, setClientId] = useState<string>(() => { return typeof window !== "undefined" ? localStorage.getItem("clientId") || "" : "" });


  function addRule() {
    const tempRule: ruleData = {
      id: Date.now(),
      active: true,
      type: "read",
      registerType: "holding",
      interval: "",
      modbusAddress: "",
      dataParseStep: "",
      apiEndpoint: ""
    };
    setRules((prevRules) => {
      const newRules = prevRules.concat(tempRule);
      return newRules;
    });
    // setRulesDisplay((prevRules) => [...prevRules, <RuleBar key={tempRule.id} data={tempRule} updateRuleCallback={updateRuleData}/>]);
  }

  function updateRuleRender() {
    const tempRulesDisplay: JSX.Element[] = [];
    rules.forEach((rule) => {
      tempRulesDisplay.push(<RuleBar key={rule.id} data={rule} updateRuleCallback={updateRuleData} removeRuleCallback={removeRule} />)
    })
    setRulesDisplay(tempRulesDisplay);
  }

  function updateRuleData(data: ruleData) {
    const ruleToModify: ruleData | undefined = rules.find(rule => rule.id === data.id);
    if (ruleToModify) {
      ruleToModify.id = data.id;
      ruleToModify.active = data.active;
      ruleToModify.type = data.type;
      ruleToModify.interval = data.interval;
      ruleToModify.modbusAddress = data.modbusAddress;
      ruleToModify.dataParseStep = data.dataParseStep;
      ruleToModify.apiEndpoint = data.apiEndpoint;
      localStorage.setItem("rules", JSON.stringify(rules));
    }
  }

  function removeRule(id: number) {
    const indexToRemove = rules.findIndex(rule => rule.id === id);
    setRules((prevRules) => {
      const tempArray = [
        ...prevRules.slice(0, indexToRemove),
        ...prevRules.slice(indexToRemove + 1)
      ];
      return tempArray;
    });
  }

  useEffect(() => {
    localStorage.setItem("ip", ipAddress);
    localStorage.setItem("port", port);
    localStorage.setItem("clientId", clientId);
    localStorage.setItem("rules", JSON.stringify(rules));
  }, [ipAddress, port, clientId, rules]);

  useEffect(() => {
    updateRuleRender()
  }, [rules.length])

  function saveRules() {
    const sendRules: object[] = [];
    rules.forEach((rule) => {
      sendRules.push({
        id: rule.id,
        type: rule.type,
        registerType: rule.registerType,
        active: rule.active,
        interval: rule.interval,
        modbusRegister: rule.modbusAddress,
        apiEndpoint: rule.apiEndpoint
      })
    });
    fetch("http://localhost:2000/modbus/setRules", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        rules: sendRules
      })
    })
  }

  function startConnection() {
    fetch("http://localhost:2000/modbus/getModbusConnection", {
      method: "POST",
      headers: {
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

  function getRulesFromSource(){
    fetch("http://localhost:2000/modbus/rules", {
      method: "GET"
    }).then((response) => {
      if(!response.ok){
        throw new Error("Fetch error")
      }
      return response.json()
    })
    .then((data) => {
      if(Array.isArray(data)){
        setRules(data);
      }
    })
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex space-x-3">
        <button onClick={addRule}>Add Rule</button>
        <button onClick={startConnection}>Start Connection</button>
        <input placeholder="Ip Address" value={ipAddress} onChange={e => setIpAddress(e.target.value)}></input>
        <input placeholder="Port" value={port} onChange={e => setPort(e.target.value)}></input>
        <input placeholder="Client Id" value={clientId} onChange={e => setClientId(e.target.value)}></input>
        <button onClick={getRulesFromSource}>Refresh Rules</button>
        <button onClick={saveRules}>Save Rules</button>
      </div>
      <div className="overflow-y-auto flex-1">
        {rulesDisplay}
      </div>
    </div>
  )
}

export default RuleTable;