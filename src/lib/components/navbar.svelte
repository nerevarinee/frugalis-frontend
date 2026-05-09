<script>
  let mobileOpen = false;

  function toggleMobileMenu() {
    mobileOpen = !mobileOpen;
  }
</script>

<nav class="nav">
  <div class="mobile-header">
    <a class="logo-area" href="/">
      <img src="/logo-FRUGALI.png" alt="FRUGALIS" class="logo">
    </a>
    <button class="burger-button" type="button" on:click={toggleMobileMenu} aria-label="Toggle mobile menu">
      <span class="burger-line"></span>
      <span class="burger-line"></span>
      <span class="burger-line"></span>
    </button>
  </div>

  <div class="desktop-nav">
    <div id="search-bar">
      <form id="search-bar-form">
        <div class="input-wrapper">
          <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            <path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z"/></svg>
          <input type="text" placeholder="Search..." />
        </div>
      </form>
      <button class="search-button" type="submit">SEARCH</button>
    </div>
    <div class="logo-area">
      <a href="/">
        <img src="/logo-FRUGALI.png" alt="FRUGALIS" class="logo">
      </a>
    </div>
    <div class="user-area">
      <a href="/auth/register"><button class="bam-button" type="button">BECOME A MEMBER</button></a>
      </div>
  </div>

  <div class="mobile-menu{mobileOpen ? ' open' : ''}">
    <div id="search-bar">
      <form id="search-bar-form">
        <div class="input-wrapper">
          <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            <path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z"/></svg>
          <input type="text" placeholder="Search..." />
        </div>
      </form>
      <button class="search-button" type="submit">SEARCH</button>
    </div>
    <div class="user-area">
      <a href="/auth/register"><button class="bam-button" type="button">BECOME A MEMBER</button></a>
      <button class="lm-button" type="button"><a href="/">LEARN MORE</a></button>
      <button class="news-button" type="button">NEWS</button>
    </div>
  </div>
</nav>

<style>
nav {
  margin-top: 20px;
  justify-content: center;
  display: flex;
  align-items: center;
  font-family: 'Jaldi', sans-serif;
  gap: 20px;
  flex-wrap: wrap;
}
  #search-bar {
  width: fit-content;
  display: flex;
  align-items: center;
  border: 3px solid black;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  margin-right: 90px;
}

#search-bar-form {
  display: flex;
  align-items: center;
  background: white;
  overflow: hidden;
  font-family: 'Jaldi', sans-serif;
}

.input-wrapper {
  position: relative;
  flex: 1;
}

.input-wrapper input {
  width: 100%;
  padding: 6px 8px 6px 30px;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  font-family: 'Jaldi', sans-serif;
}

.search-icon {
  position: absolute;
  width: 18px;
  height: 18px;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  fill: #333;
}

.search-button {
  border: none;
  padding: auto;
  margin: 3px;
  margin-left: 2px;
  background: white;
  border: 3px solid black;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  font-family: 'Jaldi', sans-serif;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
}

.search-button:hover {
  background: black;
  color: White;
}

.logo {
    margin-left: 35px;
    margin-right: 45px;
    width: 100px;
}

/* .user-area {
  margin-left: 80px;
  margin-right: 40px;
} */

.bam-button {
  border: none;
  padding: 6px 12px;
  background: white;
  border: 1px solid black;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  font-family: 'Jaldi', sans-serif;
  margin-left: 90px;
}
.bam-button:hover {
    background: black;
    color: White;
}

.lm-button {
  border: none;
  padding: 6px 12px;
  margin-left: 5px;
  margin-right: 5px;
  background: white;
  border: none;
  cursor: pointer;
  font-size: 13px;
  font-weight: 750;
  font-family: 'Jaldi', sans-serif;
}
.lm-button:hover {
    box-shadow: black;
}

.news-button {
  border: none;
  padding: 6px 12px;
  margin-left: 5px;
  margin-right: 5px;
  background: white;
  border: none;
  cursor: pointer;
  font-size: 13px;
  font-weight: 750;
  font-family: 'Jaldi', sans-serif;
}
.news-button:hover {
    font-weight: 1200;
}

a {
  text-decoration: none;
  color: black;
  
}
a:hover {
  text-decoration: none;
  color: white;
  
}

.mobile-header {
  display: none;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}

.mobile-header .logo-area {
  margin: 0;
}

.burger-button {
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  width: 28px;
  height: 20px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
}

.burger-line {
  display: block;
  width: 100%;
  height: 3px;
  background: black;
  border-radius: 2px;
}

.mobile-menu {
  display: none;
  width: 100%;
  flex-direction: column;
  gap: 12px;
  padding: 10px;
  border-top: 1px solid rgba(0,0,0,0.08);
}

.mobile-menu.open {
  display: flex;
}

.desktop-nav {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

/* Mobile Responsive Styles */
@media (max-width: 1024px) {
  nav {
    margin-top: 15px;
    gap: 10px;
  }

  #search-bar {
    width: 250px;
    margin-left: 10px;
    margin-right: 20px;
  }

  .logo {
    margin-left: 15px;
    margin-right: 15px;
    width: 80px;
  }

  .bam-button,
  .lm-button,
  .news-button {
    padding: 5px 10px;
    font-size: 12px;
    margin-left: 3px;
    margin-right: 3px;
  }
}

@media (max-width: 768px) {
  .mobile-header {
    display: flex;
  }

  .desktop-nav {
    display: none;
  }

  nav {
    flex-direction: column;
    margin-top: 10px;
    gap: 15px;
  }

  #search-bar {
    width: 100%;
    max-width: 300px;
    margin: 0;
    order: 1;
  }

  .logo-area {
    order: 2;
  }

  .logo {
    width: 70px;
    margin: 0;
  }

  .user-area {
    order: 3;
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .bam-button,
  .lm-button,
  .news-button {
    padding: 5px 8px;
    font-size: 11px;
    margin: 2px;
  }

  #search-bar-form {
    width: 100%;
  }

  .input-wrapper input {
    font-size: 13px;
    padding: 5px 8px 5px 28px;
  }

  .search-icon {
    width: 16px;
    height: 16px;
  }

  .search-button {
    padding: 5px 10px;
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  nav {
    padding: 0 10px;
  }

  #search-bar {
    width: 100%;
    margin: 0;
  }

  #search-bar-form {
    flex-direction: column;
  }

  .search-button {
    width: 100%;
    margin-top: 5px;
    padding: 5px 8px;
    font-size: 11px;
  }

  .logo {
    width: 60px;
  }

  .user-area {
    width: 100%;
    justify-content: space-around;
    gap: 5px;
  }

  .bam-button,
  .lm-button,
  .news-button {
    padding: 4px 6px;
    font-size: 10px;
    margin: 0;
  }

  .input-wrapper input {
    font-size: 12px;
    padding: 4px 6px 4px 24px;
  }

  .search-icon {
    width: 14px;
    height: 14px;
    left: 6px;
  }
}
</style>