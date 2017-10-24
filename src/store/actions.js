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

export const insertSong = function({commit,state},song){
    let playlist = state.playlist.slice()
    let sequenceList = state.sequenceList.slice()
    let currentIndex = state.currentIndex
    //记录当前歌曲
    let currentSong = playlist[currentIndex]
    //查找当前列表中是否有待插入的歌曲，并返回其索引
    let fpIndex = findIndex(playlist,song)
    //因为是插入歌曲，所以索引+1
    currentIndex ++
    //插入这首歌到当前索引位置
    playlist.splice(currentIndex,0,song)
    //如果已经包含了这首歌
    if(fpIndex>-1){
        //当前插入歌曲索引大于列表中索引
        if(currentIndex>fpIndex){
            playlist.splice(fpindex,1)
            currentIndex --
        }else{
            playlist.splice(fpindex+1,1)
        }
    }
    let currentsIndex = findIndex(sequenceList,currentSong) + 1
    let fsIndex = findIndex(sequenceList,song)
    sequenceList.splice(currentsIndex,0,song)
    if(fsIndex > -1){
        if(currentsIndex>fsIndex){
            sequenceList.splice(fsIndex,1)
        }else{
            sequenceList.splice(fsIndex+1,1)
        }
    }
    
    commit(types.SET_PLAYLIST,playlist)
    commit(types.SET_SEQUENCE_LIST,sequenceList)
    commit(types.SET_CURRENT_INDEX,currentIndex)
    commit(types.SET_FULL_SCREEN,true)   
    commit(types.SET_PLAYING_STATE,true)
}