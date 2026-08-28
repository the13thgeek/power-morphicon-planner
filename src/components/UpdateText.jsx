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
              <li>Aug 28, 2026 - Updated <b>Photo Ops</b> information</li>
              <li>Aug 27, 2026 - Updated <b>Photo Ops</b> and <b>Panels</b> information; minor UI improvements</li>
              <li>Aug 26, 2026 - Updated <b>Guests</b> and <b>Panels</b> information</li>
            </ul>
        </div>
    </Tile>
  )
}

export default UpdateText