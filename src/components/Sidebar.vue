<template>
  <div class="sidebar pure-u-1">
    <div class="header">
      <a class="logo" href="http://github.com/icyse">
        <img src="/static/images/avatar.ico" alt="icyse" v-bind:class="logoClassObj" v-on:load="showLogo">
      </a>
      <h1 class="brand-title">Icyse</h1>
      <h2 class="brand-tagline">Icyse Note &ndash; GitHub.io by icyse</h2>
      <nav class="nav">
        <ul class="nav-list">
          <li class="nav-item"><a class="pure-button" v-on:click="changeLanguage('en-US')">{{'ENGLISH'|translate(currentLanguage)}}</a></li>
          <li class="nav-item"><a class="pure-button" v-on:click="changeLanguage('zh-CN')">{{'CHINESE'|translate(currentLanguage)}}</a></li>
        </ul>
      </nav>
    </div>
    <footer class="footer">
      <ul class="pure-menu pure-menu-horizontal">
        <li class="pure-menu-item">
          <router-link to="/" class="pure-menu-link tooltipped tooltipped-s" aria-label="Home">
            <span class="icon-home"></span>
          </router-link>
        </li>
        <li class="pure-menu-item">
          <a href="javascript:;" v-on:click="toggle=!toggle" class="pure-menu-link tooltipped tooltipped-s" aria-label="Menu">
            <span class="icon-leaf"></span>
          </a>
        </li>
        <li class="pure-menu-item">
          <router-link to="/about" class="pure-menu-link tooltipped tooltipped-s" aria-label="About">
            <span class="icon-user"></span>
          </router-link>
        </li>
        <li class="pure-menu-item">
          <a href="http://github.com/icyse/" class="pure-menu-link tooltipped tooltipped-s" aria-label="GitHub">
            <span class="icon-github-circled"></span>
          </a>
        </li>
      </ul>
      <transition name="scale">
        <ul v-show="toggle" class="category-popup">
          <li v-for="category in categoryList">
            <router-link v-bind:to="'/?category=' + category" v-bind:class="'post-category post-category-' + category">
              {{category}}
            </router-link>
          </li>
        </ul>
      </transition>
    </footer>
  </div>
</template>
<script>
  import {
    LOCALE_LANGUAGES,
    CATEGORY_LIST
  } from '../config/Config'
  export default {
    name: 'sidebar',
    created: function () {

    },
    props: {
      currentLanguage: String
    },
    data: function () {
      return {
        logoClassObj: {
          'lazy-load': true,
          show: false
        },
        toggle: false,
        categoryList: CATEGORY_LIST
      }
    },
    filters: {
      translate: function (text, currentLanguage) {
        if (LOCALE_LANGUAGES[currentLanguage].hasOwnProperty(text)) {
          return LOCALE_LANGUAGES[currentLanguage][text]
        }
        return text
      }
    },
    computed: {},
    methods: {
      showLogo: function () {
        this.logoClassObj.show = true
      },
      changeLanguage: function (lang) {
        if (lang === 'en-US') {
          this.$emit('change-language', 'en-US')
        } else {
          this.$emit('change-language', 'zh-CN')
        }
      }
    }
  }

</script>
<style>
  .sidebar {
    background: rgb(61, 79, 93);
    color: #fff;
  }
  
  .header {
    text-align: center;
    top: auto;
    margin: 1em auto;
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
    transition: all 0.2s ease-in;
  }
  
  img.lazy-load.show {
    width: 100%;
    height: 100%;
    opacity: 1;
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
  
  .footer ul {
    padding: 0;
  }
  
  .footer a {
    /* color: #ccc;
    font-size: 80%; */
  }
  
  .footer .pure-menu a:hover,
  .footer .pure-menu a:focus {
    background: none;
  }
  
  .sidebar .footer {
    padding: 0;
    font-size: 1.2em;
    margin: 0;
  }
  
  .sidebar .footer .pure-menu-link {
    padding: 0 .5em;
  }
  
  ul.category-popup li {
    padding: 0;
    margin: 0;
    height: 100%;
    display: inline-block;
    zoom: 1;
    vertical-align: middle;
    position: relative;
  }
  
  .post-category {
    margin: 0 0.1em;
    padding: 0.3em 1em;
    color: #fff;
    background: #999;
    font-size: 80%;
  }
  
  .post-category-Design {
    background: #990066;
  }
  
  .post-category-Wiki {
    background: #5aba59;
  }
  
  .post-category-Icyse {
    background: #4d85d1;
  }
  
  .post-category-Algorithm {
    background: #FF0033;
  }
  
  .post-category-MongoDB {
    background: #8156a7;
  }
  
  .post-category-JavaScript {
    background: maroon;
  }
  
  .post-category-GameJs {
    background: #df2d4f;
  }
  
  .post-category-NodeJs {
    background: #33CC33;
  }
  
  .post-category-Linux {
    background: #df6659;
  }
  
  .post-category-AngularJs {
    background: peru;
  }
  
  .post-category-React {
    background: #339999;
  }
  
  .post-category-HTML {
    background: #FF9900;
  }
  
  .post-category-CSS {
    background: #ffc94c;
  }
  
  .post-category-Canvas {
    background: #64448f;
  }
  
  .post-category-Git {
    background: #3498DB;
  }
  
  .post-category-Interview {
    background: #3755ad;
  }

</style>
