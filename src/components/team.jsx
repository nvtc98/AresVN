import { useRef, useState } from "react";
import ApexCharts from "apexcharts";
import { motion } from "framer-motion";
//https://www.npmjs.com/package/framer-motion
//react-animations
//https://github.com/brunnolou/react-morph    https://codesandbox.io/s/jpnq33q47w?from-embed=&file=/src/Components/PlayerMini.js:96-102

export const Team = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAnimating, setAnimating] = useState(false);

  const contentRef = useRef({
    lastIndex: 0,
  });

  const onChangePlayer = (index) => {
    contentRef.current.lastIndex = selectedIndex;
    setSelectedIndex(index);
    setAnimating(true);
    setTimeout(() => {
      setAnimating(false);
    }, 500);
  };

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
        {props.data ? (
          <div className="col-md-12">
            <div
              className="card col-md-10 col-md-offset-1"
              style={{ padding: 40 }}
            >
              <div className="col-md-4 col-sm-4 team">
                <motion.img
                  animate={{ x: selectedIndex * 100 }}
                  src={props.data[selectedIndex].img}
                  className="team-img text-left"
                  style={{ borderRadius: 10 }}
                  onClick={() => setSelectedIndex(selectedIndex + 1)}
                />
                <div className="animation-block">
                  <motion.h3
                    // animate={{ x: isAnimating ? -200 : 0 }}
                    style={{ opacity: 1 }}
                  >
                    {props.data[contentRef.current.lastIndex].name}
                  </motion.h3>
                  <motion.h3
                    {...(isAnimating
                      ? {
                          animate: {
                            x: isAnimating ? 0 : 200,
                          },
                        }
                      : {})}
                    style={{ x: 200, opacity: isAnimating ? 1 : 0 }}
                  >
                    {props.data[selectedIndex].name}
                  </motion.h3>
                </div>
                <motion.p>{props.data[selectedIndex].role}</motion.p>
              </div>
              <div className="col-md-8 col-sm-8">hehe</div>
            </div>
          </div>
        ) : (
          "loading"
        )}
        <div id="row" className="col-md-12 section-title">
          {props.data
            ? props.data.map((d, i) => (
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
              ))
            : "loading"}
        </div>
      </div>
    </div>
  );
};
