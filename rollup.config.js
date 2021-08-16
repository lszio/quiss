// "use strict";

import clear from "rollup-plugin-clear";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";
import resolve from "@rollup/plugin-node-resolve";
import screeps from "rollup-plugin-screeps";
import typescript from "rollup-plugin-typescript2";
import os from "os";

let config;
const dest = process.env.DEST;
if (!dest) {
  console.log("No destination specified - code will be compiled but not uploaded");
} else if ((config = require("./screeps.json")[dest]) == null) {
  throw new Error("Invalid upload destination");
}

const remotep = config.token || (config.email && config.password);

function concatPath(host="screeps.com", port, branch="default"){
  host.match(/(\d{1,3}.){3}\d{1,3}/) && (
      host = host.replace(/\./g, "_")
  )
  port && (
      host = `${host}___${port}`
  )
  let folder = ""
  if (os.type() === "Windows_NT"){
      folder = "/AppData/Local/Screeps/scripts"
  } else {
      folder = "" // TODO
  }
  return process.env.HOME + folder + "/" + host + "/" + branch
}

const localPath = concatPath(config.hostname, config.port, config.branch)

export default {
  input: "src/main.ts",
  output: {
    file: "dist/main.js",
    format: "cjs",
    sourcemap: true
  },

  plugins: [
    clear({ targets: ["dist"] }),
    resolve({ rootDir: "src" }),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json" }),
    remotep
      ? screeps({ config, dryRun: !config })
      : copy({
          targets: [
            {
              src: "dist/main.js",
              dest: localPath
            },
            {
              src: "dist/main.js.map",
              dest: localPath,
              rename: name => name + ".map.js",
              transform: contents => `module.exports = ${contents.toString()};`
            }
          ],
          hook: "writeBundle",
          verbose: true
        })
  ]
};
