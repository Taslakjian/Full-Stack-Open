const Course = (props) => {
  const { course } = props;

  console.log("Course:", course);
  
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
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

  console.log(parts);

  return (
    <div>
      {
        parts.map((part) => <Part key={part.id} part={part.name} exercises={part.exercises} />)
      }
    </div>
  );
};

const Total = (props) => {
  const [part1, part2, part3] = props.parts;

  return <p>Number of exercises {part1.exercises + part2.exercises + part3.exercises}</p>
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
          name: 'State of a component',
          exercises: 14,
          id: 3
        }
      ]
    };

    return <Course course={course} />
};

export default App;