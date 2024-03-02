import { useEffect } from 'react';
import { deleteFile, getAllFiles, getFile } from '../../utils/api';
import { setCount } from '../../store/slices/countSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setAllFiles } from '../../store/slices/allFilesSlice';
import returnReject from '../../utils/returnReject';
import handleError from '../../utils/handleError';
import { setIsLoad } from '../../store/slices/isLoadSlice';
import { ERR_DELETE_FILE, ERR_LOADING_ALL_FILES, ERR_LOADING_FILE, STATUS_OK } from '../../constatns/constants';
import File from '../File/File';
import './FileContainer.css';

export default function FileContainer() {
	const dispatch = useDispatch();
	const allFiles = useSelector(state => state.allFiles.allFiles);

	useEffect(() => {
		dispatch(setIsLoad(true));
		getAllFiles()
			.then((res) => {
				if (res.status === STATUS_OK) {
					dispatch(setAllFiles(res.files));
				} else {
					returnReject(res);
				}
			})
			.catch(err => handleError(err, ERR_LOADING_ALL_FILES))
			.finally(() => dispatch(setIsLoad(false)));
	}, [dispatch])

	useEffect(() => {
		dispatch(setCount(allFiles.length))
	}, [allFiles, dispatch])

	function handleDeleteClick(file) {
		dispatch(setIsLoad(true));

		deleteFile(file.id)
			.then((res) => {
				if (res.status === STATUS_OK) {
					dispatch(setAllFiles(allFiles.filter(item => item.id !== file.id)));
				} else {
					returnReject(res);
				}
			})
			.catch(err => handleError(err, ERR_DELETE_FILE))
			.finally(() => dispatch(setIsLoad(false)));
	}

	function handleDownloadClick(file) {
		dispatch(setIsLoad(true));

		getFile(file.id)
			.then(res => res.ok ? res.blob() : returnReject(res))
			.then(res => {
				const blob = new Blob([res], { type: `${file.mimeType}` });
				const fileLink = window.URL.createObjectURL(blob);

				const link = document.createElement('a');
				link.style.display = 'none';
				link.download = file.fileName;
				link.href = fileLink;
				document.body.appendChild(link);
				link.click();
				link.remove();
			})
			.catch(err => handleError(err, ERR_LOADING_FILE))
			.finally(() => dispatch(setIsLoad(false)));
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
