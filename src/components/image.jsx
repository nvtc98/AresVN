export const Image = ({ title, largeImage, smallImage, setShowPopup }) => {
  const openImage = () => {
    const largeContent = (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#000A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <a
          style={{
            cursor: "pointer",
            position: "absolute",
            zIndex: 1,
            top: 20,
            left: 20,
            color: "#bbb",
          }}
        >
          <i
            className="fa fa-close"
            onClick={() => {
              setShowPopup(null);
            }}
          ></i>
        </a>
        <img
          src={largeImage}
          className="img-responsive col-md-12 col-sm-12"
          alt={title}
          style={{ height: "80%", objectFit: "contain" }}
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
