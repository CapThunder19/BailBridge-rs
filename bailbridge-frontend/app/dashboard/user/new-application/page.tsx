'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function NewBailApplicationPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [applicationNumber, setApplicationNumber] = useState('');

  const [formData, setFormData] = useState({
    // Personal Information
    applicant_name: '',
    father_husband_name: '',
    age: '',
    gender: '',
    address: '',
    phone_number: '',
    email: '',
    
    // Case Details
    fir_number: '',
    police_station: '',
    district: '',
    state: '',
    date_of_arrest: '',
    sections_applied: '',
    case_description: '',
    
    // Bail Details
    bail_type: '',
    previous_bail_applications: false,
    previous_bail_details: '',
    
    // Supporting Information
    surety_details: '',
    medical_condition: '',
    family_dependents: '',
    employment_details: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const submissionData = {
        ...formData,
        age: parseInt(formData.age),
        date_of_arrest: new Date(formData.date_of_arrest).toISOString(),
        email: formData.email || null,
        previous_bail_details: formData.previous_bail_details || null,
        surety_details: formData.surety_details || null,
        medical_condition: formData.medical_condition || null,
        family_dependents: formData.family_dependents || null,
        employment_details: formData.employment_details || null,
      };

      const result = await api.createBailApplication(submissionData);
      setApplicationNumber(result.application_number);
    } catch (err: any) {
      setError(err.message || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (applicationNumber) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-green-600">Application Submitted Successfully!</CardTitle>
            <CardDescription>Your bail application has been submitted</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Your Application Number:</p>
              <p className="text-2xl font-bold font-mono">{applicationNumber}</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Please save this application number. Lawyers can use this ID to access your case details.
            </p>
            <div className="flex gap-2">
              <Button onClick={() => router.push('/dashboard/user')} className="flex-1">
                View My Applications
              </Button>
              <Button onClick={() => setApplicationNumber('')} variant="outline" className="flex-1">
                Submit Another
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>New Bail Application Form</CardTitle>
          <CardDescription>Fill in all the required details for your bail application</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="applicant_name">Applicant Name *</Label>
                  <Input
                    id="applicant_name"
                    required
                    value={formData.applicant_name}
                    onChange={(e) => handleChange('applicant_name', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="father_husband_name">Father/Husband Name *</Label>
                  <Input
                    id="father_husband_name"
                    required
                    value={formData.father_husband_name}
                    onChange={(e) => handleChange('father_husband_name', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    required
                    value={formData.age}
                    onChange={(e) => handleChange('age', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender *</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleChange('gender', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    required
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="phone_number">Phone Number *</Label>
                  <Input
                    id="phone_number"
                    required
                    value={formData.phone_number}
                    onChange={(e) => handleChange('phone_number', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Case Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Case Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fir_number">FIR Number *</Label>
                  <Input
                    id="fir_number"
                    required
                    value={formData.fir_number}
                    onChange={(e) => handleChange('fir_number', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="police_station">Police Station *</Label>
                  <Input
                    id="police_station"
                    required
                    value={formData.police_station}
                    onChange={(e) => handleChange('police_station', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="district">District *</Label>
                  <Input
                    id="district"
                    required
                    value={formData.district}
                    onChange={(e) => handleChange('district', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    required
                    value={formData.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="date_of_arrest">Date of Arrest *</Label>
                  <Input
                    id="date_of_arrest"
                    type="datetime-local"
                    required
                    value={formData.date_of_arrest}
                    onChange={(e) => handleChange('date_of_arrest', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="sections_applied">Sections Applied (IPC/BNS) *</Label>
                  <Input
                    id="sections_applied"
                    required
                    placeholder="e.g., 302, 307 IPC"
                    value={formData.sections_applied}
                    onChange={(e) => handleChange('sections_applied', e.target.value)}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="case_description">Case Description *</Label>
                  <textarea
                    id="case_description"
                    required
                    className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2"
                    value={formData.case_description}
                    onChange={(e) => handleChange('case_description', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Bail Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Bail Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bail_type">Bail Type *</Label>
                  <Select value={formData.bail_type} onValueChange={(value) => handleChange('bail_type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select bail type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="regular">Regular Bail</SelectItem>
                      <SelectItem value="anticipatory">Anticipatory Bail</SelectItem>
                      <SelectItem value="interim">Interim Bail</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2 pt-8">
                  <input
                    type="checkbox"
                    id="previous_bail_applications"
                    checked={formData.previous_bail_applications}
                    onChange={(e) => handleChange('previous_bail_applications', e.target.checked)}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="previous_bail_applications" className="cursor-pointer">
                    Previous Bail Applications?
                  </Label>
                </div>
                {formData.previous_bail_applications && (
                  <div className="md:col-span-2">
                    <Label htmlFor="previous_bail_details">Previous Bail Details</Label>
                    <textarea
                      id="previous_bail_details"
                      className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2"
                      value={formData.previous_bail_details}
                      onChange={(e) => handleChange('previous_bail_details', e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Supporting Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Supporting Information (Optional)</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="surety_details">Surety Details</Label>
                  <textarea
                    id="surety_details"
                    className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2"
                    placeholder="Details of proposed surety"
                    value={formData.surety_details}
                    onChange={(e) => handleChange('surety_details', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="medical_condition">Medical Condition</Label>
                  <textarea
                    id="medical_condition"
                    className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2"
                    placeholder="Any medical conditions requiring immediate attention"
                    value={formData.medical_condition}
                    onChange={(e) => handleChange('medical_condition', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="family_dependents">Family Dependents</Label>
                  <textarea
                    id="family_dependents"
                    className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2"
                    placeholder="Information about family members dependent on you"
                    value={formData.family_dependents}
                    onChange={(e) => handleChange('family_dependents', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="employment_details">Employment Details</Label>
                  <textarea
                    id="employment_details"
                    className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2"
                    placeholder="Your employment and financial status"
                    value={formData.employment_details}
                    onChange={(e) => handleChange('employment_details', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-destructive/10 text-destructive rounded-md">
                {error}
              </div>
            )}

            <div className="flex gap-4">
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? 'Submitting...' : 'Submit Bail Application'}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
