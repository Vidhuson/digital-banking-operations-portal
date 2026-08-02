import { EmployeeRepository } from "../repositories/employee.repository";

export class EmployeeService {
    private employeeRepository = new EmployeeRepository();
    
    getEmployeeDashboard = async () => {
        const response = await this.employeeRepository.getEmployeeDashboard();
        return response;
    }
}
