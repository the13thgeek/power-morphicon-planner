import React, { useEffect } from "react";
import ReactGA from 'react-ga4';
import { HashRouter as Router, Routes, Route, } from "react-router-dom";
import Analytics from "./components/Analytics";

/* Pages */
import PageHome from "./pages/PageHome";
import PagePanels from "./pages/PagePanels";
import PagePhotoOps from "./pages/PagePhotoOps";
import PageGuests from "./pages/PageGuests";
import PageGuestBio from "./pages/PageGuestBio";
import PageBadges from "./pages/PageBadges";

import "./App.scss";

const App = () => {  

  useEffect(() => {
    if(import.meta.env.MODE === 'production') {
      ReactGA.initialize('G-FJL6SYR9ZC');
    }
  },[]);
  

  return (
    <Router>
      <Analytics />
      <Routes>
        <Route index element={<PageHome />} />
        <Route exact path="/" element={<PageHome />} />
        <Route exact path="/panels" element={<PagePanels />} />
        <Route exact path="/photo-ops" element={<PagePhotoOps />} />
        <Route exact path="/guests" element={<PageGuests />} />
        <Route exact path="/guests/:slug" element={<PageGuestBio />} />
        <Route exact path="/badges" element={<PageBadges />} />
        <Route path="*" element={<PageHome />} />
      </Routes>
    </Router>

    // <div className="content-body">
    //   <header className="content-box">
    //     <img className="logo-pmc" src={pmcLogo} alt="Power Morphicon" />
    //   </header>
    //   <div className="content-box info">
    //     <h1>Power Morphicon 2024 Planner</h1>
    //       <div className="thank-you">
    //         <small>August 26, 2024</small>
    //         <h3>That's a wrap!</h3>
    //         <p>Thank you for the fun weekend, everyone! It's been a treat seeing old friends again after two years; and same goes for meeting new ones and creating new experiences with everyone.</p>
    //         <p>And of course, thank you to everyone who used this page as a handy reference. I apologize not being able to update it in real-time during the event as much as I could; but I hope that this had been helpful in one way or another.</p>
    //         <p>Until then, may the Power protect you always. ⚡</p>
    //         <small>@the13thgeek</small>
    //       </div>
    //     <p>The panel and photo-op schedules for this year's PMC are out! Use the text box below to search for a panel and any matching events will show up in the table below.</p>
    //     <p className="disclaimer"><b>Last Update:</b> Aug 21, 2024 8:41 PM EST</p>
    //     <p className="disclaimer"><b>Disclaimer:</b> The data displayed on this page is sourced directly from <a href="//officialpowermorphicon.com" target="_blank">Power Morphicon</a>. We do not verify the accuracy of the information provided by PMC. Therefore, we are not responsible for any errors, inaccuracies, or discrepancies in the data. The information is provided "as is," and we recommend verifying details directly with PMC for the most accurate and up-to-date information.</p>
    //     <p className="powered">Powered by: @the13thgeek [ <a href="//twitter.com/the13thgeek" target="_blank">Twitter</a> ] [ <a href="//twitch.tv/the13thgeek" target="_blank">Twitch</a> ] [ <a href="//instagram.com/the13thgeek" target="_blank">Instagram</a> ]</p>
    //   </div>
    //   <Tabs className='tab-content' selectedTabClassName="active">
    //     <TabList className='tab-list'>
    //       <Tab>Panels</Tab>
    //       <Tab>Photo Ops</Tab>
    //     </TabList>
    //     <TabPanel className="tab-content">
    //       <Panels />
    //     </TabPanel>
    //     <TabPanel className="tab-content">
    //       <PhotoOps />
    //     </TabPanel>
    //   </Tabs>
      
    //   <Footer />
    // </div>
  );
};

export default App;
