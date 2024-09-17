import React from 'react';
import './ListPhotoOps.scss';

const ListPhotoOps = (photoOpData) => {

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

  return (
    <div className="photoops-list">
        {photoOpData.data.map((photoOp, index) => 
            <div key={photoOp._id || index} className='photoop-item'>
                <div className="info">
                    <h3>{ photoOp.groupName ? photoOp.groupName : photoOp.guests[0].name } <span className="rate">${photoOp.rate}</span></h3>
                    { photoOp.groupName ? (
                        <p className='members'>{ processGuestNames(photoOp.guests) }</p>
                    ) : ('')}
                </div>
                <hr />
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
        )}
    </div>
  )
}

export default ListPhotoOps