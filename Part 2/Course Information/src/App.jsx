const Course = (props) => {
  const { course } = props;
  
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
};

const Header = (props) => {
  return <h1>{props.name}</h1>;
};

const Part = (props) => {
  return <p>{props.part} {props.exercises}</p>
};

const Content = (props) => {
  const { parts } = props;

  return (
    <div>
      {
        parts.map((part) => <Part key={part.id} part={part.name} exercises={part.exercises} />)
      }
    </div>
  );
};

const Total = (props) => {
  const { parts } = props;
  const total = parts.reduce((acc, val) => acc + val.exercises, 0);

  return (
    <strong>total of {total} exercises</strong>
  )
};

const App = () => {
  const course = {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    };

    return <Course course={course} />
};

export default App;