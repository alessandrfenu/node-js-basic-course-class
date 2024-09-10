const mathUtils = require("./math-utils");

let i = 1;

otherIncomingRequests();

let from = 2;
let to = 100;
let max = 10000;
const interval = setInterval(() => {
    console.log("primes: " + longRequest(from, to));
    if(to >= max){
        clearInterval(interval);
    }
    from = to;
    to = to + 100;
}, 50);



/**
 * DO NOT CHANGE IT
 */
function otherIncomingRequests() {
    setInterval(() => {
        console.log(`Id: ${i++}. Doing new incoming request`);
    }, 50);
}

/**
 * DO NOT CHANGE IT
 * @param {*} n
 * @returns
 */
function longRequest(from, n) {
    let id = i++;
    console.log(`Id: ${id}. Starting blocking request. Find primes from ${from} to ${n}`);
    const start = new Date();

    const primes = mathUtils.getPrimeNumbersWithinRange(from, n);

    const end = new Date();
    console.log(`Id: ${id}. Finished blocking request. Elapsed ms: ${end.getTime() - start.getTime()}`);

    return primes;
}