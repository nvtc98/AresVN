import { useState, useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { Header } from "./components/Header";
import { Features } from "./components/Features";
import { About } from "./components/About";
import { Gallery } from "./components/Gallery";
import { Testimonials } from "./components/Testimonials";
import { Team } from "./components/Team";
import { Relationships } from "./components/Relationships";
import { Contact } from "./components/Contact";
import { Popup } from "./components/Popup";
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
