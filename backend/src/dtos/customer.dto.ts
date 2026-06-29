export interface CreateCustomerDto {
  customerNumber: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  address?: string;
  dateOfBirth?: Date;
}