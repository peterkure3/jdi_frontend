import { useState } from 'react';
import {
  ClockIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon,
  ChartBarIcon,
  ArrowPathIcon,
  PlayIcon,
  ShareIcon,
  TrashIcon,
  PresentationChartLineIcon,
  ChartPieIcon,
  UsersIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  AcademicCapIcon,
  ServerIcon
} from '@heroicons/react/24/outline';

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState('academic');
  const [dateRange, setDateRange] = useState('current-semester');
  const [isGenerating, setIsGenerating] = useState(false);

  const getReportIcon = (iconName) => {
    const iconMap = {
      'ChartLineIcon': PresentationChartLineIcon,
      'UsersIcon': UsersIcon,
      'CurrencyDollarIcon': CurrencyDollarIcon,
      'CalendarIcon': CalendarIcon,
      'AcademicCapIcon': AcademicCapIcon,
      'ServerIcon': ServerIcon
    };
    const IconComponent = iconMap[iconName] || PresentationChartLineIcon;
    return <IconComponent className="w-4 h-4" />;
  };

  const reportTypes = [
    { id: 'academic', name: 'Academic Performance', icon: 'ChartLineIcon', description: 'Student grades, GPA trends, and course performance' },
    { id: 'enrollment', name: 'Enrollment Statistics', icon: 'UsersIcon', description: 'Student enrollment numbers and demographics' },
    { id: 'financial', name: 'Financial Summary', icon: 'CurrencyDollarIcon', description: 'Revenue, expenses, and budget analysis' },
    { id: 'attendance', name: 'Attendance Report', icon: 'CalendarIcon', description: 'Class attendance rates and patterns' },
    { id: 'faculty', name: 'Faculty Performance', icon: 'AcademicCapIcon', description: 'Teaching loads, student evaluations, and metrics' },
    { id: 'system', name: 'System Usage', icon: 'ServerIcon', description: 'Platform usage statistics and performance metrics' }
  ];

  const recentReports = [
    { id: 1, name: 'Q3 Academic Performance', type: 'Academic', generated: '2024-03-15', size: '2.4 MB', downloads: 23 },
    { id: 2, name: 'Monthly Enrollment Report', type: 'Enrollment', generated: '2024-03-10', size: '1.8 MB', downloads: 15 },
    { id: 3, name: 'Financial Summary - March', type: 'Financial', generated: '2024-03-08', size: '3.2 MB', downloads: 31 },
    { id: 4, name: 'Attendance Analysis', type: 'Attendance', generated: '2024-03-05', size: '1.5 MB', downloads: 18 },
    { id: 5, name: 'Faculty Evaluation Report', type: 'Faculty', generated: '2024-03-01', size: '2.1 MB', downloads: 12 }
  ];

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      console.log('Report generated:', selectedReport, dateRange);
    }, 3000);
  };


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">Reports & Analytics</h1>
          <p className="text-neutral-600 mt-1">Generate comprehensive reports and analyze institutional data</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors">
            <ClockIcon className="w-4 h-4" />
            Report History
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-xl hover:shadow-lg transition-all">
            <CalendarDaysIcon className="w-4 h-4" />
            Schedule Report
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-primaryDark rounded-lg flex items-center justify-center">
              <DocumentTextIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">47</div>
              <div className="text-sm text-neutral-500">Reports Generated</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-status-success to-accent-lime rounded-lg flex items-center justify-center">
              <ArrowDownTrayIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">234</div>
              <div className="text-sm text-neutral-500">Total Downloads</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-purple to-accent-pink rounded-lg flex items-center justify-center">
              <ClockIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">5</div>
              <div className="text-sm text-neutral-500">Scheduled Reports</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-cyan to-accent-cyanDark rounded-lg flex items-center justify-center">
              <ChartBarIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">12</div>
              <div className="text-sm text-neutral-500">Report Types</div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Generator */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <h3 className="text-lg font-semibold text-neutral-800 mb-6">Generate New Report</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Report Type Selection */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-neutral-700 mb-3">Select Report Type</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {reportTypes.map((report) => (
                <div
                  key={report.id}
                  onClick={() => setSelectedReport(report.id)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedReport === report.id
                      ? 'border-brand-primary bg-brand-primary/5 ring-2 ring-brand-primary/20'
                      : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      selectedReport === report.id ? 'bg-brand-primary text-white' : 'bg-neutral-100 text-neutral-600'
                    }`}>
                      {getReportIcon(report.icon)}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-neutral-800">{report.name}</div>
                      <div className="text-sm text-neutral-600 mt-1">{report.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Report Configuration */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
              >
                <option value="current-semester">Current Semester</option>
                <option value="last-semester">Last Semester</option>
                <option value="current-year">Current Academic Year</option>
                <option value="last-year">Last Academic Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Format</label>
              <select className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors">
                <option value="pdf">PDF Document</option>
                <option value="excel">Excel Spreadsheet</option>
                <option value="csv">CSV File</option>
                <option value="json">JSON Data</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Include Charts</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-neutral-300 text-brand-primary focus:ring-brand-primary/20" defaultChecked />
                  <span className="ml-2 text-sm text-neutral-700">Visual Charts</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-neutral-300 text-brand-primary focus:ring-brand-primary/20" defaultChecked />
                  <span className="ml-2 text-sm text-neutral-700">Summary Tables</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-neutral-300 text-brand-primary focus:ring-brand-primary/20" />
                  <span className="ml-2 text-sm text-neutral-700">Raw Data</span>
                </label>
              </div>
            </div>

            <button
              onClick={handleGenerateReport}
              disabled={isGenerating}
              className="w-full bg-brand-primary hover:bg-brand-primary-dark text-white rounded-lg py-3 font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <ArrowPathIcon className="w-4 h-4 mr-2 animate-spin" />
                  Generating Report...
                </>
              ) : (
                <>
                  <PlayIcon className="w-4 h-4 mr-2" />
                  Generate Report
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-neutral-800">Recent Reports</h3>
          <button className="text-brand-primary hover:text-brand-primaryDark text-sm font-medium transition-colors">
            View All Reports
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-neutral-600">Report Name</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-neutral-600">Type</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-neutral-600">Generated</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-neutral-600">Size</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-neutral-600">Downloads</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-neutral-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {recentReports.map((report) => (
                <tr key={report.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-neutral-100 rounded-lg flex items-center justify-center">
                        <DocumentTextIcon className="w-4 h-4 text-neutral-600" />
                      </div>
                      <div className="font-medium text-neutral-800">{report.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-2 py-1 bg-neutral-100 text-neutral-700 rounded-full text-xs font-medium">
                      {report.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-600">
                    {new Date(report.generated).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-600">{report.size}</td>
                  <td className="px-6 py-4 text-sm text-neutral-600">{report.downloads}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors" title="Download">
                        <ArrowDownTrayIcon className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors" title="Share">
                        <ShareIcon className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors" title="Delete">
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Analytics Dashboard Preview */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <h3 className="text-lg font-semibold text-neutral-800 mb-6">Analytics Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-64 bg-neutral-50 rounded-lg flex items-center justify-center">
            <div className="text-center text-neutral-500">
              <PresentationChartLineIcon className="w-16 h-16 mb-3" />
              <div>Performance Trends</div>
              <div className="text-sm">Academic performance over time</div>
            </div>
          </div>
          <div className="h-64 bg-neutral-50 rounded-lg flex items-center justify-center">
            <div className="text-center text-neutral-500">
              <ChartPieIcon className="w-16 h-16 mb-3" />
              <div>Enrollment Distribution</div>
              <div className="text-sm">Student distribution by program</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
