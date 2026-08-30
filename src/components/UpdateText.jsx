import React from 'react'
import Tile from './Tile';

const UpdateText = () => {
  return (
    <Tile className='dialog updates'>
        <div className="icon">
            <i className="fas fa-bolt"></i>
        </div>
        <div className='message'>
            <h3>That's a wrap for PMC 2026!</h3>
            <p>My sincere gratitude goes to the entire <strong>Power Morphicon staff</strong> and all of the <strong>PMC attendees</strong> for helping spread the word, feedback and support. I hope that this project has made everyone's PMC weekend a little less stressful and more memorable.</p>
            <p>For feedback, questions, and other inquiries, please reach out to me, <strong>@the13thgeek</strong> via Twitter/Instagram/Bluesky.</p>
            <p>We'll see you again for PMC 2028. Until then, <b>May the Power Protect You</b>, fellow Rangers!</p>
            {/* <p>This page is currently being updated for the <b>Power Morphicon 2026</b>. Stay tuned for new information coming soon!</p> */}
            {/* <ul>
              <li>Aug 29, 2026 - Updated <b>Photo Ops</b> information</li>
              <li>Aug 28, 2026 - Updated <b>Photo Ops</b> information</li>
              <li>Aug 27, 2026 - Updated <b>Photo Ops</b> and <b>Panels</b> information; minor UI improvements</li>
            </ul> */}
        </div>
    </Tile>
  )
}

export default UpdateText