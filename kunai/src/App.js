import React, { useState } from 'react';
import './App.css';
function App() {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState(null);
  
  const fetchData = async () => {
    try {
      setLoading(true); // Set loading to true when starting the fetch
      const response = await fetch(`http://127.0.0.1:5000/?username=${username}&token=${token}`);
      const data = await response.json();
      console.log('Data:',data)
      setRepositories(data.repositories || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false when the fetch is complete
    }
  };
  const toggleRepoDetails = (repo) => {
    setSelectedRepo(selectedRepo === repo ? null : repo);
  };
  return (
    <html lang='en'>
    <head>
      <meta charset='UTF-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <title>Portfolio Website</title>
      <link rel="stylesheet" href="style.css" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
    />
    <script
      src="https://kit.fontawesome.com/7a4b62b0a4.js"
      crossorigin="anonymous"
    ></script>
    </head>
    <body>
      <header>
        <nav class="container">
          <div class="logo">Portfolio</div>
          <ul>
            <a href="#name">
              <li>Home</li>
            </a>
            <a href="#project">
              <li>Projects</li>
            </a>
            <a href="#contact">
              <li>Contact</li>
            </a> 
          </ul>
        </nav>
      </header>
      <main>
      <section id="hero">
        <div class="container">
           <div class="hero_image_animate__animated animate__bounceInLeft"> 
           <img src="softwaredev.png" alt="hero image" />
          
            {/* <img src="kartik1.jpg" alt="kartik" /> */}
          </div>
          <div class="name_content">
            <h1>
              <span class="hi_text">Hi</span> , I am
              <span class="name_text"> Kartik Ramesh</span>
            </h1>
            <h2>Quality Assurance Manager</h2>
          </div>
        </div>
      </section> 
      <section id="project">
        <h2>PROJECTS</h2>
        <div class="container">
          <div class="project_container">
            <div class="grid_item">
              <div class="card">
                <img src="images/project1.png" alt="Project 1" />
                <div class="card_content">
                  <h3>Next project</h3>
                </div>
              </div>
            </div>
            <div class="grid_item">
              <div class="card">
                <img src="project2.png" alt="Project 2" />
                <div class="card_content">
                  <h3>Testcase Version utility</h3>
                  <label>
                      GitHub Username:
                      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </label>
                    <label>
                      GitHub PAT  Token:  
                      <input type="password" value={token} onChange={(e) => setToken(e.target.value)} />
                    </label>
                    <button onClick={fetchData} disabled={loading} className="large-button custom-button"> 
                        {loading ? 'Fetching...' : 'Fetch Repositories'}
                    </button>

                </div>
              </div>
            </div>
          </div>
        </div>
        <section id="repositories">
        <h2>Repositories</h2>
        {loading && <p>Loading repositories...</p>}
        <ul>
          {repositories.map((repo) => (
            <li key={repo.Name}>
              <div className="repo-container">
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
                <button onClick={() => toggleRepoDetails(repo)}>
                  {selectedRepo === repo ? 'Hide Details' : 'Show Details'}
                </button>
                {selectedRepo === repo && (
                  <div className="repo-details">
                    {/* Render additional details here */}
                    <p>Details: ...</p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
      </section>

      </main>
    </body>
    <footer>
      <div class="container">Created By Kartik Ramesh</div>
    </footer>
    </html>
  );
}
export default App;