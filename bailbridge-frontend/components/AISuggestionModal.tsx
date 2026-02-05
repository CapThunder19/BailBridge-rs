'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface AISuggestionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  age: string;
  gender: string;
  offenseType: string;
  sectionNumber: string;
  priorConvictions: boolean;
  employmentStatus: string;
  familyTies: string;
  criminalHistory: string;
  additionalDetails: string;
}

export default function AISuggestionModal({ isOpen, onClose }: AISuggestionModalProps) {
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: '',
    gender: '',
    offenseType: '',
    sectionNumber: '',
    priorConvictions: false,
    employmentStatus: '',
    familyTies: '',
    criminalHistory: '',
    additionalDetails: ''
  });

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.age || !formData.gender || !formData.offenseType || !formData.sectionNumber) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setSuggestion(null);

    try {
      const response = await fetch('/api/ai-suggestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          age: parseInt(formData.age)
        })
      });

      const data = await response.json();

      if (data.success) {
        setSuggestion(data.suggestion);
        toast.success('AI analysis completed successfully!');
      } else {
        toast.error(data.message || 'Failed to generate suggestion');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to connect to AI service');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      age: '',
      gender: '',
      offenseType: '',
      sectionNumber: '',
      priorConvictions: false,
      employmentStatus: '',
      familyTies: '',
      criminalHistory: '',
      additionalDetails: ''
    });
    setSuggestion(null);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        >
          <Card className="bg-white dark:bg-[#1a2634] border-2 border-[#FF9B51]">
            <CardHeader className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="absolute right-4 top-4 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">AI Bail Eligibility Analysis</CardTitle>
                  <CardDescription>Get AI-powered insights on bail eligibility using BNS provisions</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {!suggestion ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          placeholder="Enter full name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="age">Age *</Label>
                        <Input
                          id="age"
                          type="number"
                          placeholder="Enter age"
                          value={formData.age}
                          onChange={(e) => handleInputChange('age', e.target.value)}
                          required
                          min="1"
                          max="120"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender *</Label>
                        <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Transgender">Transgender</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="employmentStatus">Employment Status *</Label>
                        <Select value={formData.employmentStatus} onValueChange={(value) => handleInputChange('employmentStatus', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Employed">Employed</SelectItem>
                            <SelectItem value="Self-Employed">Self-Employed</SelectItem>
                            <SelectItem value="Unemployed">Unemployed</SelectItem>
                            <SelectItem value="Student">Student</SelectItem>
                            <SelectItem value="Retired">Retired</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Case Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Case Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="offenseType">Offense Type *</Label>
                        <Input
                          id="offenseType"
                          placeholder="e.g., Theft, Assault, Fraud"
                          value={formData.offenseType}
                          onChange={(e) => handleInputChange('offenseType', e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sectionNumber">BNS Section Number *</Label>
                        <Input
                          id="sectionNumber"
                          placeholder="e.g., Section 303, 304"
                          value={formData.sectionNumber}
                          onChange={(e) => handleInputChange('sectionNumber', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Background Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Background Information</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="familyTies">Family Ties *</Label>
                        <Select value={formData.familyTies} onValueChange={(value) => handleInputChange('familyTies', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select family situation" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Strong - Lives with family">Strong - Lives with family</SelectItem>
                            <SelectItem value="Moderate - Family in same city">Moderate - Family in same city</SelectItem>
                            <SelectItem value="Weak - Family in different city">Weak - Family in different city</SelectItem>
                            <SelectItem value="None - No family support">None - No family support</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="criminalHistory">Criminal History *</Label>
                        <Select value={formData.criminalHistory} onValueChange={(value) => handleInputChange('criminalHistory', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select criminal history" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="No prior record">No prior record</SelectItem>
                            <SelectItem value="Minor offenses only">Minor offenses only</SelectItem>
                            <SelectItem value="Multiple prior offenses">Multiple prior offenses</SelectItem>
                            <SelectItem value="Serious prior convictions">Serious prior convictions</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="priorConvictions"
                          checked={formData.priorConvictions}
                          onCheckedChange={(checked) => handleInputChange('priorConvictions', checked as boolean)}
                        />
                        <Label htmlFor="priorConvictions" className="cursor-pointer">
                          Has prior convictions
                        </Label>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="additionalDetails">Additional Details (Optional)</Label>
                        <textarea
                          id="additionalDetails"
                          placeholder="Any other relevant information..."
                          value={formData.additionalDetails}
                          onChange={(e) => handleInputChange('additionalDetails', e.target.value)}
                          className="w-full min-h-[100px] px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF9B51]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:from-[#4338CA] hover:to-[#6D28D9] text-white"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Get AI Analysis
                        </>
                      )}
                    </Button>
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Reset
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-green-900 dark:text-green-100 mb-1">Analysis Complete</h4>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        The AI has analyzed the case details and generated a comprehensive bail eligibility report.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700 max-h-[500px] overflow-y-auto">
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <pre className="whitespace-pre-wrap text-sm text-gray-900 dark:text-gray-100 font-sans">
                        {suggestion}
                      </pre>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={resetForm}
                      className="flex-1 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:from-[#4338CA] hover:to-[#6D28D9] text-white"
                    >
                      New Analysis
                    </Button>
                    <Button variant="outline" onClick={onClose}>
                      Close
                    </Button>
                  </div>

                  <div className="flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-yellow-700 dark:text-yellow-300">
                      <strong>Disclaimer:</strong> This AI analysis is for informational purposes only and should not be considered legal advice. 
                      Please consult with a qualified lawyer for professional legal guidance.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
