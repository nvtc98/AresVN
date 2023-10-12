import { useRef } from "react";

export const Testimonials = (props) => {
  const isJumpingScareRef = useRef(false);

  const onMouseOver = (d, i) => {
    if (i === 3 && !isJumpingScareRef.current) {
      isJumpingScareRef.current = true;
      props.setShowPopup({
        content: (
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
            <img
              src={d.img}
              className="img-responsive col-md-12 col-sm-12"
              style={{ height: "80%", objectFit: "contain" }}
            />
          </div>
        ),
        animated: false,
      });
      setTimeout(() => {
        props.setShowPopup(null);
      }, 100);
      setTimeout(() => {
        isJumpingScareRef.current = false;
      }, 2000);
    }
  };

  return (
    <div id="testimonials">
      <div className="container">
        <div className="section-title text-center">
          <h2>Kẻ địch {"&"} người chơi cùng nói gì về chúng tôi</h2>
        </div>
        <div className="row">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className="col-md-4">
                  <div className="testimonial">
                    {i === 3 && (
                      <div
                        style={{
                          position: "absolute",
                          width: "50%",
                          height: "100%",
                        }}
                        onMouseOver={() => onMouseOver(d, i)}
                      ></div>
                    )}
                    <div className="testimonial-image">
                      {" "}
                      <img
                        src={d.img}
                        alt=""
                        style={{ objectFit: "cover" }}
                      />{" "}
                    </div>
                    <div className="testimonial-content">
                      <p>"{d.text}"</p>
                      <div className="testimonial-meta"> - {d.name} </div>
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
