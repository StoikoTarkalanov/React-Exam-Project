/* eslint-disable jsx-a11y/img-redundant-alt */
import { Link } from 'react-router-dom';

import Mercedes from '../images/Mercedes 190 SL.jpg';
import Jaguar from '../images/Jaguar E-Type.jpg';
import Chevrolet from '../images/Chevrolet Corvette.jpg';

const Home = () => {
  return (
    <>
      <section className="header">
        <article className="header-landing">
          <article className="header-landing-content">
            <h2 className="header-landing-content-title">
              Find best cars ever made
            </h2>
            <p className="header-landing-content-text">
              We give you the chance to experience the past of the automotive
              world, a past that lives on in the future in showroom centres like
              AutoStar.
            </p>
            <article className="header-landing-button">
              <Link to="/about">
                <button>Read More</button>
              </Link>
            </article>
          </article>
        </article>
      </section>
      <section className="landing-hero">
        <article className="landing-hero-content">
          <h1 className="landing-hero-content-title">VARIETY OF CARS</h1>
          <p className="landing-hero-content-text">
            Some of the best models ever produced for the respective car brand.
          </p>
        </article>
        <article className="landing-hero-images">
          <article className="landing-hero-images-row">
            {/* This images are from posted cars so should come from database */}

            <img src={Mercedes} alt="Image..." />
            <h3 className="landing-hero-images-row-title">Mercedes SL</h3>
          </article>
          <article className="landing-hero-images-row">
            <img src={Jaguar} alt="Image..." />
            <h3 className="landing-hero-images-row-title">Jaguar E-Type</h3>
          </article>
          <article className="landing-hero-images-row">
            <img src={Chevrolet} alt="Image..." />
            <h3 className="landing-hero-images-row-title">
              Chevrolet Corvette
            </h3>
          </article>
        </article>
      </section>
    </>
  );
};

export default Home;
