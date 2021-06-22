<template>
  <header>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top" style="background-color: #36802d">
      <a class="navbar-brand" href="/">컴룸닷넷</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item {% block nav-home %}{% endblock %}">
            <a class="nav-link" href="/">HOME</a>
          </li>
          <li class="nav-item {% block nav-about %}{% endblock %}">
            <a class="nav-link" href="/about">Made by</a>
          </li>
          <li class="nav-item {% block nav-whatis %}{% endblock %}">
            <a class="nav-link" href="/whatis">What is?</a>
          </li>
          <li class="nav-item {% block nav-howto %}{% endblock %}">
            <a class="nav-link" href="/howto">How to</a>
          </li>
          <li class="nav-item {% block nav-faq %}{% endblock %}">
            <a class="nav-link" href="/FAQ">FAQ</a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >ETC</a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="/etc/nocookie">유튜브nocookie</a>
              <a class="dropdown-item" href="/etc/g-suite">G-suite</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>