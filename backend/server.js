const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/compile", (req, res) => {
  const { code } = req.body;
  const uniqueId = crypto.randomBytes(8).toString("hex");

  const srcFile = path.join(__dirname, `temp_${uniqueId}.mox`);
  const isWindows = process.platform === "win32";
  const exeName = isWindows ? `temp_${uniqueId}.exe` : `temp_${uniqueId}`;
  const exeFile = path.join(__dirname, exeName);

  fs.writeFileSync(srcFile, code);

  // 1. Create a custom environment that explicitly includes your Moksha and MinGW paths
  const customEnv = Object.assign({}, process.env);
  if (isWindows) {
    // Note: Adjust C:\\Moksha\\bin if your mokshac.exe is located somewhere else!
    customEnv.PATH = `C:\\Moksha\\bin;C:\\msys64\\mingw64\\bin;${customEnv.PATH}`;
  }

  // 2. Standard Windows execution (No bash overhead!)
  const runCommand = isWindows ? `.\\${exeName}` : `./${exeName}`;
  const command = `mokshac ${srcFile} -o ${exeFile} && ${runCommand}`;

  // 3. Execute with 10s timeout and our custom PATH environment
  exec(command, { timeout: 10000, env: customEnv }, (error, stdout, stderr) => {
    // Clean up files
    if (fs.existsSync(srcFile)) fs.unlinkSync(srcFile);
    if (fs.existsSync(exeFile)) fs.unlinkSync(exeFile);

    if (error) {
      if (error.killed) {
        return res.status(408).json({
          error:
            "Execution Timed Out (Took longer than 10 seconds. Possible infinite loop or antivirus scan delay).",
        });
      }
      return res.status(400).json({ error: stderr || error.message });
    }

    res.json({ output: stdout });
  });
});

app.listen(3001, () => console.log("Compiler API running on port 3001"));
