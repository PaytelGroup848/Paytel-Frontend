import React, { useState } from 'react';
import { Info, FileText, Tag, ChevronRight, ArrowUpRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutUs({ aboutText, posts, categories }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const defaultAbout = "Cloudedata is on a mission to make cloud technology simple, secure, and accessible for businesses of all sizes. From high-performance cloud hosting and VPS solutions to accounting software on cloud and enterprise-grade security powered by Acronis, we help you run, scale, and manage your business online—faster, smarter, and with complete confidence.";
  const textToShow = aboutText || defaultAbout;
  const shouldTruncate = textToShow.length > 165;
  const displayedText = isExpanded || !shouldTruncate ? textToShow : `${textToShow.slice(0, 165)}...`;

  return (
    <div className="w-full bg-gradient-to-b from-white via-slate-50/80 to-white/95 backdrop-blur-xl rounded-2xl shadow-[0_12px_40px_rgba(15,23,42,0.04)] border border-slate-200/80 overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)] group sticky top-8">
      
      <div className="h-[3px] w-full bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-600 opacity-90 group-hover:opacity-100 transition-opacity" />

      {/* About Section */}
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 border border-blue-100/80">
            <Info className="w-4 h-4 stroke-[2.5]" />
          </div>
          <h3 className="text-xs font-bold text-slate-800 tracking-wider uppercase">Corporate Profile</h3>
        </div>
        <p className="text-[13px] text-slate-600 leading-relaxed font-normal">
          {displayedText}
          {shouldTruncate && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="ml-1 text-xs text-blue-600 font-semibold hover:text-blue-700 hover:underline inline-flex items-center gap-0.5"
            >
              {isExpanded ? 'Collapse' : 'Read full brief'} 
              <ChevronRight className={`w-3 h-3 transform transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
            </button>
          )}
        </p>
      </div>

      <div className="border-t border-slate-100 mx-5" />

      {/* Recent Posts Section */}
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-cyan-50 text-cyan-600 border border-cyan-100/80">
            <FileText className="w-4 h-4 stroke-[2.5]" />
          </div>
          <h3 className="text-xs font-bold text-slate-800 tracking-wider uppercase">Latest Releases</h3>
        </div>

        {posts?.length > 0 ? (
          <div className="space-y-1">
            {posts.map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`} className="group/item block p-2.5 -mx-2.5 rounded-xl hover:bg-slate-100/60 transition-all duration-200">
                <div className="flex items-start gap-2 justify-between">
                  <span className="text-[13px] text-slate-700 group-hover/item:text-blue-600 font-medium leading-snug line-clamp-2 transition-colors">
                    {post.title}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover/item:text-blue-500 opacity-0 group-hover/item:opacity-100 transform translate-y-1 group-hover/item:translate-y-0 transition-all duration-200 flex-shrink-0" />
                </div>
                <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3 stroke-[2]" /> {post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 italic py-1">No production data streams found.</p>
        )}
      </div>

      <div className="border-t border-slate-100 mx-5" />

      {/* Categories Section */}
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100/80">
            <Tag className="w-4 h-4 stroke-[2.5]" />
          </div>
          <h3 className="text-xs font-bold text-slate-800 tracking-wider uppercase">Segment Taxonomy</h3>
        </div>

        {categories?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {categories.map((cat) => (
              <button key={cat.name} className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-50 border border-slate-200/60 text-slate-600 hover:bg-white hover:border-blue-400/70 hover:text-blue-600 shadow-sm transition-all duration-150">
                <span className="font-medium">{cat.name}</span>
                <span className="text-[10px] bg-slate-200/60 text-slate-500 px-1.5 py-0.5 rounded-md font-mono border border-slate-200/20">{cat.count}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}