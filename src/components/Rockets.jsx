import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRockets } from '../redux/rocket/rocket';
import RocketCard from './RocketCard';
import '../styles/Rockets.css';

function Rockets() {
  const dispatch = useDispatch();
  const { rockets, pending, error } = useSelector((store) => store.rockets);
  useEffect(() => {
    if (rockets.length < 1) {
      dispatch(fetchRockets());
    }
  }, [dispatch, rockets.length]);

  let content;

  if (!pending && !error && Array.isArray(rockets)) {
    content = (
      <div className="rockets">
        {rockets.map((rocket) => (
          <RocketCard key={rocket.id} props={rocket} />
        ))}
      </div>
    );
  }

  if (pending) {
    content = (
      <h1>Fetching Rockets</h1>
    );
  }
  if (error) {
    content = (
      <h1>Error occured while fetching Rockets</h1>
    );
  }
  return (
    <section className="rocket">
      {content}
    </section>
  );
}

export default Rockets;
