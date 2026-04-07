import PropTypes from "prop-types";
import styles from "./About.module.css";
import { getField } from "../../utils/dataAccessors";

export const About = (props) => {
  const paragraph = getField(props.data, "paragraph", "loading...");
  const details = getField(props.data, "details", []);
  return (
    <div id="about">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            {" "}
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/l4i9Wmx-CWU"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2>Giới thiệu</h2>
              <p>{paragraph}</p>
            </div>
          </div>
        </div>
        <div className={`row text-center ${styles.detailsRow}`} id="details">
          {details.length > 0
            ? details.map((d, i) => (
                <div key={`${d.name}-${i}`} className="col-md-4">
                  {" "}
                  <i className={d.icon}></i>
                  <div className="service-desc">
                    <h3>{d.name}</h3>
                    <div className={styles.detailTextWrapper}>
                      <div>
                        {d.text.map((t, i) => (
                          <p key={i} className={styles.detailText}>
                            {t}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : "loading"}
        </div>
      </div>
    </div>
  );
};

About.propTypes = {
  data: PropTypes.shape({
    paragraph: PropTypes.string.isRequired,
    details: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        text: PropTypes.arrayOf(PropTypes.string).isRequired,
      }),
    ).isRequired,
  }),
};
