<script>
  let active = false;
  let mobileOpen = false;

  function toggle() {
    active = !active;
  }

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
    <a class="logo-area" href="/">
      <img src="/logo-FRUGALI.png" alt="FRUGALIS" class="logo">
    </a>
    <a href="/dashboard/listings/new">
      <button class="sell-button" type="button">SELL</button>
    </a>
    <div class="user-area">
      <button on:click={toggle} class="notification-button" aria-label="Toggle notifications">
        {#if active}
        <svg class="notification-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M320 64C302.3 64 288 78.3 288 96L288 99.2C215 114 160 178.6 160 256L160 277.7C160 325.8 143.6 372.5 113.6 410.1L103.8 422.3C98.7 428.6 96 436.4 96 444.5C96 464.1 111.9 480 131.5 480L508.4 480C528 480 543.9 464.1 543.9 444.5C543.9 436.4 541.2 428.6 536.1 422.3L526.3 410.1C496.4 372.5 480 325.8 480 277.7L480 256C480 178.6 425 114 352 99.2L352 96C352 78.3 337.7 64 320 64zM258 528C265.1 555.6 290.2 576 320 576C349.8 576 374.9 555.6 382 528L258 528z"/></svg>
        {:else}
        <svg class="notification-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M320 64C306.7 64 296 74.7 296 88L296 97.7C214.6 109.3 152 179.4 152 264L152 278.5C152 316.2 142 353.2 123 385.8L101.1 423.2C97.8 429 96 435.5 96 442.2C96 463.1 112.9 480 133.8 480L506.2 480C527.1 480 544 463.1 544 442.2C544 435.5 542.2 428.9 538.9 423.2L517 385.7C498 353.1 488 316.1 488 278.4L488 263.9C488 179.3 425.4 109.2 344 97.6L344 87.9C344 74.6 333.3 63.9 320 63.9zM488.4 432L151.5 432L164.4 409.9C187.7 370 200 324.6 200 278.5L200 264C200 197.7 253.7 144 320 144C386.3 144 440 197.7 440 264L440 278.5C440 324.7 452.3 370 475.5 409.9L488.4 432zM252.1 528C262 556 288.7 576 320 576C351.3 576 378 556 387.9 528L252.1 528z"/></svg>
        {/if}
      </button>
      <button class="user-profile-button" type="button">
        <a href="/dashboard/listings">
        <svg class="user-profile-icon" xmlns="http://www.w3.org/2000/svg" viewBox="40 40 640 640"><path d="M470.5 463.6C451.4 416.9 405.5 384 352 384L288 384C234.5 384 188.6 416.9 169.5 463.6C133.9 426.3 112 375.7 112 320C112 205.1 205.1 112 320 112C434.9 112 528 205.1 528 320C528 375.7 506.1 426.2 470.5 463.6zM430.4 496.3C398.4 516.4 360.6 528 320 528C279.4 528 241.6 516.4 209.5 496.3C216.8 459.6 249.2 432 288 432L352 432C390.8 432 423.2 459.6 430.5 496.3zM320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM320 304C297.9 304 280 286.1 280 264C280 241.9 297.9 224 320 224C342.1 224 360 241.9 360 264C360 286.1 342.1 304 320 304zM232 264C232 312.6 271.4 352 320 352C368.6 352 408 312.6 408 264C408 215.4 368.6 176 320 176C271.4 176 232 215.4 232 264z"/></svg>
      </button>
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
    <button class="sell-button" type="button">SELL</button>
    <div class="user-area">
      <button on:click={toggle} class="notification-button">
        {#if active}
        <svg class="notification-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M320 64C302.3 64 288 78.3 288 96L288 99.2C215 114 160 178.6 160 256L160 277.7C160 325.8 143.6 372.5 113.6 410.1L103.8 422.3C98.7 428.6 96 436.4 96 444.5C96 464.1 111.9 480 131.5 480L508.4 480C528 480 543.9 464.1 543.9 444.5C543.9 436.4 541.2 428.6 536.1 422.3L526.3 410.1C496.4 372.5 480 325.8 480 277.7L480 256C480 178.6 425 114 352 99.2L352 96C352 78.3 337.7 64 320 64zM258 528C265.1 555.6 290.2 576 320 576C349.8 576 374.9 555.6 382 528L258 528z"/></svg>
        {:else}
        <svg class="notification-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M320 64C306.7 64 296 74.7 296 88L296 97.7C214.6 109.3 152 179.4 152 264L152 278.5C152 316.2 142 353.2 123 385.8L101.1 423.2C97.8 429 96 435.5 96 442.2C96 463.1 112.9 480 133.8 480L506.2 480C527.1 480 544 463.1 544 442.2C544 435.5 542.2 428.9 538.9 423.2L517 385.7C498 353.1 488 316.1 488 278.4L488 263.9C488 179.3 425.4 109.2 344 97.6L344 87.9C344 74.6 333.3 63.9 320 63.9zM488.4 432L151.5 432L164.4 409.9C187.7 370 200 324.6 200 278.5L200 264C200 197.7 253.7 144 320 144C386.3 144 440 197.7 440 264L440 278.5C440 324.7 452.3 370 475.5 409.9L488.4 432zM252.1 528C262 556 288.7 576 320 576C351.3 576 378 556 387.9 528L252.1 528z"/></svg>
        {/if}
      </button>
      <button class="cart-button" type="button">
        <svg class="cart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M24 48C10.7 48 0 58.7 0 72C0 85.3 10.7 96 24 96L69.3 96C73.2 96 76.5 98.8 77.2 102.6L129.3 388.9C135.5 423.1 165.3 448 200.1 448L456 448C469.3 448 480 437.3 480 424C480 410.7 469.3 400 456 400L200.1 400C188.5 400 178.6 391.7 176.5 380.3L171.4 352L475 352C505.8 352 532.2 330.1 537.9 299.8L568.9 133.9C572.6 114.2 557.5 96 537.4 96L124.7 96L124.3 94C119.5 67.4 96.3 48 69.2 48L24 48zM208 576C234.5 576 256 554.5 256 528C256 501.5 234.5 480 208 480C181.5 480 160 501.5 160 528C160 554.5 181.5 576 208 576zM432 576C458.5 576 480 554.5 480 528C480 501.5 458.5 480 432 480C405.5 480 384 501.5 384 528C384 554.5 405.5 576 432 576z"/></svg>
      </button>
      <button class="user-profile-button" type="button">
        <svg class="user-profile-icon" xmlns="http://www.w3.org/2000/svg" viewBox="40 40 640 640"><path d="M470.5 463.6C451.4 416.9 405.5 384 352 384L288 384C234.5 384 188.6 416.9 169.5 463.6C133.9 426.3 112 375.7 112 320C112 205.1 205.1 112 320 112C434.9 112 528 205.1 528 320C528 375.7 506.1 426.2 470.5 463.6zM430.4 496.3C398.4 516.4 360.6 528 320 528C279.4 528 241.6 516.4 209.5 496.3C216.8 459.6 249.2 432 288 432L352 432C390.8 432 423.2 459.6 430.5 496.3zM320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM320 304C297.9 304 280 286.1 280 264C280 241.9 297.9 224 320 224C342.1 224 360 241.9 360 264C360 286.1 342.1 304 320 304zM232 264C232 312.6 271.4 352 320 352C368.6 352 408 312.6 408 264C408 215.4 368.6 176 320 176C271.4 176 232 215.4 232 264z"/></svg>
      </button>
    </div>
  </div>
</nav>

<style>
nav {
  justify-content: center;
  display: flex;
  align-items: center;
  font-family: 'Jaldi', sans-serif;
  gap: 20px;
  flex-wrap: wrap;
}
  #search-bar {
  display: flex;
  align-items: center;
  width: 300px;
  margin-left: 20px;
  margin-right: 60px;
}

#search-bar-form {
  display: flex;
  align-items: center;
  border: 3px solid black;
  background: white;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
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
    margin-left: 30px;
    margin-right: 30px;
    width: 100px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.1);
}

/* .user-area {
  margin-left: 80px;
  margin-right: 40px;
} */

.user-profile-button {
  background: none;
  border: none;
  margin-top: 6px;
  margin-left: 20px;
  padding: 6px;
  cursor: pointer;
}

.user-profile-icon{
    height: 40px;
    width: 40px;
}

.notification-button {
  background: none;
  border: none;
  margin-top: 6px;
  padding: 6px;
  cursor: pointer;}

.notification-icon{
    height: 40px;
    width: 40px;
}

.cart-button {
  background: none;
  border: none;
  margin-top: 6px;
  padding: 6px;
  cursor: pointer;
}

.cart-icon{
    height: 40px;
    width: 40px;
}

.sell-button {
  border: none;
  padding: 6px 12px;
  margin-left: 60px;
  margin-right: 80px;
  background: white;
  border: 1px solid black;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
}

.sell-button:hover {
  background: black;
  color: White;
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
    gap: 10px;
  }

  #search-bar {
    width: 250px;
    margin-left: 10px;
    margin-right: 20px;
  }

  .logo {
    margin-left: 20px;
    margin-right: 20px;
    width: 80px;
  }

  .sell-button {
    margin-left: 30px;
    margin-right: 30px;
    padding: 5px 10px;
    font-size: 12px;
  }

  .user-profile-icon,
  .notification-icon,
  .cart-icon {
    height: 32px;
    width: 32px;
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
    gap: 12px;
    padding: 10px;
  }

  #search-bar {
    width: 100%;
    max-width: 300px;
    margin: 0;
    order: 1;
  }

  .logo {
    width: 70px;
    margin: 0;
    order: 2;
  }

  .sell-button {
    margin: 0;
    padding: 5px 10px;
    font-size: 12px;
    order: 3;
  }

  .user-area {
    order: 4;
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
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

  .user-profile-icon,
  .notification-icon,
  .cart-icon {
    height: 28px;
    width: 28px;
  }

  .user-profile-button,
  .notification-button,
  .cart-button {
    margin: 0;
    padding: 4px;
  }
}

@media (max-width: 480px) {
  nav {
    padding: 8px;
    gap: 10px;
  }

  #search-bar {
    width: 100%;
    order: 1;
  }

  #search-bar-form {
    flex-direction: column;
  }

  .search-button {
    width: 100%;
    margin-top: 5px;
    padding: 4px 8px;
    font-size: 11px;
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

  .logo {
    width: 60px;
    order: 2;
  }

  .sell-button {
    font-size: 11px;
    padding: 4px 8px;
    order: 3;
  }

  .user-area {
    width: 100%;
    order: 4;
    justify-content: space-around;
    gap: 5px;
  }

  .user-profile-icon,
  .notification-icon,
  .cart-icon {
    height: 24px;
    width: 24px;
  }

  .user-profile-button,
  .notification-button,
  .cart-button {
    padding: 2px;
    margin-top: 2px;
  }
}
</style>