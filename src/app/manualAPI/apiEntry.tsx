'use client';

import { apiData } from "@/app/manualAPI/apiContainer";
import { KeyboardEventHandler, useState } from "react";

interface apiEntryProps {
  data: apiData;
}

const APIEntry: React.FC<apiEntryProps> = ({ data }) => {

  const [bodyText, setBodyText] = useState<string>("");

  const handleKeyDown = (e: any) => {
    console.log(e);
    if (e.key === "Tab") {
      e.preventDefault();
      const { selectionStart, selectionEnd } = e.target;
      const newValue = bodyText.substring(0, selectionStart) + "\t" + bodyText.substring(selectionEnd);
      setBodyText(newValue);

      // Move cursor forward after tab insertion
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = selectionStart + 1;
      }, 0);
    }
  };

  function startCallback() {
    // executeCallback(data);
  }

  return (
    <div className="bg-slate-100 border-l-4 border-slate-500 shadow-md rounded-lg p-4">
      <p className="flex items-center space-x-2">
        <span className="inline-flex bg-slate-600 text-white rounded-full text-lg font-bold w-7 h-7 items-center justify-center">
          &gt;
        </span>
        <span className="text-xl font-semibold text-slate-700">{data.apiName}</span>
        <span className="text-slate-500">•</span>
        <span className="text-md text-slate-600">{data.apiDescription}</span>
      </p>
      <div className="ml-4">
        <div className="mt-4">
          <h1 className="text-lg font-semibold text-slate-800">Example</h1>

        </div>
        <div className="mt-4">
          <h1 className="text-lg font-semibold text-slate-800">Body</h1>
          <textarea className="w-full leading-tight mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 transition" rows={5}
          onChange={(e) => setBodyText(e.target.value)}
          onKeyDown={handleKeyDown} value={bodyText}/>
          <div className="flex space-x-3 mt-4">
            <button className="px-3 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
              onClick={startCallback}>
              Execute
            </button>
            <button className="px-3 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition">
              Cancel
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default APIEntry;