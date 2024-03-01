import { useEffect, useState } from 'react';
import initialFiles from '../../initialFiles';
import File from '../File/File';
import { setCount } from '../../store/slices/countSlice';
import { useDispatch } from 'react-redux';
import './FileContainer.css';

export default function FileContainer() {
	const dispatch = useDispatch();
	const [arrFiles, setArrFiles] = useState([]);

	useEffect(() => {
		setArrFiles(initialFiles);
	}, []);

	useEffect(() => {
		dispatch(setCount(arrFiles.length))
	}, [arrFiles, dispatch])

	function handleDeleteClick(file) {
		setArrFiles((state) => state.filter(item => item.id !== file.id));
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
			{arrFiles.map((file) => {
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