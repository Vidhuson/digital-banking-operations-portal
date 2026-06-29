import { Request, Response } from 'express';

import { CustomerService } from '../services/customer.service';


export class CustomerController {
    private customerService = new CustomerService();

    createCustomer = async (req: Request, res: Response) => {
        try {
            const customer = await this.customerService.createCustomer(req.body);
            return res.status(201).json({
                success: true,
                message: 'Customer created successfully',
                data: customer
            });
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to create customer'
            });
        }
    }

    getCustomers = async (req: Request, res: Response) => {
        try {
            const customer = await this.customerService.getCustomers();
            return res.status(200).json({
                success: true,
                message: 'Customer fetched successfully',
                data: customer
            });
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to fetch customers'
            });
        }
    }

    getCustomerById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id as string
            const customer = await this.customerService.getCustomerById(id);
            return res.status(200).json({
                success: true,
                message: 'Customer fetched successfully',
                data: customer
            });
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to fetch customers'
            });
        }
    }

    updateCustomer = async (req: Request, res: Response) => {
        try {
            const id = req.params.id as string;
            const body = req.body
            const customer = await this.customerService.updateCustomer(id, body);
            return res.status(200).json({
                success: true,
                message: 'Customer updated successfully',
                data: customer
            });
        } catch (error: any) {
            return res.status(404).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to update customer'
            });
        }
    }

    deleteCustomer = async (req: Request, res: Response) => {
        try {
            const id = req.params.id as string;
            const customer = await this.customerService.deleteCustomer(id);
            return res.status(200).json({
                success: true,
                message: 'Customer deleted successfully',
                data: customer
            });
        } catch (error: any) {
            return res.status(404).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to delete customer'
            });
        }
    }
}