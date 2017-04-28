Further to my [previous post](https://confluence.hk.hsbc/display/UUI/2017/04/10/Promises+in+JavaScript) about how to use promises I thought I'd write something about how they actually work.

##Promises are magical

Promises are the application of [monad-like or functor-like](https://www.quora.com/What-are-monads-in-functional-programming-and-why-are-they-useful) functional principles to the problem of code organisation.

Promises show how with the right factoring and with the right primitive concepts, complex behavior can be dramatically simplified.

The key features of the promise construct are:

 - wrapping of a deferred a value
 - well defined state transition control
 - composability and interoperability with other promises
 - code flattening
 - straightforward error propagation


##Behind the curtain...

Now to remove the magic! 

To implement a promise you need:

###1. A state machine

In order to achieve interoperability between promise libraries an implementation standard has emerged called [Promises/A+](https://promisesaplus.com/). 

Promises/A+ defines the API, certain parts of promise logic and the valid set of transitions. 

They are:

 - pending => fulfilled (with a value)
 - pending => rejected (with a reason)

A state machine is included at the end of this post.

###2. A way of scheduling a Job on the Job priority queue.

The following function wraps a function so that it is run asynchronously. Here we use `setTimeout` (macrotask) for the asynchronocity. 

```
function async(cb) {
    return (...args)=>setTimeout(()=>cb(...args));
}
```

In "real life", the WHATWG has mandated that Promises are actually serviced as *micro*tasks, which gives native promises on the Web a different priority of execution.

###3. A trampoline
[A trampoline](https://en.wikipedia.org/wiki/Trampoline_(computing)) is just a fancy name for a loop that iteratively invokes thunk-returning functions. A [thunk](https://en.wikipedia.org/wiki/Thunk) is a program-generated function to support the evaluation of another. 

In our promise implementation we create thunks corresponding to `then` invocations that will coordinate the running of the `then` logic.

```
const go = async(function(thens, result) {
    while (thens.length) {
        thens.pop()(result);
    }
});
```

###4. A constructor

The promise constructor sets the initial state and immediately and synchronously runs the executor function.

`machine` is the state machine controlling promise state transitions.

```
function Promise(executor = ()=>{}) {
    const thens = [];
    const p = {
        then,
        catch: ccatch,
        resolve,
        reject,
    };
    machine.transition(p, states.pending);
    executor(resolve, reject);
    return p;
    // `resolve`, `reject`, `then` and `catch` go in here...
}
```

###5. A resolution (and a rejection) function

These functions invoke the state transition and ensure actioning of the promise chain continues, with a call to the trampoline. The `rejection` function is similar and not supplied here.

```
function resolve(result) {
    machine.transition(p, states.fulfilled, result);
    go(thens, result);
}
```

###6. A `then` (and a `catch`) function

This is the heart of a promise implementation. It enables composability, branching and deferred switching from wrapper to result.

A `catch` implementation is not supplied here.

What follows is a simplified (but viable) `then` implementation:

```
function then(cb) {
    const p = new Promise();
    thens.unshift(inboundValue=>{
        const result = cb(inboundValue);
        if (result && result.then) {
            p['__isResolved__'] = true;
            result.then(subResult=>{
                p.resolve(subResult);
                return subResult;
            });
            return;
        }
        p.resolve(result)
    });
    return p;
}
`

Note that the `thens` array in conjunction with the **returning of a new promise** with each invocation of `then`, and the linking of the outcome of sub-promises via `then` is needed to enable the branching behavior required as part of Promises/A+. 

This is an example of branching:

```
const p = new Promise(() => {});
p.then(result=>'a').then(console.log); // a
p.then(result=>'b').then(console.log); // b
```

##Notes

 - the most important method, arguably, is `then`
 - `then` provides the logic for the wrapping of the future value
 - deferred resolution is provided by the asynchronous trampoline 
 - a queue data structure (`thens`) is used for first-in-first-out behavior. i.e. the first `then` supplied is the first one evaluated.
 - the Promise/A+ specification is a community-driven specification for promise interoperability and it defines the permitted state transitions
 - `then` enables composability by implementing special handling logic for return values of type "promise"
 - the chainable nature of the promise API flattens code that would otherwise be highly nested, and lends itself to simpler error propagation
 - the error handling implementation (`reject`, `catch`) in promises is similar to the `then` logic, and I have omitted it here for simplicity
 - the promise implementation defined in this post is simplified to help with exposition and although it could be developed to be compliant, it is not compliant with all the details of Promises/A+

##Summary

Promises show that, even though it took over fifteen years for promises to be embraced by the mainstream JavaScript community, with the application of decades-old functional principles, changes to the underlying language are not necessary to support making code simpler to understand and maintain.

##State Machine

```
 const states = {
    'pending': 'pending',
    'rejected': 'rejected',
    'fulfilled': 'fulfilled',
};

const machine = {
    transition,
};

const uninitializedToPending = {
    from: states.uninitialized,
    to: states.pending,
    action: uninitializedToPendingAction
}

const pendingToFulfilled = {
    from: states.pending,
    to: states.fulfilled,
    action: pendingToFulfilledAction
};

const pendingToRejected = {
    from: states.pending,
    to: states.rejected,
    action: pendingToRejectedAction
};

const transitions = [
    uninitializedToPending, 
    pendingToFulfilled, 
    pendingToRejected
];

function transition(promise, to, ...args) {
    const transition = transitions
        .find(t=>t.from === promise['__status__'] && t.to === to); // A map would be faster
    if (!transition) {
        throw 'invalid transition';
    }
    return transition.action(promise, ...args);
}

function uninitializedToPendingAction(p) {
    p['__status__'] = 'pending';
    p['__isResolved__'] = false;
    return p;
}

function pendingToFulfilledAction(p, result) {
    p['__status__'] = 'fulfilled';
    p['__isResolved__'] = true;
    p['__result__'] = result;
    return p;
}

function pendingToRejectedAction(p, reason) {
    p['__status__'] = 'rejected';
    p['__isResolved__'] = true;
    p['__result__'] = reason;
    return p;
}

export default machine;
```
