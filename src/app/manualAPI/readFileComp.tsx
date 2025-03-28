'use server';
import path from "path";
import { apiData } from "./apiContainer";
import * as fs from 'fs';

export async function readAPIConfigFile(): Promise<apiData[] | null> {

  console.assert(process.env.API_CONFIG_PATH, "Missing API_CONFIG_PATH")
  try {
    const filePath = path.resolve(process.env.API_CONFIG_PATH ?? "");
    const fileOutput = fs.readFileSync(filePath ?? "", 'utf-8');
    const parsedData = JSON.parse(fileOutput);
    return parsedData;
  }
  catch (e) {
    console.error("Error parsing JSON api data: " + e)
    return Promise.reject();
  }
};