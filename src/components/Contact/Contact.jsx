import PropTypes from "prop-types";
import { getSocialLinks } from "../../utils/dataAccessors";

export const Contact = (props) => {
  const links = getSocialLinks(props.data);
  return (
    <div>
      <div id="contact" className="text-center">
        <div className="container">
          <div className="col-md-8 col-md-offset-2 section-title">
            <div className="row">
              <div className="section-title">
                <h2>Liên hệ</h2>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="social">
              <ul>
                <li>
                  <a href={links.steam}>
                    <div>
                      <img src="img/contact/Steam.png" />
                    </div>
                  </a>
                </li>
                <li>
                  <a href={links.discord}>
                    <div>
                      <img src="img/contact/Asset_3.png" />
                    </div>
                  </a>
                </li>
                <li>
                  <a href={links.youtube}>
                    <div>
                      <img src="img/contact/Asset_4.png" />
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Contact.propTypes = {
  data: PropTypes.shape({
    steam: PropTypes.string.isRequired,
    discord: PropTypes.string.isRequired,
    youtube: PropTypes.string.isRequired,
  }),
};
