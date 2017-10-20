<template>
  <transition name="slide">
      <music-list :title="title" :bgImage="bgImage">

      </music-list>
  </transition>
</template>
<script>
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getSongList} from 'api/recommend'
import {ERR_OK} from 'api/config'

export default {
  components : {
      MusicList
  },
  computed : {
    title(){
      return this.disc.dissname
    },
    bgImage(){
      return this.disc.imgurl
    },
    ...mapGetters([
      'disc'
    ])
  },
  created () {
    this._getSongList()
  },
  methods : {
    _getSongList(){
      getSongList(this.disc.dissid).then((res) => {
        if(res.code === ERR_OK){
          console.log(res.cdlist[0].songlist)
        }
      })     
    }
  }
}
</script>
<style lang="stylus" scoped>
   .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>


