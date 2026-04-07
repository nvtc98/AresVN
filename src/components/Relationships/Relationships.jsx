import PropTypes from "prop-types";
import styles from "./Relationships.module.css";
import { getField } from "../../utils/dataAccessors";

export const Relationships = (props) => {
  const relationships = Array.isArray(props.data) ? props.data : [];
  return (
    <div id="relationships" className="text-center">
      <div className={`container ${styles.container}`}>
        <div className="col-md-8 col-md-offset-2 section-title">
          <h2>Mối quan hệ</h2>
        </div>
        <div>
          {relationships.length > 0
            ? relationships.map((team, index) => (
                <div
                  key={`${getField(team, "name", "")}-${index}`}
                  className={`col-md-12 col-sm-12 team ${styles.teamRow}`}
                >
                  <div className={`col-md-3 col-sm-6 team ${styles.teamCard}`}>
                    <div className={`thumbnail ${styles.thumbnail}`}>
                      {" "}
                      <img
                        src={getField(team, "img", "")}
                        alt="..."
                        className="team-img"
                      />
                      <div className="caption">
                        <h4>{getField(team, "name", "")}</h4>
                        <p>{getField(team, "relationship", "")}</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`col-md-8 col-sm-6 team thumbnail ${styles.descriptionPanel}`}
                  >
                    {getField(team, "descriptions", []).map(
                      (description, descIndex) => (
                        <p key={descIndex} className={styles.descriptionText}>
                          {description}
                        </p>
                      ),
                    )}
                  </div>
                </div>
              ))
            : "loading"}
        </div>
      </div>
    </div>
  );
};

Relationships.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      img: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      relationship: PropTypes.string.isRequired,
      descriptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
  ),
};
