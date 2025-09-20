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
  const [partnerSubmissions, setPartnerSubmissions] = useState([]);
  // Pagination states
  const [contactPagination, setContactPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [signupPagination, setSignupPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [volunteerPagination, setVolunteerPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [partnerPagination, setPartnerPagination] = useState({ page: 1, totalPages: 1, total: 0 });




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
      // Fetch partner submissions
      const partnerRes = await fetch('/api/partner');
      if (partnerRes.ok) {
        const partnerData = await partnerRes.json();
        setPartnerSubmissions(partnerData || []);
        // If your API returns pagination, set it here
        setPartnerPagination(partnerData.pagination || { page: 1, totalPages: 1, total: 0 });
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
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #A5D6A7 100%)' }}>
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
                style={{ background: 'linear-gradient(135deg, #7A2E2E 0%, #A0433D 100%)' }}
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

    <div className="min-h-screen" style={{ backgroundColor: "#FFF3E6" }}>
      {/* Header */}
      <header className="sticky top-0 z-10 shadow-md" style={{ backgroundColor: "#2E7D32" }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Shield className="text-white" size={32} />
            <h1 className="text-xl md:text-2xl font-bold text-white">Janam Admin Dashboard</h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={fetchData}
              disabled={loading}
              className="flex items-center px-3 py-2 text-sm rounded-md text-white bg-white/10 hover:bg-white/20 disabled:opacity-50 transition"
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-2 text-sm rounded-md text-white bg-red-700 hover:bg-red-800 transition"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="border-b border-gray-300 bg-white sticky top-[64px] z-10">
        <nav className="max-w-7xl mx-auto flex gap-2 px-6 overflow-x-auto">
          {[
            { key: 'contact', label: 'Contact Forms', count: contactSubmissions.length },
            { key: 'signup', label: 'Signups', count: signupSubmissions.length },
            { key: 'volunteer', label: 'Volunteer Applications', count: volunteerApplications.length },
            { key: 'partner', label: 'Partner Submissions', count: partnerSubmissions.length },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-t-lg font-medium text-sm ${activeTab === tab.key
                  ? "bg-green-700 text-white"
                  : "text-gray-600 hover:bg-gray-100"
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
      {/* Search and Filter */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-4 px-6 py-6">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name, email, or message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"

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
          className="px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
        >
          <option value="all">All Submissions</option>
          <option value="recent">Recent (Last 7 days)</option>
        </select>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <RefreshCw className="animate-spin mb-4 text-green-700" size={48} />
            <p className="text-gray-600">Loading submissions...</p>
          </div>
        ) : (
          <>
            {/* Contact Submissions */}
            {activeTab === 'contact' && (
              <div className="space-y-4">

                <h2 className="text-xl font-semibold mb-4" style={{ color: '#424242' }}>Contact Form Submissions</h2>
                {filteredData(contactSubmissions, 'contact').length === 0 ? (
                  <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border-l-4 hover:shadow-lg transition-shadow">
                    <MessageSquare className="mx-auto mb-4" style={{ color: '#BDBDBD' }} size={48} />
                    <p style={{ color: '#424242' }}>No contact submissions found</p>
                  </div>
                ) : (
                  filteredData(contactSubmissions, 'contact').map((submission: any) => (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div key={submission.id} className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderLeftColor: "#FFB5A7" }}>

                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0 p-2 rounded-full" style={{ backgroundColor: '#A5D6A7' }}>
                              <User style={{ color: '#1B5E20' }} size={24} />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold" style={{ color: '#424242' }}>{submission.name}</h3>
                              <div className="flex items-center space-x-4 text-sm flex-wrap gap-2 sm:gap-4 mb-2 sm:mb-0 overflow-x-auto" style={{ color: '#424242' }}>
                                <span className="flex items-center">
                                  <Mail className="mr-1" style={{ color: '#FFB5A7' }} size={16} />
                                  {submission.email}
                                </span>
                                {submission.phone && (
                                  <span className="flex items-center">
                                    <Phone className="mr-1" style={{ color: '#FFB5A7' }} size={16} />
                                    {submission.phone}
                                  </span>
                                )}
                                <span className="flex items-center">
                                  <Calendar className="mr-1" style={{ color: '#FFB5A7' }} size={16} />
                                  {formatDate(submission.submittedAt)}
                                </span>
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => handleDelete(submission.id, 'contact')}
                            className="p-2 rounded-lg transition-all hover:shadow-md"
                            style={{ color: '#7A2E2E', backgroundColor: 'rgba(122, 46, 46, 0.1)' }}
                            title="Delete submission"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>

                        <div className="rounded-lg p-4" style={{ backgroundColor: '#FFF3E6' }}>
                          <h4 className="font-medium mb-2" style={{ color: '#424242' }}>Message:</h4>
                          <p className="whitespace-pre-wrap" style={{ color: '#424242' }}>{submission.message}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Volunteer Applications */}
            {activeTab === 'volunteer' && (
              <div className="space-y-4">

                <h2 className="text-xl font-semibold mb-4" style={{ color: '#424242' }}>Volunteer Applications</h2>
                {filteredData(volunteerApplications, 'volunteer').length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-lg shadow-md">
                    <User className="mx-auto mb-4" style={{ color: '#BDBDBD' }} size={48} />
                    <p style={{ color: '#424242' }}>No volunteer applications found</p>
                  </div>
                ) : (
                  filteredData(volunteerApplications, 'volunteer').map((application: any) => (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div key={application.id} className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderLeftColor: "#2E7D32" }}>

                        {/* Header */}
                        <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-4 gap-3">
                          {/* Left Section */}
                          <div className="flex items-start space-x-3">
                            <div
                              className="flex-shrink-0 p-2 rounded-full"
                              style={{ backgroundColor: "#A5D6A7" }}
                            >
                              <User style={{ color: "#1B5E20" }} size={24} />
                            </div>
                            <div>
                              <h3
                                className="text-base sm:text-lg font-semibold"
                                style={{ color: "#424242" }}
                              >
                                {application.name}
                              </h3>
                              <div
                                className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm flex-wrap gap-2 mt-1"
                                style={{ color: "#424242" }}
                              >
                                <span className="flex items-center break-all">
                                  <Mail className="mr-1" style={{ color: "#FFB5A7" }} size={16} />
                                  {application.email}
                                </span>
                                {application.organization && (
                                  <span className="flex items-center break-all">
                                    <Building
                                      className="mr-1"
                                      style={{ color: "#FFB5A7" }}
                                      size={16}
                                    />
                                    {application.organization}
                                  </span>
                                )}
                                <span className="flex items-center">
                                  <Calendar className="mr-1" style={{ color: "#FFB5A7" }} size={16} />
                                  {formatDate(application.createdAt)}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDelete(application.id, "volunteer")}
                            className="self-end sm:self-start p-2 rounded-lg transition-all hover:shadow-md"
                            style={{ color: "#7A2E2E", backgroundColor: "rgba(122, 46, 46, 0.1)" }}
                            title="Delete application"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>

                        {/* Role + Availability */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <span
                              className="inline-block px-2 py-1 text-xs sm:text-sm rounded-full break-words"
                              style={{ backgroundColor: "#2E7D32", color: "white" }}
                            >
                              Role: {application.role?.replace(/_/g, " ")}
                            </span>
                          </div>
                          <div>
                            <span
                              className="inline-block px-3 py-1 rounded-full text-sm font-medium"
                              style={{ backgroundColor: "#FFB5A7", color: "#7A2E2E" }}
                            >
                              Availability: {application.availability}
                            </span>
                          </div>
                        </div>

                        {/* Skills */}
                        {application.skills && (
                          <div className="mb-4">
                            <h4 className="font-medium mb-2" style={{ color: "#424242" }}>
                              Skills:
                            </h4>
                            <p
                              className="rounded-lg p-3"
                              style={{ color: "#424242", backgroundColor: "#FFF3E6" }}
                            >
                              {application.skills}
                            </p>
                          </div>
                        )}

                        {/* Message */}
                        {application.message && (
                          <div className="rounded-lg p-4" style={{ backgroundColor: "#FFF3E6" }}>
                            <h4 className="font-medium mb-2" style={{ color: "#424242" }}>
                              Message:
                            </h4>
                            <p className="whitespace-pre-wrap" style={{ color: "#424242" }}>
                              {application.message}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Signup Submissions (placeholder) */}
            {activeTab === 'signup' && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4" style={{ color: '#424242' }}>Signup Submissions</h2>
                <div className="text-center py-12 bg-white rounded-lg shadow-md">
                  <User className="mx-auto mb-4" style={{ color: '#BDBDBD' }} size={48} />
                  <p style={{ color: '#424242' }}>Signup endpoint integration needed</p>
                  <p className="text-sm mt-2" style={{ color: '#BDBDBD' }}>Add GET method to /api/signup to display submissions</p>
                </div>
              </div>
            )}

            {/* Partner Submissions */}
            {activeTab === 'partner' && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4" style={{ color: '#424242' }}>Partner Submissions</h2>
                {filteredData(partnerSubmissions, 'partner').length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-lg shadow-md">
                    <User className="mx-auto mb-4" style={{ color: '#BDBDBD' }} size={48} />
                    <p style={{ color: '#424242' }}>No partner submissions found</p>
                  </div>
                ) : (
                  filteredData(partnerSubmissions, 'partner').map((partner: any) => (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" key={partner.id}>
                      <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderLeftColor: "#FFA500" }}>
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold" style={{ color: '#424242' }}>{partner.name}</h3>
                            <p className="text-sm" style={{ color: '#424242' }}>{partner.email}</p>
                            {partner.phone && <p className="text-sm" style={{ color: '#424242' }}>{partner.phone}</p>}
                            {partner.company && <p className="text-sm" style={{ color: '#424242' }}>{partner.company}</p>}
                            {/* Partnership Ideas */}
                            {partner.ideas && (
                              <div className="rounded-lg p-4 mt-2" style={{ backgroundColor: "#FFF3E6" }}>
                                <h4 className="font-medium mb-2" style={{ color: "#424242" }}>Partnership Ideas:</h4>
                                <p className="whitespace-pre-wrap" style={{ color: "#424242" }}>{partner.ideas}</p>
                              </div>
                            )}

                            {/* Volunteer Skills */}
                            {partner.skills && (
                              <div className="rounded-lg p-4 mt-2" style={{ backgroundColor: "#FFF3E6" }}>
                                <h4 className="font-medium mb-2" style={{ color: "#424242" }}>Volunteer Skills:</h4>
                                <p className="whitespace-pre-wrap" style={{ color: "#424242" }}>{partner.skills}</p>
                              </div>
                            )}

                            <p className="text-xs text-gray-500 mt-1">{formatDate(partner.createdAt)}</p>
                          </div>
                          <button
                            onClick={() => handleDelete(partner.id, 'partner')}
                            className="p-2 rounded-lg transition-all hover:shadow-md"
                            style={{ color: '#7A2E2E', backgroundColor: 'rgba(122, 46, 46, 0.1)' }}
                            title="Delete submission"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                        {partner.message && (
                          <div className="rounded-lg p-4" style={{ backgroundColor: '#FFF3E6' }}>
                            <h4 className="font-medium mb-2" style={{ color: '#424242' }}>Message:</h4>
                            <p className="whitespace-pre-wrap" style={{ color: '#424242' }}>{partner.message}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

          </>
        )}
      </div>
    </div>

  );
};

export default AdminDashboard;