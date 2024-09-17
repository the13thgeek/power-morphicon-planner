import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Heading from '../components/Heading';
import Footer from "../components/Footer";
import setBodyColor from '../setBodyColor'
import Tile from '../components/Tile';
import './PageGuestBio.scss';

import dataClient from "../data/sanityClient";

const PageGuestBio = () => {
const { slug } = useParams();
const [guest, setGuest] = useState(null);
const [loading, setLoading] = useState(true);
const navigate = useNavigate();

const formatPhotoOpTimes = (times) => {
    let output = "";
    
    if(times?.fri) {
        output += "Friday " + times.fri;
    }
    if(times?.sat) {
        if(times?.fri) {
            output+= " | ";
        }
        output += "Saturday " + times.sat;
    }
    if(times?.sun) {
        if(times?.fri || times?.sat) {
            output+= " | ";
        }
        output += "Sunday " + times.sun;
    }
    
    return output;
}

setBodyColor({color: '#0d8929'});

useEffect(() => {

    const fetchGuest = async() => {
        let query = `*[_type == 'pmcGuest' && slug.current == '${slug}'] {
            _id,slug,name,bio,photo,attendancePmc24,
            "panels": *[_type == 'pmcPanel' && references(^._id)] | order(day asc, duration.start asc)
            { day, duration, start, title, panelStart, room },
            "photoOps": *[_type == 'pmcPhotoOp' && references(^._id)] | order(type desc)
            { type, groupName, rate, photoOpTime }
        }`;

        try {
            const result = await dataClient.fetch(query, { slug });
            if(result && result.length > 0) {
                setGuest(result[0]);
            } else {
                navigate('/guests');
            }
        } catch(error) {
            console.error('Error fetching guest: ',error);
            navigate('/guests');
        } finally {
            setLoading(false);
        }
    };

    fetchGuest();

},[slug, navigate]);

useEffect(() => {
    if(guest) {
        document.title = guest.name + ' - Guests - Power Morphicon Planner';
    } else {
        document.title = 'Guests - Power Morphicon Planner';
    }
    window.scrollTo(0, 0);
},[]);

    return (
    <div id='guest-bio'>
        <Heading>
            <div className='content'>
                <Link to='/guests' className='back-button'>
                    <i className="fa-solid fa-arrow-left"></i>
                </Link>
                <h1>Guest Info</h1>
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
                { !loading ? (
                    <>
                        <div className="row">
                            <div className="photo">
                                <img src="https://placehold.co/300" alt="Photo Preview" />
                            </div>
                            <div className="profile">
                                <h2>{guest.name} </h2>
                                <div className="attendance">
                                    { guest.attendancePmc24?.fri ? (<span>Fri</span>) : ('') }
                                    { guest.attendancePmc24?.sat ? (<span>Sat</span>) : ('') }
                                    { guest.attendancePmc24?.sun ? (<span>Sun</span>) : ('') }
                                </div>
                                <p>{guest.bio}</p>
                            </div>
                        </div>
                        { guest.panels ? (
                            <>
                            <Tile className='section-heading'>
                                <h3>Panels</h3>
                            </Tile>
                            <div className="list-table">
                                { guest.panels.map((panel, idx) => 
                                <div className="list-item" key={idx}>
                                    <h4>{panel.title}</h4>
                                    <p>
                                        { panel.day === 1 ? 'Friday' :
                                        panel.day === 2 ? 'Saturday' :
                                        'Sunday' }&nbsp;|&nbsp;
                                        { panel.duration.start + ' - ' + panel.duration.end }&nbsp;|&nbsp;
                                        { panel.room === 'a' ? 'Room A' :
                                        panel.room === 'b' ? 'Room B' :
                                        'Room C' }
                                    </p>
                                </div>
                                )}                                
                            </div>
                            </>
                        ) : ('') }
                        { guest.photoOps ? (
                            <>
                            <Tile className='section-heading'>
                                <h3>Photo Ops</h3>
                            </Tile>
                            <div className="list-table photo-ops">
                                { guest.photoOps.map((photoOp, idx) =>
                                <div className="list-item" key={idx}>
                                    <h4>{ photoOp.type === 'group' ? ('Group: ' + photoOp.groupName) : (photoOp.type.charAt(0).toUpperCase() + photoOp.type.slice(1)) }</h4>
                                    <p>
                                        { formatPhotoOpTimes(photoOp.photoOpTime) }
                                    </p>
                                </div>
                                 )}
                            </div>
                            </>
                        ) : ('') }
                        
                    </>
                ) : (
                    <div>Loading...</div>
                ) }
                {/* <code>
                    {JSON.stringify(guest)}
                </code> */}
                <Tile className='disclaimer'>
                    <Footer />
                </Tile>
            </div>
        </div>
    </div>
    );
}

export default PageGuestBio