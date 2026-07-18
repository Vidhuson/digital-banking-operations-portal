import { Request, Response } from 'express';

import { CustomerService } from '../services/customer.service';
import { ApiResponse } from '../utils/api-response';
import { HttpStatus } from '../utils/http-status';


export class CustomerController {
    private customerService = new CustomerService();

    createCustomer = async (req: Request, res: Response) => {
        const customer = await this.customerService.createCustomer(req.body);
        return ApiResponse.success(
            res,
            HttpStatus.CREATED,
            'Customer created successfully',
            customer
        )
    }

    getCustomers = async (_req: Request, res: Response) => {
        const customer = await this.customerService.getCustomers();
        return ApiResponse.success(
            res,
            HttpStatus.OK,
            'Customer fetched successfully',
            customer
        )
    }

    getCustomerById = async (req: Request, res: Response) => {
        const id = req.params.id as string
        const customer = await this.customerService.getCustomerById(id);
        return ApiResponse.success(
            res,
            HttpStatus.OK,
            'Customer fetched successfully',
            customer
        )
    }

    updateCustomer = async (req: Request, res: Response) => {
        const id = req.params.id as string;
        const body = req.body
        const customer = await this.customerService.updateCustomer(id, body);
        return ApiResponse.success(
            res,
            HttpStatus.OK,
            'Customer updated successfully',
            customer
        )
    }

    deleteCustomer = async (req: Request, res: Response) => {
        const id = req.params.id as string;
        const customer = await this.customerService.deleteCustomer(id);
        return ApiResponse.success(
            res,
            HttpStatus.OK,
            'Customer deleted successfully',
            customer
        )
    }
}