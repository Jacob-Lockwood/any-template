# `any-template`

A tiny package for parsing and stringifying tagged template strings. Make a tiny template in seconds:

```typescript
import template from "any-template";
const greeting = template`Good ${"timeOfDay"}, ${"name"}!`;
greeting.parse("Good morning, friend!") // { timeOfDay: "morning", name: "friend" }
greeting.stringify({ timeOfDay: "evening", name: "Pikachu" }) // "Good evening, Pikachu!"
```