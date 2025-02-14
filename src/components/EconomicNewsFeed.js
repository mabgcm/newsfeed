// src/components/EconomicNewsFeed.js
import React, { useState, useEffect } from 'react';
import './EconomicNewsFeed.css';

const EconomicNewsFeed = ({ articles = [] }) => {
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [imageErrors, setImageErrors] = useState({});
    const itemsPerPage = 3;
    const maxPageNumbers = 3;

    const economicKeywords = [
        'economic calendar', 'economic events', 'economic data release', 'economic indicators', 'economic report',
        'economic forecast', 'gdp', 'cpi', 'ppi', 'unemployment rate', 'inflation', 'interest rates',
        'federal reserve', 'fomc', 'monetary policy', 'fiscal policy', 'trade balance', 'retail sales',
        'housing starts', 'consumer confidence', 'business sentiment', 'manufacturing orders',
        'non-farm payrolls'
    ];

    useEffect(() => {
        const filtered = articles.filter(article => {
            const text = (article.headline + " " + (article.summary || "")).toLowerCase();
            return economicKeywords.some(keyword => text.includes(keyword)) && text.includes(searchTerm.toLowerCase());
        });
        setFilteredArticles(filtered);
    }, [articles, searchTerm]);

    const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
    const currentItems = filteredArticles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);
    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
    const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

    const handleImageError = (id) => setImageErrors(prev => ({ ...prev, [id]: true }));
    const shouldExcludeImage = (url) => url === "https://static2.finnhub.io/file/publicdatany/finnhubimage/market_watch_logo.png";
    const cleanText = (text) => text.replace(/^-+|-+$/g, '');

    return (
        <div className="economic-news-feed">
            <div className="search-bar mb-4">
                <h3>Economic Calendar News</h3>
                {/* <input className="form-control" placeholder="Search economic news..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} /> */}
            </div>
            <div className="news-list">
                {currentItems.length > 0 ? (
                    currentItems.map((article, index) => (
                        <div key={index} className="news-item">
                            <div className="news-thumbnail">
                                {article.thumbnail && !shouldExcludeImage(article.thumbnail) && !imageErrors[article.id || index] ?
                                    <img src={article.thumbnail} alt={article.headline} onError={() => handleImageError(article.id || index)} />
                                    : <div className="thumbnail-placeholder">No Image</div>}
                            </div>
                            <div className="news-content">
                                <h4 className="news-title"><a href={article.url} target="_blank" rel="noopener noreferrer">{cleanText(article.headline)}</a></h4>
                                <p className="news-summary">{cleanText(article.summary ? article.summary.slice(0, 150) + "..." : "No summary available")}</p>
                                {/* <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm read-more">Read More</a> */}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-results"><p>No economic calendar news found.</p></div>
                )}
            </div>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className={currentPage === 1 ? "page-item disabled" : "page-item"}>
                        <a className="page-link" href="#" aria-label="Previous" onClick={prevPage}><span aria-hidden="true">«</span></a>
                    </li>
                    {pageNumbers.map(number => (
                        <li key={number} className={currentPage === number ? 'page-item active' : 'page-item'}>
                            <a onClick={() => paginate(number)} className="page-link" href="#">{number}</a>
                        </li>
                    ))}
                    <li className={currentPage === totalPages ? "page-item disabled" : "page-item"}>
                        <a className="page-link" href="#" aria-label="Next" onClick={nextPage}><span aria-hidden="true">»</span></a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default EconomicNewsFeed;