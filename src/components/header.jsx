// import clip from "../assets/bg.mp4";
import { scroll } from "../App";
import YouTube from "react-youtube";
import { navigationHeight } from "./navigation";
import { useState } from "react";

export const Header = (props) => {
  const [isEnded, setEnded] = useState(false);
  const onVideoEnd = () => {
    setEnded(true);
    if (
      window.scrollY < videoHeight &&
      document.documentElement.scrollTop < videoHeight
    ) {
      scroll.animateScroll(document.querySelector("#welcome"));
    }
  };

  const videoWidth = window.innerWidth;
  const videoHeight =
    (videoWidth * props.data?.videoSize.height) / props.data?.videoSize.width +
    navigationHeight * 2;

  return (
    <header id="header" style={{ marginBottom: -navigationHeight }}>
      <div>
        <img
          src={props.data?.image}
          alt="..."
          style={{
            width: videoWidth,
            height: videoHeight,
            objectFit: "contain",
            position: "absolute",
            zIndex: isEnded ? 1 : -1,
          }}
        />
        {!!props.data && (
          <YouTube
            videoId={"1WYTTNxiAlA"}
            id={"1WYTTNxiAlA"}
            // className={string}                // defaults -> ''
            // iframeClassName={string}          // defaults -> ''
            style={{
              width: videoWidth,
              height: videoHeight,
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
            onEnd={onVideoEnd}
            onError={onVideoEnd}
            // onStateChange={func}              // defaults -> noop
            // onPlaybackRateChange={func}       // defaults -> noop
            // onPlaybackQualityChange={func}    // defaults -> noop
          />
        )}
      </div>
    </header>
  );
};
