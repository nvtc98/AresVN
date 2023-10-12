import { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Features } from "./components/features";
import { About } from "./components/about";
import { Services } from "./components/services";
import { Gallery } from "./components/gallery";
import { Testimonials } from "./components/testimonials";
import { Team } from "./components/team";
import { Relationships } from "./components/relationships";
import { Contact } from "./components/contact";
import Popup from "./components/popup";
import JsonData from "./data/vi.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  const [showPopup, setShowPopup] = useState(null);
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <div>
      <Navigation />
      <Header data={landingPageData.Header} />
      <Features data={landingPageData.Features} />
      <About data={landingPageData.About} />
      {/* <Services data={landingPageData.Services} /> */}
      <Team data={landingPageData.Team} />
      <Gallery data={landingPageData.Gallery} setShowPopup={setShowPopup} />
      <Relationships data={landingPageData.Relationships} />
      <Testimonials
        data={landingPageData.Testimonials}
        setShowPopup={setShowPopup}
      />
      <Contact data={landingPageData.Contact} />
      <Popup showPopup={showPopup} setShowPopup={setShowPopup} />
    </div>
  );
};

export default App;
