import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository';
import { ApiError } from '../utils/api-error';
import { HttpStatus } from '../utils/http-status';
import { ReferenceGenerator } from '../utils/reference-generator';
import { SignupDto } from '../dtos/user.dto';

export class AuthService {

    private userRepository = new UserRepository();

    signup = async (data: SignupDto) => {
        const existingUser =
            await this.userRepository.findUserByEmail(data.email);

        if (existingUser) throw new ApiError(HttpStatus.CONFLICT, 'User already exists');
        
        const hashedPassword =
            await bcrypt.hash(data.password, 10);

        const userNumber = ReferenceGenerator.generateUserNumber();

        const user = await this.userRepository.createUser({
            userNumber : userNumber,
            name: data.name,
            email: data.email,
            password: hashedPassword,
        });

        return user;
    };

    login = async (reqData: {
        email: string;
        password: string
    }) => {

        const user = await this.userRepository.findUserByEmail(reqData.email);

        if (!user) throw new ApiError(HttpStatus.UNAUTHORIZED ,'Invalid Credentials');

        const isPasswordValid = await bcrypt.compare(reqData.password, user.password);

        if (!isPasswordValid) throw new ApiError(HttpStatus.UNAUTHORIZED, 'Invalid Credentials');

        const jwtPayload = {
            userId: user.id,
            email: user.email,
            role: user.role
        }

        // Generate JWT token
        const jwtToken = jwt.sign(jwtPayload, process.env.JWT_SECRET as string, { expiresIn: '1d' });

        return {
            jwtToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        };
    }
}