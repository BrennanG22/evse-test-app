import React, { JSX } from "react";
import * as fs from 'fs';
import APIEntry from "./apiEntry";
import path from "path";

export interface apiData {
  apiName: string;
  apiDescription: string;
  apiExample?: string;
  endpoint: string;
  method: string;
  headers: JSON;
  bodyType: string;
}

const APIContainer = () => {
  const data: apiData[] = readAPIConfigFile() ?? [];
  const tempRender: JSX.Element[] = [];
  data.forEach((data) => {
    tempRender.push(<APIEntry key={data.apiName} data={data} executeCallback={executeAPI} />)
  })

  function executeAPI(data: apiData) {

  }

  return (
    <>
      <div className="space-y-2">
        {tempRender}
      </div>
    </>
  )
}

function readAPIConfigFile(): apiData[] | null {
  console.assert(process.env.API_CONFIG_PATH, "Missing API_CONFIG_PATH")
  try {
    const filePath = path.resolve(process.env.API_CONFIG_PATH ?? "");
    const fileOutput = fs.readFileSync(filePath ?? "", 'utf-8');
    const parsedData = JSON.parse(fileOutput);
    console.log(parsedData)
    return parsedData;
  }
  catch (e) {
    console.error("Error parsing JSON api data: " + e)
    return null;
  }
}

export default APIContainer;