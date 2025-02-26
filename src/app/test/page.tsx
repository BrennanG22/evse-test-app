'use client';

import AuthBox from "./authBox"
import { useEffect, useState } from "react";
import MonitorContainer from "./monitorContainer";

const ParentComp = () => {
    
    const [currentState, setCurrentState] = useState<number | null>(null);

    return(
        <div className="w-1/3">
            <MonitorContainer name="Auth Settings">
                <AuthBox currentState={currentState}/>
            </MonitorContainer>
        </div>
    )
}

export default ParentComp