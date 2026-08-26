import React from 'react';
import './ListPhotoOps.scss';

const ListPhotoOps = ({ data, showType }) => {

const processGuestNames = (guests) => {
    let output = "";

    if(guests) {
        for(let i=0;i<guests.length;i++) {
            output += guests[i].name;
            if( i<(guests.length-1) ) {
                output += ", ";
            }
        }
    }
    return output;
}

const typeLabels = {
    solo: 'Solo',
    costume: 'In-Costume',
    group: 'Group'
};

const getTimeDisplay = (value) => {
    if (!value) {
        return { text: '—', className: 'time empty' };
    }
    if (value === 'TBD' || value.includes('TBD')) {
        return { text: value, className: 'time tbd' };
    }
    return { text: value, className: 'time confirmed' };
};

  return (
    <div className="photoops-list">
        {data.map((photoOp, index) => {
            const friTime = getTimeDisplay(photoOp.photoOpTime.fri);
            const satTime = getTimeDisplay(photoOp.photoOpTime.sat);
            const sunTime = getTimeDisplay(photoOp.photoOpTime.sun);
            // for debugging purposes, you can uncomment the following line to log each photoOp object to the console
            // console.log('photoOp:', photoOp);
            return (
                <div key={photoOp._id || index} className='photoop-item'>
                    <div className="card-top">
                        <div className="guest-info">
                            <span className="name">{ photoOp.groupName ? photoOp.groupName : photoOp.guests[0].name }</span>
                            { photoOp.groupName && (
                            <span className='members'>{ processGuestNames(photoOp.guests) }</span>
                            )}
                            { showType && (
                            <span className={`type ${photoOp.type}`}><span className="dot"></span> {typeLabels[photoOp.type]}</span>
                            )}
                        </div>
                        <div className="rate">
                            {photoOp.rate !== null && `$${photoOp.rate}`}
                        </div>
                    </div>
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
        {/* {data.map((photoOp, index) => 
            <div key={photoOp._id || index} className='photoop-item'>
                <div className="info">
                    <h3>{ photoOp.groupName ? photoOp.groupName : photoOp.guests[0].name } <span className="rate">${photoOp.rate}</span></h3>
                    { showType && (
                        <span className={`type-pill type-pill--${photoOp.type}`}>
                            {typeLabels[photoOp.type]}
                        </span>
                    )}
                    { photoOp.groupName ? (
                        <p className='members'>{ processGuestNames(photoOp.guests) }</p>
                    ) : ('')}
                </div>
                <div className="time-box">
                    <div className="item">
                        {photoOp.photoOpTime.fri ? photoOp.photoOpTime.fri : "---"}<br />
                        <span className="day-label">Fri</span>
                    </div>
                    <div className="item">
                        {photoOp.photoOpTime.sat ? photoOp.photoOpTime.sat : "---"}<br />
                        <span className="day-label">Sat</span>
                    </div>
                    <div className="item">
                        {photoOp.photoOpTime.sun ? photoOp.photoOpTime.sun : "---"}<br />
                        <span className="day-label">Sun</span>
                    </div>
                </div>
            </div>
        )} */}
    </div>
  )
}

export default ListPhotoOps