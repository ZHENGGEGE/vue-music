import Vue from 'vue'
import Router from 'vue-router'
import Rank from 'components/rank/rank'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path : '/rank',
      component : Rank
    }

  ]
})
