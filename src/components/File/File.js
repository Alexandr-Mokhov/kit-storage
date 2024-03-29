/* eslint-disable react-hooks/exhaustive-deps */
import iconFile from '../../images/icon-file.png';
import { useEffect, useState } from 'react';
import { getFile } from '../../utils/api';
import returnReject from '../../utils/returnReject';
import handleError from '../../utils/handleError';
import { ERR_LOADING_FILE } from '../../constatns/constants';
import './File.css';

export default function File({ file, handleDeleteClick, handleDownloadClick }) {
  const [srcImage, setSrcImage] = useState('');

  useEffect(() => {
    //** подгружаю картинки к файлам или иконки если документ */
    getFile(file.id)
      .then(res => res.ok ? res.blob() : returnReject(res))
      .then(res => {
        if (file.mimeType.includes('image')) {
          const blob = new Blob([res], { type: `${file.mimeType}` });
          const fileLink = window.URL.createObjectURL(blob);
          setSrcImage(fileLink);
        } else {
          setSrcImage(iconFile);
        }
      })
      .catch(err => handleError(err, ERR_LOADING_FILE));
  }, [])

  function onFileDelete() {
    handleDeleteClick(file);
  }

  function onDownloadFiles() {
    handleDownloadClick(file);
  }

  return (
    <div className="file">
      <p className="file__name file__name_desctop">{file.name}</p>
      <button className="file__button file__button_download" onClick={onDownloadFiles}>
        <img className="file__img" src={srcImage} alt={file.name} />
        <div className="file__icon-download-container">
          <div className="file__icon file__icon_download" />
        </div>
      </button>
      <p className="file__name file__name_mobile">{file.name}</p>
      <button className="file__button file__button_delete" onClick={onFileDelete}>
        <div className="file__icon file__icon_delete" />
      </button>
    </div>
  );
}
