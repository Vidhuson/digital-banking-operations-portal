export interface CreateCustomerDto {
  customerNumber: string;
  fullName: string;
  email: string;
  userId: string;
  phoneNumber: string;
  address?: string;
  dateOfBirth?: Date;
}