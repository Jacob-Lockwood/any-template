/**
 * Create a template from a template string.
 * @example
 * const greeting = template`Good ${"timeOfDay"}, ${"name"}!`;
 * greeting.parse("Good morning, friend!") // { timeOfDay: "morning", name: "friend" }
 * greeting.stringify({ timeOfDay: "evening", name: "Pikachu" }) // "Good evening, Pikachu!"
 */
export default function template(strings, ...values) {
    const escaped = strings.map((str) => str.replace(/[/\-\\^$*+?.()|[\]{}]/g, "\\$&"));
    const regex = new RegExp(values.reduce((full, curr, i) => full + `(?<${curr}>.*)` + escaped[i + 1], escaped[0]));
    return {
        parse: (input) => { var _a; return (((_a = input.match(regex)) === null || _a === void 0 ? void 0 : _a.groups) || {}); },
        stringify: (input) => String.raw(strings, ...values.map((val) => input[val])),
    };
}
