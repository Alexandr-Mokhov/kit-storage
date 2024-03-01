import './FileContainer.css';
import arrFiles from '../../arrFiles';
import File from '../File/File';

export default function FileContainer() {
	return (
		<section className="file-container">
			{arrFiles.map((file) => {
				return <File
					name={file.name}
					url={file.url} 
					mimeType={file.mimeType}
					key={file.id}
				/>
			})}
		</section>
	);
}