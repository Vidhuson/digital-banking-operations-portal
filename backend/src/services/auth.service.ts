import bcrypt from 'bcrypt';

import { UserRepository } from '../repositories/user.repository';

export class AuthService {

    private userRepository = new UserRepository();

    signup = async (data: {
        name: string;
        email: string;
        password: string;
    }) => {

        // Check existing user
        const existingUser =
            await this.userRepository.findUserByEmail(data.email);

        if (existingUser) {
            throw new Error('User already exists');
        }

        // Hash password
        const hashedPassword =
            await bcrypt.hash(data.password, 10);

        // Create user
        const user =
            await this.userRepository.createUser({
                name: data.name,
                email: data.email,
                password: hashedPassword
            });

        return user;
    };
}