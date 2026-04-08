import PropTypes from "prop-types";
import { Image } from "./Image";
import { getField } from "../../utils/dataAccessors";

export const Gallery = (props) => {
  const items = Array.isArray(props.data) ? props.data : [];
  return (
    <div id="portfolio" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Bộ sưu tập</h2>
          <p>Những chiến tích và kỷ niệm trong AresVN</p>
        </div>
        <div className="row">
          <div className="portfolio-items">
            {items.length > 0
              ? items.map((d, i) => (
                  <div
                    key={`${getField(d, "title", "")}-${i}`}
                    className="col-sm-6 col-md-4 col-lg-4"
                  >
                    <Image
                      title={getField(d, "title", "")}
                      largeImage={getField(d, "largeImage", "")}
                      smallImage={getField(d, "smallImage", "")}
                      setShowPopup={props.setShowPopup}
                    />
                  </div>
                ))
              : "Loading..."}
          </div>
        </div>
      </div>
    </div>
  );
};

Gallery.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      largeImage: PropTypes.string.isRequired,
      smallImage: PropTypes.string.isRequired,
    }),
  ),
  setShowPopup: PropTypes.func.isRequired,
};
