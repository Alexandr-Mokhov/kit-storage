import { useRef } from 'react';
import { addNewFile } from '../../utils/api';
import FileContainer from '../FileContainer/FileContainer';
import Counter from '../Counter/Counter';
import './Main.css';

export default function Main() {
	const fileInput = useRef();

	function sendFile(evt) {
		evt.preventDefault();
		const files = fileInput.current.files;
		const formData = new FormData();

		for (const file of files) {
			formData.append('files[]', file);
		}

		addNewFile(formData)
			.then((res) => {
				console.log(res);
				if (res.status === 'ok') {
					// alert('Файл')
				} else {
					return Promise.reject(res.status);
				}
			})
			.catch((err) => {
				console.log(err + ` : Ошибка введенных данных`);
				alert('Ошибка введенных данных, проверьте правильность');
			});

	}

	return (
		<main className="main">
			<h2 className="main__title">Личный кабинет пользователя</h2>
			<p className="main__subtitle">Здесь Вы можете загружать, просматривать, скачивать и удалять Ваши файлы</p>
			<form className="main__download">
				<input
					id="input-download"
					className="main__input"
					name="upload"
					type="file"
					required
					ref={fileInput}
					multiple={true}
				/>
				<button className="main__button" type="button" onClick={sendFile}>Загрузить</button>
			</form>
			<Counter />
			<FileContainer />
		</main>
	);
}