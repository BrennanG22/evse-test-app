'use client';

import AuthBox from "./authBox"
import { useEffect, useState } from "react";
import MonitorContainer from "./monitorContainer";
import StatsBox from "./statsBox";

const ParentComp = () => {
    
    const [currentState, setCurrentState] = useState<number | null>(null);
    const [current, setCurrent] = useState<number |null>(null);
    return(
        <div className="w-full flex">
            <MonitorContainer name="Auth Settings">
                <AuthBox currentState={currentState}/>
            </MonitorContainer>
            <MonitorContainer name="Stats">
              <StatsBox current={current}/>
            </MonitorContainer>
        </div>
    )
}

export default ParentComp