import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/IHashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;
let createUser: CreateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to Authenticate', async () => {
    const user = await createUser.execute({
      name: 'Raphael Joer',
      email: 'ra.joer@gmail.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'ra.joer@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to Authenticate with wrong password', async () => {
    await createUser.execute({
      name: 'Raphael Joer',
      email: 'ra.joer@gmail.com',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'ra.joer@gmail.com',
        password: 'wrongPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to Authenticate non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'ra.joer@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
