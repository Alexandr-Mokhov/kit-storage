import iconFile from '../../images/icon-file.png';
import './File.css';

export default function File({ file, handleDeleteClick }) {
	function setSrc() {
		if (file.mimeType.includes('image')) {
			return file.url;
		} else {
			return iconFile;
		}
	}

	function onFileDelete() {
		handleDeleteClick(file);
	}

	return (
		<div className="file">
			<p className="file__name">{file.name}</p>
			<button className="file__button file__button_download">
				<img className="file__img" src={setSrc()} alt={file.name} />
			</button>
			<button className="file__button file__button_delete" onClick={onFileDelete}>
				<div className="file__icon-delete" />
			</button>
		</div>
	);
}