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
              <li>July 23, 2026 - Added new <b>Guests</b> and updated <b>Photo Ops</b> and <b>Guests</b> UI</li>
              <li>July 22, 2026 - Added new <b>Guests</b> and <b>Photo Ops</b> information</li>
              <li>July 18, 2026 - Added new <b>Guests</b> information</li>
            </ul>
        </div>
    </Tile>
  )
}

export default UpdateText