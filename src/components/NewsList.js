// src/components/NewsList.js
import React, { useState } from 'react';
import Pagination from './Pagination';
import './NewsList.css';

const NewsList = ({ articles = [] }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 3; // Changed to match the EconomicNewsFeed

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Expanded list of terms for relevance check
    const relevantTerms = [
        'crypto', 'cryptocurrency', 'bitcoin', 'blockchain', 'ethereum', 'altcoin',
        'economy', 'gdp', 'inflation', 'deflation', 'fiscal policy', 'monetary policy', 'interest rate',
        'unemployment', 'stock market', 'trade', 'tariffs', 'debt', 'budget', 'recession',
        'politics', 'election', 'government', 'policy', 'sanction', 'diplomacy', 'treaty',
        'declaration', 'statement', 'report', 'forecast'
    ];

    // Function to check if an article is relevant based on predefined terms
    const isRelevant = (article) => {
        const text = (article.headline + " " + (article.summary || "")).toLowerCase();
        return relevantTerms.some(term => text.includes(term));
    };

    // Function to check if an article matches the search term
    const matchesSearch = (article) => {
        const text = (article.headline + " " + (article.summary || "")).toLowerCase();
        return text.includes(searchTerm.toLowerCase());
    };

    // Filter articles first by relevance then by search term
    const filteredArticles = articles.filter(isRelevant).filter(matchesSearch);

    // Slice the filtered articles for pagination
    const currentItems = filteredArticles.slice(indexOfFirstItem, indexOfLastItem);

    // Pagination logic (same as EconomicNewsFeed)
    const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, startPage + 2); // Assuming maxPageNumbers = 3
    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
    const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

    // Function to clean up text content
    const cleanText = (text) => {
        return text.replace(/^-+|-+$/g, '');
    };

    return (
        <div className="news-list-container">
            <div className="search-bar mb-4">
                <h3>Market News</h3>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search for news..."
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                />
            </div>
            <div className="news-list">
                {currentItems.length > 0 ? (
                    currentItems.map((article, index) => (
                        <div key={indexOfFirstItem + index} className="news-item">
                            <div className="news-content">
                                <h4 className="news-title"><a href={article.url} target="_blank" rel="noopener noreferrer">{cleanText(article.headline)}</a></h4>
                                <p className="news-summary">{cleanText(article.summary ? article.summary.slice(0, 150) + "..." : "No summary available")}</p>
                                {/* <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm read-more">Read More</a> */}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-results"><p>No news articles found.</p></div>
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

export default NewsList;