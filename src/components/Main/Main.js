import { useRef } from 'react';
import { addNewFile, getAllFiles } from '../../utils/api';
import './Main.css';

export default function Main() {
	const fileInputRef = useRef();

	const handleChange = (evt) => {
		const files = fileInputRef.current.files;
		let formData = new FormData();
		for (let i = 0; i < files.length; i++) {
			formData.append(files[i], files[i].name);
		}
		console.log(formData);
  };

	function sendFile(evt) {
		evt.preventDefault();

		const files = fileInputRef.current.files;
		let formData = new FormData();
		for (let i = 0; i < files.length; i++) {
			formData.append('files', files[i], files[i].name);
		}

		addNewFile(formData)
			.then((res) => {
				console.log(res);
				if (res.status === 'ok') {

				} else {
					return Promise.reject(res.status);
				}
			})
			.catch((err) => {
				console.log(err + ` : Ошибка введенных данных`);
				alert('Ошибка введенных данных, проверьте правильность');
			});

		getAllFiles()
			.then((res) => {
				console.log(res);
				if (res.status === 'ok') {

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
			<div className="main__download">
				<input
					id="input-download"
					className="main__input"
					name="download"
					type="file"
					onChange={handleChange}
					required
					ref={fileInputRef}
					multiple={true}
				/>
				<button className="main__button" type="button" onClick={sendFile}>Загрузить</button>
			</div>
		</main>
	);
}