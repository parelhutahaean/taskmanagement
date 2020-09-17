import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

describe('UserEntity', () => {
  let user;

  beforeEach(() => {
    user = new User();
    user.password = 'TestPassword';
    user.salt = 'TestSalt';
    bcrypt.hash = jest.fn();
  });

  it('returns true as password is valid', async () => {
    bcrypt.hash.mockResolvedValue('TestPassword');
    expect(bcrypt.hash).not.toHaveBeenCalled();
    const result = await user.validatePassword('123456');
    expect(bcrypt.hash).toHaveBeenCalledWith('123456', user.salt);
    expect(result).toEqual(true);
  });

  it('returns false as password is invalid', async () => {
    bcrypt.hash.mockResolvedValue('WrongPassword');
    expect(bcrypt.hash).not.toHaveBeenCalled();
    const result = await user.validatePassword('234567');
    expect(bcrypt.hash).toHaveBeenCalledWith('234567', user.salt);
    expect(result).toEqual(false);
  });
});
