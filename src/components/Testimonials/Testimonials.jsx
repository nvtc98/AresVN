import PropTypes from "prop-types";
import styles from "./Testimonials.module.css";
import { getField } from "../../utils/dataAccessors";

export const Testimonials = (props) => {
  const testimonials = Array.isArray(props.data) ? props.data : [];
  return (
    <div id="testimonials">
      <div className="container">
        <div className="section-title text-center">
          <h2>Kẻ địch {"&"} người chơi cùng nói gì về chúng tôi</h2>
        </div>
        <div className="row">
          {testimonials.length > 0
            ? testimonials.map((d, i) => (
                <div
                  key={`${getField(d, "name", "")}-${i}`}
                  className="col-md-4"
                >
                  <div className="testimonial">
                    <div className="testimonial-image">
                      {" "}
                      <img
                        src={getField(d, "img", "")}
                        alt=""
                        className={styles.testimonialImage}
                        {...(i === 3 ? { id: "jumpscare" } : {})}
                      />{" "}
                    </div>
                    <div className="testimonial-content">
                      <p>"{getField(d, "text", "")}"</p>
                      <div className="testimonial-meta">
                        {" "}
                        - {getField(d, "name", "")}{" "}
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

Testimonials.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      img: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
};
