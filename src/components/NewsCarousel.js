import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

const NewsCarousel = ({ articles }) => {
    const [imageErrors, setImageErrors] = useState({});

    const handleImageError = (id) => {
        setImageErrors(prevErrors => ({
            ...prevErrors,
            [id]: true
        }));
    };

    const shouldExcludeImage = (imageUrl) => {
        return imageUrl === "https://static2.finnhub.io/file/publicdatany/finnhubimage/market_watch_logo.png";
    };

    // Inline styles for the glass effect
    const glassEffectStyle = {
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        background: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)', // For Safari
        padding: '20px',
        borderRadius: '10px',
        color: 'white',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
        fontFamily: 'Josefin Sans, sans-serif' // Apply Josefin Sans here
    };

    // Style for the carousel item to position the caption
    const carouselItemStyle = {
        position: 'relative'
    };

    // Function to clean up text content
    const cleanText = (text) => {
        // This function removes any leading or trailing dashes or hyphens
        return text.replace(/^-+|-+$/g, '');
    };

    return (
        <Carousel indicators={false}>
            {articles.map((article, index) => {
                if (article.image && !shouldExcludeImage(article.image)) {
                    return (
                        <Carousel.Item key={index} style={carouselItemStyle}>
                            {!imageErrors[article.id || index] ? (
                                <img
                                    className="d-block w-100"
                                    src={article.image}
                                    alt={article.headline}
                                    onError={() => handleImageError(article.id || index)}
                                />
                            ) : (
                                <div style={{ height: '300px', backgroundColor: '#e9ecef', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <p>No Image Available</p>
                                </div>
                            )}
                            <div className="carousel-caption" style={glassEffectStyle}>
                                <h3>{cleanText(article.headline)}</h3>
                                <p>{cleanText(article.summary ? article.summary.slice(0, 150) + "..." : "No summary available")}</p>
                                <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Read More</a>
                            </div>
                        </Carousel.Item>
                    );
                } else {
                    return null;
                }
            })}
        </Carousel>
    );
};

export default NewsCarousel;