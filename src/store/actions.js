/**
 * Created by suzheng on 17/7/7.
 */

import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'

function findIndex(list,song){
    return list.findIndex((item) => {
        return item.id === song.id
    })
}

export const selectPlay = (({commit,state},{list,index}) => {
    commit(types.SET_SEQUENCE_LIST,list)
    if(state.mode === playMode.random){
        let randomList = shuffle(list)
        commit(types.SET_PLAYLIST,randomList)
        index = findIndex(randomList,list[index])
    }else{
        commit(types.SET_PLAYLIST,list)
    } 
    commit(types.SET_CURRENT_INDEX,index)
    commit(types.SET_FULL_SCREEN,true)   
    commit(types.SET_PLAYING_STATE,true)
})

export const randomPlay = (({commit},{list}) => {
    commit(types.SET_PLAY_MODE,playMode.random)
    commit(types.SET_SEQUENCE_LIST,list)
    const randomList = shuffle(list)
    commit(types.SET_PLAYLIST,randomList)
    commit(types.SET_CURRENT_INDEX,0)
    commit(types.SET_FULL_SCREEN,true)   
    commit(types.SET_PLAYING_STATE,true)
})