import React from 'react';
import { Link } from 'react-router-dom';
import PanelGuestLinks from './PanelGuestLinks';
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
};

  return (
    <div className='panels-list'>
        {panelData.data.map((panel,index) => {
            return (
                <div key={panel._id || index} className="panel-item">
                    <div className="place-time">
                        <span className="room">
                            { panel.room === 'a' ? 'Panel Room A' :
                            panel.room === 'b' ? 'Panel Room B' :
                            panel.room === 'c' ? 'Panel Room C' : ''}
                        </span>
                        <span className="timespan">
                            {panel.duration.start} - {panel.duration.end}
                        </span>
                    </div>
                    <div className="info">
                        <h3>{panel.title}</h3>
                        <p>{panel.description}</p>
                        { panel.guests && (
                            <>
                            <h4>Guests</h4>
                            <PanelGuestLinks guests={panel.guests} />
                            </>
                        )}
                        { panel.guests_plus && (
                            <p className="sub"><b>Also featuring:</b> {panel.guests_plus}</p>
                        )}
                        { panel.moderator && (
                            <p className='sub'><b>Moderator(s):</b> {panel.moderator}</p>
                        )}
                    </div>
                </div>
            )
        }
            
        )}        
    </div>
  )
}

export default ListPanels