/* eslint-disable jsx-a11y/img-redundant-alt */

const Home = () => {
  return (
    <>
      <section className="header">
        <article className='header-landing'>
          <article className='header-landing-content'>
            <h2 className='header-landing-content-title'>
              Find best cars ever made
            </h2>
            <p className='header-landing-content-text'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
              eos commodi vero repudiandae. Optio, saepe laboriosam ab voluptas
              cumque quo.
            </p>
            <article className='header-landing-button'>
              <button>Read More</button>
            </article>
          </article>
        </article>
      </section>
      <section className='landing-hero'>
        <article className='landing-hero-content'>
          <h1 className='landing-hero-content-title'>VARIETY OF CARS</h1>
          <p className='landing-hero-content-text'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex,
            beatae. Lorem ipsum dolor sit amet.
          </p>
        </article>
        <article className='landing-hero-images'>
          <article className='landing-hero-images-row'>
            
            {/* This images are from posted cars so should come from database */}

            <img src='./Mercedes 190 SL.jpg' alt='Image...' />
            <h3 className='landing-hero-images-row-title'>Mercedes SL</h3>
          </article>
          <article className='landing-hero-images-row'>
            <img src='/Jaguar E-Type.jpg' alt='Image...' />
            <h3 className='landing-hero-images-row-title'>Jaguar E-Type</h3>
          </article>
          <article className='landing-hero-images-row'>
            <img src='/Chevrolet Corvette.jpg' alt='Image...' />
            <h3 className='landing-hero-images-row-title'>Chevrolet Corvette</h3>
          </article>
        </article>
      </section>
    </>
  );
};

export default Home;
