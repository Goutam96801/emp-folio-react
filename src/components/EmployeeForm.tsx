import React, { useState, useEffect } from 'react';
import { Employee, EmployeeFormData } from '@/types/Employee';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  ArrowLeft, 
  Save, 
  User, 
  Phone, 
  Mail, 
  Building, 
  Calendar,
  MapPin,
  DollarSign,
  Shield,
  Heart,
  Contact
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Move layout components outside to prevent re-creation
const BasicLayout: React.FC<{
  formData: EmployeeFormData;
  onInputChange: (field: keyof EmployeeFormData, value: string | number) => void;
}> = ({ formData, onInputChange }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name *</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => onInputChange('name', e.target.value)}
            className="pl-9 shadow-card focus:shadow-soft transition-all duration-200"
            placeholder="Enter full name"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="employeeCode">Employee Code *</Label>
        <Input
          id="employeeCode"
          value={formData.employeeCode}
          onChange={(e) => onInputChange('employeeCode', e.target.value)}
          className="shadow-card focus:shadow-soft transition-all duration-200 font-mono"
          placeholder="EMP001"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="dateOfJoining">Date of Joining *</Label>
        <div className="relative">
          <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="dateOfJoining"
            type="date"
            value={formData.dateOfJoining}
            onChange={(e) => onInputChange('dateOfJoining', e.target.value)}
            className="pl-9 shadow-card focus:shadow-soft transition-all duration-200"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="mobileNumber">Mobile Number *</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="mobileNumber"
            value={formData.mobileNumber}
            onChange={(e) => onInputChange('mobileNumber', e.target.value)}
            className="pl-9 shadow-card focus:shadow-soft transition-all duration-200"
            placeholder="+1-555-0123"
            required
          />
        </div>
      </div>
    </div>
  </div>
);

const AdvancedLayout: React.FC<{
  formData: EmployeeFormData;
  onInputChange: (field: keyof EmployeeFormData, value: string | number) => void;
  departments: string[];
  bloodGroups: string[];
  maritalStatuses: string[];
}> = ({ formData, onInputChange, departments, bloodGroups, maritalStatuses }) => (
  <Tabs defaultValue="personal" className="space-y-6">
    <TabsList className="grid w-full grid-cols-3">
      <TabsTrigger value="personal">Personal Info</TabsTrigger>
      <TabsTrigger value="professional">Professional</TabsTrigger>
      <TabsTrigger value="additional">Additional</TabsTrigger>
    </TabsList>

    <TabsContent value="personal" className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => onInputChange('name', e.target.value)}
              className="pl-9 shadow-card focus:shadow-soft transition-all duration-200"
              placeholder="Enter full name"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => onInputChange('email', e.target.value)}
              className="pl-9 shadow-card focus:shadow-soft transition-all duration-200"
              placeholder="employee@company.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="mobileNumber">Mobile Number *</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="mobileNumber"
              value={formData.mobileNumber}
              onChange={(e) => onInputChange('mobileNumber', e.target.value)}
              className="pl-9 shadow-card focus:shadow-soft transition-all duration-200"
              placeholder="+1-555-0123"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="emergencyContact">Emergency Contact</Label>
          <div className="relative">
            <Contact className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="emergencyContact"
              value={formData.emergencyContact}
              onChange={(e) => onInputChange('emergencyContact', e.target.value)}
              className="pl-9 shadow-card focus:shadow-soft transition-all duration-200"
              placeholder="+1-555-0124"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bloodGroup">Blood Group</Label>
          <Select value={formData.bloodGroup} onValueChange={(value) => onInputChange('bloodGroup', value)}>
            <SelectTrigger className="shadow-card focus:shadow-soft">
              <div className="flex items-center">
                <Heart className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Select blood group" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {bloodGroups.map(group => (
                <SelectItem key={group} value={group}>{group}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="maritalStatus">Marital Status</Label>
          <Select value={formData.maritalStatus} onValueChange={(value) => onInputChange('maritalStatus', value)}>
            <SelectTrigger className="shadow-card focus:shadow-soft">
              <SelectValue placeholder="Select marital status" />
            </SelectTrigger>
            <SelectContent>
              {maritalStatuses.map(status => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="address">Address</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => onInputChange('address', e.target.value)}
              className="pl-9 shadow-card focus:shadow-soft transition-all duration-200 min-h-[80px]"
              placeholder="Enter complete address"
            />
          </div>
        </div>
      </div>
    </TabsContent>

    <TabsContent value="professional" className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="employeeCode">Employee Code *</Label>
          <Input
            id="employeeCode"
            value={formData.employeeCode}
            onChange={(e) => onInputChange('employeeCode', e.target.value)}
            className="shadow-card focus:shadow-soft transition-all duration-200 font-mono"
            placeholder="EMP001"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfJoining">Date of Joining *</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="dateOfJoining"
              type="date"
              value={formData.dateOfJoining}
              onChange={(e) => onInputChange('dateOfJoining', e.target.value)}
              className="pl-9 shadow-card focus:shadow-soft transition-all duration-200"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Select value={formData.department} onValueChange={(value) => onInputChange('department', value)}>
            <SelectTrigger className="shadow-card focus:shadow-soft">
              <div className="flex items-center">
                <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Select department" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {departments.map(dept => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="position">Position</Label>
          <div className="relative">
            <Shield className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="position"
              value={formData.position}
              onChange={(e) => onInputChange('position', e.target.value)}
              className="pl-9 shadow-card focus:shadow-soft transition-all duration-200"
              placeholder="Job title"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="salary">Salary</Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="salary"
              type="number"
              value={formData.salary || ''}
              onChange={(e) => onInputChange('salary', Number(e.target.value))}
              className="pl-9 shadow-card focus:shadow-soft transition-all duration-200"
              placeholder="Annual salary"
            />
          </div>
        </div>
      </div>
    </TabsContent>

    <TabsContent value="additional" className="space-y-4">
      <div className="text-center text-muted-foreground py-8">
        <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>Additional fields can be configured here</p>
        <p className="text-sm">Custom fields, documents, certifications, etc.</p>
      </div>
    </TabsContent>
  </Tabs>
);

interface EmployeeFormProps {
  employee?: Employee;
  onSave: () => void;
  onCancel: () => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee, onSave, onCancel }) => {
  const [formData, setFormData] = useState<EmployeeFormData>({
    name: '',
    dateOfJoining: '',
    employeeCode: '',
    mobileNumber: '',
    email: '',
    department: '',
    position: '',
    salary: undefined,
    address: '',
    emergencyContact: '',
    bloodGroup: '',
    maritalStatus: ''
  });
  const [layoutMode, setLayoutMode] = useState<'basic' | 'advanced'>('basic');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        dateOfJoining: employee.dateOfJoining,
        employeeCode: employee.employeeCode,
        mobileNumber: employee.mobileNumber,
        email: employee.email || '',
        department: employee.department || '',
        position: employee.position || '',
        salary: employee.salary,
        address: employee.address || '',
        emergencyContact: employee.emergencyContact || '',
        bloodGroup: employee.bloodGroup || '',
        maritalStatus: employee.maritalStatus || ''
      });
    } else {
      // Generate employee code for new employees
      const existingEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
      const nextCode = `EMP${String(existingEmployees.length + 1).padStart(3, '0')}`;
      setFormData(prev => ({ ...prev, employeeCode: nextCode }));
    }
  }, [employee]);

  const handleInputChange = (field: keyof EmployeeFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      const existingEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
      
      if (employee) {
        // Update existing employee
        const updatedEmployees = existingEmployees.map((emp: Employee) =>
          emp.id === employee.id
            ? {
                ...emp,
                ...formData,
                updatedAt: new Date().toISOString()
              }
            : emp
        );
        localStorage.setItem('employees', JSON.stringify(updatedEmployees));
        
        toast({
          title: "Employee Updated",
          description: `${formData.name} has been successfully updated.`,
        });
      } else {
        // Create new employee
        const newEmployee: Employee = {
          id: Date.now().toString(),
          ...formData,
          createdBy: user?.username || 'admin',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        const updatedEmployees = [...existingEmployees, newEmployee];
        localStorage.setItem('employees', JSON.stringify(updatedEmployees));
        
        toast({
          title: "Employee Added",
          description: `${formData.name} has been successfully added to the system.`,
        });
      }
      
      onSave();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save employee data. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const departments = [
    'Engineering', 'HR', 'Sales', 'Marketing', 'Finance', 'Operations', 'Legal', 'IT Support'
  ];

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const maritalStatuses = ['Single', 'Married', 'Divorced', 'Widowed'];


  return (
    <div className="min-h-screen bg-gradient-background p-6">
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        {/* Header */}
        <Card className="shadow-card border-0 bg-gradient-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm" onClick={onCancel}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                  <CardTitle className="text-2xl font-bold">
                    {employee ? 'Edit Employee' : 'Add New Employee'}
                  </CardTitle>
                  <p className="text-muted-foreground">
                    {employee ? 'Update employee information' : 'Enter employee details'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={layoutMode === 'basic' ? 'default' : 'outline'}>Basic</Badge>
                <Badge variant={layoutMode === 'advanced' ? 'default' : 'outline'}>Advanced</Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Layout Toggle */}
        <Card className="shadow-card border-0 bg-gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant={layoutMode === 'basic' ? 'professional' : 'outline'}
                onClick={() => setLayoutMode('basic')}
              >
                Basic Layout
              </Button>
              <Button
                variant={layoutMode === 'advanced' ? 'professional' : 'outline'}
                onClick={() => setLayoutMode('advanced')}
              >
                Advanced Layout
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Form */}
        <Card className="shadow-card border-0 bg-gradient-card">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {layoutMode === 'basic' ? (
                <BasicLayout 
                  formData={formData} 
                  onInputChange={handleInputChange} 
                />
              ) : (
                <AdvancedLayout 
                  formData={formData} 
                  onInputChange={handleInputChange}
                  departments={departments}
                  bloodGroups={bloodGroups}
                  maritalStatuses={maritalStatuses}
                />
              )}
              
              <div className="flex justify-end space-x-4 pt-6 border-t border-border">
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
                <Button type="submit" variant="professional" disabled={isLoading}>
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? 'Saving...' : (employee ? 'Update Employee' : 'Add Employee')}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeForm;