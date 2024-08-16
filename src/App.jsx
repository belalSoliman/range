import React, { useState } from "react";

function sequenceGenerator(start, finish, stride) {
  const stepDirection = finish >= start ? 1 : -1;
  const step = Math.abs(stride) * stepDirection;

  function* generator() {
    for (
      let current = start;
      stepDirection > 0 ? current < finish : current > finish;
      current += step
    ) {
      yield current;
    }
  }

  return generator();
}

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

const App = () => {
  // Manual iteration state
  const [manualSeq, setManualSeq] = useState(sequenceGenerator(5, 15, 3));
  const [manualValue, setManualValue] = useState();

  const handleNext = () => {
    const nextValue = manualSeq.next();
    if (!nextValue.done) {
      setManualValue(nextValue.value);
    } else {
      setManualValue("Done");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Sequence Generator and Iteration</h1>
      <div style={{ marginBottom: "20px" }}>
        <h2>Sequence Class</h2>
        <ul>
          {[...new Sequence(0, 10, 2)].map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2>sequenceGenerator Function</h2>
        <ul>
          {[...sequenceGenerator(10, 0, 2)].map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Manual Iteration</h2>
        <p>Current Value: {manualValue}</p>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default App;
