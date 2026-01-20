import { useState } from 'react';
import {
  ArrowUpTrayIcon,
  DocumentIcon,
  ArrowDownTrayIcon,
  ServerIcon,
  CalendarIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  PresentationChartLineIcon,
  FolderIcon,
  ShareIcon,
  PencilIcon,
  TrashIcon,
  FolderOpenIcon,
  XMarkIcon,
  CloudArrowUpIcon
} from '@heroicons/react/24/outline';

export default function Materials() {
  const [activeTab, setActiveTab] = useState('documents');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const downloadTextFile = (filename, text) => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleDownload = (material) => {
    const safeName = (material?.name || 'material').replace(/[^a-z0-9-_\.]+/gi, '_');
    downloadTextFile(
      `material-${safeName}-demo.txt`,
      `JDI Demo Material Download\n\nName: ${material?.name}\nCourse: ${material?.course}\nSize: ${material?.size}\nUploaded: ${material?.uploadDate}\nGenerated: ${new Date().toISOString()}\n`
    );
  };

  const handleShare = async (material) => {
    const shareText = `JDI Demo Material: ${material?.name} (${material?.course})`;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareText);
        window.alert('Material info copied to clipboard (demo).');
        return;
      }
    } catch {
      // ignore
    }
    window.alert('Share is not supported in this browser (demo).');
  };

  const handleEdit = (material) => {
    window.alert(`Edit is not implemented in demo mode.\n\n${material?.name}`);
  };

  const handleDelete = (material) => {
    window.alert(`Delete is not implemented in demo mode.\n\n${material?.name}`);
  };

  const handleUpload = () => {
    window.alert('Upload is not implemented in demo mode.');
    setShowUploadModal(false);
  };

  const materials = {
    documents: [
      { id: 1, name: 'Course Syllabus.pdf', size: '2.4 MB', type: 'pdf', course: 'Computer Science 101', uploadDate: '2024-03-15', downloads: 45 },
      { id: 2, name: 'Lecture Notes - Week 1.docx', size: '1.8 MB', type: 'docx', course: 'Computer Science 101', uploadDate: '2024-03-14', downloads: 32 },
      { id: 3, name: 'Assignment Guidelines.pdf', size: '956 KB', type: 'pdf', course: 'Data Structures', uploadDate: '2024-03-12', downloads: 28 }
    ],
    videos: [
      { id: 4, name: 'Introduction to Programming.mp4', size: '145 MB', type: 'mp4', course: 'Computer Science 101', uploadDate: '2024-03-10', downloads: 67 },
      { id: 5, name: 'Database Design Fundamentals.mp4', size: '203 MB', type: 'mp4', course: 'Database Systems', uploadDate: '2024-03-08', downloads: 54 }
    ],
    presentations: [
      { id: 6, name: 'Software Engineering Principles.pptx', size: '12.3 MB', type: 'pptx', course: 'Software Engineering', uploadDate: '2024-03-16', downloads: 23 },
      { id: 7, name: 'Algorithm Analysis.pptx', size: '8.7 MB', type: 'pptx', course: 'Algorithms', uploadDate: '2024-03-13', downloads: 19 }
    ],
    other: [
      { id: 8, name: 'Code Examples.zip', size: '5.2 MB', type: 'zip', course: 'Computer Science 101', uploadDate: '2024-03-11', downloads: 41 },
      { id: 9, name: 'Dataset Sample.csv', size: '3.1 MB', type: 'csv', course: 'Data Analysis', uploadDate: '2024-03-09', downloads: 15 }
    ]
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf': return { icon: DocumentIcon, color: 'text-red-500' };
      case 'docx': return { icon: DocumentTextIcon, color: 'text-blue-500' };
      case 'mp4': return { icon: VideoCameraIcon, color: 'text-purple-500' };
      case 'pptx': return { icon: PresentationChartLineIcon, color: 'text-orange-500' };
      case 'zip': return { icon: FolderIcon, color: 'text-yellow-500' };
      case 'csv': return { icon: DocumentTextIcon, color: 'text-green-500' };
      default: return { icon: DocumentIcon, color: 'text-neutral-500' };
    }
  };

  const currentMaterials = materials[activeTab] || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">Materials</h1>
          <p className="text-neutral-600 mt-1">Upload and manage course materials</p>
        </div>
        <button 
          onClick={() => setShowUploadModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-xl hover:shadow-lg transition-all"
        >
          <ArrowUpTrayIcon className="w-4 h-4" />
          Upload Material
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-lg flex items-center justify-center">
              <DocumentIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">
                {Object.values(materials).flat().length}
              </div>
              <div className="text-sm text-neutral-500">Total Files</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-status-success to-accent-lime rounded-lg flex items-center justify-center">
              <ArrowDownTrayIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">
                {Object.values(materials).flat().reduce((sum, item) => sum + item.downloads, 0)}
              </div>
              <div className="text-sm text-neutral-500">Total Downloads</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-purple to-accent-pink rounded-lg flex items-center justify-center">
              <ServerIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">245 MB</div>
              <div className="text-sm text-neutral-500">Storage Used</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-cyan to-accent-cyanDark rounded-lg flex items-center justify-center">
              <CalendarIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">3</div>
              <div className="text-sm text-neutral-500">This Week</div>
            </div>
          </div>
        </div>
      </div>

      {/* Materials Section */}
      <div className="bg-white rounded-xl shadow-card">
        {/* Tabs */}
        <div className="border-b border-neutral-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'documents', name: 'Documents', icon: DocumentTextIcon, count: materials.documents.length },
              { id: 'videos', name: 'Videos', icon: VideoCameraIcon, count: materials.videos.length },
              { id: 'presentations', name: 'Presentations', icon: PresentationChartLineIcon, count: materials.presentations.length },
              { id: 'other', name: 'Other', icon: FolderIcon, count: materials.other.length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-brand-primary text-brand-primary'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.name}
                <span className="bg-neutral-100 text-neutral-600 px-2 py-1 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Materials List */}
        <div className="p-6">
          <div className="grid grid-cols-1 gap-4">
            {currentMaterials.map((material) => (
              <div key={material.id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:shadow-md transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-neutral-50 rounded-lg flex items-center justify-center">
                    {(() => {
                      const { icon: IconComponent, color } = getFileIcon(material.type);
                      return <IconComponent className={`w-6 h-6 ${color}`} />;
                    })()}
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-800">{material.name}</h4>
                    <div className="flex items-center gap-4 text-sm text-neutral-500 mt-1">
                      <span>{material.size}</span>
                      <span>•</span>
                      <span>{material.course}</span>
                      <span>•</span>
                      <span>Uploaded {new Date(material.uploadDate).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{material.downloads} downloads</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDownload(material)}
                    className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                    title="Download"
                  >
                    <ArrowDownTrayIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleShare(material)}
                    className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                    title="Share"
                  >
                    <ShareIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleEdit(material)}
                    className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(material)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {currentMaterials.length === 0 && (
            <div className="text-center py-12">
              <FolderOpenIcon className="w-16 h-16 text-neutral-300 mb-4" />
              <h3 className="text-lg font-medium text-neutral-600 mb-2">No materials found</h3>
              <p className="text-neutral-500">Upload your first material to get started</p>
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b border-neutral-200">
              <h3 className="text-lg font-semibold text-neutral-800">Upload Material</h3>
              <button 
                onClick={() => setShowUploadModal(false)}
                className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Course</label>
                <select className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors">
                  <option>Computer Science 101</option>
                  <option>Data Structures</option>
                  <option>Database Systems</option>
                  <option>Software Engineering</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Category</label>
                <select className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors">
                  <option>Documents</option>
                  <option>Videos</option>
                  <option>Presentations</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">File</label>
                <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center hover:border-brand-primary transition-colors">
                  <CloudArrowUpIcon className="w-8 h-8 text-neutral-400 mb-2" />
                  <p className="text-neutral-600">Click to upload or drag and drop</p>
                  <p className="text-sm text-neutral-500 mt-1">PDF, DOC, PPT, MP4, ZIP up to 100MB</p>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-4">
                <button
                  onClick={handleUpload}
                  className="flex-1 bg-brand-primary hover:bg-brand-primary-dark text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  Upload Material
                </button>
                <button 
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 bg-white border border-neutral-200 text-neutral-700 py-2 rounded-lg font-medium hover:bg-neutral-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
