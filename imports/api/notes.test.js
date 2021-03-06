import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { Notes } from './notes';

if (Meteor.isServer) {
  describe('notes', function () {
    const noteOne = {
      _id: 'testNoteId1',
      title: 'Test Title 1',
      body: 'Test Body 1',
      updatedAt: 123,
      userId: 'testUserId1'
    };
    const noteTwo = {
      _id: 'testNoteId2',
      title: 'Test Title 2',
      body: 'Test Body 2',
      updatedAt: 123456789,
      userId: 'testUserId2'
    };

    beforeEach(function () {
      Notes.remove({});
      Notes.insert(noteOne);
      Notes.insert(noteTwo);
    });

    it('should insert new note', function () {
      const userId = 'testid';
      const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId });

      expect(Notes.findOne({ _id, userId })).toExist();
    });

    it('should not insert note if unauthenticated', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.insert']();
      }).toThrow();
    });

    it('should remove note', function () {
      Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId }, [noteOne._id]);

      expect(Notes.findOne({ _id: noteOne._id})).toNotExist();
    });

    it('should not remove note if unauthenticated', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id]);
      }).toThrow();
    });

    it('should not remove note if invalid _id', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId });
      }).toThrow();
    });

    it('should update note', function () {
      const title = 'Updated Title';

      Meteor.server.method_handlers['notes.update'].apply({
        userId: noteOne.userId
      }, [
        noteOne._id,
        { title }
      ]);

      const note = Notes.findOne(noteOne._id);

      expect(note.updatedAt).toBeGreaterThan(0);
      expect(note).toInclude({
        title,
        body: noteOne.body,
      });
    });

    it('should not update note if extra props', function () {
      const title = 'Updated Title';

      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({
          userId: noteOne.userId
        }, [
          noteOne._id,
          { title, newProp: 'New Property' }
        ]);
      }).toThrow();
    });

    it('should not update note if user not creator', function () {
      const title = 'Updated Title';

      Meteor.server.method_handlers['notes.update'].apply({
        userId: 'testUserId2'
      }, [
        noteOne._id,
        { title }
      ]);

      const note = Notes.findOne(noteOne._id);

      expect(note).toInclude(noteOne);
    });

    it('should not update note if unauthenticated', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({}, [noteOne._id]);
      }).toThrow();
    });

    it('should not update note if invalid _id', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({ userId: noteOne.userId });
      }).toThrow();
    });

    it('should return a users notes', function () {
      const res = Meteor.server.publish_handlers.notes.apply({ userId: noteOne.userId });
      // Call fetch because above returns cursor
      const notes = res.fetch();

      expect(notes.length).toBe(1);
      expect(notes[0]).toEqual(noteOne);
    });

    it('should return zero notes for user with no notes', function () {
      const res = Meteor.server.publish_handlers.notes.apply({ userId: 'testUserId3' });
      const notes = res.fetch();

      expect(notes.length).toBe(0);
    });
  }); // end describe
}
