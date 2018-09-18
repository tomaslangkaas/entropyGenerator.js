# entropyGenerator.js
Experimental JavaScript entropy generator

## What is this?

This is a small library (355 bytes minified) to generate entropy (unpredictable values) from JavaScript timing imprecision in any EcmaScript3 runtime. This can be used as an entropy source to seed random number generators to produce unbiased random bits&mdash;the bits of the entropy values are likely biased and thus unsuitable for direct use.

The generator does not depend on any user interaction (such as mouse or keyboard events), and generally produce entropy at a faster rate than these. On slow and old hardware (tested on an Intel atom processor), rough estimates indicate a lower bound of about 250 bits of entropy per second. On current hardware (i5), rough estimates indicate a lower bound of about 7000 bits of entropy per second.

## How to use

The library contains a single function, `entropy()`. To get entropy values, call the function with two arguments; the number of values and a callback function to receive the results. The library has an internal pool of pre-generated entropy values to serve requests faster. The size of this pool can be set by calling the `entropy()` function with a single argument; the new size of the pool.

```javascript
// generate 12 unpredictable values

entropy(12, function(values){console.log(values)});
> [301, 1307, 35, 825, 796, 1842, 2748, 1327, 2433, 807, 1146, 2182]

// generate 12 more

entropy(12, function(values){console.log(values)});
> [2719, 403, 1832, 1091, 2296, 126, 980, 1799, 382, 1836, 739, 680]

// set size of entropy pool to 128 values
entropy(128);
```

### How does it work?

Each entropy value represents how far a program can count before the current date value changes. This is surprisingly unpredictable in JavaScript runtimes.

```
count = 0
while (date value stays the same) {
  count = count + 1
}
```
