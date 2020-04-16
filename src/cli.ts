#!/usr/bin/env node
import { puppet } from "./";

const pathToFile = process.argv[2];
if (!pathToFile) throw new Error("Path required: puppet 'path/to/file.puppet'");

const numberOfSteps = process.argv.length - 2;

if (numberOfSteps === 1) {
  puppet(pathToFile);
} else {
  const arr = [...process.argv];
  arr.splice(0, 2);
  puppet(arr);
}
