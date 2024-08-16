function* sequenceGenerator(start, finish, stride) {
  const stepDirection = finish >= start ? 1 : -1;
  const step = Math.abs(stride) * stepDirection;

  for (
    let current = start;
    stepDirection > 0 ? current < finish : current > finish;
    current += step
  ) {
    yield current;
  }
}

console.log("Using for...of loop:");
for (const value of sequenceGenerator(0, 10, 2)) {
  console.log(value); // Logs values: 0, 2, 4, 6, 8
}

console.log("Using spread operator:");
console.log([...sequenceGenerator(10, 0, 2)]); // Logs [10, 8, 6, 4, 2]

console.log("Manual iteration with .next():");
const iterator = sequenceGenerator(5, 15, 3);
console.log(iterator.next()); // Logs { value: 5, done: false }
console.log(iterator.next()); // Logs { value: 8, done: false }
console.log(iterator.next()); // Logs { value: 11, done: false }
console.log(iterator.next()); // Logs { value: 14, done: false }
console.log(iterator.next()); // Logs { value: undefined, done: true }
