'use client'; // 設為 Client Component，確保可以使用交互

import React, { useState } from 'react';
import './styles.css';


interface Post {
  title: string;
  content: string;
  specialRequest: string;
  peopleCount: number;
  currentPeople: number;
  author: string;
}

const Post: React.FC<{ post: Post; onClick: (post: Post) => void }> = ({ post, onClick }) => {
  return (
    <div className="post-card" onClick={() => onClick(post)}>
      <h3 className="post-title">#{post.title}</h3>
      <p className="post-people">需求人數：{post.peopleCount}</p>
    </div>
  );
};

const PostList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');
  const [peopleCount, setPeopleCount] = useState(1);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTitle('');
    setContent('');
    setSpecialRequest('');
    setPeopleCount(1);
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert('請填寫標題和內文');
      return;
    }

    const newPost: Post = {
      title,
      content,
      specialRequest,
      peopleCount,
      currentPeople: 0, // 預設目前人數為 0
      author: '匿名用戶', // 假設的發布者
    };

    setPosts([...posts, newPost]);
    handleCloseModal();
  };

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedPost(null);
  };

  return (
    <div className="post-list-container">
      <h2 className="sidebar-title">來找找你的學習夥伴</h2>
      <div className="post-form">
        <input
          type="text"
          placeholder="有什麼樣的學習目標...？"
          className="post-input-short"
          onClick={handleOpenModal}
          readOnly
        />
      </div>

      <div className="post-list">
        {posts.map((post, index) => (
          <Post key={index} post={post} onClick={handlePostClick} />
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>新增學習目標</h3>
            <div className="modal-field">
              <label>標題：</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="輸入標題"
              />
            </div>
            <div className="modal-field">
              <label>內文：</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="輸入內文"
              />
            </div>
            <div className="modal-actions">
              <button onClick={handleSubmit} className="submit-button">
                提交
              </button>
              <button onClick={handleCloseModal} className="cancel-button">
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      
    </div>
  );
};

export default PostList;
