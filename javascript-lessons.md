// Previously:

//  - primitives (null, undefined, string, number, Symbol, Object) 
//  - literals (all primitives apart from Symbol have a literal)
//  - operators and coercion (equality operator, identity operator)
//  - boxing
//  - value types (null, undefined, number, boolean)
//  - reference types (string (with value semantics), Object)
//  - touched on inheritance

// Today:

//  - objects, properties, constructor functions, methods, classes
//  - functions
//  - variable declartions, scope (lexical function, block, module)
//  - this, call, bind, apply
//  - closures
//  - intrinsics (Array, Boolean, Date, Error, Function, Global, JSON, Math, Number, Object, RegExp, String)

function Arithmetical() {}
const o = new Arithmetical();
console.assert(o instanceof Arithmetical, true);
console.assert(typeof Arithmetical.prototype.times, 'function');
console.assert(o.times(10, 2), 20);
console.assert(o.divide(10, 2)(), 5);
console.assert(o.add(10, 2).equals(), 12);
console.assert(o.subtract({ left: 10, right: 2 }).equals(), 8);


// // Last week:

// //  - objects
// //  - functions (inc constructor functions and `new`)
// //  - prototype chain
// //  - scope
// //  - closures
 
// Homework...

// Today we will review last week, cover the homework solutions and continue with the following:

// -	“this”
// -	Scope in ES2015+ (block scope)
// -	Classes
// -	Asynchronicity

// If we have time there will also be some short coding exercises…

// Last week we covered:

// -	The homework from the previous week
// -	The prototype chain
// -	Scope

// Today we will review what we covered last week, and cover the following:

// -	this
// -	classes
// -	asynchronicity
