import { useSelector } from 'react-redux';
import Logout from '../Logout/Logout';
import './Header.css';

export default function Header() {
  const loggedIn = useSelector(state => state.loggedIn.loggedIn);

  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__title">Kit Storage</h1>
        {loggedIn && <Logout />}
      </div>
    </header>
  );
}
