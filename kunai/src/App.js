import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true); // Set loading to true when starting the fetch
      const response = await fetch(`http://127.0.0.1:5000/?username=${username}&token=${token}`);
      const data = await response.json();
      setRepositories(data.repositories || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false when the fetch is complete
    }
  };
  return (
    <div className="Appli">
      <header className="App-headers">
        <h1>GitHub Repo Viewer</h1>
      </header>
      <div className="App-container">
        <aside className="App-sidebar">
          <label>
            GitHub Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>
            Personal Access Token:
            <input type="password" value={token} onChange={(e) => setToken(e.target.value)} />
          </label>
            <button onClick={fetchData} disabled={loading} className="large-button custom-button"> 
              {loading ? 'Fetching...' : 'Fetch Repositories'}
          </button>
        </aside>
        <main className="App-main">
          <h2>Repositories:</h2>
          {loading && <div className="loader">Loading...</div>}
          <ul>
            {repositories.map((repo) => (
              <li key={repo.Name} className="repo-item">
                <strong>{repo.Name}</strong>
                <p className="repo-description">{repo.Description}</p>
                <a href={repo.URL} target="_blank" rel="noopener noreferrer">
                  {repo.URL}
                </a>
                {repo.Branches && (
                  <div className="repo-branches">
                    <strong>Branches:</strong>
                    <ul>
                      {repo.Branches.map((branch) => (
                        <li key={branch.name}>{branch.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
}

export default App;