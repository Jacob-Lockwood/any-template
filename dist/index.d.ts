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
export default function template<Values extends string>(strings: TemplateStringsArray, ...values: readonly Values[]): Template<Values>;
