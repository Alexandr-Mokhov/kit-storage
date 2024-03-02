import { useEffect } from 'react';
import { deleteFile, getAllFiles } from '../../utils/api';
import { setCount } from '../../store/slices/countSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setAllFiles } from '../../store/slices/allFilesSlice';
import { ERR_DELETE_FILE, ERR_LOADING_ALL_FILES, STATUS_OK } from '../../constatns/constants';
import File from '../File/File';
import './FileContainer.css';

export default function FileContainer() {
	const dispatch = useDispatch();
	const allFiles = useSelector(state => state.allFiles.allFiles);

	useEffect(() => {
		getAllFiles()
			.then((res) => {
				if (res.status === STATUS_OK) {
					dispatch(setAllFiles(res.files));
				} else {
					return Promise.reject(res.status);
				}
			})
			.catch((err) => {
				console.log(err + ` : ${ERR_LOADING_ALL_FILES}`);
				alert(ERR_LOADING_ALL_FILES);
			});
	}, [dispatch])

	useEffect(() => {
		dispatch(setCount(allFiles.length))
	}, [allFiles, dispatch])

	function handleDeleteClick(file) {
		deleteFile(file.id)
			.then((res) => {
				if (res.status === STATUS_OK) {
					dispatch(setAllFiles(allFiles.filter(item => item.id !== file.id)));
				} else {
					return Promise.reject(res.status);
				}
			})
			.catch((err) => {
				console.log(err + ` : ${ERR_DELETE_FILE}`);
				alert(ERR_DELETE_FILE);
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
