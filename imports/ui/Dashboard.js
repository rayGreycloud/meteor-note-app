import React from 'react';

import NoteList from './NoteList';
import PrivateHeader from './PrivateHeader';
import Editor from './Editor';

const Dashboard = () => {
  return (
    <div>
      <PrivateHeader title="Your Notes" />
      <div className="page-content">
        <NoteList />
        <Editor />
      </div>
    </div>
  );
};

export default Dashboard;
