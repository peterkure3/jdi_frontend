import { useState, useRef } from 'react';
import BaseModal from './BaseModal';
import { ArrowUpTrayIcon, DocumentIcon, ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function ImportModal({
  isOpen,
  onClose,
  onImport,
  title = 'Import Data',
  subtitle = 'Upload a file to import data',
  acceptedFormats = ['.csv', '.xlsx', '.json'],
  maxFileSize = 10, // MB
  sampleData = null,
  templateUrl = null
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState([]);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    setErrors([]);
    
    // Validate file type
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    if (!acceptedFormats.includes(fileExtension)) {
      setErrors([`File type ${fileExtension} is not supported. Accepted formats: ${acceptedFormats.join(', ')}`]);
      return;
    }

    // Validate file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxFileSize) {
      setErrors([`File size (${fileSizeMB.toFixed(1)}MB) exceeds maximum allowed size of ${maxFileSize}MB`]);
      return;
    }

    setSelectedFile(file);
    
    // Generate preview for CSV files
    if (fileExtension === '.csv') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const lines = text.split('\n').slice(0, 5); // First 5 lines
        setPreview(lines);
      };
      reader.readAsText(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleImport = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      await onImport(selectedFile);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      setTimeout(() => {
        onClose();
        resetModal();
      }, 1000);
    } catch (error) {
      console.error('Import failed:', error);
      setErrors([error.message || 'Import failed. Please try again.']);
    } finally {
      setIsUploading(false);
    }
  };

  const resetModal = () => {
    setSelectedFile(null);
    setPreview(null);
    setErrors([]);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClose = () => {
    if (!isUploading) {
      onClose();
      resetModal();
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      title={title}
      subtitle={subtitle}
      icon={ArrowUpTrayIcon}
      size="md"
      closeOnOverlayClick={!isUploading}
    >
      <div className="space-y-6">
        {/* File Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? 'border-brand-primary bg-brand-primary/5'
              : selectedFile
              ? 'border-status-success bg-status-success/5'
              : 'border-neutral-300 hover:border-neutral-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {selectedFile ? (
            <div className="space-y-3">
              <CheckCircleIcon className="w-12 h-12 text-status-success mx-auto" />
              <div>
                <div className="font-medium text-neutral-800">{selectedFile.name}</div>
                <div className="text-sm text-neutral-600">
                  {(selectedFile.size / (1024 * 1024)).toFixed(1)} MB
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedFile(null);
                  setPreview(null);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="text-sm text-brand-primary hover:text-brand-primaryDark transition-colors"
                disabled={isUploading}
              >
                Choose different file
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <DocumentIcon className="w-12 h-12 text-neutral-400 mx-auto" />
              <div>
                <div className="font-medium text-neutral-800 mb-1">
                  Drop your file here, or{' '}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-brand-primary hover:text-brand-primaryDark transition-colors"
                    disabled={isUploading}
                  >
                    browse
                  </button>
                </div>
                <div className="text-sm text-neutral-600">
                  Supported formats: {acceptedFormats.join(', ')}
                </div>
                <div className="text-sm text-neutral-600">
                  Maximum file size: {maxFileSize}MB
                </div>
              </div>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFormats.join(',')}
          onChange={handleFileInputChange}
          className="hidden"
          disabled={isUploading}
        />

        {/* Upload Progress */}
        {isUploading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Uploading...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2">
              <div
                className="bg-brand-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Errors */}
        {errors.length > 0 && (
          <div className="bg-status-error/10 border border-status-error/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <ExclamationTriangleIcon className="w-5 h-5 text-status-error flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-status-error mb-1">Import Error</div>
                <ul className="text-sm text-status-error space-y-1">
                  {errors.map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* File Preview */}
        {preview && (
          <div className="space-y-2">
            <div className="font-medium text-neutral-800">File Preview (first 5 rows):</div>
            <div className="bg-neutral-50 rounded-lg p-3 text-sm font-mono">
              {preview.map((line, index) => (
                <div key={index} className="truncate">
                  {line}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Help Links */}
        <div className="flex items-center justify-between text-sm">
          {templateUrl && (
            <a
              href={templateUrl}
              download
              className="text-brand-primary hover:text-brand-primaryDark transition-colors"
            >
              Download Template
            </a>
          )}
          {sampleData && (
            <button
              onClick={() => setPreview(sampleData)}
              className="text-brand-primary hover:text-brand-primaryDark transition-colors"
            >
              View Sample Data
            </button>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-neutral-200">
          <button
            onClick={handleClose}
            disabled={isUploading}
            className="px-6 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleImport}
            disabled={!selectedFile || isUploading || errors.length > 0}
            className="inline-flex items-center gap-2 px-6 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Importing...
              </>
            ) : (
              <>
                <ArrowUpTrayIcon className="w-4 h-4" />
                Import Data
              </>
            )}
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
