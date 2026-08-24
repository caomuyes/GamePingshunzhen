const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");

const src = process.argv[2];
if (!src) {
  console.error("usage: node scripts/setup-ssh.cjs <path-to-txt>");
  process.exit(1);
}
const content = fs.readFileSync(src, "utf8");

const repoMatch = content.match(/git@github\.com:[\w.-]+\/[\w.-]+\.git|https:\/\/github\.com\/[\w.-]+\/[\w.-]+/);
const keyMatch = content.match(/-----BEGIN [A-Z0-9 ]*PRIVATE KEY-----[\s\S]*?-----END [A-Z0-9 ]*PRIVATE KEY-----/);

if (!repoMatch) {
  console.error("NO-REPO-URL");
  process.exit(1);
}
if (!keyMatch) {
  console.error("NO-PRIVATE-KEY");
  process.exit(1);
}

const key = keyMatch[0].replace(/\r\n/g, "\n") + "\n";
const sshDir = path.join(os.homedir(), ".ssh");
fs.mkdirSync(sshDir, { recursive: true });
const keyPath = path.join(sshDir, "id_github");
fs.writeFileSync(keyPath, key, "utf8");

const icacls = spawnSync("icacls", [keyPath, "/inheritance:r", "/grant:r", `${process.env.USERNAME}:F`], { encoding: "utf8" });
if (icacls.status !== 0) {
  console.error("ICACLS-WARN:", icacls.stderr || icacls.stdout);
}

console.log("KEY-WRITTEN:", keyPath);
console.log("REPO:", repoMatch[0]);

const kg = spawnSync("C:\\Windows\\System32\\OpenSSH\\ssh-keygen.exe", ["-lf", keyPath], { encoding: "utf8" });
console.log("FINGERPRINT:", kg.status === 0 ? kg.stdout.trim() : "ERR " + (kg.stderr || kg.stdout));
