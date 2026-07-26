import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Heading from '../components/Heading';
import Footer from "../components/Footer";
import setBodyColor from '../setBodyColor'
import Tile from '../components/Tile';
import './PageGuests.scss';

import dataClient from "../data/sanityClient";
import UpdateText from '../components/UpdateText';

const PageGuests = () => {
    const [searchTerm, setSearchTerm] = useState("");    
    const [guestData, setGuestData] = useState([]);
    const [filteredData, setFilteredData] = useState(guestData);

    setBodyColor({color: '#0d8929'});

    useEffect(() => {
        let query = `*[_type == "pmcGuest" && pmc26 == true] | order(name asc)
            {
            _id,
            name,
            slug,
            attendancePmc26,
            photo
            }`;
        dataClient
            .fetch(query)
            .then((data) => { setGuestData(data); setFilteredData(data); })
            .catch((e) => { console.log(e); });

        document.title = 'Guests - Power Morphicon Planner';
        //window.scrollTo(0, 0);
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
                <UpdateText />
                <p className="instruction">
                    These are the guests that have confirmed their attendance at PMC 2026. Browse the PMC Guest List below or use the text box search for guest names.
                </p>
                <input className="guest-searcher" id="guestSearcher" type="text" placeholder="Search by guest name" value={searchTerm} onChange={handleInputChange} />
                <div className="guest-grid">
                    { filteredData?.length > 0 ? (
                        filteredData.map((guest, index) => (
                        <Link to={`/guests/${guest.slug.current}`} className={`item-`+index+` id-`+guest._id} key={index}>
                            <div className="item">
                                {/* <img src="https://placehold.co/300" alt="Photo Preview" /> */}
                                <div className="info">
                                    <span className='name'>{guest.name}</span>
                                    <div className="attendance">
                                        { guest.attendancePmc26?.fri ? (<span>Fri</span>) : (<span className='absent'>Fri</span>) }
                                        { guest.attendancePmc26?.sat ? (<span>Sat</span>) : (<span className='absent'>Sat</span>) }
                                        { guest.attendancePmc26?.sun ? (<span>Sun</span>) : (<span className='absent'>Sun</span>) }
                                    </div>
                                </div>
                                
                            </div>
                        </Link>
                        ))                        
                    ) : (
                        <div className="no-data">No guest names matched with <b>"{searchTerm}."</b></div>
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