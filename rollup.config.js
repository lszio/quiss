// "use strict";
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import clear from "rollup-plugin-clear";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";
import resolve from "@rollup/plugin-node-resolve";
import screeps from "rollup-plugin-screeps";
import typescript from "rollup-plugin-typescript2";

let config;
const dest = process.env.DEST;
if (!dest) {
  console.log("No destination specified - code will be compiled but not uploaded");
} else if ((config = require("./screeps.json")[dest]) == null) {
  throw new Error("Invalid upload destination");
}

const remotep = config.token || (config.email && config.password);

function concatPath(host, port, branch) {
  pass
}

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
    // screeps({config: config, dryRun: config == null})
    remotep
      ? screeps({ config, dryRun: !config })
      : copy({
          targets: [
            {
              src: "dist/main.js",
              dest: config.copyPath
            },
            {
              src: "dist/main.js.map",
              dest: config.copyPath,
              rename: name => name + ".map.js",
              transform: contents => `module.exports = ${contents.toString()};`
            }
          ],
          hook: "writeBundle",
          verbose: true
        })
  ]
};
