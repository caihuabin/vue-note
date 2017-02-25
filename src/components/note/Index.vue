<template>
  <div class="container" v-loadMore>
    <div class="posts-controls">
      <form class="pure-form search-group" v-on:submit.prevent="search" novalidate>
        <input id="q" name="q" type="search" class="pure-input-rounded search-input" autocomplete="off" tabindex="-1" maxlength="50"
          v-model="searchJson.searchText" placeholder="Search"><button type="submit" class="secondary-button pure-button search-button"><span class="icon-search"></span></button>
      </form>
    </div>
    <transition-group name="animate-pop-up">
      <div class="posts" v-for='note in noteList' v-bind:key="note.alias">
        <h1 class="content-subhead"><span class="icon-calendar"></span> {{note.createdTime}}</h1>
        <section class="post">
          <header class="post-header">
            <img class="post-avatar" alt="Icyse&#x27;s avatar" height="48" width="48" src="/static/images/avatar.ico">
            <h2 class="post-title">
              <router-link v-bind:to="'/note/' + note.alias">{{note.title}}</router-link>
            </h2>
            <p class="post-meta">
              By
              <router-link to="/" class="post-author">Icyse</router-link> under
              <router-link v-for="category in note.categoryList" v-bind:to="'/?category=' + category" v-bind:class="'post-category post-category-' + category">{{category}}</router-link>
            </p>
          </header>
          <div class="post-description">
            <p class="ellipsis" style="-webkit-box-orient: vertical;">{{note.summary}}</p>
            <div class="post-images pure-g" v-if="note.imgList.length">
              <div class="pure-u-1 pure-u-md-1-3" v-for="img in note.imgList">
                <a href="">
                  <img v-bind:alt="img.alt" class="pure-img-responsive hover" v-bind:src="img.src">
                </a>
                <div class="post-image-meta">
                  <h3>{{img.title}}</h3>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </transition-group>
  </div>
</template>
<script>
  import Utility from '../../config/Utility'
  import NProgress from '../../../static/javascripts/vendor/nprogress.js'
  import throttle from 'lodash.throttle'
  export default {
    name: 'note-list',
    created: function () {
      let searchJson = Utility.getSearchJson()
      this.searchJson.category = searchJson.category || ''
      this.searchJson.searchText = searchJson.searchText || ''
      this.searchJson.orderBy = searchJson.orderBy || 'createdTime'
      this.searchJson.start = searchJson.start || 0
      this.searchJson.limit = searchJson.limit || 5
      this.fetch()
    },
    props: {
      currentLanguage: String
    },
    data: function () {
      return {
        searchJson: {
          category: '',
          searchText: '',
          orderBy: 'createdTime',
          start: 0,
          limit: 5
        },
        noteList: []
      }
    },
    watch: {
      '$route' (to, from) {
        let searchJson = Utility.getSearchJson()
        this.searchJson.category = searchJson.category || ''
        this.searchJson.searchText = searchJson.searchText || ''
        this.searchJson.orderBy = searchJson.orderBy || 'createdTime'
        this.searchJson.start = searchJson.start || 0
        this.searchJson.limit = searchJson.limit || 5
        this.fetch()
      },
      currentLanguage: function (val) {
        this.fetch()
      }
    },
    methods: {
      search: function () {
        this.$router.push({
          path: '/',
          query: {
            searchText: this.searchJson.searchText
          }
        })
      },
      fetch: function (callback) {
        let urlParams = {}
        if (this.currentLanguage === 'en-US') {
          urlParams.url = Utility.getAction('enUS', 'noteList')
        } else {
          urlParams.url = Utility.getAction('zhCN', 'noteList')
        }
        let start = async() => {
          let result = await Utility.requestPromise(urlParams)
          result = Utility.filters.categoryFilter(result, this.searchJson.category)
          result = Utility.filters.searchFilter(result, this.searchJson.searchText)
          result = Utility.filters.orderFilter(result, this.searchJson.orderBy)
          callback && callback()
          result = Utility.filters.paginationFilter(result, this.searchJson.start, this.searchJson.limit)
          this.noteList = result
        }
        start()
      },
      bindScroll: throttle(function () {
        let callback = function () {
          this.searchJson.limit += 3
          NProgress.done()
          window.addEventListener('scroll', this.bindScroll)
        }
        if (Utility.isScrollToBottom()) {
          NProgress.start()
          window.removeEventListener('scroll', this.bindScroll)
          this.fetch(callback.bind(this))
        }
      }, 100)
    },
    directives: {
      loadMore: {
        bind (el, binding, vnode) {
          window.addEventListener('scroll', vnode.context.bindScroll)
        }
      }
    },
    beforeRouteLeave (to, from, next) {
      window.removeEventListener('scroll', this.bindScroll)
      next()
    }
  }

</script>
<style>
</style>
