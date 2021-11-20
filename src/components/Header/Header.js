const Header = () => {
    return(
<header>
      <nav class="nav">
        <article class="nav-logo">
          <a href="#/">
            <h1>AutoStar</h1>
          </a>
        </article>
        <ul class="nav-menu">
          <li>
            <a href="#/">Login</a>
          </li>
          <li>
            <a href="#/">Register</a>
          </li>
        </ul>
      </nav>

      <article class="header-landing">
        <article class="header-landing-content">
          <h2 class="header-landing-content-title">Find best cars ever made</h2>
          <p class="header-landing-content-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat eos
            commodi vero repudiandae. Optio, saepe laboriosam ab voluptas cumque
            quo.
          </p>
          <article class="header-landing-button">
            <button>Read More</button>
          </article>
        </article>
      </article>
    </header>
    );
}

export default Header;