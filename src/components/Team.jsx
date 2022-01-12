import { useRef, useState } from "react";
import ApexCharts from "apexcharts";
import { motion } from "framer-motion";
//https://www.npmjs.com/package/framer-motion
//react-animations
//https://github.com/brunnolou/react-morph    https://codesandbox.io/s/jpnq33q47w?from-embed=&file=/src/Components/PlayerMini.js:96-102

export const Team = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const contentRef = useRef({
    currentItem: null,
    nextItem: null,
  });

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
            <motion.div
              key={selectedIndex}
              // animate={{ x: selectedIndex * 100 }}
              className="col-md-1 col-sm-1 team"
              onClick={() => setSelectedIndex(selectedIndex + 1)}
            >
              <img src={props.data[selectedIndex].img} className="team-img" />
            </motion.div>
            {/* <motion.div
              animate={{ x: selectedIndex * 100 }}
              onClick={() => setSelectedIndex(selectedIndex + 1)}
              className="col-md-1 col-sm-1 team"
            >
              <img
                src={contentRef.current.nextItem.img}
                className="team-img"
              />
            </motion.div> */}
          </div>
        ) : (
          "loading"
        )}
        <div id="row" className="col-md-12 section-title">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className="col-md-1 col-sm-1 team">
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
