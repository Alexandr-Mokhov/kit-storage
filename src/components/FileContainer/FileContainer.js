import { useEffect } from 'react';
import { getAllFiles } from '../../utils/api';
import { setCount } from '../../store/slices/countSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setAllFiles } from '../../store/slices/allFilesSlice';
import File from '../File/File';
import './FileContainer.css';

export default function FileContainer() {
	const dispatch = useDispatch();
	const allFiles = useSelector(state => state.allFiles.allFiles);

	useEffect(() => {
		getAllFiles()
		.then((res) => {
			console.log(res);
			if (res.status === 'ok') {
				const newArr = res.files.map(i => i)
				dispatch(setAllFiles(newArr));
			} else {
				return Promise.reject(res.status);
			}
		})
		.catch((err) => {
			console.log(err + ` : Ошибка введенных данных`);
			alert('Ошибка введенных данных, проверьте правильность');
		});
	}, [dispatch])

	useEffect(() => {
		dispatch(setCount(allFiles.length))
	}, [allFiles, dispatch])

	function handleDeleteClick(file) {
		dispatch(setAllFiles(allFiles.filter(item => item.id !== file.id)));
	}

	function handleDownloadClick(file) {
		const link = document.createElement('a');
		link.style.display = 'none';
		link.download = file.url;
		link.target="_blank"
		link.rel="noreferrer"
		link.href = file.url;
		document.body.appendChild(link);
		link.click();
		link.remove();
	}

	return (
		<section className="file-container">
			{allFiles.map((file) => {
				return <File
					file={file}
					key={file.id}
					handleDeleteClick={handleDeleteClick}
					handleDownloadClick={handleDownloadClick}
				/>
			})}
		</section>
	);
}

// {
//   "id": "09decda8-3e9d-46a4-934d-b1a5b74187f0",
//   "name": "1680070890_pushinka-top-p-mega-krutie-avatarki-krasivo-39",
//   "fileName": "1680070890_pushinka-top-p-mega-krutie-avatarki-krasivo-39.jpg",
//   "mimeType": "image/jpeg",
//   "url": "https://js-test.kitactive.ru/api/media/09decda8-3e9d-46a4-934d-b1a5b74187f0",
//   "createdAt": "2024-03-01T17:45:20.000000Z"
// }