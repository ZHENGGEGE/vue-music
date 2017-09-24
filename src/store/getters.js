/**
 * Created by suzheng on 17/7/7.
 */
export const singer = state => state.singer

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playList = state => state.playList

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentlyIndex = state => state.currentlyIndex

export const currentlySong = (state) => {
    return state.playList[state.currentlyIndex] || {}
}


