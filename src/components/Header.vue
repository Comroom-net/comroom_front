<template>
  <header>
    <ul class="navbar-nav mr-auto">
      <li class="nav-item {% block nav-home %}{% endblock %}">
        <a class="nav-link" href="/">HOME</a>
      </li>
      <li class="nav-item {% block nav-about %}{% endblock %}">
        <a class="nav-link" href="{% url 'about' %}">Made by</a>
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
    </ul>
  </header>
</template>

    <script>
export default {
  name: "Header"
};
</script>