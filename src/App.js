import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(res => {
      setRepositories(res.data);
    })
  }, []);

  async function handleAddRepository() {
    const res = await api.post('/repositories', {
      title: `Novo repositorio ${Date.now()}`,
      url: 'test.com.br',
      techs: 'Reactjs, Nodejs',
    });
    
    const repository = res.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const repositoryIndex = repositories.findIndex(reposit => reposit.id === id);
    
    const newRepositories = [...repositories];

    newRepositories.splice(repositoryIndex, 1);
    
    setRepositories([...newRepositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
