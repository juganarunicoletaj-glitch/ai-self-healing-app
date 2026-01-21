export async function callValidator(task, code) {
  if (!code || typeof code !== "string") {
    return { status: "FAIL", reason: "Empty output" };
  }

  if (code.trim().startsWith("export")) {
    return { status: "PASS" };
  }

  return { status: "FAIL", reason: "Output not code-like" };
}
