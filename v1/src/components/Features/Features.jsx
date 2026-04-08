import PropTypes from "prop-types";
import styles from "./Features.module.css";
import { getField } from "../../utils/dataAccessors";

export const Features = (props) => {
  const features = Array.isArray(props.data) ? props.data : [];
  return (
    <div id="welcome" className="text-center">
      <div className={`container ${styles.container}`}>
        <div className="col-md-10 col-md-offset-1 section-title">
          <h4>chào mừng đến với</h4>
          <h2>AresVN</h2>
        </div>
        <div className="row">
          {features.length > 0
            ? features.map((d, i) => (
                <div key={`${d.title}-${i}`} className="col-xs-6 col-md-2">
                  {" "}
                  <div className="icon">
                    <h2 className={styles.iconTitle}>
                      {getField(d, "title", "").substr(0, 1)}
                    </h2>
                  </div>
                  <h3>{getField(d, "title", "")}</h3>
                  <p>{getField(d, "text", "")}</p>
                </div>
              ))
            : "Loading..."}
        </div>
      </div>
    </div>
  );
};

Features.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      icon: PropTypes.string,
      image: PropTypes.string,
    }),
  ),
};
