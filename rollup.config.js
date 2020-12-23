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

const Sync =
  config && config.copyPath
    ? copy({
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
    : screeps({ config, dryRun: !config });

export default {
  input: "src/main.ts",
  output: {
    file: "dist/main.js",
    format: "cjs",
    sourcemap: true
  },

  plugins: [
    clear({
      targets: ["dist"]
    }),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json"
    }),
    Sync
  ]
};