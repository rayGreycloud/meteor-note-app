import React from 'react';
import expect from 'expect';
import { Meteor } from 'meteor/meteor';
import { mount } from 'enzyme';

import { notes } from './../fixtures/fixtures';
import { NoteListItem } from './NoteListItem';

if (Meteor.isClient) {
  describe('NoteListItem', function () {
    let Session;

    beforeEach(() => {
      Session = {
        set: expect.createSpy()
      };
    });

    it('should render title and timestamp', function () {
      const title = 'Note Title';
      const updatedAt = 1490889476661; // 03/30/17 8:58a
      const wrapper = mount( <NoteListItem note={notes[0]} Session={Session}/> );

      expect(wrapper.find('h5').text()).toBe(notes[0].title);
      expect(wrapper.find('p').text()).toBe('3/30/17');
    });

    it('should set default title if none set', function () {
      const wrapper = mount( <NoteListItem note={notes[1]} Session={Session}/> );

      expect(wrapper.find('h5').text()).toBe('Untitled note');
    });

  });
}
