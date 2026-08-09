import React from 'react'
import Tile from './Tile';

const UpdateText = () => {
  return (
    <Tile className='dialog updates'>
        <div className="icon">
            <i className="fa-solid fa-sync-alt"></i>
        </div>
        <div className='message'>
            <h3>In Active Development</h3>
            <p>This page is currently being updated for the <b>Power Morphicon 2026</b>. Stay tuned for new information coming soon!</p>
            <ul>
              <li>August 9, 2026 - Added <b>Guests</b> information</li>
              <li>August 3, 2026 - Added <b>Guests</b> information</li>
              <li>July 26, 2026 - Updated <b>Photo Ops</b> and <b>Guests</b> UI</li>
            </ul>
        </div>
    </Tile>
  )
}

export default UpdateText