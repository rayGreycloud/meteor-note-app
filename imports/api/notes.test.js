import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { Notes } from './notes';

if (Meteor.isServer) {
  describe('notes', function () {
    const noteOne = {
      _id: 'testNoteId1',
      title: 'Test Title',
      body: 'Test Body',
      updatedAt: 123,
      userId: 'testUserId1'
    };

    beforeEach(function () {
      Notes.remove({});
      Notes.insert(noteOne);
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

  }); // end describe
}
