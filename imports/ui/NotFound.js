import React from 'react';
import { Link } from 'react-router';

export default () => {
  return (
    <div className="boxed-view">
      <div className="boxed-view__box">
        <h2>Page Not Found</h2>
        <p>Oops, unable to find that page.</p>
        <Link to="/" className="button button--link">Return to Home</Link>
      </div>
    </div>
  );
};
