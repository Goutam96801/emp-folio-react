export interface Employee {
  id: string;
  name: string;
  dateOfJoining: string;
  employeeCode: string;
  mobileNumber: string;
  createdBy: string;
  email?: string;
  department?: string;
  position?: string;
  salary?: number;
  address?: string;
  emergencyContact?: string;
  bloodGroup?: string;
  maritalStatus?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeFormData {
  name: string;
  dateOfJoining: string;
  employeeCode: string;
  mobileNumber: string;
  email?: string;
  department?: string;
  position?: string;
  salary?: number;
  address?: string;
  emergencyContact?: string;
  bloodGroup?: string;
  maritalStatus?: string;
}