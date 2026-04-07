import PropTypes from "prop-types";
import styles from "./Image.module.css";

export const Image = ({ title, largeImage, smallImage, setShowPopup }) => {
  const openImage = () => {
    const largeContent = (
      <div className={styles.overlay}>
        <a className={styles.closeButton}>
          <i
            className="fa fa-close"
            onClick={() => {
              setShowPopup(null);
            }}
          ></i>
        </a>
        <img
          src={largeImage}
          className={`img-responsive col-md-12 col-sm-12 ${styles.largeImage}`}
          alt={title}
        />
      </div>
    );
    setShowPopup({ content: largeContent });
  };

  return (
    <div className="portfolio-item">
      <div className="hover-bg">
        {" "}
        <button
          title={title}
          data-lightbox-gallery="gallery1"
          onClick={openImage}
        >
          <div className="hover-text">
            <h4>{title}</h4>
          </div>
          <img src={smallImage} className="img-responsive" alt={title} />{" "}
        </button>{" "}
      </div>
    </div>
  );
};

Image.propTypes = {
  title: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  smallImage: PropTypes.string.isRequired,
  setShowPopup: PropTypes.func.isRequired,
};
