import { React, useEffect } from 'react';
import Heading from '../components/Heading';
import Footer from '../components/Footer';
import setBodyColor from '../setBodyColor';
import Tile from '../components/Tile';
import './PageBadges.scss';

const PageBadges = () => {
    setBodyColor({color: '#d440a6'});

    const badges = [
        {
            'type': 'gold',
            'name': 'Gold',
            'description': 'Full Weekend Early Admission',
            'extrainfo': 'Preferred Panel Sitting',
            'buylink': 'https://www.tixr.com/groups/powermorphicon/events/powermorphicon-power-morphicon-2026-116470'
        },
        {
            'type': 'red',
            'name': 'Red',
            'description': 'Full Weekend Admission',
            'extrainfo': null,
            'buylink': 'https://www.tixr.com/groups/powermorphicon/events/powermorphicon-power-morphicon-2026-116470'
        },
        {
            'type': 'blue',
            'name': 'Blue',
            'description': 'Saturday Admission',
            'extrainfo': null,
            'buylink': 'https://www.tixr.com/groups/powermorphicon/events/powermorphicon-power-morphicon-2026-116470'
        },
        {
            'type': 'yellow',
            'name': 'Yellow',
            'description': 'Sunday Admission',
            'extrainfo': null,
            'buylink': 'https://www.tixr.com/groups/powermorphicon/events/powermorphicon-power-morphicon-2026-116470'
        },
        {
            'type': 'pink',
            'name': 'Pink',
            'description': 'Children Under 12',
            'extrainfo': '(with paid adult)',
            'buylink': 'https://www.tixr.com/groups/powermorphicon/events/powermorphicon-power-morphicon-2026-116470'
        }
    ];

    useEffect(() => {
        document.title = 'Badges - Power Morphicon Planner';
        window.scrollTo(0, 0);
    }, []);

  return (
    <div id='badges'>
        <Heading>
            <div className='content'>
                <a href='../' className='back-button'>
                    <i className="fa-solid fa-arrow-left"></i>
                </a>
                <h1>Badges</h1>
                <p>Unlock your Command Center credentials</p>
            </div>
            <div className="icon">
                <i className="fa-solid fa-ticket"></i>
            </div>
        </Heading>
        <div className="structure">
            <div className="structure-content">
                <p className="instruction">
                    PMC 2026 advance tickets are now available for select badges. Please select one below.
                </p>
                {badges.map((badge,index) => 
                 badge.buylink ? (
                    <Tile key={index} className={`badge ${badge.type}`} isExternal={true} linkTo={badge.buylink}>
                        <div className="type-band">
                            <h3><span>{badge.name}</span> Ranger</h3>
                        </div>
                        <div className="info">
                            <p>{badge.description}</p>
                            <p className="extra">{badge.extrainfo}</p>
                            <div className="action">Buy Now <i className="fa-solid fa-up-right-from-square"></i></div>
                        </div>
                    </Tile>
                ) : (
                    <Tile key={index} className='badge coming-soon'>
                        <div className="type-band">
                            <h3><span>{badge.name}</span> Ranger</h3>
                        </div>
                        <div className="info">
                            <p>{badge.description}</p>
                            <p className="extra">{badge.extrainfo}</p>
                            <div className="action">Coming Soon</div>
                        </div>
                    </Tile>
                )
                
                )}
                <Tile className='disclaimer'>
                    <Footer />
                </Tile>
            </div>
        </div>
    </div>
  )
}

export default PageBadges