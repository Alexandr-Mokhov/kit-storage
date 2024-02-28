import './Main.css';

export default function Main() {
	function handleSubmit(evt) {
		evt.preventDefault();
		console.log(evt.target.firstChild.value);
	}

	return (
		<main className="main">
			<h2 className="main__title">Личный кабинет пользователя</h2>
			<p className="main__subtitle">Здесь Вы можете загружать, просматривать, скачивать и удалять Ваши файлы</p>
			<form className="main__download" onSubmit={handleSubmit} name={'download'}>
				<input
					id="input-download"
					className="main__input"
					name="download"
					type="file"
					required
				/>
				<button className="main__button" type="submit">Загрузить</button>
			</form>
		</main>
	);
}