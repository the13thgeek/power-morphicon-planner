import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './PanelGuestLinks.scss';

const PanelGuestLinks = ({ guests, limit = 5 }) => {
  const [expanded, setExpanded] = useState(false);

  if (!guests || guests.length === 0) return null;

  const visibleGuests = expanded ? guests : guests.slice(0, limit);
    const remainingCount = guests.length - limit;

    return (
      <div className="guest-links">
          {visibleGuests.map((guest, idx) => (
              <Link to={`/guests/${guest.slug.current}`} className={`item-${idx}`} key={guest._id || idx}>
                  {guest.name}
              </Link>
          ))}
          { !expanded && remainingCount > 0 && (
              <button
                  type="button"
                  className="guest-more"
                  onClick={() => setExpanded(true)}
              >
                  +{remainingCount} more...
              </button>
          )}
      </div>
  );
}

export default PanelGuestLinks