import React, { useState } from 'react';
import { ProductIcon } from './Icons';

export function ProductFilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`filter-section filter-group ${open ? 'is-open open' : ''}`}>
      <button
        className="filter-section-title filter-title"
        onClick={() => setOpen(!open)}
        type="button"
        aria-expanded={open}
      >
        <strong>{title}</strong>
        <span className={`chevron ${open ? 'open up' : ''}`}>
          <ProductIcon name="chevronDown" size={14} />
        </span>
      </button>
      {open && <div className="filter-section-body filter-content">{children}</div>}
    </div>
  );
}
