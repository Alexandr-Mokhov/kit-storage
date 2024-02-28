import { Link } from 'react-router-dom';
import './Form.css';

function onSubmit() { }

export default function Form({ name, buttonText }) {
	return (
		<form className="form" onSubmit={onSubmit} name={name} noValidate>
			<input
				id="input-email"
				className="form__input"
				name="email"
				type="email"
				placeholder="E-mail"
				required
				// value={values['email'] || ''}
				// onChange={handleChange}
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
				// value={values['password'] || ''}
				// onChange={handleChange}
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

