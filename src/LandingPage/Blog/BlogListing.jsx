import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Search, Filter, Clock, ChevronLeft, ChevronRight, Tag, Folder } from 'lucide-react';
import axios from 'axios';

const BlogListing = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const API_URL = "https://api.marketing.cloudedata.com"

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/blogs`);
        setAllBlogs(data);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);
  const categories = useMemo(() => {
    const cats = new Set();
    allBlogs.forEach(blog => {
      const cat = blog.category || blog.type || 'General';
      cats.add(cat);
    });
    return ['all', ...Array.from(cats)];
  }, [allBlogs]);

  const filteredBlogs = useMemo(() => {
    let filtered = allBlogs;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(term) ||
        stripHtml(blog.description).toLowerCase().includes(term)
      );
    }
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(blog =>
        (blog.category || blog.type || 'General') === selectedCategory
      );
    }
    return filtered;
  }, [allBlogs, searchTerm, selectedCategory]);

  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  useEffect(() => setCurrentPage(1), [searchTerm, selectedCategory]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const stripHtml = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const getReadingTime = (content) => {
    const text = stripHtml(content);
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  // Get thumbnail: primaryImage > first image from old 'images' array
  const getThumbnail = (blog) => {
    if (blog.primaryImage) return blog.primaryImage;
    if (blog.images && blog.images.length > 0) return blog.images[0];
    return null;
  };

  if (loading) {
    return (
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse">
                <div className="h-56 bg-slate-200" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-slate-200 rounded w-3/4" />
                  <div className="h-4 bg-slate-200 rounded w-full" />
                  <div className="h-4 bg-slate-200 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10 pb-5 border-b border-gray-200">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Latest Articles</h2>
            <p className="text-gray-500 mt-1">Insights and expert advice</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-64"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <Filter size={16} className="text-gray-500 shrink-0" />
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat === 'all' ? 'All' : cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredBlogs.length > 0 && (
          <div className="mb-6 text-sm text-gray-500">
            Showing {paginatedBlogs.length} of {filteredBlogs.length} articles
          </div>
        )}

        {filteredBlogs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <Search size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">No articles found.</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
              className="mt-4 text-indigo-600 hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {paginatedBlogs.map((blog) => (
                <article
                  key={blog._id}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col h-full"
                >
                  <Link to={`/blog/${blog._id}`} className="block overflow-hidden relative h-64">
                    {getThumbnail(blog) ? (
                      <img
                        src={getThumbnail(blog)}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => (e.target.src = 'https://placehold.co/800x500?text=No+Image')}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                    {blog.category && (
                      <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full shadow">
                        {blog.category}
                      </span>
                    )}
                  </Link>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1"><Calendar size={14} /> {formatDate(blog.createdAt)}</span>
                      <span className="flex items-center gap-1"><Clock size={14} /> {getReadingTime(blog.description)}</span>
                    </div>

                    <Link to={`/blog/${blog._id}`} className="block mb-3">
                      <h3 className="text-xl font-bold text-gray-800 line-clamp-2 group-hover:text-indigo-600 transition">
                        {blog.title}
                      </h3>
                    </Link>

                    <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                      {stripHtml(blog.description).slice(0, 140)}...
                    </p>

                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {blog.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">#{tag}</span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <User size={14} />
                        <span>{blog.author || 'Admin'}</span>
                      </div>
                      <Link
                        to={`/blog/${blog._id}`}
                        className="inline-flex items-center gap-1 text-indigo-600 font-medium hover:gap-2 transition-all"
                      >
                        Read more <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <button
                  onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg bg-white border border-gray-300 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                >
                  <ChevronLeft size={18} />
                </button>
                <div className="flex gap-1">
                  {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                            currentPage === page
                              ? 'bg-indigo-600 text-white shadow-sm'
                              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return <span key={page} className="px-2 text-gray-400">...</span>;
                    }
                    return null;
                  })}
                </div>
                <button
                  onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg bg-white border border-gray-300 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BlogListing;