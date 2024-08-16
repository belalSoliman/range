class Sequence {
  constructor(begin, finish, stride) {
    this.begin = begin;
    this.finish = finish;
    this.stride = Math.abs(stride);
    this.stepDirection = finish >= begin ? 1 : -1;
  }

  *[Symbol.iterator]() {
    let currentValue = this.begin;
    while (
      (this.stepDirection > 0 && currentValue < this.finish) ||
      (this.stepDirection < 0 && currentValue > this.finish)
    ) {
      yield currentValue;
      currentValue += this.stride * this.stepDirection;
    }
  }
}

console.log("Using for...of loop:");
for (const value of new Sequence(0, 10, 2)) {
  console.log(value); // Logs values: 0, 2, 4, 6, 8
}

console.log("Using spread operator:");
console.log([...new Sequence(10, 0, 2)]); // Logs [10, 8, 6, 4, 2]

console.log("Manual iteration with .next():");
const iter = new Sequence(5, 15, 3)[Symbol.iterator]();
console.log(iter.next()); // Logs { value: 5, done: false }
console.log(iter.next()); // Logs { value: 8, done: false }
console.log(iter.next()); // Logs { value: 11, done: false }
console.log(iter.next()); // Logs { value: 14, done: false }
console.log(iter.next()); // Logs { value: undefined, done: true }
