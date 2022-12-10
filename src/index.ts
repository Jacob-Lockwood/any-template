export interface Template<T extends string> {
  /** Parse an input string to an object */
  parse: (input: string) => Record<T, string | undefined>;
  /** Stringify an object to a string using the template */
  stringify: (input: Record<T, string>) => string;
}
/**
 * Create a template from a template string.
 * @example
 * const greeting = template`Good ${"timeOfDay"}, ${"name"}!`;
 * greeting.parse("Good morning, friend!") // { timeOfDay: "morning", name: "friend" }
 * greeting.stringify({ timeOfDay: "evening", name: "Pikachu" }) // "Good evening, Pikachu!"
 */
export default function template<Values extends string>(
  strings: TemplateStringsArray,
  ...values: readonly Values[]
): Template<Values> {
  const escaped = strings.map((str) =>
    str.replace(/[/\-\\^$*+?.()|[\]{}]/g, "\\$&"),
  );
  const regex = new RegExp(
    values.reduce<string>(
      (full, curr, i) => full + `(?<${curr}>.*)` + escaped[i + 1],
      escaped[0],
    ),
  );
  return {
    parse: (input: string) =>
      (input.match(regex)?.groups || {}) as Record<Values, string | undefined>,
    stringify: (input: Record<Values, string>) =>
      String.raw(strings, ...values.map((val) => input[val])),
  };
}
