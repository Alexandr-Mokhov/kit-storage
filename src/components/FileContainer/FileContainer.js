import { useEffect, useState } from 'react';
import initialFiles from '../../initialFiles';
import File from '../File/File';
import './FileContainer.css';



export default function FileContainer() {
	const [arrFiles, setArrFiles] = useState([]);

	useEffect(() => {
		setArrFiles(initialFiles);
	}, []);

	function handleDeleteClick(file) {
		setArrFiles((state) => state.filter(item => item.id !== file.id));
	}

	return (
		<section className="file-container">
			{arrFiles.map((file) => {
				return <File
					file={file}
					key={file.id}
					handleDeleteClick={handleDeleteClick}
				/>
			})}
		</section>
	);
}