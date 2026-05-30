import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Calendar, User, ArrowLeft, Send, Loader2, Clock, 
  Share2, Link as LinkIcon, Mail, MessageCircle, Tag, Folder,
  ArrowUp, X
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [commentForm, setCommentForm] = useState({ name: '', email: '', comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    setShowBackToTop(window.scrollY > 500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getEmbedUrl = (url) => {
    if (!url) return null;
    if (url.includes('/embed/')) return url;
    let videoId = null;
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0];
    } else if (url.includes('watch?v=')) {
      videoId = url.split('watch?v=')[1]?.split('&')[0];
    } else if (url.includes('youtube.com/embed/')) {
      return url;
    }
    if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    return url;
  };

  const getGalleryImages = () => {
    if (!blog) return [];
    const images = [];
    if (blog.secondaryImages?.length) images.push(...blog.secondaryImages);
    if (blog.images?.length) {
      const primary = blog.primaryImage;
      const filtered = primary ? blog.images.filter(img => img !== primary) : blog.images;
      images.push(...filtered);
    }
    return images;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogRes, commentsRes] = await Promise.all([
          axios.get(`${API_URL}/api/blogs/${id}`),
          axios.get(`${API_URL}/api/blogs/${id}/comments`)
        ]);
        setBlog(blogRes.data);
        setComments(commentsRes.data);
        if (blogRes.data.category) {
          const allBlogs = await axios.get(`${API_URL}/api/blogs`);
          const related = allBlogs.data
            .filter(b => b._id !== id && b.category === blogRes.data.category)
            .slice(0, 3);
          setRelatedPosts(related);
        }
      } catch (error) {
        console.error(error);
        toast.error('Blog not found');
        navigate('/cloud-hosting-blog');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentForm.name || !commentForm.email || !commentForm.comment) {
      toast.error('All fields are required');
      return;
    }
    setSubmitting(true);
    try {
      const { data } = await axios.post(`${API_URL}/api/blogs/${id}/comments`, commentForm);
      setComments([data, ...comments]);
      setCommentForm({ name: '', email: '', comment: '' });
      toast.success('Comment posted');
    } catch (error) {
      toast.error('Failed to post comment');
    } finally {
      setSubmitting(false);
    }
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

  const copyCurrentUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('Link copied!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-96 bg-gray-200 rounded" />
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
              <div className="h-4 bg-gray-200 rounded w-4/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) return null;

  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(blog.title);
  const galleryImages = getGalleryImages();
  const hasGallery = galleryImages.length > 0;
  const metaDescription = blog.metaDescription || stripHtml(blog.description).slice(0, 160);
  const metaImage = blog.primaryImage || (blog.images && blog.images[0]) || '';

  return (
    <>
      <Helmet>
        <title>{blog.metaTitle || blog.title} | Cloudedata Blog</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={blog.metaTitle || blog.title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={metaImage} />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Hero Section */}
        <div className="relative bg-gray-900 text-white overflow-hidden">
          {(blog.primaryImage || (blog.images && blog.images[0])) && (
            <div className="absolute inset-0">
              <img
                src={blog.primaryImage || blog.images[0]}
                alt={blog.title}
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
            </div>
          )}
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">{blog.title}</h1>
            <div className="flex flex-wrap items-center justify-center gap-5 text-gray-300 text-sm">
              <span className="flex items-center gap-2"><Calendar size={16} /> {new Date(blog.createdAt).toLocaleDateString()}</span>
              <span className="flex items-center gap-2"><Clock size={16} /> {getReadingTime(blog.description)}</span>
              <span className="flex items-center gap-2"><User size={16} /> {blog.author || 'Admin'}</span>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button
            onClick={() => navigate('/cloud-hosting-blog')}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-8 transition"
          >
            <ArrowLeft size={18} /> Back to all blogs
          </button>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <div className="flex-1">
              <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Category & Tags */}
                <div className="p-8 pb-0 flex flex-wrap gap-3">
                  {blog.category && (
                    <span className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                      <Folder size={14} /> {blog.category}
                    </span>
                  )}
                  {blog.tags?.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                      <Tag size={14} /> #{tag}
                    </span>
                  ))}
                </div>

                {/* Gallery */}
                {hasGallery && (
                  <div className="p-4">
                    <div className={`grid ${galleryImages.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-3`}>
                      {galleryImages.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`${blog.title} - ${idx + 1}`}
                          className="w-full h-48 md:h-64 object-cover rounded-xl shadow-sm hover:scale-105 transition duration-300 cursor-pointer"
                          onClick={() => setLightboxImage(img)}
                          onError={(e) => (e.target.src = 'https://placehold.co/800x600?text=No+Image')}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Video Embed */}
                {blog.videoUrl && (
                  <div className="aspect-video m-4">
                    <iframe
                      src={getEmbedUrl(blog.videoUrl)}
                      className="w-full h-full rounded-xl"
                      frameBorder="0"
                      allowFullScreen
                      title={blog.title}
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-8">
                  <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-gray-200">
                    <span className="text-sm font-medium text-gray-600 flex items-center gap-1"><Share2 size={16} /> Share:</span>
                    <div className="flex gap-2">
                      <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 rounded-full hover:bg-blue-100 transition">
                     
                      </a>
                      <a href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 rounded-full hover:bg-sky-100 transition">
                       
                      </a>
                      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 rounded-full hover:bg-blue-100 transition">
                      
                      </a>
                      <button onClick={copyCurrentUrl} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
                        <LinkIcon size={16} className="text-gray-600" />
                      </button>
                      {copied && <span className="text-xs text-green-600">Copied!</span>}
                    </div>
                  </div>

                  <style>{`
                    .blog-content img {
                      max-width: 100%;
                      height: auto;
                      border-radius: 0.75rem;
                      margin: 1.5rem auto;
                      display: block;
                      box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
                    }
                    .blog-content iframe {
                      max-width: 100%;
                      border-radius: 0.75rem;
                      margin: 1.5rem auto;
                    }
                    @media (max-width: 640px) {
                      .blog-content img {
                        margin: 1rem auto;
                      }
                    }
                  `}</style>
                  <div
                    className="blog-content prose prose-lg prose-indigo max-w-none prose-headings:font-bold prose-a:text-indigo-600"
                    dangerouslySetInnerHTML={{ __html: blog.description }}
                  />
                </div>
              </article>

              {/* Author Bio */}
              <div className="mt-12 bg-white rounded-2xl shadow-md p-6 border-l-4 border-indigo-500">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                    {blog.author?.charAt(0) || 'A'}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg">About the author</h4>
                    <p className="text-gray-600">
                      {blog.author || 'Admin'} – Cloud expert with over 5 years of experience in cloud infrastructure and DevOps.
                    </p>
                  </div>
                </div>
              </div>

              {/* Comments */}
              <div className="mt-12 bg-white rounded-2xl shadow-md p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <MessageCircle size={24} /> Comments ({comments.length})
                </h3>

                {comments.length === 0 && (
                  <div className="text-center py-8 bg-gray-50 rounded-xl mb-8">
                    <Mail size={40} className="mx-auto text-gray-300 mb-2" />
                    <p className="text-gray-500">No comments yet. Be the first to share your thoughts!</p>
                  </div>
                )}

                <div className="space-y-6 mb-8 max-h-[500px] overflow-y-auto pr-2">
                  {comments.map((comment) => (
                    <div key={comment._id} className="border-b border-gray-100 pb-4 last:border-0">
                      <div className="flex gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 flex items-center justify-center text-white font-bold uppercase shrink-0">
                          {comment.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-800">{comment.name}</span>
                            <span className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleDateString()}</span>
                          </div>
                          <p className="text-gray-600 break-words whitespace-pre-wrap">{comment.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleCommentSubmit} className="space-y-5 pt-4 border-t border-gray-100">
                  <h4 className="font-bold text-gray-800 text-lg">Leave a comment</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Your name *"
                      value={commentForm.name}
                      onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Your email *"
                      value={commentForm.email}
                      onChange={(e) => setCommentForm({ ...commentForm, email: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <textarea
                    rows="4"
                    placeholder="Your comment *"
                    value={commentForm.comment}
                    onChange={(e) => setCommentForm({ ...commentForm, comment: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 shadow-md"
                  >
                    {submitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                    {submitting ? 'Posting...' : 'Post Comment'}
                  </button>
                </form>
              </div>

              {/* Newsletter */}
              <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 text-center shadow-sm">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Subscribe to our newsletter</h3>
                <p className="text-gray-600 mb-5">Get the latest posts delivered right to your inbox.</p>
                <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-md">
                    Subscribe
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-3">No spam. Unsubscribe anytime.</p>
              </div>
            </div>

            {/* Related Posts Sidebar */}
            {relatedPosts.length > 0 && (
              <div className="lg:w-80 space-y-6">
                <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Related Posts</h3>
                  <div className="space-y-4">
                    {relatedPosts.map(post => (
                      <Link key={post._id} to={`/blog/${post._id}`} className="flex gap-3 group">
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={post.primaryImage || (post.images && post.images[0]) || 'https://placehold.co/80x80'}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition"
                            onError={(e) => (e.target.src = 'https://placehold.co/80x80')}
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 line-clamp-2 group-hover:text-indigo-600 transition">
                            {post.title}
                          </h4>
                          <p className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition z-50"
            aria-label="Back to top"
          >
            <ArrowUp size={20} />
          </button>
        )}

        {/* Lightbox Modal */}
        {lightboxImage && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4" onClick={() => setLightboxImage(null)}>
            <div className="relative max-w-4xl max-h-[90vh]">
              <img src={lightboxImage} alt="Full size" className="w-full h-full object-contain" />
              <button className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-gray-200 transition" onClick={() => setLightboxImage(null)}>
                <X size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BlogDetail;