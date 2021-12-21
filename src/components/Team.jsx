import RadarChart from "react-svg-radar-chart";
// import "react-svg-radar-chart/build/css/index.css";

const data = [
  {
    "data": {
     "battery": 0.7,
     "design": 0.8,
     "useful": 0.9,
     "speed": 0.67,
     "weight": 0.8
    },
    "meta": {
     "color": "#edc951"
    }
   }
];

const captions = {
  // columns
  battery: "Aiming",
  design: "Movement",
  useful: "Stability",
  speed: "Timing",
  weight: "Weight",
};

export const Team = (props) => {
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
        <div id="row">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className="col-md-3 col-sm-6 team">
                  <div className="thumbnail">
                    {" "}
                    <img src={d.img} alt="..." className="team-img" />
                    <div className="caption">
                      <h4>{d.name}</h4>
                      <p>{d.job}</p>
                      <RadarChart captions={captions} data={data} size={200} />
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
