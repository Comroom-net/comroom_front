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
          <b-nav-item href="https://forms.gle/RDqm8vgrud2NHAaU8" active
            ><b>운영중단 설문</b></b-nav-item
          >
          <b-nav-item href="/" active>HOME</b-nav-item>
          <b-nav-item href="/about">개발자</b-nav-item>
          <b-nav-item href="/develop">개발현황</b-nav-item>
          <b-nav-item href="/whatis">사이트 소개</b-nav-item>
          <b-nav-item href="/howto">이용방법</b-nav-item>
          <b-nav-item href="/FAQ">FAQ</b-nav-item>
          <b-nav-item-dropdown text="ETC">
            <b-dropdown-item href="/nocookie">유튜브nocookie</b-dropdown-item>
            <b-dropdown-item href="/g-suite">G-suite</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>