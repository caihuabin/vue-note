<template>
  <div id="app">
    <a id="fork-me" href="https://github.com/icyse/icyse.github.io" target="_blank">
      <img src="/static/images/fork-me-on-github.png" alt="Fork me on GitHub">
    </a>
    <div id="layout" class="pure-g">
      <div class="sidebar pure-u-1">
        <div class="header">
          <a class="logo" href="http://github.com/icyse">
            <img src="/static/images/avatar.ico" alt="icyse" v-bind:class="logoClassObj" v-on:load="showLogo">
          </a>
          <h1 class="brand-title">Icyse</h1>
          <h2 class="brand-tagline">Icyse Blog &ndash; GitHub.io by icyse</h2>
          <nav class="nav">
            <ul class="nav-list">
              <li class="nav-item"><a class="pure-button" ng-click="changeLanguage('en_US')">{{'ENGLISH'|translate}}</a></li>
              <li class="nav-item"><a class="pure-button" ng-click="changeLanguage('zh_CN')">{{'CHINESE'|translate}}</a></li>
            </ul>
          </nav>
        </div>
        <footer class="footer" menu-popup></footer>
      </div>
      <div id="main" class="content pure-u-1 pure-u-md-4-5">
        <section id="content" ng-view class="fade">
          <router-view></router-view>
        </section>
        <footer class="footer">
          <div class="pure-menu pure-menu-horizontal">
            <ul>
              <li class="pure-menu-item"><a ng-href="/#/about" class="pure-menu-link">About</a></li>
              <li class="pure-menu-item"><a href="http://twitter.com/CaiHuabin/" class="pure-menu-link">Twitter</a></li>
              <li class="pure-menu-item"><a href="http://github.com/icyse/" class="pure-menu-link">GitHub</a></li>
            </ul>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'app',
    data: function () {
      return {
        logoClassObj: {
          'lazy-load': true,
          show: false
        }
      }
    },
    methods: {
      showLogo: function () {
        this.logoClassObj.show = true
      }
    }
  }

</script>
<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  
  #layout {
    padding: 0;
  }
  
  .header {
    text-align: center;
    top: auto;
    margin: 1em auto;
  }
  
  .sidebar {
    background: rgb(61, 79, 93);
    color: #fff;
  }
  
  .brand-title,
  .brand-tagline {
    margin: 0;
  }
  
  .brand-title {
    text-transform: uppercase;
    margin: 0.67em 0;
  }
  
  .brand-tagline {
    font-weight: 300;
    color: rgb(176, 202, 219);
  }
  
  .nav-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  
  .nav-item {
    display: inline-block;
    *display: inline;
    zoom: 1;
  }
  
  .nav-item a {
    background: transparent;
    border: 2px solid rgb(176, 202, 219);
    color: #fff;
    margin-top: 1em;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    font-size: 85%;
  }
  
  .nav-item a:hover,
  .nav-item a:focus {
    border: 2px solid rgb(61, 146, 201);
    text-decoration: none;
  }
  
  .nav-item a.active {
    border: 2px solid rgb(61, 146, 201);
    text-decoration: none;
  }
  
  .content-subhead {
    text-transform: uppercase;
    color: #aaa;
    border-bottom: 1px solid silver;
    padding: 0.4em 0;
    font-size: 80%;
    font-weight: 500;
    letter-spacing: 0.1em;
  }
  
  .content {
    padding: 2em 1em 0;
  }
  
  .post {
    padding-bottom: 2em;
  }
  
  .post-title {
    font-size: 1.5em;
    margin-bottom: 0.2em;
  }
  
  .post-title a {
    color: #222;
  }
  
  .post-avatar {
    border-radius: 50px;
    float: right;
    margin-left: 1em;
  }
  
  .post-description {
    font-family: Georgia, "Cambria", serif;
    color: #444;
    line-height: 1.8em;
  }
  
  .post-meta {
    color: #999;
    font-size: 90%;
    margin: 0;
  }
  
  #fork-me {
    position: fixed;
    top: 0;
    left: 0;
    border: 0;
    z-index: 1;
    width: 25%;
    max-width: 149px;
    min-width: 96px;
  }
  
  #fork-me img {
    border: 0;
    width: 100%;
  }
  
  .logo {
    border: 5px solid #fff;
    border-radius: 50%;
    width: 106px;
    height: 106px;
    margin: 0 auto;
    background: rgb(176, 202, 219);
    display: block;
    text-align: center;
  }
  
  img.lazy-load {
    width: 20%;
    height: 20%;
    border-radius: 50%;
    opacity: 0;
    -webkit-transition: all 0.2s ease-in;
    transition: all 0.2s ease-in;
  }
  
  img.lazy-load.show {
    width: 100%;
    height: 100%;
    opacity: 1;
  }

</style>
