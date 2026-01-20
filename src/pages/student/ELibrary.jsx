import { useState } from 'react';
import {
  BookmarkIcon,
  ClockIcon,
  BookOpenIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function ELibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showToast, setShowToast] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);

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

  const books = [
    {
      id: 1,
      title: 'Architectural Design Fundamentals',
      author: 'Francis D.K. Ching',
      category: 'Architecture & Design',
      isbn: '978-1118881996',
      publisher: 'Wiley',
      year: 2014,
      pages: 1312,
      format: 'PDF',
      size: '15.2 MB',
      available: true,
      description: 'Comprehensive guide to algorithms and data structures',
      cover: '/api/placeholder/120/160'
    },
    {
      id: 2,
      title: 'Interior Design Illustrated',
      author: 'Francis D.K. Ching',
      category: 'Architecture & Design',
      isbn: '978-1118090718',
      publisher: 'Wiley',
      year: 2018,
      pages: 464,
      format: 'PDF',
      size: '8.7 MB',
      available: true,
      description: 'A handbook of agile software craftsmanship',
      cover: '/api/placeholder/120/160'
    },
    {
      id: 3,
      title: 'Landscape Architecture: A Manual',
      author: 'Barry Starke',
      category: 'Architecture & Design',
      isbn: '978-0070610798',
      publisher: 'McGraw-Hill',
      year: 2019,
      pages: 960,
      format: 'PDF',
      size: '18.5 MB',
      available: false,
      description: 'Complete guide to computer networking principles',
      cover: '/api/placeholder/120/160'
    },
    {
      id: 4,
      title: 'Computer Networks',
      author: 'Andrew S. Tanenbaum',
      category: 'Networking',
      isbn: '978-0132126953',
      publisher: 'Pearson',
      year: 2010,
      pages: 960,
      format: 'PDF',
      size: '18.5 MB',
      available: false,
      description: 'Complete guide to computer networking principles',
      cover: '/api/placeholder/120/160'
    },
    {
      id: 5,
      title: 'Operating System Concepts',
      author: 'Abraham Silberschatz',
      category: 'Operating Systems',
      isbn: '978-1118063330',
      publisher: 'Wiley',
      year: 2012,
      pages: 944,
      format: 'PDF',
      size: '12.8 MB',
      available: true,
      description: 'Fundamental concepts of operating systems',
      cover: '/api/placeholder/120/160'
    },
    {
      id: 6,
      title: 'Artificial Intelligence: A Modern Approach',
      author: 'Stuart Russell',
      category: 'Artificial Intelligence',
      isbn: '978-0136042594',
      publisher: 'Pearson',
      year: 2020,
      pages: 1152,
      format: 'PDF',
      size: '25.3 MB',
      available: true,
      description: 'Comprehensive introduction to AI concepts and techniques',
      cover: '/api/placeholder/120/160'
    }
  ];

  const categories = ['all', ...new Set(books.map(book => book.category))];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (book) => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    console.log(`Downloading: ${book.title}`);
    const safeName = (book?.title || 'book').replace(/[^a-z0-9-_]+/gi, '_');
    downloadTextFile(
      `${safeName}-demo.txt`,
      `JDI E-Library Demo Download\n\nTitle: ${book?.title}\nAuthor: ${book?.author}\nISBN: ${book?.isbn}\nFormat: ${book?.format}\nGenerated: ${new Date().toISOString()}\n`
    );
  };

  const handleToggleBookmark = (book) => {
    setBookmarkedIds(prev => (
      prev.includes(book.id) ? prev.filter(id => id !== book.id) : [...prev, book.id]
    ));
  };

  const handlePreview = (book) => {
    window.alert(`Preview is not implemented in demo mode.\n\n${book?.title}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">E-Library</h1>
          <p className="text-neutral-600 mt-1">Access digital books and resources for your courses</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => window.alert('Bookmarks view is not implemented in demo mode.')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors"
          >
            <BookmarkIcon className="w-4 h-4" />
            My Bookmarks
          </button>
          <button
            onClick={() => window.alert('Reading history is not implemented in demo mode.')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-xl hover:shadow-lg transition-all"
          >
            <ClockIcon className="w-4 h-4" />
            Reading History
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-lg flex items-center justify-center">
              <BookOpenIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">{books.length}</div>
              <div className="text-sm text-neutral-500">Available Books</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-status-success to-accent-lime rounded-lg flex items-center justify-center">
              <ArrowDownTrayIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">23</div>
              <div className="text-sm text-neutral-500">Downloaded</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-purple to-accent-pink rounded-lg flex items-center justify-center">
              <BookmarkIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">8</div>
              <div className="text-sm text-neutral-500">Bookmarked</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-cyan to-accent-cyanDark rounded-lg flex items-center justify-center">
              <ClockIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">45h</div>
              <div className="text-sm text-neutral-500">Reading Time</div>
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
                placeholder="Search books, authors, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
              />
            </div>
          </div>
          <div className="md:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <div key={book.id} className="bg-white rounded-xl border border-neutral-300 shadow-card overflow-hidden hover:shadow-lg transition-all">
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-20 bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpenIcon className="w-8 h-8 text-neutral-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-neutral-800 line-clamp-2 text-sm">{book.title}</h3>
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 ml-2 ${book.available ? 'bg-status-success' : 'bg-status-error'}`} title={book.available ? 'Available' : 'Not Available'}></div>
                  </div>
                  <p className="text-sm text-neutral-600 mb-1">by {book.author}</p>
                  <span className="inline-block px-2 py-1 bg-brand-primary/10 text-brand-primary text-xs rounded-full">
                    {book.category}
                  </span>
                </div>
              </div>
              
              <p className="text-sm text-neutral-600 mb-4 line-clamp-2">{book.description}</p>
              
              <div className="space-y-2 text-xs text-neutral-500 mb-4">
                <div className="flex justify-between">
                  <span>Publisher:</span>
                  <span>{book.publisher}</span>
                </div>
                <div className="flex justify-between">
                  <span>Year:</span>
                  <span>{book.year}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pages:</span>
                  <span>{book.pages}</span>
                </div>
                <div className="flex justify-between">
                  <span>Format:</span>
                  <span>{book.format} ({book.size})</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {book.available ? (
                  <>
                    <button 
                      onClick={() => handleDownload(book)}
                      className="flex-1 bg-brand-primary hover:bg-brand-primary-dark text-white py-2 px-3 rounded-lg text-sm font-medium hover:shadow-lg transition-all"
                    >
                      <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                      Download
                    </button>
                    <button
                      onClick={() => handleToggleBookmark(book)}
                      className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                      title="Bookmark"
                    >
                      <BookmarkIcon className={`w-4 h-4 ${bookmarkedIds.includes(book.id) ? 'text-brand-primary' : ''}`} />
                    </button>
                  </>
                ) : (
                  <button className="flex-1 bg-neutral-100 text-neutral-500 py-2 px-3 rounded-lg text-sm font-medium cursor-not-allowed">
                    Not Available
                  </button>
                )}
                <button
                  onClick={() => handlePreview(book)}
                  className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                  title="Preview"
                >
                  <EyeIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="bg-white rounded-xl shadow-card p-12 text-center">
          <MagnifyingGlassIcon className="w-16 h-16 text-neutral-300 mb-4 mx-auto" />
          <h3 className="text-lg font-medium text-neutral-600 mb-2">No books found</h3>
          <p className="text-neutral-500">Try adjusting your search terms or category filter</p>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-status-success text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-up">
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="w-5 h-5" />
            <span>Download started successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
}
