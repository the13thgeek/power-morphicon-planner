import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Heading from '../components/Heading';
import Footer from "../components/Footer";
import setBodyColor from '../setBodyColor'
import Tile from '../components/Tile';
import './PageGuests.scss';

import dataClient from "../data/sanityClient";

const PageGuests = () => {
    const [searchTerm, setSearchTerm] = useState("");    
    const [guestData, setGuestData] = useState([]);
    const [filteredData, setFilteredData] = useState(guestData);

    setBodyColor({color: '#0d8929'});

    useEffect(() => {
        let query = `*[_type == "pmcGuest" && pmc24 == true] | order(name asc)
            {
            _id,
            name,
            slug,
            attendancePmc24,
            photo
            }`;
        dataClient
            .fetch(query)
            .then((data) => { setGuestData(data); setFilteredData(data); })
            .catch((e) => { console.log(e); });

        document.title = 'Guests - Power Morphicon Planner';
        window.scrollTo(0, 0);
    },[]);

    useEffect(() => {
        const lowerSearchTerm = searchTerm.toLowerCase();

        if(guestData) {
            const filteredGuests = guestData.filter((guest) => {
                const guestValues = [
                    guest.name ? guest.name.toLowerCase() : ''
                ]
                return guestValues.some((value) => value.includes(lowerSearchTerm));
            });
            setFilteredData(filteredGuests);
        } else {
            setFilteredData(guestData);
        }

    },[searchTerm]);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
    <div id='guests'>
        <Heading>
            <div className='content'>
                <a href='../' className='back-button'>
                    <i className="fa-solid fa-arrow-left"></i>
                </a>
                <h1>Guests</h1>
                <p>Meet the Legends of the Morphin' Grid</p>
            </div>
            <div className="icon">
                <i className="fa-solid fa-user-ninja"></i>
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
                    Browse the PMC Guest List below or use the text box search for guest names.
                </p>
                <input className="guest-searcher" id="guestSearcher" type="text" placeholder="Search by guest name" value={searchTerm} onChange={handleInputChange} />
                <div className="guest-grid">
                    { filteredData ? (
                        filteredData.map((guest, index) => (
                        <Link to={`/guests/${guest.slug.current}`} key={index}>
                            <div className="item">
                                <img src="https://placehold.co/300" alt="Photo Preview" />
                                <div className="info">
                                    <h4>{guest.name}</h4>
                                    <div className="attendance">
                                        { guest.attendancePmc24?.fri ? (<span>Fri</span>) : ('') }
                                        { guest.attendancePmc24?.sat ? (<span>Sat</span>) : ('') }
                                        { guest.attendancePmc24?.sun ? (<span>Sun</span>) : ('') }
                                    </div>
                                </div>
                                
                            </div>
                        </Link>
                        ))                        
                    ) : (
                        <div className="no-data">No no guest names matched with <b>"{searchTerm}."</b></div>
                    )}
                </div>
                <Tile className='disclaimer'>
                    <Footer />
                </Tile>
            </div>
        </div>
    </div>
    )
}

export default PageGuests