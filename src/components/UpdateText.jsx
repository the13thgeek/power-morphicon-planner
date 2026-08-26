import React from 'react'
import Tile from './Tile';

const UpdateText = () => {
  return (
    <Tile className='dialog updates'>
        <div className="icon">
            <i className="fa-solid fa-sync-alt"></i>
        </div>
        <div className='message'>
            <h3>Latest Updates</h3>
            {/* <p>This page is currently being updated for the <b>Power Morphicon 2026</b>. Stay tuned for new information coming soon!</p> */}
            <ul>
              <li>August 25, 2026 - Updated <b>Guests</b>, <b>Photo Ops</b> and <b>Panels</b> information</li>
              <li>August 23, 2026 - Added <b>Panels</b> information</li>
              <li>August 22, 2026 - Updated <b>Photo Ops</b> information</li>
            </ul>
        </div>
    </Tile>
  )
}

export default UpdateText