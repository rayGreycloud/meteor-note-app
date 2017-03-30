import React from 'react';

import NoteList from './NoteList';
import PrivateHeader from './PrivateHeader';

const Dashboard = () => {
  return (
    <div>
      <PrivateHeader title="Dashboard" />
      <div className="page-content">
        <NoteList />
      </div>
    </div>
  );
};

export default Dashboard;
