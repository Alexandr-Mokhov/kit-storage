import { useSelector } from 'react-redux';
import { MAX_COUNT_FILES } from '../../constatns/constants';
import './FileCounter.css';

export default function FileCounter() {
	const count = useSelector(state => state.count.count);

	return (
		<div className="file-counter">
			<p className="file-counter__title">
				Загруженых файлов: <span className="file-counter__count">{count}</span>
			</p>
			<p className="file-counter__title">
				Максимум файлов: <span className="file-counter__count">{MAX_COUNT_FILES}</span>
			</p>
		</div>
	);
}