import React, { useState, useEffect } from "react";
import { Post, PostFormData } from "./types";
import { postService } from "./services/postService";
import { PostForm } from "./components/PostForm/PostForm";
import { PostList } from "./components/PostList/PostList";
import styles from "./App.module.css";

const App: React.FC = () => {
  const [posts, setPosts] = useState<object[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const loadPosts = async (page: number = 1) => {
    try {
      setLoading(true);
      const response = await postService.getPosts(page);

      if (response.error) {
        console.error("Erro ao carregar posts:", response.error);
        setError(response.error);
        setPosts([]);
        return;
      }

      // Agora acessamos os posts através de response.data.posts
      if (response.data) {
        console.log("Posts recebidos:", response.data.posts);
        setPosts(response.data.posts);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.currentPage);
        setError(null);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setError("Erro ao carregar posts. Por favor, tente novamente.");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      //loadPosts(1);
      loadPosts();
      console.log("handleSearch");
      return;
    }

    setLoading(true);
    const response = await postService.searchPosts(searchTerm);
    setLoading(false);

    if (response.error) {
      setError(response.error);
      return;
    }

    if (response.data) {
      setPosts(response.data);
    }
  };

  const handleSubmit = async (formData: PostFormData) => {
    const response = editingPost
      ? await postService.updatePost(editingPost._id, formData)
      : await postService.createPost(formData);

    if (response.error) {
      setError(response.error);
      return;
    }

    setShowForm(false);
    setEditingPost(null);
    //loadPosts(currentPage);
    loadPosts();
    console.log("handleSubmit");
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Tem certeza que deseja excluir este post?")) {
      return;
    }

    const response = await postService.deletePost(id);
    if (response.error) {
      setError(response.error);
      return;
    }

    //loadPosts(currentPage);
    loadPosts();
    console.log("handleDelete");
  };

  useEffect(() => {
    console.log("useEffect executado - Página atual:", currentPage); // Log do useEffect
    if (!searchTerm) {
      loadPosts(currentPage);
    }
  }, [currentPage, searchTerm]);

  const refreshPosts = () => {
    console.log("Recarregando posts..."); // Log de refresh
    loadPosts(currentPage);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Blog dos Professores</h1>
          <div className={styles.headerButtons}>
            <button onClick={refreshPosts} className={styles.refreshButton}>
              Atualizar
            </button>
            <button
              onClick={() => setShowForm(true)}
              className={styles.newPostButton}
            >
              Novo Post
            </button>
          </div>
        </header>

        <div className={styles.searchBar}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar posts..."
            className={styles.searchInput}
          />
          <button onClick={handleSearch} className={styles.searchButton}>
            Buscar
          </button>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        {showForm && (
          <PostForm
            post={editingPost || undefined}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingPost(null);
            }}
          />
        )}

        {loading ? (
          <div className={styles.loading}>Carregando...</div>
        ) : (
          <>
            <PostList
              posts={posts}
              onEdit={(post) => {
                setEditingPost(post);
                setShowForm(true);
              }}
              onDelete={handleDelete}
            />

            {!searchTerm && (
              <div className={styles.pagination}>
                <button
                  onClick={() => setCurrentPage((p) => p - 1)}
                  disabled={currentPage === 1}
                  className={styles.paginationButton}
                >
                  Anterior
                </button>
                <span className={styles.pageInfo}>
                  Página {currentPage} de {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => p + 1)}
                  disabled={currentPage === totalPages}
                  className={styles.paginationButton}
                >
                  Próxima
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
