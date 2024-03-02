import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAllFiles } from '../../store/slices/allFilesSlice';
import { addNewFile, getAllFiles } from '../../utils/api';
import returnReject from '../../utils/returnReject';
import handleError from '../../utils/handleError';
import FileContainer from '../FileContainer/FileContainer';
import Counter from '../Counter/Counter';
import { setIsLoad } from '../../store/slices/isLoadSlice';
import {
	ERR_FILE_LIMIT,
	ERR_FILE_LIMIT_SIZE,
	ERR_FILE_UPLOAD,
	ERR_LOADING_ALL_FILES,
	MAX_COUNT_FILES,
	MAX_SIZE_FILE,
	STATUS_OK
} from '../../constatns/constants';
import './Main.css';

export default function Main() {
	const [isDisabled, setIsDisabled] = useState(true);
	const fileInput = useRef();
	const dispatch = useDispatch();
	const count = useSelector(state => state.count.count);

	function sendFile(evt) {
		//** отпправка файла на сервер */
		dispatch(setIsLoad(true));
		evt.preventDefault();
		const files = fileInput.current.files;
		const formData = new FormData();

		//** собираем файлы из инпута */
		for (const file of files) {
			formData.append('files[]', file);
		}

		//** передаем файлы на сервер */
		addNewFile(formData)
			.then((res) => {
				if (res.status === STATUS_OK) {
					//** если все ок - запрашиваем обновленный список */
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
			.catch(err => handleError(err, ERR_FILE_UPLOAD))
			.finally(() => {
				setIsDisabled(true);
				dispatch(setIsLoad(false))
			});
	}

	//** при вводе проверяем чтобы количество и вес файлов соответствовали требованиям */
	function handleChange() {
		const files = fileInput.current.files;
		const filesLength = files.length;
		let overallSize = 0;
		
		if (filesLength !== 0) {
			setIsDisabled(false);
		}

		if (count + filesLength > MAX_COUNT_FILES) {
			alert(ERR_FILE_LIMIT + `${count + filesLength - MAX_COUNT_FILES}`);
			fileInput.current.value = null;
			return
		}

		for (const file of files) {
			overallSize += file.size;
		}
		
		if (overallSize >= MAX_SIZE_FILE) {
			alert(ERR_FILE_LIMIT_SIZE);
			fileInput.current.value = null;
			setIsDisabled(true);
			return
		}
	}

	return (
		<main className="main">
			<h2 className="main__title">Личный кабинет</h2>
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
					onChange={handleChange}
				/>
				<button className="main__button" type="button" onClick={sendFile} disabled={isDisabled}>
					Загрузить
				</button>
			</form>
			<Counter />
			<FileContainer />
		</main>
	);
}