import React, { useState, useEffect } from "react";

import "./styles.css";
import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  async function loadRepositories() {
    const { data } = await api.get('/repositories');

    setRepositories(data);
  }

  useEffect(() => {
    loadRepositories();
  }, [])

  async function handleAddRepository() {
    const { data: response } = await api.post('/repositories', {
      title: `Novo repositório ${Date.now()}`,
      url: 'https://github.com/michelonsouza/gostack-desafio03-conceitos-reactjs',
      techs: ['ReactJS', 'Axios']
    });

    setRepositories([...repositories, response]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const newRepositories = repositories.filter(repository => repository.id !== id);

    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
