import Form from '../Form/Form';

export default function Register() {
  return (
    <main className="auth">
      <Form
        nameForm={'register'}
        title={'Регистрация'}
        buttonText={'Зарегистрироваться'}
      />
    </main>
  );
}
