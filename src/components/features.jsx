export const Features = (props) => {
  return (
    <div id="welcome" className="text-center">
      <div
        className="container"
        style={{ paddingTop: 100, paddingBottom: 100 }}
      >
        <div className="col-md-10 col-md-offset-1 section-title">
          <h4>chào mừng đến với</h4>
          <h2>AresVN</h2>
        </div>
        <div className="row">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.title}-${i}`} className="col-xs-6 col-md-2">
                  {" "}
                  {/* <i className={d.icon}></i> */}
                  <div className="icon">
                    {/* <img
                      src={d.image}
                      style={{
                        objectFit: "contain",
                        width: "100%",
                        height: "100%",
                      }}
                    /> */}
                    <h2 style={{ color: "#333", fontWeight: "normal" }}>
                      {d.title.substr(0, 1)}
                    </h2>
                  </div>
                  <h3>{d.title}</h3>
                  <p>{d.text}</p>
                </div>
              ))
            : "Loading..."}
        </div>
      </div>
    </div>
  );
};
