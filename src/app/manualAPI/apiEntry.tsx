'use client';

import { apiData } from "@/app/manualAPI/apiContainer";
import { KeyboardEvent, useState } from "react";

interface apiEntryProps {
  data: apiData;
}

const APIEntry: React.FC<apiEntryProps> = ({ data }) => {

  const [bodyText, setBodyText] = useState<string>("");
  const [bgColour, setBgColour] = useState<string>("bg-slate-100");
  const [dataExpanded, setDataExpanded] = useState<boolean>(false);
  const [response, setResponse] = useState<string>();

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    console.log(e);
    if (e.key === "Tab") {
      e.preventDefault();
      const selectionStart = e.currentTarget.selectionStart;
      const selectionEnd = e.currentTarget.selectionEnd;
      const newValue = bodyText.substring(0, selectionStart) + "\t" + bodyText.substring(selectionEnd);
      setBodyText(newValue);

      // Move cursor forward after tab insertion
      setTimeout(() => {
        e.currentTarget.selectionStart = e.currentTarget.selectionEnd = selectionStart + 1;
      }, 0);
    }
  };

  async function fetchAPI() {
    const res = await fetch(data.endpoint);
    if(res.ok){
      setResponse(await res.text());
    }
  }

  function mouseEnter() {
    setBgColour("bg-slate-300");
  }

  function mouseLeave() {
    setBgColour("bg-slate-100");
  }

  function toggleExpandedData() {
    if (!dataExpanded) {
      setDataExpanded(true);
    }
    else {
      setDataExpanded(false);
    }
  }

  return (
    <div className={`${bgColour} border-l-4 border-slate-500 shadow-md rounded-lg  transition-colors duration-200`}>
      <div className="w-full p-4"
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
        onClick={toggleExpandedData}>

        <p className="flex items-center space-x-2 select-none">
          <span className="inline-flex bg-slate-600 text-white rounded-full text-lg font-bold w-7 h-7 items-center justify-center">
            {!dataExpanded? '>':'v'}
          </span>
          <span className="text-xl font-semibold text-slate-700">{data.apiName}</span>
          <span className="text-slate-500">•</span>
          <span className="text-md text-slate-600">{data.apiDescription}</span>
        </p>
      </div>
      {dataExpanded && (
        <div className="p-2">
          <div className="m-4">
            <h1 className="text-lg font-semibold text-slate-800">Example</h1>
          </div>
          <div className="m-4">
            <h1 className="text-lg font-semibold text-slate-800">Body</h1>
            <textarea className="w-full leading-tight mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 transition" rows={5}
              onChange={(e) => setBodyText(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)} value={bodyText} />
            <div className="flex space-x-3 mt-4">
              <button className="px-3 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
                onClick={fetchAPI}>
                Execute
              </button>
            </div>
          </div>
          {response && (
            <div className="m-4">
              <h1 className="text-lg font-semibold text-slate-800">Response</h1>
              {response}
            </div>)}
        </div>
      )}
    </div>
  )
}

export default APIEntry;