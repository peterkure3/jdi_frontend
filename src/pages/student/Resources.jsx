import { useState } from 'react';
import {
  PlusIcon,
  FolderIcon,
  ArrowDownTrayIcon,
  BookOpenIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  DocumentTextIcon,
  DocumentIcon,
  ArchiveBoxIcon,
  VideoCameraIcon,
  EyeIcon,
  ShareIcon
} from '@heroicons/react/24/outline';

export default function Resources() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleDownload = (resource) => {
    const safeName = (resource?.title || 'resource').replace(/[^a-z0-9-_]+/gi, '_');
    const filename = `${safeName}.${resource?.type === 'video' ? 'txt' : resource?.type || 'txt'}`;
    downloadTextFile(
      filename,
      `Demo download\n\nTitle: ${resource?.title}\nCourse: ${resource?.course}\nType: ${resource?.type}\nSize: ${resource?.size}\n`
    );
  };

  const handlePreview = (resource) => {
    window.alert(`Preview is not implemented in demo mode.\n\n${resource?.title}`);
  };

  const handleShare = async (resource) => {
    const text = `Resource: ${resource?.title} (${resource?.course})`;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        window.alert('Link copied to clipboard (demo).');
        return;
      }
    } catch {
      // ignore
    }
    window.alert(text);
  };

  const resources = [
    {
      id: 1,
      title: '3D Modeling Fundamentals',
      type: 'pdf',
      course: 'ARCH301',
      size: '15.2 MB',
      uploadDate: '2024-02-15',
      downloads: 234,
      description: 'Comprehensive guide to 3D architectural modeling techniques and software tools.',
      tags: ['3d-modeling', 'architecture', 'design']
    },
    {
      id: 2,
      title: 'Interior Design Color Theory',
      type: 'docx',
      course: 'INTR201',
      size: '4.1 MB',
      uploadDate: '2024-03-01',
      downloads: 189,
      description: 'Complete guide to color theory principles and applications in interior design.',
      tags: ['color-theory', 'interior-design', 'principles']
    },
    {
      id: 3,
      title: 'Landscape Design Plant Guide',
      type: 'pdf',
      course: 'LAND101',
      size: '8.7 MB',
      uploadDate: '2024-01-10',
      downloads: 156,
      description: 'Comprehensive plant selection guide for sustainable landscape design.',
      tags: ['landscape', 'plants', 'sustainability']
    },
    {
      id: 4,
      title: 'Graphics Design Software Tutorials',
      type: 'video',
      course: 'GRPH201',
      size: '125.3 MB',
      uploadDate: '2024-03-05',
      downloads: 203,
      description: 'Video tutorials for Adobe Creative Suite and design software mastery.',
      tags: ['graphics', 'tutorials', 'software']
    },
    {
      id: 5,
      title: 'Programming Tutorial Videos',
      type: 'video',
      course: 'CS101',
      size: '450 MB',
      uploadDate: '2024-02-28',
      downloads: 98,
      description: 'Video tutorials covering basic programming concepts and examples.',
      tags: ['programming', 'video', 'tutorial']
    },
    {
      id: 6,
      title: 'Structural Engineering Standards',
      type: 'pdf',
      course: 'STRU301',
      size: '18.4 MB',
      uploadDate: '2024-02-20',
      downloads: 167,
      description: 'Building codes and structural design standards reference manual.',
      tags: ['structural', 'standards', 'engineering']
    },
    {
      id: 7,
      title: 'Electrical Wiring Diagrams',
      type: 'pdf',
      course: 'ELEC201',
      size: '6.8 MB',
      uploadDate: '2024-03-10',
      downloads: 142,
      description: 'Standard electrical wiring diagrams and circuit design examples.',
      tags: ['electrical', 'wiring', 'circuits']
    },
    {
      id: 8,
      title: 'Statistics Formulas Sheet',
      type: 'pdf',
      course: 'STAT101',
      size: '1.2 MB',
      uploadDate: '2024-03-01',
      downloads: 267,
      description: 'Quick reference sheet with all important statistical formulas.',
      tags: ['statistics', 'formulas', 'reference']
    },
  ];

  const filteredResources = resources.filter(resource => {
    const matchesFilter = filter === 'all' || resource.type === filter;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (resource.tags && resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    return matchesFilter && matchesSearch;
  });

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf': return DocumentTextIcon;
      case 'doc': return DocumentIcon;
      case 'zip': return ArchiveBoxIcon;
      case 'video': return VideoCameraIcon;
      default: return DocumentIcon;
    }
  };

  const getIconColor = (type) => {
    switch (type) {
      case 'pdf': return 'text-red-500';
      case 'doc': return 'text-blue-500';
      case 'zip': return 'text-yellow-500';
      case 'video': return 'text-purple-500';
      default: return 'text-neutral-500';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'pdf': return 'bg-red-50 text-red-600 border-red-200';
      case 'doc': return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'zip': return 'bg-yellow-50 text-yellow-600 border-yellow-200';
      case 'video': return 'bg-purple-50 text-purple-600 border-purple-200';
      default: return 'bg-neutral-50 text-neutral-600 border-neutral-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">Resources</h1>
          <p className="text-neutral-600 mt-1">Access course materials, notes, and study resources</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-xl hover:shadow-lg transition-all">
            <PlusIcon className="w-4 h-4" />
            Request Resource
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-purple to-accent-pink rounded-lg flex items-center justify-center">
              <FolderIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">{resources.length}</div>
              <div className="text-sm text-neutral-500">Total Resources</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-status-success to-accent-lime rounded-lg flex items-center justify-center">
              <ArrowDownTrayIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">1,470</div>
              <div className="text-sm text-neutral-500">Total Downloads</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-cyan to-accent-cyanDark rounded-lg flex items-center justify-center">
              <BookOpenIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">6</div>
              <div className="text-sm text-neutral-500">Courses Covered</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-status-warning to-accent-amber rounded-lg flex items-center justify-center">
              <ClockIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">3</div>
              <div className="text-sm text-neutral-500">Recent Uploads</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {['all', 'pdf', 'doc', 'zip', 'video'].map(type => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                  filter === type
                    ? 'bg-brand-primary text-white shadow-sm'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <div key={resource.id} className="bg-white rounded-xl border border-neutral-300 shadow-card p-6 hover:shadow-lg transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-neutral-50 rounded-xl flex items-center justify-center">
                  {(() => {
                    const IconComponent = getFileIcon(resource.type);
                    return <IconComponent className={`w-6 h-6 ${getIconColor(resource.type)}`} />;
                  })()}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-800 mb-1">{resource.title}</h3>
                  <p className="text-sm text-neutral-500">{resource.course}</p>
                </div>
              </div>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border uppercase ${getTypeColor(resource.type)}`}>
                {resource.type}
              </span>
            </div>

            <p className="text-sm text-neutral-600 mb-4">{resource.description}</p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600">Size</span>
                <span className="font-medium text-neutral-800">{resource.size}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600">Uploaded</span>
                <span className="font-medium text-neutral-800">{new Date(resource.uploadDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600">Downloads</span>
                <span className="font-medium text-neutral-800">{resource.downloads}</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {resource.tags && resource.tags.map((tag, index) => (
                  <span key={index} className="inline-block px-2 py-1 bg-neutral-100 text-neutral-600 rounded text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownload(resource)}
                  className="flex-1 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-lg py-2 text-sm font-medium hover:shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <ArrowDownTrayIcon className="w-4 h-4" />
                  Download
                </button>
                <button
                  onClick={() => handlePreview(resource)}
                  className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                  title="Preview"
                >
                  <EyeIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare(resource)}
                  className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                  title="Share"
                >
                  <ShareIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Downloads */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4">Recent Downloads</h3>
        <div className="space-y-3">
          {resources.slice(0, 5).map((resource) => (
            <div key={resource.id} className="flex items-center gap-4 p-3 bg-neutral-50 rounded-lg">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                {(() => {
                  const IconComponent = getFileIcon(resource.type);
                  return <IconComponent className={`w-4 h-4 ${getIconColor(resource.type)}`} />;
                })()}
              </div>
              <div className="flex-1">
                <div className="font-medium text-neutral-800">{resource.title}</div>
                <div className="text-sm text-neutral-500">{resource.course} • {resource.size}</div>
              </div>
              <div className="text-sm text-neutral-500">
                {new Date(resource.uploadDate).toLocaleDateString()}
              </div>
              <button
                onClick={() => handleDownload(resource)}
                className="text-brand-primary hover:text-brand-primaryDark transition-colors"
              >
                <ArrowDownTrayIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
