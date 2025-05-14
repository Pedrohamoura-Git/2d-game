const fs = require("fs");
const path = require("path");

const sourceHookPath = path.join(__dirname, "commit-msg");
const gitHooksDir = path.join(__dirname, "..", ".git", "hooks");
const targetHookPath = path.join(gitHooksDir, "commit-msg");

if (!fs.existsSync(gitHooksDir)) {
    console.error(
        "❌ Git hooks directory not found. Did you initialize a Git repository?"
    );
    process.exit(1);
}

try {
    fs.copyFileSync(sourceHookPath, targetHookPath);
    fs.chmodSync(targetHookPath, 0o755); // Ensure it's executable
    console.log("✅ commit-msg hook installed successfully.");
} catch (err) {
    console.error("❌ Failed to install commit-msg hook:", err);
    process.exit(1);
}

