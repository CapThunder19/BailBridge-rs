'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api, setAuthToken } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, FileText, User, MapPin, Calendar, Scale } from 'lucide-react';

interface BailApplication {
  id: string;
  application_number: string;
  applicant_name: string;
  fir_number: string;
  status: string;
  bail_type: string;
  created_at: string;
}

interface FullBailApplication extends BailApplication {
  user_id: string;
  father_husband_name: string;
  age: number;
  gender: string;
  address: string;
  phone_number: string;
  email?: string;
  police_station: string;
  district: string;
  state: string;
  date_of_arrest: string;
  sections_applied: string;
  case_description: string;
  previous_bail_applications: boolean;
  previous_bail_details?: string;
  surety_details?: string;
  medical_condition?: string;
  family_dependents?: string;
  employment_details?: string;
  assigned_lawyer_id?: string;
  judge_id?: string;
}

export default function LawyerCasesPage() {
  const router = useRouter();
  const [searchNumber, setSearchNumber] = useState('');
  const [allApplications, setAllApplications] = useState<BailApplication[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<FullBailApplication | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [assignLoading, setAssignLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    
    if (!token || role !== 'lawyer') {
      router.push('/login');
      return;
    }

    setAuthToken(token);
    fetchAllApplications();
  }, [router]);

  const fetchAllApplications = async () => {
    try {
      const data = await api.getAllBailApplications();
      setAllApplications(data);
    } catch (err: any) {
      console.error('Failed to fetch applications:', err.message);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchNumber.trim()) return;

    setLoading(true);
    setError('');
    setSelectedApplication(null);

    try {
      const data = await api.getBailApplication(searchNumber.trim());
      setSelectedApplication(data);
    } catch (err: any) {
      setError(err.message || 'Application not found');
    } finally {
      setLoading(false);
    }
  };

  const handleAssignCase = async () => {
    if (!selectedApplication) return;

    setAssignLoading(true);
    setError('');

    try {
      await api.assignLawyerToCase(selectedApplication.application_number);
      alert('Case assigned successfully!');
      // Refresh the application data
      const refreshed = await api.getBailApplication(selectedApplication.application_number);
      setSelectedApplication(refreshed);
      fetchAllApplications();
    } catch (err: any) {
      setError(err.message || 'Failed to assign case');
    } finally {
      setAssignLoading(false);
    }
  };

  const handleViewFromTable = async (applicationNumber: string) => {
    setSearchNumber(applicationNumber);
    setLoading(true);
    setError('');

    try {
      const data = await api.getBailApplication(applicationNumber);
      setSelectedApplication(data);
    } catch (err: any) {
      setError(err.message || 'Application not found');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'under_review': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Bail Applications</h1>
        <p className="text-muted-foreground">Search for cases by application number or view all pending applications</p>
      </div>

      {/* Search Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search by Application Number
          </CardTitle>
          <CardDescription>Enter the unique application number to view case details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="flex-1">
              <Input
                placeholder="e.g., BAIL-20260210123456-1234"
                value={searchNumber}
                onChange={(e) => setSearchNumber(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <div className="p-4 bg-destructive/10 text-destructive rounded-md mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* All Applications List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>All Applications</CardTitle>
            <CardDescription>Click to view details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {allApplications.map((app) => (
                <button
                  key={app.id}
                  onClick={() => handleViewFromTable(app.application_number)}
                  className="w-full text-left p-3 rounded-lg border hover:bg-accent transition-colors"
                >
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-semibold text-sm">{app.applicant_name}</p>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(app.status)}`}>
                      {app.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono">{app.application_number}</p>
                  <p className="text-xs text-muted-foreground mt-1">FIR: {app.fir_number}</p>
                </button>
              ))}
              {allApplications.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No applications found</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Selected Application Details */}
        <div className="lg:col-span-2">
          {selectedApplication ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Application Details</CardTitle>
                    <CardDescription className="font-mono">{selectedApplication.application_number}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(selectedApplication.status)}`}>
                      {selectedApplication.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Name</p>
                      <p className="font-semibold">{selectedApplication.applicant_name}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Father/Husband</p>
                      <p className="font-semibold">{selectedApplication.father_husband_name}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Age</p>
                      <p className="font-semibold">{selectedApplication.age} years</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Gender</p>
                      <p className="font-semibold capitalize">{selectedApplication.gender}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Phone</p>
                      <p className="font-semibold">{selectedApplication.phone_number}</p>
                    </div>
                    {selectedApplication.email && (
                      <div className="col-span-2">
                        <p className="text-muted-foreground">Email</p>
                        <p className="font-semibold">{selectedApplication.email}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Address
                  </h3>
                  <p className="text-sm">{selectedApplication.address}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedApplication.district}, {selectedApplication.state}
                  </p>
                </div>

                {/* Case Details */}
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Scale className="h-5 w-5" />
                    Case Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">FIR Number</p>
                      <p className="font-semibold">{selectedApplication.fir_number}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Police Station</p>
                      <p className="font-semibold">{selectedApplication.police_station}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Date of Arrest</p>
                      <p className="font-semibold">{new Date(selectedApplication.date_of_arrest).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Sections Applied</p>
                      <p className="font-semibold">{selectedApplication.sections_applied}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Bail Type</p>
                      <p className="font-semibold capitalize">{selectedApplication.bail_type}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Case Description</p>
                      <p className="mt-1">{selectedApplication.case_description}</p>
                    </div>
                  </div>
                </div>

                {/* Supporting Information */}
                {(selectedApplication.surety_details || selectedApplication.medical_condition || 
                  selectedApplication.family_dependents || selectedApplication.employment_details) && (
                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Supporting Information
                    </h3>
                    <div className="space-y-3 text-sm">
                      {selectedApplication.surety_details && (
                        <div>
                          <p className="text-muted-foreground font-medium">Surety Details</p>
                          <p className="mt-1">{selectedApplication.surety_details}</p>
                        </div>
                      )}
                      {selectedApplication.medical_condition && (
                        <div>
                          <p className="text-muted-foreground font-medium">Medical Condition</p>
                          <p className="mt-1">{selectedApplication.medical_condition}</p>
                        </div>
                      )}
                      {selectedApplication.family_dependents && (
                        <div>
                          <p className="text-muted-foreground font-medium">Family Dependents</p>
                          <p className="mt-1">{selectedApplication.family_dependents}</p>
                        </div>
                      )}
                      {selectedApplication.employment_details && (
                        <div>
                          <p className="text-muted-foreground font-medium">Employment</p>
                          <p className="mt-1">{selectedApplication.employment_details}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4 border-t">
                  {!selectedApplication.assigned_lawyer_id && (
                    <Button
                      onClick={handleAssignCase}
                      disabled={assignLoading}
                      className="flex-1"
                    >
                      {assignLoading ? 'Assigning...' : 'Assign to Me'}
                    </Button>
                  )}
                  {selectedApplication.assigned_lawyer_id && (
                    <div className="flex-1 p-3 bg-blue-50 dark:bg-blue-950 rounded-md">
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        This case has been assigned to a lawyer
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-12">
                <div className="text-center text-muted-foreground">
                  <Search className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>Search for an application or select one from the list</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
