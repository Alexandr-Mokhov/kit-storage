import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setAllFiles } from '../../store/slices/allFilesSlice';
import { addNewFile, getAllFiles } from '../../utils/api';
import returnReject from '../../utils/returnReject';
import handleError from '../../utils/handleError';
import FileContainer from '../FileContainer/FileContainer';
import Counter from '../Counter/Counter';
import { ERR_FILE_UPLOAD, ERR_LOADING_ALL_FILES, STATUS_OK } from '../../constatns/constants';
import './Main.css';

export default function Main() {
	const fileInput = useRef();
	const dispatch = useDispatch();

	function sendFile(evt) {
		evt.preventDefault();
		const files = fileInput.current.files;
		const formData = new FormData();

		for (const file of files) {
			formData.append('files[]', file);
		}

		addNewFile(formData)
			.then((res) => {
				if (res.status === STATUS_OK) {
					getAllFiles()
						.then((res) => {
							if (res.status === STATUS_OK) {
								dispatch(setAllFiles(res.files));
								fileInput.current.value = null;
							} else {
								returnReject(res);
							}
						})
						.catch(err => handleError(err, ERR_LOADING_ALL_FILES));
				} else {
					returnReject(res);
				}
			})
			.catch(err => handleError(err, ERR_FILE_UPLOAD));
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