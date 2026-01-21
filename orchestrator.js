import { callBuilder } from "./builder.js";
import { callValidator } from "./validator.js";

const sleep = ms => new Promise(r => setTimeout(r, ms));

export async function runTask(task) {
  let retries = 0;

  while (retries < 5) {
    const build = await callBuilder(task);
    const validation = await callValidator(task, build.code);

    if (validation.status === "PASS") {
      console.log("TASK PASSED");
      return build.code;
    }

    retries++;
    console.log("RETRY", retries, validation.reason);

    // IMPORTANT: backoff pentru Gemini
    await sleep(20000); // 20 secunde
  }

  throw new Error("Blocked task");
}
