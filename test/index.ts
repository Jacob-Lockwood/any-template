import template from "../src/index.js";
import { exit } from "node:process";

const failed: string[] = [];

const assert = (condition: boolean, message: string) => {
  if (condition) console.log("✅ Test succeded:", message);
  else {
    console.error("❌ Test failed:", message);
    failed.push(message);
  }
};

const greeting = template`Good ${"timeOfDay"}, ${"name"}!`;
const parsed = greeting.parse("Good morning, friend!");
assert(
  parsed.timeOfDay === "morning" && parsed.name === "friend",
  "parse works",
);
const stringified = greeting.stringify({
  timeOfDay: "evening",
  name: "Pikachu",
});
assert(stringified === "Good evening, Pikachu!", "stringify works");

if (failed.length !== 0) {
  console.error("\nFailed tests:", failed.join(", "), "\n");
  exit(1);
}
