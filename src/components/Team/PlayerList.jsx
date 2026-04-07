import PropTypes from "prop-types";
import { PLAYER_THUMBNAIL_SIZE } from "../../constants";
import styles from "./PlayerList.module.css";

const PlayerThumbnail = ({ player, index, isSelected, onSelect }) => (
  <div
    key={`${player.name}-${index}`}
    className="team"
    onClick={() => onSelect(index)}
    style={{ width: PLAYER_THUMBNAIL_SIZE, marginLeft: index ? 10 : 0 }}
  >
    <div
      className={`thumbnail ${styles.thumbnailCard}`}
      style={{
        border: "2px solid " + (isSelected ? "#bbb" : "#222"),
      }}
    >
      <img src={player.img} alt={player.name} className="team-img" />
      <div className="caption" style={{ color: isSelected ? "#bbb" : null }}>
        <div>{player.name}</div>
      </div>
    </div>
  </div>
);

export const PlayerList = ({
  players,
  selectedIndex,
  onSelect,
  showExtra,
  onExpand,
  hiddenPlayers,
}) => {
  return (
    <div
      id="row"
      className={`col-md-12 section-title ${styles.playerListContainer}`}
    >
      {players.map((player, i) => (
        <PlayerThumbnail
          key={`${player.name}-${i}`}
          player={player}
          index={i}
          isSelected={selectedIndex === i}
          onSelect={onSelect}
        />
      ))}
      {showExtra ? (
        hiddenPlayers.map((player, i) => (
          <PlayerThumbnail
            key={`${player.name}-hidden-${i}`}
            player={player}
            index={i + players.length}
            isSelected={selectedIndex === i + players.length}
            onSelect={onSelect}
          />
        ))
      ) : (
        <div
          className="team"
          onClick={onExpand}
          style={{
            width: PLAYER_THUMBNAIL_SIZE,
            marginLeft: 10,
            alignSelf: "center",
          }}
        >
          <div
            className={styles.expandButton}
            style={{
              border: "2px solid #222",
            }}
          >
            <i className={`fa fa-angle-double-right ${styles.expandIcon}`}></i>
          </div>
        </div>
      )}
    </div>
  );
};

const playerShape = PropTypes.shape({
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
});

PlayerThumbnail.propTypes = {
  player: playerShape.isRequired,
  index: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

PlayerList.propTypes = {
  players: PropTypes.arrayOf(playerShape).isRequired,
  selectedIndex: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  showExtra: PropTypes.bool.isRequired,
  onExpand: PropTypes.func.isRequired,
  hiddenPlayers: PropTypes.arrayOf(playerShape).isRequired,
};
