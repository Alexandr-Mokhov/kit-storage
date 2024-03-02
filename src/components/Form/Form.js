import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { authUser, registerUser } from '../../utils/auth';
import { useDispatch } from 'react-redux';
import { setLoggedIn } from '../../store/slices/loggedInSlice';
import returnReject from '../../utils/returnReject';
import handleError from '../../utils/handleError';
import { setIsLoad } from '../../store/slices/isLoadSlice';
import { ERR_INPUT_DATA, STATUS_OK } from '../../constatns/constants';
import './Form.css';

export default function Form({ nameForm, title, buttonText }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [values, setValues] = useState({});

	const handleChange = (evt) => {
		const target = evt.target;
		const name = target.name;
		const value = target.value;
		setValues({ ...values, [name]: value });
	}

	function userRegistration(name, email, password) {
		dispatch(setIsLoad(true));

		registerUser(name, email, password)
			.then((res) => {
				if (res.status === STATUS_OK) {
					navigate('/login', { replace: true });
				} else {
					returnReject(res);
				}
			})
			.catch(err => handleError(err, ERR_INPUT_DATA))
			.finally(() => dispatch(setIsLoad(false)));
	}

	function userAuthorization(email, password) {
		dispatch(setIsLoad(true));

		authUser(email, password)
			.then((res) => {
				if (res.status === STATUS_OK) {
					localStorage.setItem('token', res.token);
					dispatch(setLoggedIn(true));
					navigate('/', { replace: true });
				} else {
					returnReject(res);
				}
			})
			.catch(err => handleError(err, ERR_INPUT_DATA))
			.finally(() => dispatch(setIsLoad(false)));
	}

	function handleSubmit(evt) {
		evt.preventDefault();
		const { name, email, password } = values;

		if (nameForm === "register") {
			userRegistration(name, email, password)
		} else {
			userAuthorization(email, password)
		}
	}

	return (
		<form className="form" onSubmit={handleSubmit} name={nameForm}>
			<h2 className="form__title">{title}</h2>
			{nameForm === "register" &&
				<input
					id="input-name"
					className="form__input"
					name="name"
					type="text"
					placeholder="Ваше имя"
					required
					value={values['name'] || ''}
					onChange={handleChange}
					autoComplete="off"
				/>}
			<input
				id="input-email"
				className="form__input"
				name="email"
				type="email"
				placeholder="E-mail"
				required
				value={values['email'] || ''}
				onChange={handleChange}
				autoComplete="off"
			/>
			<input
				id="input-password"
				className="form__input"
				name="password"
				type="password"
				placeholder="Пароль"
				required
				minLength="4"
				value={values['password'] || ''}
				onChange={handleChange}
				autoComplete="off"
			/>
			<button className="form__button" type="submit">
				{buttonText}
			</button>
			{nameForm === "register" ?
				<Link className="form__link" to="/login">Уже зарегистрированы? Войти</Link> :
				<Link className="form__link" to="/register">Зарегистрироваться</Link>}
		</form>
	);
}

