import { HasEmail } from "./1-basics";

//== TOP TYPES ==//

/**
 * (1) "Top types" are types that can hold any value. Typescript has two of them
 */

// let myAny: any = 32;
// let myUnknown: unknown = "hello, unknown";

// Note that we can do whatever we want with an any, but nothing with an unknown

// myAny.foo.bar.baz;
// myUnknown.foo;

/**
 * (2) When to use `any`
 * Anys are good for areas of our programs where we want maximum flexibility
 * Example: sometimes a Promise<any> is fine when we don't care at all about the resolved value
 */
// async function logWhenResolved(p: Promise<any>) {
//   const val = await p;
//   console.log("Resolved to: ", val);
// }

/**
 * (3) When to use `unknown`
 * Unknowns are good for "private" values that we don't want to expose through a public API.
 * They can still hold any value, we just must narrow the type before we're able to use it.
 *
 * We'll do this with a type guard.
 */

// myUnknown.split(", "); // 🚨 ERROR

/**
 * (4) Built-in type guards
 */
// if (typeof myUnknown === "string") {
//   // in here, myUnknown is of type string
//   myUnknown.split(", "); // ✅ OK
// }
// if (myUnknown instanceof Promise) {
//   // in here, myUnknown is of type Promise<any>
//   myUnknown.then(x => console.log(x));
// }

/**
 * (5) User-defined type guards
 * We can also create our own type guards, using functions that return booleans
 */

// // 💡 Note return type
// function isHasEmail(x: any): x is HasEmail {
//   return typeof x.name === "string" && typeof x.email === "string";
// }

// if (isHasEmail(myUnknown)) {
//   // In here, myUnknown is of type HasEmail
//   console.log(myUnknown.name, myUnknown.email);
// }

// // my most common guard
// function isDefined<T>(arg: T | undefined): arg is T {
//   return typeof arg !== "undefined";
// }

// // NEW TS 3.7: assertion-based type guards!
// function assertIsStringArray(arr: any[]): asserts arr is string[] {
//   if (!arr) throw new Error('not an array!');
//   const strings = arr.filter(i => typeof i === 'string');
//   if (strings.length !== arr.length) throw new Error('not an array of strings');
// }

// const arr: (string|number)[] = ['3', 12, '21'];
// assertIsStringArray(arr);
// arr;

/**
 * (6) Dealing with multiple unknowns
 * -   We kind of lose some of the benefits of structural typing when using `unknown`.
 * -   Look how we can get mixed up below
 */

// let aa: unknown = 41;
// let bb: unknown = ["a", "string", "array"];
// bb = aa; // 🚨 yikes

/**
 * (7) Alternative to unknowns - branded types
 * -   One thing we can do to avoid this is to create types with structures that
 * -   are difficult to accidentally match. This involves unsafe casting, but it's ok
 * -   if we do things carefully
 */

/* two branded types, each with "brand" and "unbrand" functions */
// interface BrandedA {
//   __this_is_branded_with_a: "a";
// }
// function brandA(value: string): BrandedA {
//   return (value as unknown) as BrandedA;
// }
// function unbrandA(value: BrandedA): string {
//   return (value as unknown) as string;
// }

// interface BrandedB {
//   __this_is_branded_with_b: "b";
// }
// function brandB(value: { abc: string }): BrandedB {
//   return (value as unknown) as BrandedB;
// }
// function unbrandB(value: BrandedB): { abc: string } {
//   return (value as unknown) as { abc: string };
// }

// let secretA = brandA("This is a secret value");
// let secretB = brandB({ abc: "This is a different secret value" });

// secretA = secretB; // ✅ No chance of getting these mixed up
// unbrandB(secretA);
// unbrandA(secretB);

// // back to our original values
// let revealedA = unbrandA(secretA);
// let revealedB = unbrandB(secretB);

// 💡 PROTIP - always brand/unbrand casting in exactly one place.

//== BOTTOM TYPE: never ==//

/**
 * (8) Bottom types can hold no values. TypeScript has one of these: `never`
 */
// let n: never = 4;

/**
 * A common place where you'll end up with a never
 * is through narrowing exhaustively
 */

// let x = "abc" as string | number;

// if (typeof x === "string") {
//   // x is a string here
//   x.split(", ");
// } else if (typeof x === "number") {
//   // x is a number here
//   x.toFixed(2);
// } else {
//   // x is a never here
// }

/**
 * (9) We can use this to our advantage to create exhaustive conditionals and switches
 */

// class UnreachableError extends Error {
//   constructor(val: never, message: string) {
//     super(`TypeScript thought we could never end up here\n${message}`);
//   }
// }

// let y = 4 as string | number;

// if (typeof y === "string") {
//   // y is a string here
//   y.split(", ");
// } else if (typeof y === "number") {
//   // y is a number here
//   y.toFixed(2);
// } else {
//   throw new UnreachableError(y, "y should be a string or number");
// }
