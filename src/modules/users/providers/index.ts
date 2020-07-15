import { container } from 'tsyringe';

import IHashProvider from '@modules/users/providers/IHashProvider/models/IHashProvider';
import BCryptHashProvider from '@modules/users/providers/IHashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
