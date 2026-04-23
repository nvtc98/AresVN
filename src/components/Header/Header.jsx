import { scroll } from "../../App";
import YouTube from "react-youtube";
import { navigationHeight } from "../Navigation";
import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./Header.module.css";
import { getField } from "../../utils/dataAccessors";

export const Header = (props) => {
  const [isEnded, setEnded] = useState(false);
  const [videoWidth, setVideoWidth] = useState(window.innerWidth);

  const handleResize = useCallback(() => {
    setVideoWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const onVideoEnd = () => {
    setEnded(true);
    if (
      window.scrollY < videoHeight &&
      document.documentElement.scrollTop < videoHeight
    ) {
      scroll.animateScroll(document.querySelector("#welcome"));
    }
  };

  const videoSize = getField(props.data, "videoSize", {
    width: 1920,
    height: 1080,
  });
  const videoHeight =
    (videoWidth * videoSize.height) / videoSize.width + navigationHeight * 2;

  return (
    <header id="header" style={{ marginBottom: -navigationHeight }}>
      <div className={styles.headerContainer}>
        <img
          src={getField(props.data, "image", "")}
          alt="..."
          className={styles.headerImage}
          style={{
            width: "100%",
            height: videoHeight,
            zIndex: isEnded ? 1 : -1,
          }}
        />
        {!!props.data && (
          <YouTube
            videoId={"1WYTTNxiAlA"}
            id={"1WYTTNxiAlA"}
            style={{
              width: "100%",
              height: videoHeight,
            }}
            opts={{
              playerVars: {
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
            onEnd={onVideoEnd}
            onError={onVideoEnd}
          />
        )}
      </div>
    </header>
  );
};

Header.propTypes = {
  data: PropTypes.shape({
    videoSize: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired,
    image: PropTypes.string.isRequired,
    videoId: PropTypes.string,
  }),
};
