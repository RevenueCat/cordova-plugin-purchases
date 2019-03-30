#! /usr/bin/env node
const { spawn } = require("child_process");

let shell = process.env.SHELL || process.env.TERM;
shell = shell && shell.match("bash.exe") ? "bash.exe" : shell;
const platform =
  shell && ["bash.exe", "cygwin"].includes(shell) ? "linux" : process.platform;

console.log(platform);

const version = "2.0.0";
if (platform.startsWith("darwin")) {
  const platformSpecific = spawn("download-purchases-framework.sh", [version], {
    shell: true,
    stdio: "inherit"
  });
  platformSpecific.on("exit", code => {
    process.exit(code);
  });
} else {
  console.log(`Not installing iOS framework on ${platform}`);
}
