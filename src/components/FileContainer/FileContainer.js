import { useEffect } from 'react';
import { deleteFile, getAllFiles } from '../../utils/api';
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
				if (res.status === 'ok') {
					dispatch(setAllFiles(res.files));
				} else {
					return Promise.reject(res.status);
				}
			})
			.catch((err) => {
				console.log(err + ` : Ошибка загрузки файлов с сервера`);
				alert('Ошибка загрузки файлов с сервера');
			});
	}, [dispatch])

	useEffect(() => {
		dispatch(setCount(allFiles.length))
	}, [allFiles, dispatch])

	function handleDeleteClick(file) {
		deleteFile(file.id)
			.then((res) => {
				if (res.status === 'ok') {
					dispatch(setAllFiles(allFiles.filter(item => item.id !== file.id)));
				} else {
					return Promise.reject(res.status);
				}
			})
			.catch((err) => {
				console.log(err + ` : Ошибка удаления файла на сервере`);
				alert('Ошибка удаления файла на сервере');
			});
	}

	function handleDownloadClick(file) {
		const link = document.createElement('a');
		link.style.display = 'none';
		link.download = file.url;
		link.target = "_blank"
		link.rel = "noreferrer"
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
