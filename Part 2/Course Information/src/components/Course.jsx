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

const Part = (props) => {
  return <p>{props.part} {props.exercises}</p>
};

const Total = (props) => {
  const { parts } = props;
  const total = parts.reduce((acc, val) => acc + val.exercises, 0);

  return (
    <strong>total of {total} exercises</strong>
  )
};

export default Course;