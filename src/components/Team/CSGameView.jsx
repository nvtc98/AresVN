import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import playerData from "../../data/player.json";
import styles from "./CSGameView.module.css";

export const CSGameView = ({
  player,
  previousPlayer,
  isAnimating,
  selectedIndex,
}) => {
  return (
    <>
      <div className="col-md-4 col-sm-12 team">
        <AnimatePresence exitBeforeEnter>
          <motion.img
            key={selectedIndex}
            src={player.img}
            className={`team-img text-left ${styles.playerImage}`}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.1 }}
          />
        </AnimatePresence>
        <div className="animation-block">
          <motion.h3 style={{ opacity: isAnimating ? 0 : 1 }}>
            {previousPlayer.name}
          </motion.h3>
          <motion.h3
            animate={{ x: isAnimating ? 0 : 200 }}
            style={{ x: 200, opacity: isAnimating ? 1 : 0 }}
          >
            {player.name}
          </motion.h3>
        </div>
        <div className="animation-block">
          <motion.p style={{ opacity: isAnimating ? 0 : 1 }}>
            {previousPlayer.game.cs.role}
          </motion.p>
          <motion.p
            animate={{ x: isAnimating ? 0 : -200 }}
            style={{ x: -200, opacity: isAnimating ? 1 : 0 }}
          >
            {player.game.cs.role}
          </motion.p>
        </div>
      </div>
      <div className="col-md-8 col-sm-12">
        {playerData.label.map((chart, index) => (
          <div
            key={index}
            className="col-md-4 col-sm-4"
            id={"player-chart-" + index}
          />
        ))}
      </div>
      <div
        className={`animation-block col-md-8 col-sm-12 text-left ${styles.descriptionBlock}`}
      >
        <motion.p style={{ opacity: isAnimating ? 0 : 1 }}>
          {previousPlayer.game.cs.description}
        </motion.p>
        <motion.p
          animate={{
            scaleX: isAnimating ? 1 : 1.5,
          }}
          style={{
            left: 15,
            right: 15,
            scaleX: 1.5,
            opacity: isAnimating ? 1 : 0,
          }}
        >
          {player.game.cs.description}
        </motion.p>
      </div>
    </>
  );
};

const csPlayerShape = PropTypes.shape({
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  game: PropTypes.shape({
    cs: PropTypes.shape({
      role: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      color: PropTypes.string,
    }).isRequired,
  }).isRequired,
});

CSGameView.propTypes = {
  player: csPlayerShape.isRequired,
  previousPlayer: csPlayerShape.isRequired,
  isAnimating: PropTypes.bool.isRequired,
  selectedIndex: PropTypes.number.isRequired,
};
