import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__copywriting">
          <div>
            <span>
              <strong>
                &copy;&nbsp;{new Date().getFullYear()}
              </strong>
            </span>
            <span className="footer__copywriting_name">
              <strong>
                &nbsp;Kit&nbsp;Storage&nbsp;
              </strong>
            </span>
          </div>
          <span>created&nbsp;by &nbsp;
            <a className="footer__copywriting_author" href="https://github.com/Alexandr-Mokhov" target="_blank" rel="noreferrer">
              Alexander&nbsp;Mokhov
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
