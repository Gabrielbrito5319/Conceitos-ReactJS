import React ,{useState, useEffect} from "react";

import api from './services/api';

import "./styles.css";
function App() {

  const [repositories , setRepository] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(response=>{
      setRepository(response.data);
    })
  }, [])


  async function handleAddRepository() {
    
    const response = await api.post('repositories', {
      title: `Novo projeto ${Date.now()}`,
      url: "gabriel brito",
      techs: ["gab","brit", "o"]
    })
    
    const repository = response.data;

    setRepository([...repositories, repository]);
  }
  
  async function handleRemoveRepository(id) {
    
    const response = await api.delete(`repositories/${id}`).then(function(response) {
      console.log(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
    

    const newRepository = repositories.filter((repositorio=> repositorio.id !== id)); 
    
    setRepository( newRepository);

    console.log(repositories);
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

