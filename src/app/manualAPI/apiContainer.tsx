export const dynamic = 'force-dynamic';

import React, { JSX } from "react";
import APIEntry from "./apiEntry";
import { readAPIConfigFile } from "./readFileComp";


export interface apiData {
  apiName: string;
  apiDescription: string;
  apiExample?: string;
  endpoint: string;
  method: string;
  headers: JSON;
  bodyType: string;
}

export default async function APIContainer() {
  const data: apiData[] = await readAPIConfigFile() ?? [];
  const tempRender: JSX.Element[] = [];
  data.forEach((data) => {
    tempRender.push(<APIEntry key={data.apiName} data={data} />)
  })

  return (
    <>
      <div className="space-y-2">
        {tempRender}
      </div>
    </>
  )
}

