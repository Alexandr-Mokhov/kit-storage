import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Form.css';

export default function Form({ name, title, buttonText }) {
	const [values, setValues] = useState({});

	const handleChange = (evt) => {
		const target = evt.target;
		const name = target.name;
		const value = target.value;
		setValues({ ...values, [name]: value });
	}

	function handleSubmit(evt) {
		evt.preventDefault();
		console.log(values);
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

