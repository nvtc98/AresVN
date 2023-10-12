import { useRef, useState, useEffect } from "react";
import ApexCharts from "apexcharts";
import { motion, AnimatePresence } from "framer-motion";
import playerData from "../data/player.json";

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

  useEffect(() => {
    for (let i = 0; i < 3; ++i) {
      const element = document.querySelector("#player-chart-" + i);
      if (!element) {
        return;
      }
      const chart = new ApexCharts(element, {
        ...getChart(),
        labels: playerData.label[i].data.map((x) => x.name),
        series: playerData.data[selectedIndex].chart[i],
      });
      chart.render();
      contentRef.current.charts.push(chart);
      var chartLabel = document.createTextNode(playerData.label[i].name);
      element.appendChild(chartLabel);
    }
  }, [playerData]);

  useEffect(() => {
    for (let i = 0; i < 3; ++i) {
      contentRef.current.charts?.[i]?.updateSeries(
        playerData.data[selectedIndex].chart[i]
      );
    }
  }, [selectedIndex]);

  return (
    <div id="team" className="text-center">
      <div className="container">
        <div className="col-md-8 col-md-offset-2 section-title">
          <h2>Thành viên</h2>
        </div>
        <div className="col-md-12">
          <div
            className="card col-md-10 col-md-offset-1"
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
                  {playerData.data[contentRef.current.lastIndex].role}
                </motion.p>
                <motion.p
                  animate={{ x: isAnimating ? 0 : -200 }}
                  style={{ x: -200, opacity: isAnimating ? 1 : 0 }}
                >
                  {playerData.data[selectedIndex].role}
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
            {/* <p class="col-md-8 col-sm-12 text-left" style={{ marginTop: 30 }}>
              {playerData.data[selectedIndex].description}
            </p> */}
            <div
              className="animation-block col-md-8 col-sm-12 text-left"
              style={{ marginTop: 30 }}
            >
              <motion.p style={{ opacity: isAnimating ? 0 : 1 }}>
                {playerData.data[contentRef.current.lastIndex].description}
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
                {playerData.data[selectedIndex].description}
              </motion.p>
            </div>
          </div>
        </div>
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
          {playerData.data.map((d, i) => (
            <div
              key={`${d.name}-${i}`}
              className="team"
              onClick={() => onChangePlayer(i)}
              style={{ width: 80, marginLeft: i ? 10 : 0 }}
            >
              <div
                className="thumbnail"
                style={{
                  border:
                    "2px solid " + (selectedIndex === i ? "#bbb" : "#222"),
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
          ))}
        </div>
      </div>
    </div>
  );
};
