import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Heading from '../components/Heading';
import Footer from "../components/Footer";
import setBodyColor from '../setBodyColor'
import Tile from '../components/Tile';
import ListPhotoOps from "../components/ListPhotoOps";
import './PagePhotoOps.scss';
import UpdateText from "../components/UpdateText";

//import data from "../data/photoopdata.json";
import dataClient from "../data/sanityClient";

const PagePhotoOps = () => {
    const [searchTerm, setSearchTerm] = useState("");    
    const [photoOpData, setPhotoOpData] = useState([]);
    const [filteredData, setFilteredData] = useState(photoOpData);

    useEffect(() => {
        // let query = `*[_type == "pmcPhotoOp" && pmcYear == 2026] | order(type desc, guests[0]->name asc, groupName asc) {
        //     _id,
        //     pmcYear,
        //     type,
        //     groupName,
        //     rate,
        //     guests[]->{name},
        //     photoOpTime
        // }`;
        let query = `*[_type == "pmcPhotoOp" && pmcYear == 2026] | order(coalesce(guests[0]->name, groupName) asc, type asc) {
            _id,
            pmcYear,
            type,
            groupName,
            rate,
            guests[]->{name},
            photoOpTime
        }`;
        dataClient
            .fetch(query)
            .then((data) => { setPhotoOpData(data); setFilteredData(data); })
            .catch((e) => { console.log(e); });

        document.title = 'Photo Ops - Power Morphicon Planner';
        window.scrollTo(0, 0);
    },[]);

    useEffect(() => {
        const lowerSearchTerm = searchTerm.toLowerCase();
        
        if(photoOpData) {
            const filteredPhotoOps = photoOpData.filter((photoOp) => {
                const photoOpValues = [
                    photoOp.groupName ? photoOp.groupName.toLowerCase() : '',
                    ...(photoOp.guests ? photoOp.guests.map((guest) => guest.name.toLowerCase()) : [])
                ];
                return photoOpValues.some((value) => value.includes(lowerSearchTerm));
            });
            setFilteredData(filteredPhotoOps);
        } else {
            setFilteredData(photoOpData);
        }

        // const filtered = data
        //   .map((type) => ({
        //     ...type,
        //     guests: type.guests.filter((guest) =>
        //       Object.values(guest)
        //         .map((value) => value.toString().toLowerCase())
        //         .some((element) => element.includes(searchTerm.toLowerCase()))
        //     ),
        //   }))
        //   .filter((type) => type.guests.length > 0);
    
        //setFilteredData(filtered);

        
      }, [searchTerm]);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    setBodyColor({color: '#0033cc'});

    const soloOps = filteredData ? filteredData.filter((p) => p.type === 'solo') : [];
    const costumeOps = filteredData ? filteredData.filter((p) => p.type === 'costume') : [];
    const groupOps = filteredData ? filteredData.filter((p) => p.type === 'group') : [];

  return (
    <div id='photo-ops'>
        <Heading>
            <div className='content'>
                <a href='../' className='back-button'>
                    <i className="fa-solid fa-arrow-left"></i>
                </a>
                <h1>Photo Ops</h1>
                <p>Strike a pose with your Morphin' heroes</p>
            </div>
            <div className="icon">
                <i className="fa-solid fa-camera"></i>
            </div>
        </Heading>
        <div className="structure">
            <div className="structure-content">
                <UpdateText />
                <p className="instruction">
                    Browse the Photo Ops schedule below or use the text box search for a photo op.
                </p>
                <input className="photo-ops-searcher" id="photoOpSearcher" type="text" placeholder="Search by guest or group name" value={searchTerm} onChange={handleInputChange} />

                <Tabs className='photoop-tabs' selectedTabClassName='active'>
                    <TabList>
                        <Tab><span>All</span></Tab>
                        <Tab><span>Solo</span></Tab>
                        <Tab><span>In-Costume</span></Tab>
                        <Tab><span>Group</span></Tab>
                    </TabList>
                    <TabPanel>
                        { filteredData && filteredData.length > 0 ? (
                            <ListPhotoOps data={filteredData} showType={true} />
                        ) : searchTerm !== '' ? (
                            <div className="no-data">No matching photo ops for <b>"{searchTerm}."</b></div>
                        ) : (
                            <div className="no-data">No photo ops are currently listed.</div>
                        )}
                    </TabPanel>
                    <TabPanel>
                        { soloOps.length > 0 ? (
                            <ListPhotoOps data={filteredData.filter((photoOp) => photoOp.type === 'solo')} />
                        ) : searchTerm !== '' ? (
                            <div className="no-data">No matching solo photo ops for <b>"{searchTerm}."</b></div>
                        ) : (
                            <div className="no-data">No solo photo ops are currently listed.</div>
                        )}
                    </TabPanel>
                    <TabPanel>
                        { costumeOps.length > 0 ? (
                            <ListPhotoOps data={filteredData.filter((photoOp) => photoOp.type === 'costume')} />
                        ) : searchTerm !== '' ? (
                            <div className="no-data">No matching in-costume photo ops for <b>"{searchTerm}."</b></div>
                        ) : (
                            <div className="no-data">No in-costume photo ops are currently listed.</div>
                        )}
                    </TabPanel>
                    <TabPanel>
                        { groupOps.length > 0 ? (
                            <ListPhotoOps data={filteredData.filter((photoOp) => photoOp.type === 'group')} />
                        ) : searchTerm !== '' ? (
                            <div className="no-data">No matching group photo ops for <b>"{searchTerm}."</b></div>
                        ) : (
                            <div className="no-data">No group photo ops are currently listed.</div>
                        )}
                    </TabPanel>
                </Tabs>
                <Tile className='disclaimer'>
                    <Footer />
                </Tile>
            </div>
        </div>
    </div>
  )
}

export default PagePhotoOps