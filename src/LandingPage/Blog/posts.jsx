import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Posts({ posts = [] }) {
  const [visibleCount, setVisibleCount] = useState(4); // Load 4 initially

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
    });
  };

  const handleLoadMore = () => setVisibleCount(posts.length);

  if (!posts?.length) return <div className="text-center py-10">No posts available.</div>;

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Latest Articles</h2>
        <p className="text-slate-500 mt-1">Insights and tutorials from cloud experts.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {posts.slice(0, visibleCount).map((post) => (
          <article key={post.id} className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 overflow-hidden hover:-translate-y-1">
            <Link to={`/blog/${post.id}`} className="relative aspect-video overflow-hidden block">
              <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              <span className="absolute top-3 left-3 px-3 py-1 text-[11px] font-bold bg-white/95 backdrop-blur-sm text-slate-800 rounded-full shadow-sm uppercase tracking-wider">
                {post.category}
              </span>
              {post.isVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-cyan-500/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:bg-cyan-400 transition-colors">
                    <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>
              )}
            </Link>

            <div className="flex flex-col flex-grow p-5">
              <Link to={`/blog/${post.id}`}>
                <h3 className="text-lg font-bold text-slate-900 leading-snug mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
              </Link>
              <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-3">
                {post.description}
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold">
                    {post.author.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-slate-700 leading-none">{post.author}</p>
                    <p className="text-[11px] text-slate-400 mt-1">{formatDate(post.date)}</p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {visibleCount < posts.length && (
        <div className="mt-10 text-center">
          <button 
            onClick={handleLoadMore}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-full hover:bg-blue-600 transition-all shadow-lg shadow-slate-900/20 active:scale-95"
          >
            Load More Articles
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
        </div>
      )}
    </div>
  );
}