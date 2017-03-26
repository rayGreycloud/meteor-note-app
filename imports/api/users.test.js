import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { validateNewUser } from './users';

// Run test on server only
if (Meteor.isServer) {
  describe('users', function () {
    it('should return true for valid email', function () {
      const testUser = {
        emails: [
          {
            address: 'yoda@example.com'
          }
        ]
      };
      const res = validateNewUser(testUser);

      expect(res).toBe(true);
    });
  });
};