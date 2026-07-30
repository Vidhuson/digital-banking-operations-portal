import { RequestContext } from "../context/request-context";
import { ProfileDto, UpdateProfileDto } from "../dtos/profile.dto";
import { CustomerRepository } from "../repositories/customer.repository";
import { ApiError } from "../utils/api-error";
import { HttpStatus } from "../utils/http-status";

export class ProfileService {
    private  readonly customerRepository = new CustomerRepository();

    private getCurrentUser = () => {
        const currentUser = RequestContext.getCurrentUser();
        if (!currentUser)
            throw new ApiError(
                HttpStatus.UNAUTHORIZED,
                "Current user not found."
            );
        return currentUser;
    }

    getMyProfile = async (): Promise<ProfileDto> => {

        const currentUser = this.getCurrentUser();

        const customer = await this.customerRepository.getMyProfile(currentUser.userNumber);

        if (!customer) throw new ApiError(HttpStatus.NOT_FOUND, 'Customer not found');

        return {
            customerNumber: customer.customerNumber,
            userNumber: customer.user.userNumber,
            name: customer.user.name,
            email: customer.user.email,
            phoneNumber: customer.phoneNumber,
            address: customer.address,
            dateOfBirth: customer.dateOfBirth,
            status: customer.status,
            createdAt: customer.createdAt
        };
    }

    updateMyProfile = async (profile: UpdateProfileDto): Promise<void> => {

        const currentUser = this.getCurrentUser();

        await this.customerRepository.updateMyProfile(
            currentUser.userNumber,
            profile
        );
    }
}