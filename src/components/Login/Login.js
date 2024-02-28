import Form from '../Form/Form';
import './Login.css';

export default function Login() {
	return (
		<main className="login">
			<h2 className="login__title">Авторизация</h2>
			<Form
				name={'Login'}
				buttonText={'Авторизоваться'}
			/>
		</main>
	);
}
