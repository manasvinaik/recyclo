import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to Recyclo
          </h1>
          <p className="hero-subtitle">
            A one-stop app to make a difference for you and our planet
          </p>
          <div className="hero-badges">
            <span className="badge">🌱 Eco-Friendly</span>
            <span className="badge">♻️ Sustainable</span>
            <span className="badge">🌍 Planet-First</span>
          </div>
        </div>
      </section>

      {/* Navigation Cards Section */}
<section className="cards-section">
  <h2 className="section-title">Explore Our Eco Initiatives</h2>
  <div className="cards-container">

    {/* Eco Learning Card */}
    <Link to="/gaming" className="nav-card learning-card">
      <div className="card-icon">
        🎮
      </div>
      <div className="card-content">
        <h3 className="card-title">Eco Learning</h3>
        <p className="card-description">
          Engage with our gamified and educational modules to learn about sustainability, 
          climate action, and eco-friendly practices in a fun, interactive way.
        </p>
        <div className="card-features">
          <span className="feature">✓ Gamified Quizzes</span>
          <span className="feature">✓ Interactive Challenges</span>
          <span className="feature">✓ Track Your Progress</span>
        </div>
      </div>
      <div className="card-arrow">→</div>
    </Link>

    {/* Eco E-commerce Card */}
    <Link to="/products" className="nav-card shop-card">
      <div className="card-icon">
        🛍️
      </div>
      <div className="card-content">
        <h3 className="card-title">Eco Shop</h3>
        <p className="card-description">
          Browse and purchase eco-friendly products that help reduce environmental impact. 
          From sustainable household items to green lifestyle products.
        </p>
        <div className="card-features">
          <span className="feature">✓ Sustainable Products</span>
          <span className="feature">✓ Eco-Certified Brands</span>
          <span className="feature">✓ Multiple Categories</span>
        </div>
      </div>
      <div className="card-arrow">→</div>
    </Link>

    {/* Community Dashboard Card */}
    <Link to="/community" className="nav-card community-card">
      <div className="card-icon">
        🏘️
      </div>
      <div className="card-content">
        <h3 className="card-title">Community Dashboard</h3>
        <p className="card-description">
          Join our eco-community to share ideas, register complaints, report local issues, 
          and collaborate on environmental initiatives with like-minded individuals.
        </p>
        <div className="card-features">
          <span className="feature">✓ Report & Track Complaints</span>
          <span className="feature">✓ Community Discussions</span>
          <span className="feature">✓ Share Pictures</span>
        </div>
      </div>
      <div className="card-arrow">→</div>
    </Link>

  </div>
</section>


      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Make a Difference?</h2>
          <p>Start your sustainable journey today</p>
          <Link to="/gaming" className="cta-button">
            Learn Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;