import { useState } from 'react';

export default function AdmissionsPage() {
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    maritalStatus: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    passportPhoto: null,
    
    // Emergency Contact
    emergencyName: '',
    emergencyRelation: '',
    emergencyPhone: '',
    emergencyAddress: '',
    
    // Academic Information
    program: '',
    startTerm: '',
    previousEducation: '',
    institution: '',
    graduationYear: '',
    gpa: '',
    fieldOfStudy: '',
    
    // Additional Information
    essay: '',
    workExperience: '',
    references: '',
    documents: null,
    
    // Financial Information
    financialAid: false,
    scholarships: '',
    paymentMethod: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalPages = 6;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        passportPhoto: file
      }));
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      console.log('Application submitted:', formData);
      alert('Application submitted successfully!');
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Logo and Title Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className='w-64'>
                <img src="/logo.png" alt="" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-brand-secondary mb-2">STUDENTS REGISTRATION FORM</h2>
            <p className="text-gray-600 mb-2">(Day, Evening, and Weekend Programs)</p>
            <p className="text-sm text-gray-500 italic">
              Write in clear block capital letters. Maintain consistency in names as they appear on your previous certificates.
            </p>
          </div>
          
          {/* Application Info */}
          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <div className="text-sm text-gray-600">
              Application ID: APP-2024-001
            </div>
            <div className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="font-semibold text-gray-800 mb-4">Application Progress</h3>
              <div className="space-y-3">
                {[
                  'Personal Information',
                  'Academic Background',
                  'Program Selection', 
                  'Emergency Contact',
                  'Financial Information',
                  'Review & Submit'
                ].map((step, index) => (
                  <div key={index} className={`flex items-center gap-3 p-2 rounded ${
                    currentPage === index + 1 ? 'bg-red-50 text-red-700' : 'text-gray-600'
                  }`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                      currentPage > index + 1 ? 'bg-green-500 text-white' :
                      currentPage === index + 1 ? 'bg-brand-primary text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {currentPage > index + 1 ? '✓' : index + 1}
                    </div>
                    <span className="text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm">
              {/* Form Header */}
              <div className="bg-brand-primary text-white p-6 rounded-t-lg">
                <h2 className="text-xl font-semibold">
                  {currentPage === 1 && 'Personal Information'}
                  {currentPage === 2 && 'Academic Background'}
                  {currentPage === 3 && 'Program Selection'}
                  {currentPage === 4 && 'Emergency Contact'}
                  {currentPage === 5 && 'Financial Information'}
                  {currentPage === 6 && 'Review & Submit'}
                </h2>
                <p className="text-white text-sm mt-1">
                  Please fill in all required fields marked with *
                </p>
              </div>

              <div className="p-8">
                {/* Page 1: Personal Information */}
                {currentPage === 1 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Middle Name</label>
                        <input
                          type="text"
                          name="middleName"
                          value={formData.middleName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Marital Status</label>
                        <select
                          name="maritalStatus"
                          value={formData.maritalStatus}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        >
                          <option value="">Select Status</option>
                          <option value="single">Single</option>
                          <option value="married">Married</option>
                          <option value="divorced">Divorced</option>
                          <option value="widowed">Widowed</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          required
                        />
                      </div>
                    </div>

                    {/* Passport Photo Upload */}
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                      <div className="flex flex-col md:flex-row gap-6 items-end">
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-orange-800 mb-2">AFFIX YOUR MOST RECENT PASSPORT SIZE PHOTOGRAPH HERE</h3>
                          <p className="text-xs text-orange-700 mb-4">Upload a clear, recent passport-size photograph (JPEG, PNG format, max 2MB)</p>
                          
                          <div className="relative">
                            <input
                              type="file"
                              id="passportPhoto"
                              accept="image/*"
                              onChange={handlePhotoUpload}
                              className="hidden"
                            />
                            <label
                              htmlFor="passportPhoto"
                              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-orange-300 rounded-lg cursor-pointer hover:bg-orange-100 transition-colors"
                            >
                              {formData.passportPhoto ? (
                                <div className="text-center">
                                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <span className="text-white text-sm">✓</span>
                                  </div>
                                  <p className="text-sm text-green-700 font-medium">{formData.passportPhoto.name}</p>
                                  <p className="text-xs text-green-600">Click to change photo</p>
                                </div>
                              ) : (
                                <div className="text-center">
                                  <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <span className="text-white text-sm">📷</span>
                                  </div>
                                  <p className="text-sm text-orange-700 font-medium">Click to upload photo</p>
                                  <p className="text-xs text-orange-600">JPG, PNG up to 2MB</p>
                                </div>
                              )}
                            </label>
                          </div>
                        </div>
                        
                        {/* Photo Preview */}
                        <div className="flex-shrink-0">
                          <div className="w-24 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                            {formData.passportPhoto ? (
                              <img
                                src={URL.createObjectURL(formData.passportPhoto)}
                                alt="Passport preview"
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <div className="text-center">
                                <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-1">
                                  <span className="text-white text-xs">👤</span>
                                </div>
                                <p className="text-xs text-gray-500">Preview</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Page 2: Academic Background */}
                {currentPage === 2 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Previous Education Level *</label>
                        <select
                          name="previousEducation"
                          value={formData.previousEducation}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          required
                        >
                          <option value="">Select Education Level</option>
                          <option value="high-school">High School</option>
                          <option value="associate">Associate Degree</option>
                          <option value="bachelor">Bachelor's Degree</option>
                          <option value="master">Master's Degree</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Field of Study</label>
                        <input
                          type="text"
                          name="fieldOfStudy"
                          value={formData.fieldOfStudy}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Institution Name *</label>
                        <input
                          type="text"
                          name="institution"
                          value={formData.institution}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year *</label>
                        <input
                          type="number"
                          name="graduationYear"
                          value={formData.graduationYear}
                          onChange={handleInputChange}
                          min="1950"
                          max="2030"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">GPA/Grade</label>
                      <input
                        type="text"
                        name="gpa"
                        value={formData.gpa}
                        onChange={handleInputChange}
                        placeholder="e.g., 3.8 or A"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                  </div>
                )}

                {/* Page 3: Program Selection */}
                {currentPage === 3 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Desired Program *</label>
                        <select
                          name="program"
                          value={formData.program}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          required
                        >
                          <option value="">Select Program</option>
                          <option value="computer-science">Computer Science</option>
                          <option value="business-admin">Business Administration</option>
                          <option value="engineering">Engineering</option>
                          <option value="mathematics">Mathematics</option>
                          <option value="physics">Physics</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Start Term *</label>
                        <select
                          name="startTerm"
                          value={formData.startTerm}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          required
                        >
                          <option value="">Select Term</option>
                          <option value="fall-2024">Fall 2024</option>
                          <option value="spring-2025">Spring 2025</option>
                          <option value="summer-2025">Summer 2025</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Personal Statement</label>
                      <textarea
                        name="essay"
                        value={formData.essay}
                        onChange={handleInputChange}
                        rows={6}
                        placeholder="Tell us about yourself and why you want to join our program..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                  </div>
                )}

                {/* Page 4: Emergency Contact */}
                {currentPage === 4 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact Name *</label>
                        <input
                          type="text"
                          name="emergencyName"
                          value={formData.emergencyName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Relationship *</label>
                        <input
                          type="text"
                          name="emergencyRelation"
                          value={formData.emergencyRelation}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact Phone *</label>
                      <input
                        type="tel"
                        name="emergencyPhone"
                        value={formData.emergencyPhone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact Address</label>
                      <textarea
                        name="emergencyAddress"
                        value={formData.emergencyAddress}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                  </div>
                )}

                {/* Page 5: Financial Information */}
                {currentPage === 5 && (
                  <div className="space-y-8">
                    {/* Financial Aid Section */}
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-orange-800 mb-4">Financial Aid & Scholarships</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              name="financialAid"
                              checked={formData.financialAid}
                              onChange={handleInputChange}
                              className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                            />
                            <span className="text-sm font-medium text-gray-700">I am applying for financial aid</span>
                          </label>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Scholarship Information</label>
                          <textarea
                            name="scholarships"
                            value={formData.scholarships}
                            onChange={handleInputChange}
                            rows={4}
                            placeholder="List any scholarships you are applying for or have received..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Payment Method Section */}
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-red-800 mb-4">Payment Options</h3>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">Preferred Payment Method *</label>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <label className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                              <input
                                type="radio"
                                name="paymentMethod"
                                value="full-payment"
                                checked={formData.paymentMethod === 'full-payment'}
                                onChange={handleInputChange}
                                className="text-red-600 focus:ring-red-500"
                              />
                              <div className="ml-3">
                                <div className="font-medium text-gray-900">Full Payment</div>
                                <div className="text-sm text-gray-500">Pay entire tuition upfront</div>
                              </div>
                            </label>
                            
                            <label className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                              <input
                                type="radio"
                                name="paymentMethod"
                                value="installments"
                                checked={formData.paymentMethod === 'installments'}
                                onChange={handleInputChange}
                                className="text-red-600 focus:ring-red-500"
                              />
                              <div className="ml-3">
                                <div className="font-medium text-gray-900">Installments</div>
                                <div className="text-sm text-gray-500">Monthly payment plan</div>
                              </div>
                            </label>
                            
                            <label className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                              <input
                                type="radio"
                                name="paymentMethod"
                                value="financial-aid"
                                checked={formData.paymentMethod === 'financial-aid'}
                                onChange={handleInputChange}
                                className="text-red-600 focus:ring-red-500"
                              />
                              <div className="ml-3">
                                <div className="font-medium text-gray-900">Financial Aid</div>
                                <div className="text-sm text-gray-500">Loans & grants</div>
                              </div>
                            </label>
                          </div>
                        </div>

                        {/* Payment Processors */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">Accepted Payment Processors</label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="flex items-center justify-center p-4 bg-white border border-gray-200 rounded-lg">
                              <div className="text-center">
                                <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center mb-2 mx-auto">
                                  <span className="text-white text-xs font-bold">VISA</span>
                                </div>
                                <span className="text-xs text-gray-600">Visa</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-center p-4 bg-white border border-gray-200 rounded-lg">
                              <div className="text-center">
                                <div className="w-12 h-8 bg-red-600 rounded flex items-center justify-center mb-2 mx-auto">
                                  <span className="text-white text-xs font-bold">MC</span>
                                </div>
                                <span className="text-xs text-gray-600">Mastercard</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-center p-4 bg-white border border-gray-200 rounded-lg">
                              <div className="text-center">
                                <div className="w-12 h-8 bg-blue-500 rounded flex items-center justify-center mb-2 mx-auto">
                                  <span className="text-white text-xs font-bold">AMEX</span>
                                </div>
                                <span className="text-xs text-gray-600">American Express</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-center p-4 bg-white border border-gray-200 rounded-lg">
                              <div className="text-center">
                                <div className="w-12 h-8 bg-blue-700 rounded flex items-center justify-center mb-2 mx-auto">
                                  <span className="text-white text-xs font-bold">PP</span>
                                </div>
                                <span className="text-xs text-gray-600">PayPal</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Additional Payment Information */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-yellow-800 text-xs font-bold">!</span>
                            </div>
                            <div>
                              <h4 className="font-medium text-yellow-800 mb-1">Payment Information</h4>
                              <ul className="text-sm text-yellow-700 space-y-1">
                                <li>• A non-refundable application fee of $50 is required</li>
                                <li>• Tuition fees vary by program and can be found on our website</li>
                                <li>• Payment plans are available with 0% interest</li>
                                <li>• Financial aid applications are processed separately</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Page 6: Review & Submit */}
                {currentPage === 6 && (
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="font-semibold text-gray-800 mb-4">Application Summary</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Name:</span>
                          <span className="ml-2 text-gray-600">{formData.firstName} {formData.lastName}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Email:</span>
                          <span className="ml-2 text-gray-600">{formData.email}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Program:</span>
                          <span className="ml-2 text-gray-600">{formData.program}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Start Term:</span>
                          <span className="ml-2 text-gray-600">{formData.startTerm}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <input type="checkbox" id="terms" className="rounded border-gray-300 text-red-600 focus:ring-red-500" required />
                      <label htmlFor="terms" className="text-sm text-gray-700">
                        I agree to the Terms and Conditions and Privacy Policy
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between p-6 bg-gray-50 rounded-b-lg">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  className="px-6 py-2 text-gray-600 bg-brand-secondary hover:bg-brand-secondary/80 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                {currentPage < totalPages ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-lg transition-colors"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-6 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
