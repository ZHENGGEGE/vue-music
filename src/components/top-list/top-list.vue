<template>
  <transition name="slide">
    <music-list :title="title" :bgImage="bgImage" :songs="songs" :rank="rank"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import {ERR_OK} from 'api/config'
  import {mapGetters} from 'vuex'
  import {getMusicList} from 'api/rank'
  import {createSong} from 'common/js/song'

  

  export default {
    data(){
      return {
        songs : [],
        rank : true
      }
    },
    created(){
      this._getMusicList()
    },
    computed : {
      title(){
        return this.topList.topTitle      
      },
      bgImage(){
        if(this.songs.length){
          return this.songs[0].image
        }
        return ''
      },
       ...mapGetters([
         'topList'
      ])
    },
    methods:{
      _getMusicList(){
        if(!this.topList.id){
          this.$router.push({
            path : '/rank'
          })
          return
        }
        getMusicList(this.topList.id).then((res) => {
          if(res.code === ERR_OK){
            this.songs = this._normalizeSongs(res.songlist)
          }
        })
      },
      _normalizeSongs(list){
        let ret = []
        list.forEach((item) => {
          const musicData = item.data
          if(musicData.songid&&musicData.albumid){
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    },
    components: {
      MusicList
    }
    
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease
  .slide-enter,.slide-leave-to
    transform:translate3d(100%, 0, 0)
</style>





