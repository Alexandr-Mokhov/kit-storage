import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoggedIn } from '../../store/slices/loggedInSlice';
import { setAllFiles } from '../../store/slices/allFilesSlice';
import './Logout.css';

export default function Logout() {
	const dispatch = useDispatch();

	function onSignOut() {
		dispatch(setLoggedIn(false));
		localStorage.removeItem('token');
		dispatch(setAllFiles([]));
	}

	return (
		<Link className="logout" to="/login" onClick={onSignOut} >
			Выйти
		</Link>
	);
}