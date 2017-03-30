import React from 'react';
import expect from 'expect';
import { Meteor } from 'meteor/meteor';
import { mount } from 'enzyme';

import NoteListItem from './NoteListItem';

if (Meteor.isClient) {
  describe('NoteListItem', function () {
    it('should render title and timestamp', function () {
      const title = 'Note Title';
      const updatedAt = 1490889476661; // 03/30/17 8:58a
      const wrapper = mount( <NoteListItem note={{ title, updatedAt}}/> );

      expect(wrapper.find('h5').text()).toBe(title);
      expect(wrapper.find('p').text()).toBe('3/30/17');
    });

    it('should set default title if none set', function () {
      const title = '';
      const updatedAt = 1490889476661; 
      const wrapper = mount( <NoteListItem note={{ title, updatedAt}}/> );

      expect(wrapper.find('h5').text()).toBe('Untitled note');
    });

  });
}
