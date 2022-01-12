export const Relationships = (props) => {
  return (
    <div id="relationships" className="text-center">
      <div
        className="container"
        style={{ paddingTop: 100, paddingBottom: 100 }}
      >
        <div className="col-md-8 col-md-offset-2 section-title">
          <h2>Relationships</h2>
        </div>
        <div>
          {props.data
            ? props.data.map((team, index) => (
                <div
                  key={`${team.name}-${index}`}
                  className="col-md-12 col-sm-12 team"
                  style={{ display: "flex" }}
                >
                  <div
                    className="col-md-3 col-sm-6 team"
                    style={{ marginBottom: 20 }}
                  >
                    <div className="thumbnail" style={{ background: "#222" }}>
                      {" "}
                      <img src={team.img} alt="..." className="team-img" />
                      <div className="caption">
                        <h4>{team.name}</h4>
                        <p>{team.relationship}</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-md-8 col-sm-6 team thumbnail"
                    style={{
                      background: "transparent",
                      marginTop: 20,
                      marginLeft: -200,
                      paddingLeft: 200,
                      paddingRight: 50,
                      zIndex: -1,
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                      justifyContent: "center",
                    }}
                  >
                    {team.descriptions.map((description, descIndex) => (
                      <p
                        key={descIndex}
                        style={{ textAlign: "left", marginBottom: 20 }}
                      >
                        {description}
                      </p>
                    ))}
                  </div>
                </div>
              ))
            : "loading"}
        </div>
      </div>
    </div>
  );
};
