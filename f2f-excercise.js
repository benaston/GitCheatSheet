Paste the following into a snippet in Chrome devtools.
Each question consists of assertions that should be made to pass by the candidate.
Note that Q3 introduces breaking API changes, so assertions in Q1 and Q2 become invalid from then on.
Questions
// Q1
// console.assert(add(1,2) === 3, '1+2 should be 3');

// Q2
// console.assert(add(1,2,3) === 6, '1+2+3 should be 6');
// console.assert(add(1,2,3,4) === 10, '1+2+3+4 should be 10');
// console.assert(add(1,2,3,4,5) === 15, '1+2+3+4+5 should be 15');

// Q3
// console.assert(add(1,2,3).value() === 6, '1+2+3 should be 6');
// console.assert(add(1,2,3).add(4).value() === 10, '1+2+3+4 should be 10');
// console.assert(add(1,2,3).add(4).add(5).value() === 15, '1+2+3+4+5 should be 15');

// Q4
// console.assert((add(1, 2).isPositive()), '1+2 should be positive');
// console.assert(!(add(1, -2).isPositive()), '1-2 should be negative');

// Q5
// console.assert(add(1,2)(3)(4).value() === 10, '1-2+3+4 should be 6');

// Q6
// Now pull the summing operation into its own function and add a call counter 
// to count how many times the mathematical summing operation is performed
// add(1,2).value();
// console.assert(sum.callCount() === 1, 'sum.callCount should be 1');
// add(1,2).value();
// console.assert(sum.callCount() === 2, 'sum.callCount should be 2');

// Q7
// Change the code so that `sum` is only ever called once for a given set of arguments.
// add(1,2).value();
// console.assert(sum.callCount() === 1, 'sum.callCount should be 1');
// add(1,2).value();
// console.assert(sum.callCount() === 1, 'sum.callCount should be 1 (because we called it with the same arguments twice)');
Answers
// Q1
// console.assert(add(1,2) === 3, '1+2 should be 3');

// function add(a, b) {
//     return a + b;
// }


// Q2
// console.assert(add(1,2,3) === 6, '1+2+3 should be 6');
// console.assert(add(1,2,3,4) === 10, '1+2+3+4 should be 10');
// console.assert(add(1,2,3,4,5) === 15, '1+2+3+4+5 should be 15');

// function add() {
//     return [].slice.call(arguments)
//         .reduce(function(p, c) {
//             return p + c;
//         }, 0);
// }

// -- or --

// function add(...args) {
//     return args
//         .reduce(function(p, c) {
//             return p + c;
//         }, 0);
// }


// Q3
// console.assert(add(1,2,3).value() === 6, '1+2+3 should be 6');
// console.assert(add(1,2,3).add(4).value() === 10, '1+2+3+4 should be 10');
// console.assert(add(1,2,3).add(4).add(5).value() === 15, '1+2+3+4+5 should be 15');

// function add(...args) {
//     return {
//         add: function(...args1) {
//             return add(...args.concat(args1));
//         },
//         value: function() {
//             return sum(args);
//         }
//     };
// }

// function sum(args) {
//     return args
//         .reduce(function(p, c) {
//             return p + c;
//         }, 0);
// }


// Q4
// console.assert((add(1, 2).isPositive()), '1+2 should be positive');
// console.assert(!(add(1, -2).isPositive()), '1-2 should be negative');

// function add(...args) {
//     return {
//         add: function(...args1) {
//             return add(...args.concat(args1));
//         },
//         value: function() {
//             return sum(args);
//         },
//         isPositive: function() {
//             return sum(args) >= 0;
//         }
//     };
// }

// function sum(args) {
//     return args
//         .reduce(function(p, c) {
//             return p + c;
//         }, 0);
// }


// Q5
// console.assert(add(1,2)(3)(4).value() === 10, '1-2+3+4 should be 6');

// function add(...args) {       
//     var tmp = add.bind(null, ...args);
//     tmp.value = () => sum(...args);
//     return tmp;
// }

// function sum(...args) {
//     return args.reduce(function(p,c) {
//       return p+=c;
//     }, 0);
// }

// -- or --

// function add(...args1) {
//     if (!args1.length) {
//         return 0;
//     }

//     function inner(...args2) {
//         if (!args2.length) {
//             return sum(...args1.concat(args2));
//         }
//         return add(...args1.concat(args2));
//     }

//     inner.value = function() {
//       return sum(...args1);
//     };

//     return inner;
// }

// function sum(...args) {
//     return args.reduce((p, c) => p + c, 0);
// }


// Q6
// Now pull the summing operation into its own function and add a call counter to count how many times the mathematical summing operation is performed

// function add(...args) {       
//     var tmp = add.bind(null, ...args);
//     tmp.value = () => sum(...args);
//     return tmp;
// }

// let callCount = 0;
// function sum(...args) {
//     callCount++;
//     return args.reduce(function(p,c) {
//       return p+=c;
//     }, 0);
// }

// sum.callCount = function() {
//     console.log(callCount)
//     return callCount;
// }

// add(1,2).value();
// console.assert(sum.callCount() === 1, 'sum.callCount should be 1');
// add(1,2).value();
// console.assert(sum.callCount() === 2, 'sum.callCount should be 2');


// Q7
// Change the code so that `sum` is only ever called once for a given set of arguments.

// var mem = {};
// function add(...args) {       
//     var tmp = add.bind(null, ...args);
//     tmp.value = () => mem[[...args].toString()] || sum(...args);
//     return tmp;
// }

// let callCount = 0;
// function sum(...args) {
//     var result;
//     callCount++;
//     result = args.reduce(function(p,c) {
//       return p+=c;
//     }, 0);
//     mem[[...args].toString()] = result;
//     return result;
// }

// sum.callCount = function() {
//     console.log(callCount)
//     return callCount;
// }

// add(1,2).value();
// console.assert(sum.callCount() === 1, 'sum.callCount should be 1');
// add(1,2).value();
// console.assert(sum.callCount() === 1, 'sum.callCount should be 1 (because we called it with the same arguments twice)');
