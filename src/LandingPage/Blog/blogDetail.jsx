// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   Calendar,
//   User,
//   ArrowLeft,
//   Send,
//   Loader2,
//   Clock,
//   Share2,
//   Link as LinkIcon,
//   Mail,
//   MessageCircle,
//   Tag,
//   Folder,
//   ChevronUp,
//   ExternalLink,
// } from "lucide-react";
// import axios from "axios";
// import toast from "react-hot-toast";

// const BlogDetail = () => {
//   // const { id } = useParams();
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const [blog, setBlog] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [relatedPosts, setRelatedPosts] = useState([]);
//   const [commentForm, setCommentForm] = useState({
//     name: "",
//     email: "",
//     comment: "",
//   });
//   const [submitting, setSubmitting] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const [showScrollTop, setShowScrollTop] = useState(false);

//   // const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

//   const API_URL = "https://api.marketing.cloudedata.com";

//   const getEmbedUrl = (url) => {
//     if (!url) return null;
//     if (url.includes("/embed/")) return url;
//     let videoId = null;
//     if (url.includes("youtu.be/")) {
//       videoId = url.split("youtu.be/")[1]?.split("?")[0];
//     } else if (url.includes("watch?v=")) {
//       videoId = url.split("watch?v=")[1]?.split("&")[0];
//     } else if (url.includes("youtube.com/embed/")) {
//       return url;
//     }
//     if (videoId) return `https://www.youtube.com/embed/${videoId}`;
//     return url;
//   };

//   const getGalleryImages = () => {
//     if (!blog) return [];
//     const images = [];
//     if (blog.secondaryImages && blog.secondaryImages.length) {
//       images.push(...blog.secondaryImages);
//     }
//     if (blog.images && blog.images.length) {
//       const primary = blog.primaryImage;
//       const filtered = primary
//         ? blog.images.filter((img) => img !== primary)
//         : blog.images;
//       images.push(...filtered);
//     }
//     return images;
//   };

//   const parseMaybeArray = (value) => {
//     if (Array.isArray(value)) return value;
//     if (!value) return [];

//     if (typeof value !== "string") return [];

//     try {
//       const parsed = JSON.parse(value);
//       return Array.isArray(parsed) ? parsed : [];
//     } catch {
//       return value
//         .split(",")
//         .map((item) => item.trim())
//         .filter(Boolean);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);

//       try {
//         const [blogRes, commentsRes] = await Promise.all([
//           axios.get(`${API_URL}/api/blogs/slug/${slug}`),
//           axios
//             .get(`${API_URL}/api/blogs/slug/${slug}/comments`)
//             .catch(() => ({ data: [] })),
//         ]);

//         const loadedBlog = {
//           ...blogRes.data,
//           tags: parseMaybeArray(blogRes.data.tags),
//           secondaryImages: parseMaybeArray(blogRes.data.secondaryImages),
//           images: parseMaybeArray(blogRes.data.images),
//           metaKeywords: parseMaybeArray(blogRes.data.metaKeywords),
//         };

//         setBlog(loadedBlog);
//         setComments(commentsRes.data || []);

//         if (loadedBlog.category) {
//           axios
//             .get(`${API_URL}/api/blogs`)
//             .then(({ data }) => {
//               setRelatedPosts(
//                 (data || [])
//                   .filter(
//                     (item) =>
//                       item.slug !== slug &&
//                       item.category === loadedBlog.category,
//                   )
//                   .slice(0, 3),
//               );
//             })
//             .catch(() => {});
//         }
//       } catch (error) {
//         toast.error("Blog not found");
//         navigate("/cloud-hosting-blog");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [slug, navigate]);

//   useEffect(() => {
//     const handleScroll = () => setShowScrollTop(window.scrollY > 600);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();

//     if (!commentForm.name || !commentForm.email || !commentForm.comment) {
//       toast.error("All fields are required");
//       return;
//     }

//     setSubmitting(true);

//     try {
//       const { data } = await axios.post(
//         `${API_URL}/api/blogs/${blog._id}/comments`,
//         commentForm,
//       );

//       setComments((prev) => [data, ...prev]);

//       setCommentForm({
//         name: "",
//         email: "",
//         comment: "",
//       });

//       toast.success("Comment posted");
//     } catch {
//       toast.error("Failed to post comment");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const stripHtml = (html) => {
//     const tmp = document.createElement("div");
//     tmp.innerHTML = html;
//     return tmp.textContent || tmp.innerText || "";
//   };

//   const getReadingTime = (content) => {
//     const text = stripHtml(content);
//     const words = text.split(/\s+/).length;
//     const minutes = Math.ceil(words / 200);
//     return `${minutes} min read`;
//   };

//   const copyCurrentUrl = () => {
//     navigator.clipboard.writeText(window.location.href);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//     toast.success("Link copied!");
//   };

//   const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[80vh] bg-[#f7f8fa]">
//         <Loader2 className="animate-spin text-slate-700" size={48} />
//       </div>
//     );
//   }

//   if (!blog) return null;

//   const shareUrl = encodeURIComponent(window.location.href);
//   const shareTitle = encodeURIComponent(blog.title);
//   const galleryImages = getGalleryImages();
//   const hasGallery = galleryImages.length > 0;

//   return (
//     <div className="min-h-screen bg-[#f7f8fa] font-sans">
//       {/* Scroll to top button */}
//       {showScrollTop && (
//         <button
//           onClick={scrollToTop}
//           className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-white shadow-lg border border-gray-200 text-slate-600 hover:bg-gray-50 transition-all"
//         >
//           <ChevronUp size={20} />
//         </button>
//       )}

//       {/* Hero Section */}
//       <div className="relative bg-slate-900 text-white overflow-hidden">
//         {(blog.primaryImage || (blog.images && blog.images[0])) && (
//           <>
//             <div className="absolute inset-0">
//               <img
//                 src={blog.primaryImage || blog.images[0]}
//                 alt={blog.title}
//                 className="w-full h-full object-cover opacity-30"
//                 loading="lazy"
//               />
//             </div>
//             <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90" />
//           </>
//         )}
//         <div className="relative max-w-5xl mx-auto px-6 py-28 text-center">
//           <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6 drop-shadow-lg">
//             {blog.title}
//           </h1>
//           <div className="flex flex-wrap items-center justify-center gap-5 text-slate-300 text-sm">
//             <span className="flex items-center gap-2">
//               <Calendar size={16} />
//               {new Date(blog.createdAt).toLocaleDateString("en-US", {
//                 year: "numeric",
//                 month: "long",
//                 day: "numeric",
//               })}
//             </span>
//             <span className="flex items-center gap-2">
//               <Clock size={16} /> {getReadingTime(blog.description)}
//             </span>
//             <span className="flex items-center gap-2">
//               <User size={16} /> {blog.author || "Cloudedata"}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
//         {/* Back Navigation */}
//         <button
//           onClick={() => navigate("/cloud-hosting-blog")}
//           className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-gray-200"
//         >
//           <ArrowLeft size={18} /> Back to Blog
//         </button>

//         <article className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
//           {/* Category & Tags */}
//           <div className="px-8 pt-8 pb-4 flex flex-wrap gap-3">
//             {blog.category && (
//               <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium border border-indigo-100">
//                 <Folder size={14} /> {blog.category}
//               </span>
//             )}
//             {blog.tags &&
//               blog.tags.map((tag) => (
//                 <span
//                   key={tag}
//                   className="inline-flex items-center gap-1.5 bg-gray-50 text-slate-600 px-4 py-1.5 rounded-full text-sm font-medium border border-gray-200"
//                 >
//                   <Tag size={14} /> #{tag}
//                 </span>
//               ))}
//           </div>

//           {/* Image Gallery */}
//           {hasGallery && (
//             <div className="px-8 pb-4">
//               <div
//                 className={`grid gap-4 ${
//                   galleryImages.length === 1 ? "grid-cols-1" : "grid-cols-2"
//                 }`}
//               >
//                 {galleryImages.map((img, idx) => (
//                   <div
//                     key={idx}
//                     className="overflow-hidden rounded-xl shadow-md"
//                   >
//                     <img
//                       src={img}
//                       alt={`${blog.title} - ${idx + 1}`}
//                       className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
//                       loading="lazy"
//                       onError={(e) => {
//                         e.target.src =
//                           "https://placehold.co/800x600?text=No+Image";
//                       }}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Video Embed */}
//           {blog.videoUrl && (
//             <div className="px-8 pb-4">
//               <div className="aspect-video rounded-xl overflow-hidden shadow-md">
//                 <iframe
//                   src={getEmbedUrl(blog.videoUrl)}
//                   className="w-full h-full"
//                   frameBorder="0"
//                   allowFullScreen
//                   title={blog.title}
//                 />
//               </div>
//             </div>
//           )}

//           {/* Social Share & Content */}
//           <div className="px-8 py-6">
//             {/* Social Share */}
//             <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-100">
//               <div className="flex items-center gap-2 text-slate-600">
//                 <Share2 size={18} />
//                 <span className="text-sm font-medium">Share this article</span>
//               </div>
//               <div className="flex gap-3">
//                 <a
//                   href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
//                   title="Facebook"
//                 ></a>
//                 <a
//                   href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="p-2 rounded-full bg-sky-50 text-sky-500 hover:bg-sky-100 transition"
//                   title="Twitter"
//                 ></a>
//                 <a
//                   href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="p-2 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 transition"
//                   title="LinkedIn"
//                 ></a>
//                 <button
//                   onClick={copyCurrentUrl}
//                   className="p-2 rounded-full bg-gray-50 text-slate-600 hover:bg-gray-100 transition relative"
//                   title="Copy link"
//                 >
//                   <LinkIcon size={16} />
//                 </button>
//                 {copied && (
//                   <span className="absolute mt-8 text-xs bg-black text-white px-2 py-1 rounded-md">
//                     Copied!
//                   </span>
//                 )}
//               </div>
//             </div>

//             {/* Main Content */}
//             <div
//               className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-indigo-600 hover:prose-a:text-indigo-700 prose-img:rounded-xl prose-img:shadow-md prose-blockquote:border-l-indigo-500 prose-blockquote:bg-indigo-50/50 prose-blockquote:py-1 prose-blockquote:px-4"
//               dangerouslySetInnerHTML={{ __html: blog.description }}
//             />
//           </div>
//         </article>

//         {/* Author Bio */}
//         <div className="mt-10 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex items-center gap-5">
//           <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
//             {blog.author?.charAt(0) || "A"}
//           </div>
//           <div>
//             <h4 className="font-semibold text-slate-800 text-lg">
//               {blog.author || "Cloudedata"}
//             </h4>
//             <p className="text-slate-600 text-sm">
//               Cloud infrastructure specialist and DevOps enthusiast. Sharing
//               insights on modern cloud architecture.
//             </p>
//           </div>
//         </div>

//         {/* Comments Section */}
//         <div className="mt-10 bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
//           <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-2">
//             <MessageCircle size={24} />
//             Comments ({comments.length})
//           </h3>

//           {comments.length === 0 && (
//             <div className="text-center py-10 bg-gray-50 rounded-xl mb-8">
//               <Mail size={40} className="mx-auto text-gray-300 mb-3" />
//               <p className="text-slate-500">
//                 No comments yet. Be the first to share your thoughts!
//               </p>
//             </div>
//           )}

//           <div className="space-y-6 mb-10 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
//             {comments.map((comment) => (
//               <div key={comment._id} className="flex gap-4">
//                 <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 flex items-center justify-center text-white font-bold uppercase flex-shrink-0">
//                   {comment.name.charAt(0)}
//                 </div>
//                 <div className="flex-1 pb-4 border-b border-gray-100">
//                   <div className="flex flex-wrap items-center gap-2 mb-1">
//                     <span className="font-semibold text-slate-800">
//                       {comment.name}
//                     </span>
//                     <span className="text-xs text-slate-400">
//                       {new Date(comment.createdAt).toLocaleDateString("en-US", {
//                         year: "numeric",
//                         month: "short",
//                         day: "numeric",
//                       })}
//                     </span>
//                   </div>
//                   <p className="text-slate-600 whitespace-pre-wrap break-words">
//                     {comment.comment}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Comment Form */}
//           <form
//             onSubmit={handleCommentSubmit}
//             className="space-y-5 pt-4 border-t border-gray-100"
//           >
//             <h4 className="font-semibold text-slate-800 text-lg">
//               Leave a comment
//             </h4>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 placeholder="Your name *"
//                 value={commentForm.name}
//                 onChange={(e) =>
//                   setCommentForm({ ...commentForm, name: e.target.value })
//                 }
//                 className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
//                 required
//               />
//               <input
//                 type="email"
//                 placeholder="Your email *"
//                 value={commentForm.email}
//                 onChange={(e) =>
//                   setCommentForm({ ...commentForm, email: e.target.value })
//                 }
//                 className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
//                 required
//               />
//             </div>
//             <textarea
//               rows="4"
//               placeholder="Your comment *"
//               value={commentForm.comment}
//               onChange={(e) =>
//                 setCommentForm({ ...commentForm, comment: e.target.value })
//               }
//               className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
//               required
//             />
//             <button
//               type="submit"
//               disabled={submitting}
//               className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition disabled:opacity-50 shadow-sm font-medium"
//             >
//               {submitting ? (
//                 <Loader2 size={18} className="animate-spin" />
//               ) : (
//                 <Send size={18} />
//               )}
//               {submitting ? "Posting..." : "Post Comment"}
//             </button>
//           </form>
//         </div>

//         {/* Newsletter */}
//         <div className="mt-10 bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
//           <h3 className="text-2xl font-bold text-slate-800 mb-2">
//             Stay in the loop
//           </h3>
//           <p className="text-slate-600 mb-6">
//             Get the latest cloud insights delivered straight to your inbox.
//           </p>
//           <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
//             <input
//               type="email"
//               placeholder="you@example.com"
//               className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-slate-400 focus:border-transparent transition"
//             />
//             <button className="px-6 py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition shadow-sm font-medium">
//               Subscribe
//             </button>
//           </div>
//           <p className="text-xs text-slate-400 mt-4">
//             No spam, ever. Unsubscribe anytime.
//           </p>
//         </div>

//         {/* Footer gap */}
//         <div className="h-16" />
//       </div>
//     </div>
//   );
// };

// export default BlogDetail;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Calendar,
  User,
  ArrowLeft,
  Send,
  Loader2,
  Clock,
  Share2,
  Link as LinkIcon,
  Mail,
  MessageCircle,
  Tag,
  Folder,
  ChevronUp,
} from "lucide-react";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import axios from "axios";
import toast from "react-hot-toast";

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [commentForm, setCommentForm] = useState({
    name: "",
    email: "",
    comment: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const API_URL = "https://api.marketing.cloudedata.com";

  const getEmbedUrl = (url) => {
    if (!url) return null;
    if (url.includes("/embed/")) return url;
    let videoId = null;
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    } else if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1]?.split("&")[0];
    } else if (url.includes("youtube.com/embed/")) {
      return url;
    }
    if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    return url;
  };

  const getGalleryImages = () => {
    if (!blog) return [];
    const images = [];
    if (blog.secondaryImages && blog.secondaryImages.length) {
      images.push(...blog.secondaryImages);
    }
    if (blog.images && blog.images.length) {
      const primary = blog.primaryImage;
      const filtered = primary
        ? blog.images.filter((img) => img !== primary)
        : blog.images;
      images.push(...filtered);
    }
    return images;
  };

  const parseMaybeArray = (value) => {
    if (Array.isArray(value)) return value;
    if (!value) return [];
    if (typeof value !== "string") return [];

    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const [blogRes, commentsRes] = await Promise.all([
          axios.get(`${API_URL}/api/blogs/slug/${slug}`),
          axios
            .get(`${API_URL}/api/blogs/slug/${slug}/comments`)
            .catch(() => ({ data: [] })),
        ]);

        const loadedBlog = {
          ...blogRes.data,
          tags: parseMaybeArray(blogRes.data.tags),
          secondaryImages: parseMaybeArray(blogRes.data.secondaryImages),
          images: parseMaybeArray(blogRes.data.images),
          metaKeywords: parseMaybeArray(blogRes.data.metaKeywords),
        };

        setBlog(loadedBlog);
        setComments(commentsRes.data || []);

        if (loadedBlog.category) {
          axios
            .get(`${API_URL}/api/blogs`)
            .then(({ data }) => {
              setRelatedPosts(
                (data || [])
                  .filter(
                    (item) =>
                      item.slug !== slug &&
                      item.category === loadedBlog.category,
                  )
                  .slice(0, 3),
              );
            })
            .catch(() => {});
        }
      } catch (error) {
        toast.error("Blog not found");
        navigate("/cloud-hosting-blog");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, navigate]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!commentForm.name || !commentForm.email || !commentForm.comment) {
      toast.error("All fields are required");
      return;
    }

    setSubmitting(true);

    try {
      const { data } = await axios.post(
        `${API_URL}/api/blogs/${blog._id}/comments`,
        commentForm,
      );

      setComments((prev) => [data, ...prev]);

      setCommentForm({
        name: "",
        email: "",
        comment: "",
      });

      toast.success("Comment posted");
    } catch {
      toast.error("Failed to post comment");
    } finally {
      setSubmitting(false);
    }
  };

  const stripHtml = (html) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
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
    toast.success("Link copied!");
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh] bg-[#f7f8fa]">
        <Loader2 className="animate-spin text-slate-700" size={48} />
      </div>
    );
  }

  if (!blog) return null;

  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(blog.title);
  const galleryImages = getGalleryImages();
  const hasGallery = galleryImages.length > 0;

  return (
    <div className="min-h-screen bg-[#f7f8fa] font-sans">
      <style>{`
        .blog-content {
          color: #334155;
          font-size: 1.0625rem;
          line-height: 1.8;
          width: 100%;
          max-width: 100%;
          height: auto !important;
          max-height: none !important;
          min-height: 0;
          overflow: visible !important;
          overflow-wrap: break-word;
          word-wrap: break-word;
          display: block;
          -webkit-line-clamp: unset !important;
          -webkit-box-orient: unset !important;
        }
        .blog-content * {
          max-height: none !important;
          height: auto !important;
          overflow: visible !important;
          -webkit-line-clamp: unset !important;
        }
        .blog-content > * + * {
          margin-top: 1.25em;
        }
        .blog-content h1,
        .blog-content h2,
        .blog-content h3,
        .blog-content h4 {
          font-weight: 700;
          color: #0f172a;
          line-height: 1.3;
          margin-top: 1.8em;
          margin-bottom: 0.6em;
        }
        .blog-content h1 { font-size: 2rem; }
        .blog-content h2 { font-size: 1.6rem; }
        .blog-content h3 { font-size: 1.3rem; }
        .blog-content h4 { font-size: 1.1rem; }
        .blog-content p {
          margin: 1.1em 0;
        }
        .blog-content a {
          color: #4f46e5;
          text-decoration: underline;
          text-underline-offset: 2px;
          font-weight: 500;
          word-break: break-word;
        }
        .blog-content a:hover {
          color: #4338ca;
          text-decoration: underline;
        }
        .blog-content ul,
        .blog-content ol {
          margin: 1.1em 0;
          padding-left: 1.5em;
        }
        .blog-content ul { list-style: disc; }
        .blog-content ol { list-style: decimal; }
        .blog-content li {
          margin: 0.5em 0;
        }
        .blog-content li > ul,
        .blog-content li > ol {
          margin: 0.5em 0;
        }
        .blog-content blockquote {
          border-left: 4px solid #6366f1;
          background: #eef2ff80;
          padding: 0.9em 1.2em;
          margin: 1.5em 0;
          border-radius: 0.5rem;
          font-style: italic;
          color: #475569;
        }
        .blog-content img {
          border-radius: 0.75rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          margin: 1.5em auto;
          max-width: 100%;
          width: auto;
          height: auto;
          display: block;
        }
        .blog-content code {
          background: #f1f5f9;
          color: #db2777;
          padding: 0.15em 0.45em;
          border-radius: 0.35em;
          font-size: 0.9em;
        }
        .blog-content pre {
          background: #0f172a;
          color: #e2e8f0;
          padding: 1.2em;
          border-radius: 0.75em;
          overflow-x: auto;
          overflow-y: visible !important;
          margin: 1.5em 0;
          max-height: none !important;
        }
        .blog-content pre code {
          background: none;
          color: inherit;
          padding: 0;
        }
        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5em 0;
          font-size: 0.95em;
          display: table;
        }
        .blog-content th,
        .blog-content td {
          border: 1px solid #e2e8f0;
          padding: 0.6em 0.9em;
          text-align: left;
        }
        .blog-content th {
          background: #f8fafc;
          font-weight: 600;
        }
        .blog-content hr {
          border: none;
          border-top: 1px solid #e2e8f0;
          margin: 2em 0;
        }
        .blog-content strong { color: #1e293b; font-weight: 700; }
        @media (max-width: 640px) {
          .blog-content { font-size: 1rem; line-height: 1.75; }
          .blog-content h1 { font-size: 1.6rem; }
          .blog-content h2 { font-size: 1.35rem; }
          .blog-content h3 { font-size: 1.15rem; }
        }
      `}</style>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 p-3 rounded-full bg-white shadow-lg border border-gray-200 text-slate-600 hover:bg-gray-50 transition-all"
        >
          <ChevronUp size={20} />
        </button>
      )}

      {/* Hero Section */}
      <div className="relative bg-slate-400 text-white overflow-hidden ">
        {(blog.primaryImage || (blog.images && blog.images[0])) && (
          <>
            <div className="absolute inset-0">
              <img
                src={blog.primaryImage || blog.images[0]}
                alt={blog.title}
                className="w-full h-full object-cover opacity-80"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90" />
          </>
        )}
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-28 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-5 sm:mb-6 drop-shadow-lg break-words">
            {blog.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-slate-300 text-xs sm:text-sm">
            <span className="flex items-center gap-2">
              <Calendar size={16} />
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={16} /> {getReadingTime(blog.description)}
            </span>
            <span className="flex items-center gap-2">
              <User size={16} /> {"Cloudedata"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-10 relative z-10">
        {/* Back Navigation */}
        <button
          onClick={() => navigate("/cloud-hosting-blog")}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-gray-200 text-sm sm:text-base"
        >
          <ArrowLeft size={18} /> Back to Blog
        </button>

        <article className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Category & Tags */}
          {(blog.category || (blog.tags && blog.tags.length > 0)) && (
            <div className="px-5 sm:px-8 pt-6 sm:pt-8 pb-4 flex flex-wrap gap-2 sm:gap-3">
              {blog.category && (
                <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium border border-indigo-100">
                  <Folder size={14} /> {blog.category}
                </span>
              )}
              {blog.tags &&
                blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 bg-gray-50 text-slate-600 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium border border-gray-200"
                  >
                    <Tag size={14} /> #{tag}
                  </span>
                ))}
            </div>
          )}

          {/* Image Gallery */}
          {hasGallery && (
            <div className="px-5 sm:px-8 pb-4">
              <div
                className={`grid gap-4 ${
                  galleryImages.length === 1
                    ? "grid-cols-1"
                    : "grid-cols-1 sm:grid-cols-2"
                }`}
              >
                {galleryImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="overflow-hidden rounded-xl shadow-md"
                  >
                    <img
                      src={img}
                      alt={`${blog.title} - ${idx + 1}`}
                      className="w-full h-56 sm:h-64 object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src =
                          "https://placehold.co/800x600?text=No+Image";
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Video Embed */}
          {blog.videoUrl && (
            <div className="px-5 sm:px-8 pb-4">
              <div className="aspect-video rounded-xl overflow-hidden shadow-md">
                <iframe
                  src={getEmbedUrl(blog.videoUrl)}
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                  title={blog.title}
                />
              </div>
            </div>
          )}

          {/* Social Share & Content */}
          <div className="px-5 sm:px-8 py-6">
            {/* Social Share */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-2 text-slate-600">
                <Share2 size={18} />
                <span className="text-sm font-medium">Share this article</span>
              </div>
              <div className="flex items-center gap-3 relative">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                  title="Share on Facebook"
                >
                  <FaFacebook />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-sky-50 text-sky-500 hover:bg-sky-100 transition"
                  title="Share on Twitter"
                >
                  <FaXTwitter size={16} />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 transition"
                  title="Share on LinkedIn"
                >
                  <FaLinkedin size={16} />
                </a>
                <button
                  onClick={copyCurrentUrl}
                  className="p-2 rounded-full bg-gray-50 text-slate-600 hover:bg-gray-100 transition relative"
                  title="Copy link"
                >
                  <LinkIcon size={16} />
                </button>
                {copied && (
                  <span className="absolute -bottom-8 right-0 text-xs bg-black text-white px-2 py-1 rounded-md whitespace-nowrap">
                    Copied!
                  </span>
                )}
              </div>
            </div>

            {/* Main Content */}
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: blog.description }}
            />
          </div>
        </article>

        {/* Author Bio */}
        <div className="mt-10 bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-5">
          <div className="w-16 h-16 rounded-full bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 p-2.5">
            <img
              src="https://cloudedata.com/Cloudedatalogo.svg"
              alt="Cloudedata"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h4 className="font-semibold text-slate-800 text-lg">
              {"Cloudedata"}
            </h4>
            <p className="text-slate-600 text-sm">
              {blog?.title ||
                "Cloud infrastructure specialist sharing insights on modern architecture."}
            </p>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-10 bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6 sm:mb-8 flex items-center gap-2">
            <MessageCircle size={22} />
            Comments ({comments.length})
          </h3>

          {comments.length === 0 && (
            <div className="text-center py-10 bg-gray-50 rounded-xl mb-8">
              <Mail size={40} className="mx-auto text-gray-300 mb-3" />
              <p className="text-slate-500">
                No comments yet. Be the first to share your thoughts!
              </p>
            </div>
          )}

          {comments.length > 0 && (
            <div className="space-y-6 mb-10 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {comments.map((comment) => (
                <div key={comment._id} className="flex gap-3 sm:gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 flex items-center justify-center text-white font-bold uppercase flex-shrink-0">
                    {comment.name.charAt(0)}
                  </div>
                  <div className="flex-1 pb-4 border-b border-gray-100 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-semibold text-slate-800">
                        {comment.name}
                      </span>
                      <span className="text-xs text-slate-400">
                        {new Date(comment.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </span>
                    </div>
                    <p className="text-slate-600 whitespace-pre-wrap break-words">
                      {comment.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Comment Form */}
          <form
            onSubmit={handleCommentSubmit}
            className="space-y-5 pt-4 border-t border-gray-100"
          >
            <h4 className="font-semibold text-slate-800 text-lg">
              Leave a comment
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your name *"
                value={commentForm.name}
                onChange={(e) =>
                  setCommentForm({ ...commentForm, name: e.target.value })
                }
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                required
              />
              <input
                type="email"
                placeholder="Your email *"
                value={commentForm.email}
                onChange={(e) =>
                  setCommentForm({ ...commentForm, email: e.target.value })
                }
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                required
              />
            </div>
            <textarea
              rows="4"
              placeholder="Your comment *"
              value={commentForm.comment}
              onChange={(e) =>
                setCommentForm({ ...commentForm, comment: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              required
            />
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition disabled:opacity-50 shadow-sm font-medium w-full sm:w-auto justify-center"
            >
              {submitting ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Send size={18} />
              )}
              {submitting ? "Posting..." : "Post Comment"}
            </button>
          </form>
        </div>

        {/* Footer gap */}
        <div className="h-16" />
      </div>
    </div>
  );
};

export default BlogDetail;
