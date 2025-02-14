import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsList from './components/NewsList';
import NewsCarousel from './components/NewsCarousel';
import EconomicNewsFeed from './components/EconomicNewsFeed';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get('https://finnhub.io/api/v1/news?category=general&token=cumndshr01qsapi0hin0cumndshr01qsapi0hing');
        setArticles(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchArticles();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container-fluid">
      <div className="row mt-4">
        <div className="col-md-3">
          <EconomicNewsFeed articles={articles} />
        </div>
        <div className="col-md-6">
          <NewsCarousel articles={articles.filter(article => article.image)} />
        </div>
        <div className="col-md-3">
          <NewsList articles={articles} />
        </div>
      </div>
    </div>
  );
}

export default App;