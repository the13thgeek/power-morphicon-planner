import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Heading from '../components/Heading';
import Footer from "../components/Footer";
import setBodyColor from '../setBodyColor'
import Tile from '../components/Tile';
import ListPanels from "../components/ListPanels";
import './PagePanels.scss';

//import data from "../data/paneldata.json";
import dataClient from "../data/sanityClient";

const PagePanels = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [panelData, setPanelData] = useState(null);
    const [filteredData, setFilteredData] = useState(panelData);
    
    useEffect(() => {
        let query = `*[_type == "pmcPanel" && pmcYear == 2024] | order(day asc, duration.start asc, room asc) 
        {
            _id,
            title,
            description,
            day,room,
            duration,
            moderator,
            guests[]->{name},
            guests_plus
        }`;

        dataClient
            .fetch(query)
            .then((data) => { setPanelData(data); setFilteredData(data); setLoading(false) })
            .catch((e) => { console.log(e); setLoading(false); });
        
        document.title = 'Panels - Power Morphicon Planner';
        window.scrollTo(0, 0);

    },[]);
   
    useEffect(() => {
        const lowerSearchTerm = searchTerm.toLowerCase();
        if(panelData) {
            const filteredPanels = panelData.filter((panel) => {
                // searchable fields
                const panelValues = [
                    panel.title ? panel.title.toLowerCase() : '',
                    panel.description ? panel.description.toLowerCase() : '',
                    ...(panel.guests ? panel.guests.map((guest) => guest.name.toLowerCase()) : []),
                    panel.guests_plus ? panel.guests_plus.toLowerCase() : '',
                ];

                // Check for matches
                return panelValues.some((value) => value.includes(lowerSearchTerm));
            });
            setFilteredData(filteredPanels);
        } else {
            // Show all by default
            setFilteredData(panelData);
        }
        
    },[searchTerm]);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };
    
    setBodyColor({color: '#a50606'});

  return (
    <div id='panels'>
        <Heading>
            <div className='content'>
                <a href='../' className='back-button'>
                    <i className="fa-solid fa-arrow-left"></i>
                </a>
                <h1>Panels</h1>
                <p>Power up with Ranger talks and insights</p>
            </div>
            <div className="icon">
                <i className="fa-solid fa-people-group"></i>
            </div>
        </Heading>
        <div className="structure">
            <div className="structure-content">                
                <Tile className='dialog notice'>
                    <div className="icon">
                        <i className="fa-solid fa-wrench"></i>
                    </div>
                    <div className='message'>
                        <h3>In Active Development</h3>
                        <p>Displayed data is <b><u>for testing only</u></b> and may not be accurate. Updates will be announced!</p>
                    </div>
                </Tile>
                <p className="instruction">
                    Browse the Panels schedule below or use the text box search for a panel.
                </p>
                <input className="panel-searcher" id="panelSearcher" type="text" placeholder="Search by panel, room or participant names" value={searchTerm} onChange={handleInputChange} />
                
                <Tabs className='day-tabs' selectedTabClassName='active'>
                    <TabList>
                        <Tab><span>Day 1 (Fri)</span></Tab>
                        <Tab><span>Day 2 (Sat)</span></Tab>
                        <Tab><span>Day 3 (Sun)</span></Tab>
                    </TabList>
                    <TabPanel>
                        { filteredData && filteredData.filter((panel) => panel.day === 1).length > 0 ? (
                            <ListPanels data={filteredData.filter((panel) => panel.day === 1)} />
                        ) : (
                            <div className="no-data">No Friday panels have matched <b>"{searchTerm}."</b></div>
                        )}
                    </TabPanel>
                    <TabPanel>
                        { filteredData && filteredData.filter((panel) => panel.day === 2).length > 0 ? (
                            <ListPanels data={filteredData.filter((panel) => panel.day === 2)} />
                        ) : (
                            <div className="no-data">No Saturday panels have matched <b>"{searchTerm}."</b></div>
                        )}
                    </TabPanel>
                    <TabPanel>
                        { filteredData && filteredData.filter((panel) => panel.day === 3).length > 0 ? (
                            <ListPanels data={filteredData.filter((panel) => panel.day === 3)} />
                        ) : (
                            <div className="no-data">No Sunday panels have matched <b>"{searchTerm}."</b></div>
                        )}
                    </TabPanel>
                </Tabs>
                
                <Tile className='results panel section'>
                    
                </Tile>


{/*                 
                { filteredData.length == 0 ? (<p className="no-data">No panels matched your search for <b>"{searchTerm}."</b></p>) : "" }

                {filteredData.map((day, index) => (
                <Tile key={index} className='results panel section'>
                    <div className="heading">
                        <h3>{day.day}</h3>
                    </div>
                    <table className="panels-list" cellSpacing="0">
                        <tbody>
                            {day.panels.map((panel, idx) => (
                            <tr key={idx}>
                            <td className="time">
                                <span className="time">{panel.time}</span>
                            </td>
                            <td className="details">
                                <div className="room">
                                    <span>{panel.room}</span>
                                </div>
                                <h3>{panel.panel}</h3>
                                <p className="description">{panel.description}</p>
                                {panel.participants ? (
                                <p className="description">
                                    <b>Participants:</b>
                                    <br />
                                    {panel.participants}
                                    <br />
                                </p>
                                ) : (
                                ""
                                )}
                                {panel.moderator ? (
                                <p className="description">
                                    <b>Moderator:</b>
                                    <br />
                                    {panel.moderator}
                                </p>
                                ) : (
                                ""
                                )}
                            </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </Tile>
                ))} */}

                <Tile className='disclaimer'>
                    <Footer />
                </Tile>
                                
            </div>
        </div>
    </div>
  )
}

export default PagePanels