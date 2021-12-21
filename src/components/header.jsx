import clip from "../assets/bg.mp4";
import { scroll } from "../App";

export const Header = (props) => {
  const onEnded = () => {
    scroll.animateScroll(document.querySelector("#introduction"));
  };

  return (
    <header id="header">
      <div>
        <video
          autoPlay
          // loop
          muted
          // poster={Poster}
          style={{ height: "100%", width: "100%" }}
          onEnded={onEnded}
        >
          <source src={clip} type="video/mp4" />
          <source src={clip} type="video/ogg" />
        </video>
        {/* <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <h1>
                  {props.data ? props.data.title : "Loading"}
                  <span></span>
                </h1>
                <p>{props.data ? props.data.paragraph : "Loading"}</p>
                <a
                  href="#features"
                  className="btn btn-custom btn-lg page-scroll"
                >
                  Learn More
                </a>{" "}
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </header>
  );
};
