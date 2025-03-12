'use client';

import AuthBox from "./authBox"
import { useEffect, useState } from "react";
import MonitorContainer from "./monitorContainer";
import StatsBox from "./statsBox";
import webSocketHelper from "./webSocketHelper";
import Banner from "@/globalComponents/banner";

const ParentComp = () => {

  const [currentState, setCurrentState] = useState<number | null>(null);
  const [current, setCurrent] = useState<number | null>(null);
  const [voltage, setVoltage] = useState<number | null>(null);
  const [powerLimit, setPowerLimit] = useState<number | null>(null);
  const [currentPower] = useState<number | null>(null);
  let stateSocket: webSocketHelper;

  useEffect(() => {
    stateSocket = new webSocketHelper("ws://10.20.27.100/api/outlets/ccs/statestream", newMessageCallback);
    return () => {
      stateSocket.closeSocket();
    }
  }, []);

  function newMessageCallback() {
    const message = JSON.parse(stateSocket.getLatestMessage());

    setCurrentState(message.phs);
    setCurrent(message.pc);
    setVoltage(voltage == null ? 0 : voltage + 1);
    setPowerLimit(message.pLimit);
    //Set current power;
  }


  return (
    <div>
      <Banner/>
      <div className="w-full flex">
        <MonitorContainer name="Auth Settings">
          <AuthBox currentState={currentState} />
        </MonitorContainer>
        <MonitorContainer name="Stats">
          <StatsBox current={current} voltage={voltage} powerLimit={powerLimit} currentPower={currentPower} />
        </MonitorContainer>
      </div>
    </div>
  )
}

export default ParentComp