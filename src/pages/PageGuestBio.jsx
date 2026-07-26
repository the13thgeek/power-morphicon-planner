import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Heading from '../components/Heading';
import Footer from "../components/Footer";
import setBodyColor from '../setBodyColor'
import Tile from '../components/Tile';
import './PageGuestBio.scss';

import dataClient from "../data/sanityClient";
import UpdateText from '../components/UpdateText';

const PageGuestBio = () => {
const { slug } = useParams();
const [guest, setGuest] = useState(null);
const [loading, setLoading] = useState(true);
const navigate = useNavigate();

const typeLabels = {
    solo: 'Solo',
    costume: 'In-Costume',
    group: 'Group'
};

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

const getTimeDisplay = (value) => {
    if (!value) {
        return { text: '—', className: 'time empty' };
    }
    if (value === 'TBD' || value.includes('TBD')) {
        return { text: value, className: 'time tbd' };
    }
    return { text: value, className: 'time confirmed' };
};

setBodyColor({color: '#0d8929'});

useEffect(() => {

    const fetchGuest = async() => {
        let query = `*[_type == 'pmcGuest' && slug.current == '${slug}'] {
            _id,slug,name,bio,photo,attendancePmc26,
            "panels": *[_type == 'pmcPanel' && pmcYear == 2026 && references(^._id)] | order(day asc, duration.start asc)
            { day, duration, start, title, panelStart, room },
            "photoOps": *[_type == 'pmcPhotoOp' && pmcYear == 2026 && references(^._id)] | order(type desc)
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
                <UpdateText />
                { !loading ? (
                    <>
                        <div className="row">
                            {/* <div className="photo">
                                <img src="https://placehold.co/300" alt="Photo Preview" />
                            </div> */}
                            <div className="profile">
                                <h2>{guest.name} </h2>
                                <span className="attending">Attending</span>
                                <div className="attendance">
                                    { guest.attendancePmc26?.fri ? (<span>Fri</span>) : ('') }
                                    { guest.attendancePmc26?.sat ? (<span>Sat</span>) : ('') }
                                    { guest.attendancePmc26?.sun ? (<span>Sun</span>) : ('') }
                                </div>
                                <p>{guest.bio}</p>
                            </div>
                        </div>
                        { guest.panels && guest.panels.length > 0 ? (
                            <>
                            <div className="guest-panels">
                                <h3 className='sub-section'>Panels</h3>
                                <div className="list panels">
                                    { guest.panels.map((panel, idx) => 
                                    <div className="list-item" key={idx}>
                                        <h4>{panel.title}</h4>
                                        <div className="schedule">
                                            <span className="room">{ panel.room === 'a' ? 'Panel Room A' :
                                            panel.room === 'b' ? 'Panel Room B' :
                                            'Panel Room C' }</span>
                                            <span className="day">{ panel.day === 1 ? 'Friday' :
                                            panel.day === 2 ? 'Saturday' :
                                            'Sunday' }</span>
                                            <span>·</span>
                                            <span className="time">
                                            { panel.duration.start + ' - ' + panel.duration.end }
                                            </span>
                                            
                                        </div>
                                    </div>
                                    )}                                
                                </div>
                            </div>
                            </>
                        ) : ('') }
                        { guest.photoOps && guest.photoOps.length > 0 ? (
                            <>
                            <div className="guest-photo-ops">
                            <h3 className='sub-section'>Photo Ops</h3>
                                <div className="list photo-ops">
                                    { guest.photoOps.map((photoOp, idx) => {
                                        const friTime = getTimeDisplay(photoOp.photoOpTime.fri);
                                        const satTime = getTimeDisplay(photoOp.photoOpTime.sat);
                                        const sunTime = getTimeDisplay(photoOp.photoOpTime.sun);
                                        return (
                                            <div className="list-item" key={idx}>
                                                <span className={`type ${photoOp.type}`}><span className="dot"></span> {typeLabels[photoOp.type]} — <b>$ {photoOp.rate}</b></span>
                                                {photoOp.type === 'group' && (
                                                    <h4>{photoOp.groupName}</h4>
                                                )}                                        
                                                <div className="schedule">
                                                    <div className="slot">
                                                        <span className={friTime.className}>{friTime.text}</span>
                                                        <span className="day">Fri</span>
                                                    </div>
                                                    <div className="slot">
                                                        <span className={satTime.className}>{satTime.text}</span>
                                                        <span className="day">Sat</span>
                                                    </div>
                                                    <div className="slot">
                                                        <span className={sunTime.className}>{sunTime.text}</span>
                                                        <span className="day">Sun</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}                                
                                    )}
                                </div>
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