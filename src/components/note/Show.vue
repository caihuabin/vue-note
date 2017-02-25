<template>
  <div class="container">
    <section class="blog-content" v-if="note">
      <header class="blog-content-header pure-g">
        <div class="pure-u-2-3">
          <h2 class="blog-content-title">{{note.title}}</h2>
          <p class="blog-content-subtitle">By
            <router-link to="/" class="blog-author">{{note.user.username}}</router-link>
            under
            <router-link v-for="category, key of note.categoryList" v-bind:class="'post-category post-category-' + category" v-bind:to="'/?category=' + category">{{category}}</router-link>
            at
            <span>{{note.createdTime}}</span>
          </p>
          <p class="blog-content-source" v-if="!!note.source">
            From
            <a v-bind:href="note.url" target="_blank">{{note.source}}</a>
          </p>
        </div>
        <div class="blog-content-controls pure-u-1-3">
          <button class="secondary-button pure-button button-small" scroll-into="commentText" v-on:click="scrollInto">Reply {{note.commentCount}}</button>
          <button class="secondary-button pure-button button-small">View {{note.viewCount}}</button>
          <button class="secondary-button pure-button button-small" v-on:click="voteTo">Vote {{note.voteCount}}</button>
        </div>
      </header>
      <section class="blog-content-body">
        <div class="blog">
          <p class="blog-summary">{{note.summary}}</p>
          <div class="markdown-content" mark-down v-html="previewContent"></div>
        </div>
      </section>
      <footer class="blog-content-footer">
        <header class="blog-comment-header"></header>
        <section class="blog-comment-content">
          <transition-group name="animate-pop-up">
            <div class="cell" v-for="comment, key of note.commentList" v-bind:key="comment.id">
              <div class="comment-box">
                <div class="avatar">
                  <a>
                    <img alt="" v-bind:src="comment.user.avatar">
                  </a>
                </div>
                <div class="detail">
                  <div class="comment-content typo">
                    {{comment.content}}
                  </div>
                  <div class="comment-info">
                    <span class="info-item">
                        <i class="icon-user"></i>
                        <a v-bind:href="'/user/' + comment.user._id">{{comment.user.username}}</a> 
                    </span>
                    <span class="info-item">
                      <i class="icon-clock"></i>
                      <span>{{comment.createdTime}}</span>
                    </span>
                    <span class="pull-right action tooltipped tooltipped-n" aria-label="Reply">
                      <i class="icon-comment-1"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </transition-group>
          <div class="cell">
            <form action="" class="pure-form pure-form-stacked" method="post" name="commentForm" novalidate>
              <textarea name="content" id="commentText" cols="30" rows="6" class="pure-input-1" placeholder="submit the comment" disabled></textarea>
              <input type="submit" class="pure-button pure-button-primary" value="Reply" disabled>
            </form>
          </div>
        </section>
      </footer>
    </section>
  </div>
</template>
<script>
  import Utility from '../../config/Utility'
  import marked from '../../../static/javascripts/vendor/marked.min.js'
  export default {
    name: 'note-show',
    created: function () {
      this.fetch()
    },
    props: {
      currentLanguage: String
    },
    data: function () {
      return {
        note: null,
        previewContent: ''
      }
    },
    watch: {
      currentLanguage: function (val) {
        this.fetch()
      }
    },
    methods: {
      fetch: function () {
        let urlParams = {}
        if (this.currentLanguage === 'en-US') {
          urlParams.url = Utility.getAction('enUS', 'note') + this.$route.params.alias + '.json'
        } else {
          urlParams.url = Utility.getAction('zhCN', 'note') + this.$route.params.alias + '.json'
        }
        let start = async() => {
          let result = await Utility.requestPromise(urlParams)
          this.note = result
          let renderer = new marked.Renderer()
          renderer.heading = function (text, level) {
            return '<h' + level + '>' + text + '</h' + level + '>'
          }
          this.previewContent = marked(this.note.content, {
            sanitize: true,
            renderer: renderer
          })
        }
        start()
      },
      scrollInto: function () {},
      voteTo: function () {}
    },
    directives: {
      markDown: {}
    }
  }

</script>
<style>


</style>
