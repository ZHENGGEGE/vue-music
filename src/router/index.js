import Vue from 'vue'
import Router from 'vue-router'
import Rank from 'components/rank/rank'
import Search from 'components/search/search'
import Singer from 'components/singer/singer'
import Recommend from 'components/recommend/recommend'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path : '/rank',
      component : Rank
    },
    {
      path : '/search',
      component : Search
    },
    {
      path : '/singer',
      component : Singer
    },
    {
      path : '/recommend',
      component : Recommend
    }
  ]
})
