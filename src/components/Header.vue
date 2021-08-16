<template>
  <header>
    <b-navbar
      toggleable="lg"
      class="navbar navbar-expand-md navbar-dark fixed-top"
      style="background-color: #36802d"
    >
      <b-navbar-brand href="/">컴룸닷넷</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/" active>HOME</b-nav-item>
          <b-nav-item href="/about">Made by</b-nav-item>
          <b-nav-item href="/whatis">What is?</b-nav-item>
          <b-nav-item href="/howto">How to</b-nav-item>
          <b-nav-item href="/FAQ">FAQ</b-nav-item>
          <b-nav-item-dropdown text="ETC">
            <b-dropdown-item href="/nocookie">유튜브nocookie</b-dropdown-item>
            <b-dropdown-item href="#" disabled>G-suite</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>