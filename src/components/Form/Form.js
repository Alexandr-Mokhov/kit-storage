import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { registerUser } from '../../utils/auth';
import './Form.css';

export default function Form({ name, title, buttonText }) {
	const navigate = useNavigate();
	const [values, setValues] = useState({});

	const handleChange = (evt) => {
		const target = evt.target;
		const name = target.name;
		const value = target.value;
		setValues({ ...values, [name]: value });
	}

	function handleSubmit(evt) {
		evt.preventDefault();
		if (name === "register") {
			const { name, email, password } = values;
			registerUser(name, email, password)
				.then((res) => {
					if (res.status === 'ok') {
						navigate('/', { replace: true });
					} else {
						return Promise.reject(res.status);
					}
				})
				.catch((err) => {
					console.log(err + ` : Ошибка введенных данных`);
					alert('Ошибка введенных данных, проверьте правильность');
				});
		}
	}

	return (
		<form className="form" onSubmit={handleSubmit} name={name}>
			<h2 className="form__title">{title}</h2>
			{name === "register" &&
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
			{name === "register" ?
				<Link className="form__link" to="/login">Уже зарегистрированы? Войти</Link> :
				<Link className="form__link" to="/register">Зарегистрироваться</Link>}
		</form>
	);
}

