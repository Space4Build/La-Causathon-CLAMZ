import { Link } from 'react-router-dom';
import './logo.module.scss';

function Logo() {
  return (
    <Link to="/">
      <img
      src="./Clamz.png"
      width="100"
      height="100" />
    </Link>
  );
}

export { Logo };
