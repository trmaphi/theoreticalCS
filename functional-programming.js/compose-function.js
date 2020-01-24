const f = n => n * 2;
const g = n => n + 1;
const h = x => f(g(x));

console.log(h(20))

// Algebra function composition
/**
 * g: a -> b
 * f: b -> c
 * h: a -> c
 * f(g(x)) = h(x)
 */

const compose2 = (f, g) => x => f(g(x));

console.log(compose2(n => n * 2, n => n + 1)(20))

const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x);

console.log(compose2(n => n * 2, n => n + 1)(20))
