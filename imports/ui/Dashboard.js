import React from 'react';

import NoteList from './NoteList';
import PrivateHeader from './PrivateHeader';
import Editor from './Editor';

const Dashboard = () => {
  return (
    <div>
      <PrivateHeader title="Your Notes" />
      <div className="page-content">
        <div className="page-content__sidebar">
          <NoteList />
        </div>
        <div className="page-content__main">
          <Editor />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
