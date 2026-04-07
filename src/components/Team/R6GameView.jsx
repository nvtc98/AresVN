import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { UNKNOWN_OPERATOR_IMG } from "../../constants";
import styles from "./R6GameView.module.css";

export const R6GameView = ({
  player,
  previousPlayer,
  selectedIndex,
  isAnimating,
}) => {
  return (
    <>
      <div className={`col-md-4 col-sm-12 team ${styles.sideColumn}`}>
        <div id="player-chart-atk" />
        <div className={styles.operatorOverlay}>
          <img
            src={player.game.r6.atkOpImg || UNKNOWN_OPERATOR_IMG}
            className="team-img"
            alt="Attack operator"
          />
          <div className="faded-edge"></div>
        </div>
      </div>
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
        <div>
          <div
            className={styles.roleRow}
            style={{ opacity: isAnimating ? 0 : 1 }}
          >
            <motion.span className={styles.roleLeft}>
              {player.game.r6.atkRole || "Unknown"}
            </motion.span>
            <motion.span className={styles.roleSeparator}>/</motion.span>
            <motion.span className={styles.roleRight}>
              {player.game.r6.defRole || "Unknown"}
            </motion.span>
          </div>
        </div>
      </div>
      <div className={`col-md-4 col-sm-12 team ${styles.sideColumn}`}>
        <img
          src={player.game.r6.defOpImg || UNKNOWN_OPERATOR_IMG}
          className="team-img"
          alt="Defense operator"
        />
        <div className="faded-edge"></div>
      </div>
    </>
  );
};

const r6PlayerShape = PropTypes.shape({
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  game: PropTypes.shape({
    r6: PropTypes.shape({
      atkRole: PropTypes.string,
      defRole: PropTypes.string,
      atkOpImg: PropTypes.string,
      defOpImg: PropTypes.string,
    }).isRequired,
  }).isRequired,
});

R6GameView.propTypes = {
  player: r6PlayerShape.isRequired,
  previousPlayer: r6PlayerShape.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  isAnimating: PropTypes.bool.isRequired,
};
