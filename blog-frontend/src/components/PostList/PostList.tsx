import React from 'react';
import { Post } from '../../types';
import { SafeHTML } from '../SafeHTML/SafeHTML';
import styles from './PostList.module.css';

interface PostListProps {
  posts: Post[];
  onEdit: (post: Post) => void;
  onDelete: (id: string) => void;
  onPostClick: (post: Post) => void;
}

// Função auxiliar para truncar texto
const truncateText = (text: string, maxLength: number = 200) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const PostList: React.FC<PostListProps> = ({ 
  posts, 
  onEdit, 
  onDelete,
  onPostClick 
}) => {
  if (!Array.isArray(posts)) {
    return <div className={styles.error}>Nenhum post disponível</div>;
  }

  return (
    <div className={styles.list}>
      {posts.map(post => (
        <article key={post._id} className={styles.post}>
          <header className={styles.header}>
            <h2 
              className={styles.title} 
              onClick={() => onPostClick(post)}
              style={{ cursor: 'pointer' }}
            >
              {post.title}
            </h2>
            <div className={styles.actions}>
              <button
                onClick={() => onEdit(post)}
                className={`${styles.button} ${styles.edit}`}
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(post._id)}
                className={`${styles.button} ${styles.delete}`}
              >
                Excluir
              </button>
            </div>
          </header>
          <SafeHTML 
            content={truncateText(post.content)} 
            className={styles.content}
          />
          <footer className={styles.footer}>
            <span>Por {post.author}</span>
            <time>{new Date(post.createdAt).toLocaleDateString()}</time>
          </footer>
        </article>
      ))}
    </div>
  );
};

