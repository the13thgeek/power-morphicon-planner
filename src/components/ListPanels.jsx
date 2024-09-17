import React from 'react';
import './ListPanels.scss';

const ListPanels = (panelData) => {

const processGuestNames = (guests,guests_plus) => {
    let output = "";

    if(guests) {
        for(let i=0;i<guests.length;i++) {
            output += guests[i].name;
            if( i<(guests.length-1) ) {
                output += ", ";
            }
        }
    }
    if(guests_plus) {
        if(guests) {
            output += ", ";
        }
        output += guests_plus;
    }

    return output;
}

  return (
    <div className='panels-list'>
        {panelData.data.map((panel,index) => 
            <div key={panel._id || index} className="panel-item">
                <div className="place-time">
                    <span className="room">
                        { panel.room === 'a' ? 'Room A' :
                          panel.room === 'b' ? 'Room B' :
                          panel.room === 'c' ? 'Room C' : ''}
                    </span><br />
                    {panel.duration.start}<br />
                    {panel.duration.end}
                </div>
                <hr />
                <div className="info">
                    <h3>{panel.title}</h3>
                    <p>{panel.description}</p>
                    { panel.guests || panel.guests_plus ? (
                        <p>
                            <b>Guest(s):</b> {processGuestNames(panel.guests, panel.guests_plus)}
                        </p>
                    ) : ('') }
                    { panel.moderator ? (
                        <p><b>Moderator(s):</b> {panel.moderator}</p>
                    ) : ('')}
                </div>
            </div>
        )}        
    </div>
  )
}

export default ListPanels