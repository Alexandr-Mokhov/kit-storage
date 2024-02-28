import Form from '../Form/Form';
import './Auth.css';

function Auth() {
	return (
		<main className="auth">
			<h2 className="auth__title">Авторизация</h2>
			<Form
				name={'auth'}
				buttonText={'Авторизоваться'}
			/>
		</main>
	);
}

export default Auth;