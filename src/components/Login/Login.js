import Form from '../Form/Form';

export default function Login() {
	return (
		<main className="auth">
			<Form
				name={'Login'}
				title={'Авторизация'}
				buttonText={'Авторизоваться'}
			/>
		</main>
	);
}
