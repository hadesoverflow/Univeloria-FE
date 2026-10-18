import React from 'react';
import { ContactIcon } from './Icons';

export function ContactItem({ icon, title, children }) {
  return (
    <div className="contact-item">
      <div className="contact-icon">
        <ContactIcon name={icon} size={20} />
      </div>
      <div>
        <strong>{title}</strong>
        <p>{children}</p>
      </div>
    </div>
  );
}
