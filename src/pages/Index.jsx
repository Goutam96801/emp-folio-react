import React, { useState } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import LoginPage from '@/components/LoginPage';
import EmployeeList from '@/components/EmployeeList';
import EmployeeForm from '@/components/EmployeeForm';

const AppContent = () => {
  const [currentState, setCurrentState] = useState('login');
  const [selectedEmployee, setSelectedEmployee] = useState();
  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (isAuthenticated) {
      setCurrentState('list');
    } else {
      setCurrentState('login');
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    setCurrentState('list');
  };

  const handleAddEmployee = () => {
    setSelectedEmployee(undefined);
    setCurrentState('add');
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setCurrentState('edit');
  };

  const handleSaveEmployee = () => {
    setCurrentState('list');
  };

  const handleCancel = () => {
    setCurrentState('list');
  };

  if (!isAuthenticated || currentState === 'login') {
    return <LoginPage onLogin={handleLogin} />;
  }

  switch (currentState) {
    case 'list':
      return (
        <EmployeeList
          onAddEmployee={handleAddEmployee}
          onEditEmployee={handleEditEmployee}
        />
      );
    case 'add':
    case 'edit':
      return (
        <EmployeeForm
          employee={selectedEmployee}
          onSave={handleSaveEmployee}
          onCancel={handleCancel}
        />
      );
    default:
      return null;
  }
};

const Index = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default Index;
