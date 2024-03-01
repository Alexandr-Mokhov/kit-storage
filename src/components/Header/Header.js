import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Logout from '../Logout/Logout';
import { setLoggedIn } from '../../store/slices/loggedInSlice';
import './Header.css';

export default function Header() {
	const loggedIn = useSelector(state => state.loggedIn.loggedIn);
	const dispatch = useDispatch();

	useEffect(() => {
		if (localStorage.getItem('token')) {
			dispatch(setLoggedIn(true));
		}
	}, [dispatch])
	
	return (
		<header className="header">
			<div className="header__container">
				<h1 className="header__title">Kit Storage</h1>
				{loggedIn && <Logout />}
			</div>
		</header>
	);
}
