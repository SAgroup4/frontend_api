'use client';
import React, { useState, ChangeEvent } from 'react';
import './styles.css';
import { posts } from '../../../data/fakepost';

// 定義 Post 資料的型別
interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  time: string;
  comments: number;
  category: string;
}

/**
 * PostList 組件 - 顯示帖子列表
 * 
 * 功能：
 * 1. 顯示帖子列表
 * 2. 提供發帖功能
 * 
 * @component
 */
const PostList: React.FC = () => {
  const [postContent, setPostContent] = useState<string>('');
  const [localPosts, setLocalPosts] = useState<Post[]>(posts.map(post => ({
    ...post,
    category: (post as Post).category || '一般討論' // 為缺少 category 的帖子添加默認分類
  })));

  const handlePostSubmit = () => {
    if (!postContent.trim()) return;

    const newPost: Post = {
      id: localPosts.length + 1,
      title: postContent.split('\n')[0] || '無標題',
      content: postContent,
      author: '匿名用戶',
      time: '剛剛',
      comments: 0,
      category: '一般討論',
    };

    setLocalPosts([newPost, ...localPosts]);
    setPostContent('');
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
  };

  return (
    <div className="post-list-container">
      <div className="post-form">
        <textarea
          placeholder="分享你的想法..."
          className="post-input"
          value={postContent}
          onChange={handleChange}
        />
        <button 
          className="post-button"
          onClick={handlePostSubmit}
        >
          發佈
        </button>
      </div>

      <div className="posts">
        {localPosts.map((post) => (
          <div key={post.id} className="post-item">
            <div className="post-header">
              <h3 className="post-title">{post.title}</h3>
              <span className="post-category">{post.category}</span>
            </div>
            <p className="post-content">{post.content}</p>
            <div className="post-footer">
              <span className="post-author">{post.author}</span>
              <span className="post-time">{post.time}</span>
              <span className="post-comments">{post.comments} 則留言</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
