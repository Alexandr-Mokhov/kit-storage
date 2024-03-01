import './File.css';
import iconFile from '../../images/icon-file.png';

export default function File({ name, url, mimeType }) {
	function setSrc() {
		if(mimeType.includes('image')) {
			return url;
		} else {
			return iconFile;
		}
	}
	
	return (
		<div className="file">
			<p className="file__name">{name}</p>
			<button className="file__button file__button_download">
				<img className="file__img" src={setSrc()} alt={name} />
			</button>
			<button className="file__button file__button_delete">
				<div className="file__icon-delete" />
			</button>
		</div>
	);
}