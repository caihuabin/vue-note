<template>
  <div id="app">
    <a id="fork-me" href="https://github.com/icyse/icyse.github.io" target="_blank">
      <img src="/static/images/fork-me-on-github.png" alt="Fork me on GitHub">
    </a>
    <div id="layout" class="pure-g">
      <Sidebar v-bind:current-language="currentLanguage" v-on:change-language="changeLanguage"></Sidebar>
      <div id="main" class="content pure-u-1 pure-u-md-4-5">
        <section id="content">
          <transition v-bind:name="transitionName">
            <router-view v-bind:current-language="currentLanguage"></router-view>
          </transition>
        </section>
        <footer class="footer">
          <div class="pure-menu pure-menu-horizontal">
            <ul>
              <li class="pure-menu-item">
                <router-link to="/about" class="pure-menu-link">About</router-link>
              </li>
              <li class="pure-menu-item">
                <a href="http://twitter.com/CaiHuabin/" class="pure-menu-link">Twitter</a>
              </li>
              <li class="pure-menu-item">
                <a href="http://github.com/icyse/" class="pure-menu-link">GitHub</a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
  import Sidebar from './components/Sidebar'
  import {
    BROWSER_LANGUAGE
  } from './config/Config'
  export default {
    name: 'app',
    data: function () {
      return {
        transitionName: 'fade',
        currentLanguage: BROWSER_LANGUAGE || 'en-US'
      }
    },
    watch: {
      '$route' (to, from) {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }
    },
    components: {
      Sidebar
    },
    methods: {
      changeLanguage: function (language) {
        this.currentLanguage = language
      }
    }
  }

</script>
<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
    /*margin-top: 60px;*/
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
  
  #layout {
    padding: 0;
  }
  
  .content {
    padding: 2em 1em 0;
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
  
  .footer {
    text-align: center;
    padding: 1em 0;
  }
  
  .child-view {
    position: absolute;
    transition: all .5s cubic-bezier(.55, 0, .1, 1);
  }
  
</style>
