import { useState } from 'react';
import BaseModal from './BaseModal';
import { ArrowDownTrayIcon, DocumentTextIcon, TableCellsIcon, DocumentIcon } from '@heroicons/react/24/outline';

export default function ExportModal({
  isOpen,
  onClose,
  onExport,
  title = 'Export Data',
  subtitle = 'Choose your export format and options',
  dataType = 'data',
  availableFormats = ['pdf', 'excel', 'csv'],
  includeFilters = false,
  currentFilters = {}
}) {
  const [selectedFormat, setSelectedFormat] = useState(availableFormats[0] || 'pdf');
  const [dateRange, setDateRange] = useState('all');
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeRawData, setIncludeRawData] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const formatOptions = {
    pdf: {
      label: 'PDF Document',
      icon: DocumentIcon,
      description: 'Formatted document with charts and tables'
    },
    excel: {
      label: 'Excel Spreadsheet',
      icon: TableCellsIcon,
      description: 'Spreadsheet format for data analysis'
    },
    csv: {
      label: 'CSV File',
      icon: DocumentTextIcon,
      description: 'Comma-separated values for data import'
    },
    json: {
      label: 'JSON Data',
      icon: DocumentTextIcon,
      description: 'Structured data format for developers'
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    const exportOptions = {
      format: selectedFormat,
      dateRange,
      includeCharts: selectedFormat === 'pdf' ? includeCharts : false,
      includeRawData,
      filters: includeFilters ? currentFilters : {}
    };

    try {
      await onExport(exportOptions);
      onClose();
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      subtitle={subtitle}
      icon={ArrowDownTrayIcon}
      size="md"
      closeOnOverlayClick={!isExporting}
    >
      <div className="space-y-6">
        {/* Format Selection */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-3">Export Format</label>
          <div className="grid grid-cols-1 gap-3">
            {availableFormats.map(format => {
              const option = formatOptions[format];
              if (!option) return null;
              
              const Icon = option.icon;
              
              return (
                <div
                  key={format}
                  onClick={() => setSelectedFormat(format)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedFormat === format
                      ? 'border-brand-primary bg-brand-primary/5 ring-2 ring-brand-primary/20'
                      : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      selectedFormat === format ? 'bg-brand-primary text-white' : 'bg-neutral-100 text-neutral-600'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium text-neutral-800">{option.label}</div>
                      <div className="text-sm text-neutral-600">{option.description}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">Date Range</label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
            disabled={isExporting}
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>

        {/* Export Options */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-3">Export Options</label>
          <div className="space-y-3">
            {selectedFormat === 'pdf' && (
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={includeCharts}
                  onChange={(e) => setIncludeCharts(e.target.checked)}
                  className="rounded border-neutral-300 text-brand-primary focus:ring-brand-primary/20"
                  disabled={isExporting}
                />
                <span className="ml-2 text-sm text-neutral-700">Include charts and visualizations</span>
              </label>
            )}
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeRawData}
                onChange={(e) => setIncludeRawData(e.target.checked)}
                className="rounded border-neutral-300 text-brand-primary focus:ring-brand-primary/20"
                disabled={isExporting}
              />
              <span className="ml-2 text-sm text-neutral-700">Include raw data tables</span>
            </label>

            {includeFilters && Object.keys(currentFilters).length > 0 && (
              <div className="p-3 bg-neutral-50 rounded-lg">
                <div className="text-sm font-medium text-neutral-700 mb-2">Current Filters Applied:</div>
                <div className="text-sm text-neutral-600">
                  {Object.entries(currentFilters).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-neutral-200">
          <button
            onClick={onClose}
            disabled={isExporting}
            className="px-6 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="inline-flex items-center gap-2 px-6 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isExporting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Exporting...
              </>
            ) : (
              <>
                <ArrowDownTrayIcon className="w-4 h-4" />
                Export {dataType}
              </>
            )}
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
