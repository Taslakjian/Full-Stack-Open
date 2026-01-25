import { useState } from "react"

const StatisticLine = (props) => {
  const { text, value, symbol } = props;
  return <p>{text} {value} {symbol} </p>
};

const Statistics = (props) => {
  const { good, neutral, bad, total, average, positive } = props;

  if (total === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <>
      <h1>statistics</h1>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="total" value={total} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive} symbol={"%"} />
    </>
  );
};

const Button = (props) => {
  const { event, text } = props;
  return <button onClick={event}>{text}</button>
}

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
      <Button event={handleGood} text="good" />
      <Button event={handleNeutral} text="neutral" />
      <Button event={handleBad} text="bad" />
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