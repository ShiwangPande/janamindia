"use client"
import React, { useState, useEffect } from 'react';
import { Trash2, Eye, Calendar, Mail, Phone, User, Building, MessageSquare, Shield, LogOut, RefreshCw, Search, Filter } from 'lucide-react';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('contact');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  
  // Data states
  const [contactSubmissions, setContactSubmissions] = useState([]);
  const [signupSubmissions, setSignupSubmissions] = useState([]);
  const [volunteerApplications, setVolunteerApplications] = useState([]);
  
  // Pagination states
  const [contactPagination, setContactPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [signupPagination, setSignupPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [volunteerPagination, setVolunteerPagination] = useState({ page: 1, totalPages: 1, total: 0 });

  const ADMIN_PASSWORD = 'admin123'; // Change this to your desired password

  const handleLogin = (e: any) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
      fetchData();
    } else {
      alert('Invalid password!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    setContactSubmissions([]);
    setSignupSubmissions([]);
    setVolunteerApplications([]);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch contact submissions
      const contactRes = await fetch('/api/contact');
      if (contactRes.ok) {
        const contactData = await contactRes.json();
        setContactSubmissions(contactData.data || []);
        setContactPagination(contactData.pagination || { page: 1, totalPages: 1, total: 0 });
      }

      // Fetch signup submissions (mock data since endpoint might not exist yet)
      // const signupRes = await fetch('/api/signup');
      // if (signupRes.ok) {
      //   const signupData = await signupRes.json();
      //   setSignupSubmissions(signupData.data || []);
      // }

      // Fetch volunteer applications
      const volunteerRes = await fetch('/api/volunteer');
      if (volunteerRes.ok) {
        const volunteerData = await volunteerRes.json();
        setVolunteerApplications(volunteerData.data?.applications || []);
        setVolunteerPagination(volunteerData.data?.pagination || { page: 1, totalPages: 1, total: 0 });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const handleDelete = async (id: any, type: any) => {
    if (!window.confirm('Are you sure you want to delete this submission?')) {
      return;
    }

    try {
      const response = await fetch(`/api/${type}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Submission deleted successfully!');
        fetchData(); // Refresh data
      } else {
        alert('Failed to delete submission');
      }
    } catch (error) {
      console.error('Error deleting submission:', error);
      alert('Error deleting submission');
    }
  };

  const formatDate = (dateString: any) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredData = (data: any, type: any) => {
    if (!searchTerm && filterBy === 'all') return data;
    
    return data.filter((item: any) => {
      const matchesSearch = !searchTerm || 
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.message?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterBy === 'all' || 
        (filterBy === 'recent' && new Date(item.createdAt || item.submittedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
      
      return matchesSearch && matchesFilter;
    });
  };

  // Login Form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #A5D6A7 100%)'}}>
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md border border-white/20 shadow-2xl">
            <div className="text-center mb-8">
              <Shield className="mx-auto mb-4 text-white" size={48} />
              <h1 className="text-3xl font-bold text-white mb-2">Janam Admin</h1>
              <p className="text-white/80">Enter password to access dashboard</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <input
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent backdrop-blur-sm"
                />
              </div>
              
              <button
                onClick={handleLogin}
                className="w-full text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                style={{background: 'linear-gradient(135deg, #7A2E2E 0%, #A0433D 100%)'}}
              >
                Access Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard
  return (
    <div className="min-h-screen" style={{backgroundColor: '#FFF3E6'}}>
      {/* Header */}
      <header className="shadow-lg border-b" style={{backgroundColor: '#2E7D32', borderColor: '#1B5E20'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Shield className="text-white" size={32} />
              <h1 className="text-2xl font-bold text-white">Janam Admin Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={fetchData}
                disabled={loading}
                className="inline-flex items-center px-3 py-2 border shadow-sm text-sm font-medium rounded-md text-white bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-orange-300 disabled:opacity-50 backdrop-blur-sm transition-all duration-200"
                style={{borderColor: 'rgba(255, 255, 255, 0.3)'}}
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-300 transition-all duration-200"
                style={{backgroundColor: '#7A2E2E'}}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <div className="border-b" style={{borderColor: '#BDBDBD'}}>
            <nav className="flex space-x-8">
              {[
                { key: 'contact', label: 'Contact Forms', count: contactSubmissions.length },
                { key: 'signup', label: 'Signups', count: signupSubmissions.length },
                { key: 'volunteer', label: 'Volunteer Applications', count: volunteerApplications.length }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.key
                      ? 'text-white'
                      : 'border-transparent hover:border-gray-300 transition-colors'
                  }`}
                  style={{
                    borderBottomColor: activeTab === tab.key ? '#2E7D32' : 'transparent',
                    backgroundColor: activeTab === tab.key ? '#2E7D32' : 'transparent',
                    color: activeTab === tab.key ? 'white' : '#424242',
                    borderRadius: activeTab === tab.key ? '8px 8px 0 0' : '0',
                    padding: activeTab === tab.key ? '8px 16px' : '8px 4px'
                  }}
                >
                  {tab.label}
                  <span 
                    className="ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: activeTab === tab.key ? 'rgba(255, 255, 255, 0.2)' : '#A5D6A7',
                      color: activeTab === tab.key ? 'white' : '#1B5E20'
                    }}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{color: '#424242'}} size={20} />
            <input
              type="text"
              placeholder="Search by name, email, or message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent shadow-sm"
              style={{
                borderColor: '#BDBDBD',
                backgroundColor: 'white',
                color: '#424242',
                // focusRingColor: '#FFB5A7'
              }}
            />
          </div>
          
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent shadow-sm"
            style={{
              borderColor: '#BDBDBD',
              backgroundColor: 'white',
              color: '#424242'
            }}
          >
            <option value="all">All Submissions</option>
            <option value="recent">Recent (Last 7 days)</option>
          </select>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-12">
            <RefreshCw className="mx-auto animate-spin mb-4" style={{color: '#2E7D32'}} size={48} />
            <p style={{color: '#424242'}}>Loading submissions...</p>
          </div>
        ) : (
          <>
            {/* Contact Submissions */}
            {activeTab === 'contact' && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4" style={{color: '#424242'}}>Contact Form Submissions</h2>
                {filteredData(contactSubmissions, 'contact').length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-lg shadow-md">
                    <MessageSquare className="mx-auto mb-4" style={{color: '#BDBDBD'}} size={48} />
                    <p style={{color: '#424242'}}>No contact submissions found</p>
                  </div>
                ) : (
                  filteredData(contactSubmissions, 'contact').map((submission: any) => (
                    <div key={submission.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 hover:shadow-lg transition-shadow" style={{borderLeftColor: '#FFB5A7'}}>
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0 p-2 rounded-full" style={{backgroundColor: '#A5D6A7'}}>
                            <User style={{color: '#1B5E20'}} size={24} />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold" style={{color: '#424242'}}>{submission.name}</h3>
                            <div className="flex items-center space-x-4 text-sm" style={{color: '#424242'}}>
                              <span className="flex items-center">
                                <Mail className="mr-1" style={{color: '#FFB5A7'}} size={16} />
                                {submission.email}
                              </span>
                              {submission.phone && (
                                <span className="flex items-center">
                                  <Phone className="mr-1" style={{color: '#FFB5A7'}} size={16} />
                                  {submission.phone}
                                </span>
                              )}
                              <span className="flex items-center">
                                <Calendar className="mr-1" style={{color: '#FFB5A7'}} size={16} />
                                {formatDate(submission.submittedAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handleDelete(submission.id, 'contact')}
                          className="p-2 rounded-lg transition-all hover:shadow-md"
                          style={{color: '#7A2E2E', backgroundColor: 'rgba(122, 46, 46, 0.1)'}}
                          title="Delete submission"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                      
                      <div className="rounded-lg p-4" style={{backgroundColor: '#FFF3E6'}}>
                        <h4 className="font-medium mb-2" style={{color: '#424242'}}>Message:</h4>
                        <p className="whitespace-pre-wrap" style={{color: '#424242'}}>{submission.message}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Volunteer Applications */}
            {activeTab === 'volunteer' && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4" style={{color: '#424242'}}>Volunteer Applications</h2>
                {filteredData(volunteerApplications, 'volunteer').length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-lg shadow-md">
                    <User className="mx-auto mb-4" style={{color: '#BDBDBD'}} size={48} />
                    <p style={{color: '#424242'}}>No volunteer applications found</p>
                  </div>
                ) : (
                  filteredData(volunteerApplications, 'volunteer').map((application: any) => (
                    <div key={application.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 hover:shadow-lg transition-shadow" style={{borderLeftColor: '#2E7D32'}}>
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0 p-2 rounded-full" style={{backgroundColor: '#A5D6A7'}}>
                            <User style={{color: '#1B5E20'}} size={24} />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold" style={{color: '#424242'}}>{application.name}</h3>
                            <div className="flex items-center space-x-4 text-sm" style={{color: '#424242'}}>
                              <span className="flex items-center">
                                <Mail className="mr-1" style={{color: '#FFB5A7'}} size={16} />
                                {application.email}
                              </span>
                              {application.organization && (
                                <span className="flex items-center">
                                  <Building className="mr-1" style={{color: '#FFB5A7'}} size={16} />
                                  {application.organization}
                                </span>
                              )}
                              <span className="flex items-center">
                                <Calendar className="mr-1" style={{color: '#FFB5A7'}} size={16} />
                                {formatDate(application.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handleDelete(application.id, 'volunteer')}
                          className="p-2 rounded-lg transition-all hover:shadow-md"
                          style={{color: '#7A2E2E', backgroundColor: 'rgba(122, 46, 46, 0.1)'}}
                          title="Delete application"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <span className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white" style={{backgroundColor: '#2E7D32'}}>
                            Role: {application.role?.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <div>
                          <span className="inline-block px-3 py-1 rounded-full text-sm font-medium" style={{backgroundColor: '#FFB5A7', color: '#7A2E2E'}}>
                            Availability: {application.availability}
                          </span>
                        </div>
                      </div>
                      
                      {application.skills && (
                        <div className="mb-4">
                          <h4 className="font-medium mb-2" style={{color: '#424242'}}>Skills:</h4>
                          <p className="rounded-lg p-3" style={{color: '#424242', backgroundColor: '#FFF3E6'}}>{application.skills}</p>
                        </div>
                      )}
                      
                      {application.message && (
                        <div className="rounded-lg p-4" style={{backgroundColor: '#FFF3E6'}}>
                          <h4 className="font-medium mb-2" style={{color: '#424242'}}>Message:</h4>
                          <p className="whitespace-pre-wrap" style={{color: '#424242'}}>{application.message}</p>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Signup Submissions (placeholder) */}
            {activeTab === 'signup' && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4" style={{color: '#424242'}}>Signup Submissions</h2>
                <div className="text-center py-12 bg-white rounded-lg shadow-md">
                  <User className="mx-auto mb-4" style={{color: '#BDBDBD'}} size={48} />
                  <p style={{color: '#424242'}}>Signup endpoint integration needed</p>
                  <p className="text-sm mt-2" style={{color: '#BDBDBD'}}>Add GET method to /api/signup to display submissions</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;