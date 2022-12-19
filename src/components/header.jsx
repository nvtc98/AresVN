// import clip from "../assets/bg.mp4";
import { scroll } from "../App";
import YouTube from "react-youtube";
import { navigationHeight } from "./navigation";

export const Header = (props) => {
  const onEnded = () => {
    scroll.animateScroll(document.querySelector("#introduction"));
  };

  const videoWidth = window.innerWidth;
  const videoHeight =
    (videoWidth * props.data?.videoSize.height) / props.data?.videoSize.width +
    navigationHeight * 2;

  return (
    <header id="header">
      {/* <img src={team.img} alt="..." className="team-img" /> */}
      <div>
        {/* <video
          autoPlay
          // loop
          muted
          // poster={Poster}
          style={{ height: "100%", width: "100%" }}
          src={clip}
          onEnded={onEnded}
          onLoadedData={() => {
            alert("heh");
          }}
          onload
        /> */}
        {!!props.data && (
          <YouTube
            videoId={"1WYTTNxiAlA"}
            id={"1WYTTNxiAlA"}
            // className={string}                // defaults -> ''
            // iframeClassName={string}          // defaults -> ''
            style={{
              width: videoWidth,
              height: videoHeight,
              backgroundColor: "blue",
            }}
            // title={string}                    // defaults -> ''
            // loading={string}                  // defaults -> undefined
            opts={{
              playerVars: {
                // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
                mute: 1,
                controls: 0,
                modestbranding: 1,
                disablekb: 1,
                rel: 0,
              },
              width: videoWidth,
              height: videoHeight,
            }}
            // onReady={func}                    // defaults -> noop
            // onPlay={func}                     // defaults -> noop
            // onPause={func}                    // defaults -> noop
            // onEnd={func}
            // onError={func}                    // defaults -> noop
            // onStateChange={func}              // defaults -> noop
            // onPlaybackRateChange={func}       // defaults -> noop
            // onPlaybackQualityChange={func}    // defaults -> noop
          />
        )}
        <div className="overlay">
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
        </div>
      </div>
    </header>
  );
};
