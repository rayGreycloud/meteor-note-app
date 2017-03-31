import React, { Component } from 'react';
import { createContainer } from  'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import { Notes } from './../api/notes';

export class Editor extends Component {
  render() {
    return (
      <div>Editor Component</div>
    );
  }
}

Editor.propTypes = {
  note: React.PropTypes.object,
  selectedNoteId: React.PropTypes.string
}

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');

  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId)
  };
}, Editor);
