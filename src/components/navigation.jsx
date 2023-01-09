import { useEffect, useRef } from "react";

export let navigationHeight = null;

export const Navigation = (props) => {
  const ref = useRef(null);
  useEffect(() => {
    navigationHeight = ref.current.offsetHeight;
  }, []);

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top" ref={ref}>
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll" href="#page-top">
            AresVN
          </a>{" "}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="#welcome" className="page-scroll">
                Chào mừng
              </a>
            </li>
            <li>
              <a href="#about" className="page-scroll">
                Giới thiệu
              </a>
            </li>
            {/* <li>
              <a href="#details" className="page-scroll">
                Details
              </a>
            </li> */}
            <li>
              <a href="#team" className="page-scroll">
                Thành viên
              </a>
            </li>
            <li>
              <a href="#portfolio" className="page-scroll">
                Bộ sưu tập
              </a>
            </li>
            <li>
              <a href="#relationships" className="page-scroll">
                Quan hệ
              </a>
            </li>
            <li>
              <a href="#testimonials" className="page-scroll">
                Bình luận
              </a>
            </li>
            <li>
              <a href="#contact" className="page-scroll">
                Liên hệ
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
