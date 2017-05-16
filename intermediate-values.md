Dealing with intermediate values:

There has been discussion in TC-39 for an "existential" or "null-propagation" operator to support this use case, but it is not scheduled for inclusion in the language AFAICT.
For trivial cases you can use type coercion and the && operator.
 
    var foo = { bar: { bam: 'bam' } };
    var result = foo.bar && foo.bar.bam;
 
For more involved cases you'll need to write your own function or use a library.
e.g. `Ramda.path`:
 
    const getBam = R.path(['bar', 'bam'])
    const result = getBam(foo);
 
Finally I wrote a library called safeValue for this use case (and there are others!).
