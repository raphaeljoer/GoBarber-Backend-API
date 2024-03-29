import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/IHashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Joer',
      email: 'ra.joer@gmail.com',
      password: '123123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create two users with the same email', async () => {
    const user = await createUser.execute({
      name: 'Joer',
      email: 'ra.joer@gmail.com',
      password: '123123',
    });

    await expect(
      createUser.execute({
        name: 'Joer',
        email: 'ra.joer@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
    return user;
  });
});
