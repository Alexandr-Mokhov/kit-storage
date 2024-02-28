import Form from '../Form/Form';
import './Register.css';

export default function Register() {
	return (
		<main className="register">
			<h2 className="register__title">Регистрация</h2>
			<Form
				name={'register'}
				buttonText={'Зарегистрироваться'}
			/>
		</main>
	);
}
