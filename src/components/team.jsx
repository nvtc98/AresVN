import { useRef, useState, useEffect } from "react";
import ApexCharts from "apexcharts";
import { motion, AnimatePresence } from "framer-motion";
import playerData from "../data/player.json";

export const Team = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAnimating, setAnimating] = useState(false);

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
        ...playerData.chart,
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
          <h2>Meet the Team</h2>
          <p>
            AresVN splits into 2 groups: core-team (the main members of the
            team, playing since the team's founding) and sub-team (members who
            join the team later through the Steam group application ceremony,
            mainly in 2021).
          </p>
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
                <>
                  <div
                    key={index}
                    className="col-md-4 col-sm-4"
                    id={"player-chart-" + index}
                  />
                  {/* <div>{chart.name}</div> */}
                </>
              ))}
            </div>
          </div>
        </div>
        <div id="row" className="col-md-12 section-title">
          {playerData.data.map((d, i) => (
            <div
              key={`${d.name}-${i}`}
              className="col-md-1 col-sm-1 team"
              onClick={() => onChangePlayer(i)}
            >
              <div className="thumbnail">
                {" "}
                <img src={d.img} alt={d.name} className="team-img" />
                <div className="caption">
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
