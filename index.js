import { runTask } from "./orchestrator.js";

const task = {
  taskType: "phase_approval_logic",
  input: {
    from: "submitted_for_review",
    action: "approve"
  }
};

runTask(task)
  .then(res => console.log("FINAL:", res))
  .catch(err => console.error(err.message));
