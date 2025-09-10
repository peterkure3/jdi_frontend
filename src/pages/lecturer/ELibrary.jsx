import { useState } from 'react';
import {
  BookmarkIcon,
  PlusIcon,
  BookOpenIcon,
  CheckCircleIcon,
  Squares2X2Icon,
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

export default function ELibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const books = [
    {
      id: 1,
      title: 'Introduction to Algorithms',
      author: 'Thomas H. Cormen',
      category: 'Computer Science',
      isbn: '978-0262033848',
      publisher: 'MIT Press',
      year: 2009,
      pages: 1312,
      format: 'PDF',
      size: '15.2 MB',
      available: true,
      description: 'Comprehensive guide to algorithms and data structures'
    },
    {
      id: 2,
      title: 'Clean Code',
      author: 'Robert C. Martin',
      category: 'Software Engineering',
      isbn: '978-0132350884',
      publisher: 'Prentice Hall',
      year: 2008,
      pages: 464,
      format: 'PDF',
      size: '8.7 MB',
      available: true,
      description: 'A handbook of agile software craftsmanship'
    },
    {
      id: 3,
      title: 'Database System Concepts',
      author: 'Abraham Silberschatz',
      category: 'Database',
      isbn: '978-0078022159',
      publisher: 'McGraw-Hill',
      year: 2019,
      pages: 1376,
      format: 'PDF',
      size: '22.1 MB',
      available: true,
      description: 'Comprehensive introduction to database systems'
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
      description: 'Complete guide to computer networking principles'
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
      description: 'Fundamental concepts of operating systems'
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
      description: 'Comprehensive introduction to AI concepts and techniques'
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">E-Library</h1>
          <p className="text-neutral-600 mt-1">Browse and access digital resources</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors">
            <BookmarkIcon className="w-4 h-4" />
            My Bookmarks
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-xl hover:shadow-lg transition-all">
            <PlusIcon className="w-4 h-4" />
            Request Book
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
              <div className="text-sm text-neutral-500">Total Books</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-status-success to-accent-lime rounded-lg flex items-center justify-center">
              <CheckCircleIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">{books.filter(b => b.available).length}</div>
              <div className="text-sm text-neutral-500">Available</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-purple to-accent-pink rounded-lg flex items-center justify-center">
              <Squares2X2Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">{categories.length - 1}</div>
              <div className="text-sm text-neutral-500">Categories</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-cyan to-accent-cyanDark rounded-lg flex items-center justify-center">
              <ArrowDownTrayIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">1,247</div>
              <div className="text-sm text-neutral-500">Downloads</div>
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
          <div key={book.id} className="bg-white rounded-xl shadow-card overflow-hidden hover:shadow-lg transition-all">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-800 mb-2 line-clamp-2">{book.title}</h3>
                  <p className="text-sm text-neutral-600 mb-1">by {book.author}</p>
                  <span className="inline-block px-2 py-1 bg-brand-primary/10 text-brand-primary text-xs rounded-full">
                    {book.category}
                  </span>
                </div>
                <div className={`w-3 h-3 rounded-full ${book.available ? 'bg-status-success' : 'bg-status-error'}`} title={book.available ? 'Available' : 'Not Available'}></div>
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
                    <button className="flex-1 bg-brand-primary hover:bg-brand-primary-dark text-white py-2 px-3 rounded-lg text-sm font-medium hover:shadow-lg transition-all">
                      Download
                    </button>
                    <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors" title="Bookmark">
                      <BookmarkIcon className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <button className="flex-1 bg-neutral-100 text-neutral-500 py-2 px-3 rounded-lg text-sm font-medium cursor-not-allowed">
                    Not Available
                  </button>
                )}
                <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors" title="Preview">
                  <EyeIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="bg-white rounded-xl shadow-card p-12 text-center">
          <MagnifyingGlassIcon className="w-16 h-16 text-neutral-300 mb-4" />
          <h3 className="text-lg font-medium text-neutral-600 mb-2">No books found</h3>
          <p className="text-neutral-500">Try adjusting your search terms or category filter</p>
        </div>
      )}
    </div>
  );
}
