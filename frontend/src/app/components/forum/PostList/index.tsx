'use client'; // 設為 Client Component，確保可以使用交互

import React, { useState } from 'react';
import './styles.css';
import { useRouter } from 'next/navigation';
import { AiOutlineTeam } from 'react-icons/ai'; // 引入 React Icon

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  avatar: string;
  timestamp: string;
  replies: number;
}

const Post: React.FC<{ post: Post; onClick: (post: Post) => void }> = ({ post, onClick }) => {
  return (
    <div className="post-card" onClick={() => onClick(post)}>
      <div className="post-header">
        <div className="post-author">
          <img src={post.avatar} alt="頭貼" className="post-avatar" />
          <span>{post.author}</span>
        </div>
        <span className="post-timestamp">{post.timestamp}</span>
      </div>
      <div className="post-body">
        <h3 className="post-title">{post.title}</h3>
        <p className="post-content">{post.content}</p>
      </div>
      <div className="post-footer">
        <hr />
        <span className="post-replies">{post.replies} 則回應</span>
      </div>
    </div>
  );
};

const PostList: React.FC = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: '徵多益夥伴',
      content: '今年8月底要考多益...',
      author: '作者A',
      avatar: '/default-avatar.png',
      timestamp: '17 小時前',
      replies: 76,
    },
    {
      id: 2,
      title: '徵運動夥伴',
      content: '最近喜歡去健身房...',
      author: '作者B',
      avatar: '/default-avatar.png',
      timestamp: '3 小時前',
      replies: 11,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTitle('');
    setContent('');
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert('請填寫標題和內文');
      return;
    }

    const newPost: Post = {
      id: posts.length + 1,
      title,
      content,
      author: '匿名用戶',
      avatar: '/default-avatar.png',
      timestamp: '剛剛',
      replies: 0,
    };

    setPosts([newPost, ...posts]);
    handleCloseModal();
  };

  const handlePostClick = (post: Post) => {
    router.push(`/pagedetail`);
  };

  return (
    <div className="post-list-container">
      <div className="post-header">
        <div className="title-with-icon">
          <AiOutlineTeam className="title-icon" />
          <h1 className="sidebar-title">來找找你的學習夥伴...？</h1>
        </div>
        <button className="add-button" onClick={handleOpenModal}>
          +
        </button>
      </div>

      <div className="post-list">
        {posts.map((post) => (
          <Post key={post.id} post={post} onClick={handlePostClick} />
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
