import React, { useState } from 'react';
import { Post, PostFormData } from '../../types';
import styles from './PostForm.module.css';

interface PostFormProps {
  post?: Post;
  onSubmit: (data: PostFormData) => Promise<void>;
  onCancel: () => void;
}

export const PostForm: React.FC<PostFormProps> = ({ post, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<PostFormData>({
    title: post?.title || '',
    content: post?.content || '',
    author: post?.author || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="Título"
        className={styles.input}
        required
      />
      <textarea
        value={formData.content}
        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        placeholder="Conteúdo"
        className={styles.textarea}
        required
      />
      <input
        type="text"
        value={formData.author}
        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
        placeholder="Autor"
        className={styles.input}
        required
      />
      <div className={styles.buttonGroup}>
        <button type="submit" className={`${styles.button} ${styles.primary}`}>
          {post ? 'Atualizar' : 'Criar'}
        </button>
        <button 
          type="button" 
          onClick={onCancel}
          className={`${styles.button} ${styles.secondary}`}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};
