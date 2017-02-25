import Vue from 'vue'
import Router from 'vue-router'
import About from 'components/About'
import NoteList from 'components/note/Index'
import NoteShow from 'components/note/Show'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'NoteList',
    component: NoteList
  }, {
    path: '/about',
    name: 'About',
    component: About,
    beforeEnter: (to, from, next) => {
      next()
    }
  }, {
    path: '/note/:alias',
    name: 'NoteShow',
    component: NoteShow
  }]
})
