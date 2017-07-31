/**
 * Created by suzheng on 17/7/22.
 */
import * as types from './mutation-types'

const mutations = {
  [types.SET_SINGER](state,singer){
    state.singer = singer
  }
}

export default mutations
