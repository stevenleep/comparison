import typescript from "rollup-plugin-typescript2";
import commonjs from "rollup-plugin-commonjs";
import sourceMaps from "rollup-plugin-sourcemaps";
import resolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import dts from "rollup-plugin-dts";

const babel = require("rollup-plugin-babel");
const pkg = require("./package.json");

const enableSourcemap = true;
const extensions = [".ts", ".js", ".json", ".node"];

const buildBaseConfig = {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "umd",
      sourcemap: enableSourcemap,
      name: "RenovatorVersion",
    },
    { file: pkg.module, format: "esm", sourcemap: enableSourcemap },
    {
      file: pkg.commonjs,
      format: "cjs",
      sourcemap: enableSourcemap,
      exports: "named",
    },
  ],

  watch: {
    include: "src/**", // watch all files in the src directory
  },
  plugins: [
    typescript({ useTsconfigDeclarationDir: true }),
    commonjs(),
    resolve({ extensions }),
    sourceMaps(),
    terser(),
    babel({
      exclude: "node_modules/**",
      extensions,
    }),
  ],
};
const dtsBaseConfig = {
  input: "src/index.ts",
  output: [{
    file: pkg.types,
    format: "es",
  }],
  plugins: [dts()],
};

export default [buildBaseConfig, dtsBaseConfig];
