import { motion } from "framer-motion";
import playerData from "../../data/player.json";
import { GAME_TYPES, PLAYER_CARD_HEIGHT } from "../../constants";
import { useTeam } from "./useTeam";
import { PlayerList } from "./PlayerList";
import { CSGameView } from "./CSGameView";
import { R6GameView } from "./R6GameView";
import styles from "./Team.module.css";

export const Team = () => {
  const {
    selectedIndex,
    isAnimating,
    showExtraPlayers,
    game,
    activePlayers,
    hiddenPlayers,
    onChangePlayer,
    onExpand,
    onChangeGame,
    contentRef,
  } = useTeam();

  const currentPlayer = playerData.data[selectedIndex];
  const previousPlayer = playerData.data[contentRef.current.lastIndex];

  return (
    <motion.div
      id="team"
      className="text-center"
      animate={
        currentPlayer.game.cs.color
          ? { backgroundColor: currentPlayer.game.cs.color }
          : {}
      }
    >
      <div className="container">
        <div className="col-md-8 col-md-offset-2 section-title">
          <h2>Thành viên</h2>
        </div>

        <div className={`col-md-12 ${styles.gameRow}`}>
          <div className={`col-md-1 ${styles.navArrowLeft}`}>
            <i
              className={`fa fa-angle-left ${styles.arrowIcon}`}
              onClick={() => onChangeGame(-1)}
            ></i>
          </div>
          <div
            className={`card col-md-10 align-self-center ${styles.card}`}
            style={{ height: PLAYER_CARD_HEIGHT }}
          >
            {game === GAME_TYPES.CS ? (
              <CSGameView
                player={currentPlayer}
                previousPlayer={previousPlayer}
                isAnimating={isAnimating}
                selectedIndex={selectedIndex}
              />
            ) : (
              <R6GameView
                player={currentPlayer}
                previousPlayer={previousPlayer}
                selectedIndex={selectedIndex}
                isAnimating={isAnimating}
              />
            )}
          </div>
          <div className={`col-md-1 ${styles.navArrowRight}`}>
            <i
              className={`fa fa-angle-right ${styles.arrowIcon}`}
              onClick={() => onChangeGame(1)}
            ></i>
          </div>
        </div>

        <PlayerList
          players={activePlayers}
          selectedIndex={selectedIndex}
          onSelect={onChangePlayer}
          showExtra={showExtraPlayers}
          onExpand={onExpand}
          hiddenPlayers={hiddenPlayers}
        />
      </div>
    </motion.div>
  );
};
