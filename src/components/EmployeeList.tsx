import React, { useState, useEffect } from 'react';
import { Employee } from '@/types/Employee';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Users, 
  LogOut,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EmployeeListProps {
  onAddEmployee: () => void;
  onEditEmployee: (employee: Employee) => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({ onAddEmployee, onEditEmployee }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteEmployee, setDeleteEmployee] = useState<Employee | null>(null);
  const [sortField, setSortField] = useState<keyof Employee>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const { user, logout } = useAuth();
  const { toast } = useToast();

  // Load employees from localStorage on component mount
  useEffect(() => {
    const savedEmployees = localStorage.getItem('employees');
    if (savedEmployees) {
      const parsedEmployees = JSON.parse(savedEmployees);
      setEmployees(parsedEmployees);
      setFilteredEmployees(parsedEmployees);
    } else {
      // Initialize with some sample data
      const sampleEmployees: Employee[] = [
        {
          id: '1',
          name: 'John Doe',
          dateOfJoining: '2023-01-15',
          employeeCode: 'EMP001',
          mobileNumber: '+1-555-0123',
          createdBy: 'admin',
          email: 'john.doe@company.com',
          department: 'Engineering',
          position: 'Software Developer',
          createdAt: '2023-01-15T09:00:00Z',
          updatedAt: '2023-01-15T09:00:00Z'
        },
        {
          id: '2',
          name: 'Jane Smith',
          dateOfJoining: '2023-02-01',
          employeeCode: 'EMP002',
          mobileNumber: '+1-555-0124',
          createdBy: 'admin',
          email: 'jane.smith@company.com',
          department: 'HR',
          position: 'HR Manager',
          createdAt: '2023-02-01T09:00:00Z',
          updatedAt: '2023-02-01T09:00:00Z'
        },
        {
          id: '3',
          name: 'Mike Johnson',
          dateOfJoining: '2023-03-10',
          employeeCode: 'EMP003',
          mobileNumber: '+1-555-0125',
          createdBy: 'admin',
          email: 'mike.johnson@company.com',
          department: 'Sales',
          position: 'Sales Representative',
          createdAt: '2023-03-10T09:00:00Z',
          updatedAt: '2023-03-10T09:00:00Z'
        }
      ];
      setEmployees(sampleEmployees);
      setFilteredEmployees(sampleEmployees);
      localStorage.setItem('employees', JSON.stringify(sampleEmployees));
    }
  }, []);

  // Filter employees based on search term
  useEffect(() => {
    const filtered = employees.filter(employee =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employeeCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.mobileNumber.includes(searchTerm) ||
      employee.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.createdBy.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEmployees(filtered);
  }, [searchTerm, employees]);

  const handleSort = (field: keyof Employee) => {
    const direction = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(direction);

    const sorted = [...filteredEmployees].sort((a, b) => {
      const aValue = a[field] || '';
      const bValue = b[field] || '';
      
      if (direction === 'asc') {
        return aValue.toString().localeCompare(bValue.toString());
      } else {
        return bValue.toString().localeCompare(aValue.toString());
      }
    });
    
    setFilteredEmployees(sorted);
  };

  const handleDeleteEmployee = (employee: Employee) => {
    setDeleteEmployee(employee);
  };

  const confirmDelete = () => {
    if (deleteEmployee) {
      const updatedEmployees = employees.filter(emp => emp.id !== deleteEmployee.id);
      setEmployees(updatedEmployees);
      localStorage.setItem('employees', JSON.stringify(updatedEmployees));
      setDeleteEmployee(null);
      
      toast({
        title: "Employee Deleted",
        description: `${deleteEmployee.name} has been removed from the system.`,
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const refreshData = () => {
    const savedEmployees = localStorage.getItem('employees');
    if (savedEmployees) {
      const parsedEmployees = JSON.parse(savedEmployees);
      setEmployees(parsedEmployees);
      setFilteredEmployees(parsedEmployees);
    }
    toast({
      title: "Data Refreshed",
      description: "Employee list has been updated.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-background p-6">
      <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
        {/* Header */}
        <Card className="shadow-card border-0 bg-gradient-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-soft">
                  <Users className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">Employee Management</CardTitle>
                  <p className="text-muted-foreground">Welcome back, {user?.name}</p>
                </div>
              </div>
              <Button onClick={logout} variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-card border-0 bg-gradient-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Employees</p>
                  <p className="text-3xl font-bold text-primary">{employees.length}</p>
                </div>
                <Users className="h-8 w-8 text-primary opacity-80" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card border-0 bg-gradient-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">This Month</p>
                  <p className="text-3xl font-bold text-primary">
                    {employees.filter(emp => {
                      const joinDate = new Date(emp.dateOfJoining);
                      const currentMonth = new Date().getMonth();
                      return joinDate.getMonth() === currentMonth;
                    }).length}
                  </p>
                </div>
                <Plus className="h-8 w-8 text-primary opacity-80" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card border-0 bg-gradient-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Departments</p>
                  <p className="text-3xl font-bold text-primary">
                    {new Set(employees.map(emp => emp.department).filter(Boolean)).size}
                  </p>
                </div>
                <Filter className="h-8 w-8 text-primary opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions and Search */}
        <Card className="shadow-card border-0 bg-gradient-card">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 shadow-card focus:shadow-soft transition-all duration-200"
                />
              </div>
              
              <div className="flex gap-2">
                <Button onClick={refreshData} variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                <Button onClick={() => {}} variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button onClick={onAddEmployee} variant="professional" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Employee
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Employee Table */}
        <Card className="shadow-card border-0 bg-gradient-card">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => handleSort('name')}
                    >
                      Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => handleSort('dateOfJoining')}
                    >
                      Date of Joining {sortField === 'dateOfJoining' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => handleSort('employeeCode')}
                    >
                      Employee Code {sortField === 'employeeCode' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </TableHead>
                    <TableHead>Mobile Number</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => handleSort('createdBy')}
                    >
                      Created By {sortField === 'createdBy' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <div className="text-muted-foreground">
                          {searchTerm ? 'No employees found matching your search.' : 'No employees found.'}
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredEmployees.map((employee) => (
                      <TableRow key={employee.id} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="font-medium">
                          <div>
                            <div className="font-semibold">{employee.name}</div>
                            {employee.position && (
                              <div className="text-sm text-muted-foreground">{employee.position}</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(employee.dateOfJoining)}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-mono">
                            {employee.employeeCode}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono">{employee.mobileNumber}</TableCell>
                        <TableCell>
                          {employee.department && (
                            <Badge variant="secondary">{employee.department}</Badge>
                          )}
                        </TableCell>
                        <TableCell>{employee.createdBy}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onEditEmployee(employee)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteEmployee(employee)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deleteEmployee} onOpenChange={() => setDeleteEmployee(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete <strong>{deleteEmployee?.name}</strong>? 
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Delete Employee
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default EmployeeList;