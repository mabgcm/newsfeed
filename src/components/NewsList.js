import React, { useState } from 'react';
import Pagination from './Pagination';
import './NewsList.css';


const NewsList = ({ articles = [] }) => { // default to empty array if articles is undefined
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 7;

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

    return (
        <div className="container">
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search for news..."
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                />
            </div>
            <ul className="list-group">
                {currentItems.length > 0 ? (
                    currentItems.map((article, index) => (
                        <li key={indexOfFirstItem + index} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <a href={article.url} target="_blank" rel="noopener noreferrer">{article.headline}</a>
                                <p className="mb-0 small">{article.summary ? article.summary.slice(0, 100) + "..." : "No summary available"}</p>
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="list-group-item">No news articles found.</li>
                )}
            </ul>
            <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={filteredArticles.length}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default NewsList;