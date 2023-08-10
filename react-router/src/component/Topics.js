import { Link, useParams } from "react-router-dom";

const Topics = () => {
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to="/topics/components">Components</Link>
        </li>
        <li>
          <Link to="/topics/props">Props</Link>
        </li>
      </ul>
    </div>
  );
};

export const Topic = () => {
  // parameter
  const { topIp } = useParams();
  return <h2>TopicID: {topIp}</h2>;
};

export default Topics;
