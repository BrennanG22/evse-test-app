'use client';

import AuthBox from "./authBox"
import { useEffect, useState } from "react";
import MonitorContainer from "./monitorContainer";
import StatsBox from "./statsBox";

const ParentComp = () => {
    
    const [currentState, setCurrentState] = useState<number | null>(null);
    const [current, setCurrent] = useState<number |null>(null);
    const [voltage, setVoltage] = useState<number | null>(null);
    const [powerLimit, setPowerLimit] = useState<number | null>(null);
    const [currentPower, setCurrentPower] = useState<number | null>(null);

    return(
        <div className="w-full flex">
            <MonitorContainer name="Auth Settings">
                <AuthBox currentState={currentState}/>
            </MonitorContainer>
            <MonitorContainer name="Stats">
              <StatsBox current={current} voltage={voltage} powerLimit={powerLimit} currentPower={currentPower}/>
            </MonitorContainer>
        </div>
    )
}

export default ParentComp