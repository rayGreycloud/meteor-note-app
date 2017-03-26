import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { validateNewUser } from './users';

// Run test on server only
if (Meteor.isServer) {
  describe('users', function () {
    it('should allow valid email address', function () {
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

    it('should reject invalid email address', function () {
      const testUser = {
        emails: [
          {
            address: 'bademailaddress'
          }
        ]
      };

      expect(() => {
        validateNewUser(testUser);
      }).toThrow();
    });
  });
};
