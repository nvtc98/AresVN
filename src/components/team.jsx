import { useRef, useState, useEffect } from "react";
import ApexCharts from "apexcharts";
import { motion, AnimatePresence } from "framer-motion";
import playerData from "../data/player.json";

const GAME = { CS: "cs", R6: "r6" };

const getChart = () => {
  const chart = playerData.chart;
  chart.plotOptions.pie.donut.labels.value.formatter = (
    value,
    { config: { series } }
  ) => {
    const rate = value / (100 / series.length);
    for (let i = 0; i < playerData.level.length; ++i) {
      const { value, name } = playerData.level[i];
      if (rate > value) {
        return name;
      }
    }
  };
  return chart;
};

export const Team = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAnimating, setAnimating] = useState(false);
  const [showExtraPlayers, setShowExtraPlayers] = useState(false);
  const [game, setGame] = useState(GAME.CS);

  const activePlayers = playerData.data.filter((player) => !player.isHidden);

  const contentRef = useRef({
    lastIndex: 0,
    lastTimeout: null,
    charts: [],
  });

  const onChangePlayer = (index) => {
    contentRef.current.lastTimeout &&
      clearTimeout(contentRef.current.lastTimeout);
    setSelectedIndex(index);
    setAnimating(true);
    contentRef.current.lastTimeout = setTimeout(() => {
      contentRef.current.lastIndex = index;
      setAnimating(false);
    }, 500);
  };

  const onExpand = () => {
    setShowExtraPlayers(true);
  };

  useEffect(() => {
    for (let i = 0; i < 3; ++i) {
      const element = document.querySelector("#player-chart-" + i);
      if (!element) {
        return;
      }
      const chart = new ApexCharts(element, {
        ...getChart(i),
        labels: playerData.label[i].data.map((x) => x.name),
        series: playerData.data[selectedIndex].game.cs.chart[i],
        colors: playerData.label[i].data.map((x) => x.color),
      });
      chart.render();
      contentRef.current.charts.push(chart);
      // var chartLabel = document.createTextNode(playerData.label[i].name);
      // element.appendChild(chartLabel);
    }
  }, [playerData]);

  useEffect(() => {
    for (let i = 0; i < 3; ++i) {
      contentRef.current.game?.cs.charts?.[i]?.updateSeries(
        playerData.data[selectedIndex].chart[i]
      );
    }
  }, [selectedIndex]);

  const onChangeGame = () => {
    alert("cummin soon...");
    // const gameList = Object.values(GAME);
    // const currentIndex = gameList.findIndex((item) => item === game);
    // setGame(gameList[(currentIndex + 1) % gameList.length]);
  };

  const renderPlayers = (d, i) => (
    <div
      key={`${d.name}-${i}`}
      className="team"
      onClick={() => onChangePlayer(i)}
      style={{ width: 80, marginLeft: i ? 10 : 0 }}
    >
      <div
        className="thumbnail"
        style={{
          border: "2px solid " + (selectedIndex === i ? "#bbb" : "#222"),
          backgroundColor: "#111",
          borderRadius: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflow: "hidden",
          padding: 0,
          cursor: "pointer",
        }}
      >
        <img src={d.img} alt={d.name} className="team-img" />
        <div
          className="caption"
          style={{ color: selectedIndex === i ? "#bbb" : null }}
        >
          <div>{d.name}</div>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      id="team"
      className="text-center"
      animate={
        playerData.data[selectedIndex].game.cs.color
          ? {
              backgroundColor: playerData.data[selectedIndex].game.cs.color,
            }
          : {}
      }
    >
      <div className="container">
        <div className="col-md-8 col-md-offset-2 section-title">
          <h2>Thành viên</h2>
        </div>
        {game === GAME.CS ? (
          <div className="col-md-12" style={{ display: "flex" }}>
            <div
              className="col-md-1"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                cursor: "pointer",
              }}
            >
              <i
                className="fa fa-angle-left"
                style={{ fontSize: 40 }}
                onClick={() => onChangeGame(-1)}
              ></i>
            </div>
            <div
              className="card col-md-10 align-self-center"
              style={{ padding: 40 }}
            >
              <div className="col-md-4 col-sm-12 team">
                <AnimatePresence exitBeforeEnter>
                  <motion.img
                    key={selectedIndex}
                    src={playerData.data[selectedIndex].img}
                    className="team-img text-left"
                    style={{ borderRadius: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.1 }}
                  />
                </AnimatePresence>
                <div className="animation-block">
                  <motion.h3 style={{ opacity: isAnimating ? 0 : 1 }}>
                    {playerData.data[contentRef.current.lastIndex].name}
                  </motion.h3>
                  <motion.h3
                    animate={{ x: isAnimating ? 0 : 200 }}
                    style={{ x: 200, opacity: isAnimating ? 1 : 0 }}
                  >
                    {playerData.data[selectedIndex].name}
                  </motion.h3>
                </div>
                <div className="animation-block">
                  <motion.p style={{ opacity: isAnimating ? 0 : 1 }}>
                    {playerData.data[contentRef.current.lastIndex].game.cs.role}
                  </motion.p>
                  <motion.p
                    animate={{ x: isAnimating ? 0 : -200 }}
                    style={{ x: -200, opacity: isAnimating ? 1 : 0 }}
                  >
                    {playerData.data[selectedIndex].game.cs.role}
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
                className="animation-block col-md-8 col-sm-12 text-left"
                style={{ marginTop: 30 }}
              >
                <motion.p style={{ opacity: isAnimating ? 0 : 1 }}>
                  {
                    playerData.data[contentRef.current.lastIndex].game.cs
                      .description
                  }
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
                  {playerData.data[selectedIndex].game.cs.description}
                </motion.p>
              </div>
            </div>
            <div
              className="col-md-1"
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <i
                className="fa fa-angle-right"
                style={{ fontSize: 40 }}
                onClick={() => onChangeGame(1)}
              ></i>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        <div
          id="row"
          className="col-md-12 section-title"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 20,
            flexWrap: "wrap",
          }}
        >
          {activePlayers.map(renderPlayers)}
          {showExtraPlayers ? (
            playerData.data
              .filter((player) => player.isHidden)
              .map((d, i) => renderPlayers(d, i + activePlayers.length))
          ) : (
            <div
              className="team"
              onClick={() => onExpand()}
              style={{ width: 80, marginLeft: 10, alignSelf: "center" }}
            >
              <div
                style={{
                  border: "2px solid #222",
                  borderRadius: 10,
                }}
              >
                <i
                  className="fa fa-angle-double-right"
                  style={{
                    fontSize: 40,
                    width: 40,
                    height: 40,
                    border: 0,
                  }}
                ></i>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
