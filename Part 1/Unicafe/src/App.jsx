import { useState } from "react"

const Statistics = (props) => {
  const { good, neutral, bad, total, average, positive } = props;

  if (total === 0) {
    return <p>No feedback given</p>;
  }
  
  return (
    <>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {average}</p>
      <p>positive {positive} %</p>
    </>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleGood = () => {
    const newGood = good + 1;
    const newTotal = total + 1;
    setGood(newGood);
    setTotal(newTotal);
    setAverage((newGood - bad) / newTotal);
    setPositive((newGood / newTotal) * 100);
  }; 

  const handleNeutral = () => {
    const newNeutral = neutral + 1;
    const newTotal = total + 1;
    setNeutral(newNeutral);
    setTotal(newTotal);
    setAverage((good - bad) / newTotal);
    setPositive((good / newTotal) * 100);
  }; 

  const handleBad = () => {
    const newBad = bad + 1;
    const newTotal = total + 1;
    setBad(newBad);
    setTotal(newTotal);
    setAverage((good - newBad) / newTotal);
    setPositive((good / newTotal) * 100);
  }; 

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
      <Statistics 
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positive={positive}
      />
    </div>
  )
}

export default App