<template>
    <scroll class="suggest" 
            :data="result" 
            :pullup="pullup"
            @scrollToEnd="searchMore"
            ref="suggest"
            :beforeScroll="beforeScroll"
            @beforeScroll="listScroll"
            >
        <ul class="suggest-list">
            <li class="suggest-item" v-for="item in result" @click="selectItem(item)">
                <div class="icon">
                    <i :class="getIconCls(item)"></i>
                </div>
                <div class="name">
                    <p class="text" v-html="getDisplayName(item)"></p>
                </div>
            </li>
            <loading v-show="hasMore" title=""></loading>
        </ul>
        <div class="no-result-wrapper" v-show="!hasMore&&!result.length">
            <no-result title="抱歉,暂无搜索结果"></no-result>
        </div>      
    </scroll>
</template>

<script type="text/ecmascript-6">
import {search} from 'api/search'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import Singer from 'common/js/singer'
import {mapMutations,mapActions} from 'vuex'
import NoResult from 'base/no-result/no-result'

const TYPE_SINGER = 'singer'
const perpage = 20

  export default{
      props : {
          query: {
                type: String,
                default: ''
           },
          showSinger : {
              type : Boolean,
              default : true
          }         
      },
      data(){
          return{
              page : 1,
              pullup : true,
              result : [],
              hasMore : true,
              beforeScroll:true
          }
      },
      methods : {
          search(){
              this.page = 1
              this.hasMore = true
              this.$refs.suggest.scrollTo(0,0)
              search(this.query,this.page,this.showSinger,perpage).then((res) => {
                  console.log(res)
                  if(res.code === ERR_OK){
                     this.result = this._genResult(res.data)
                     this._checkMore(res.data)
                  }
              })
          },
          searchMore(){
              if(!this.hasMore){
                  return
              }
              this.page ++
              search(this.query,this.page,this.showSinger,perpage).then((res) => {
                  if(res.code === ERR_OK){
                      this.result = this.result.concat(this._genResult(res.data))
                      
                      this._checkMore(res.data)
                  }
              })
          },
          selectItem(item){
              //console.log(item)
              if(item.type === TYPE_SINGER){
                  const singer = new Singer({
                      id : item.singermid,
                      name : item.singername
                  })
                  this.$router.push({
                      path : `/search/${singer.id}`
                  })
                  this.setSinger(singer)
              }else{
                  this.insertSong(item)
              }
          },
           ...mapMutations({
             setSinger:'SET_SINGER'
          }),
          ...mapActions([
              'insertSong'
          ]),
          getIconCls(item){
              if(item.type === TYPE_SINGER){
                  return 'icon-mine'
              }else{
                  return 'icon-music'
              }
          },
          _genResult(data){
              let ret = []
            //   if(data.zhida && data.zhida.singerid){
            //       ret.push(...data.zhida,...{type:TYPE_SINGER})
            //       console.log(ret)
            //   }
            //此处出错，es6对象扩展语法不熟练
              if (data.zhida && data.zhida.singerid) {
                ret.push({...data.zhida, ...{type: TYPE_SINGER}})
                console.log(ret)
                }
              if(data.song){
                  ret = ret.concat(this._normalizeSongs(data.song.list))
                  
              }
              return ret
          },
          getDisplayName(item){
              if(item.type === TYPE_SINGER){
                  return item.singername
              }else{
                  return `${item.name}-${item.singer}`
              }
          },
          _normalizeSongs(list){
              let ret = []
              list.forEach((musicData) => {
                  if(musicData.songid&&musicData.albummid){
                      ret.push(createSong(musicData))
                  }
              })
              return ret
          },
          listScroll(){
              this.$emit('listScroll')
          },
          _checkMore(data){
              const song = data.song
              if(!song.list.length||(song.curnum + (song.curpage-1)*perpage)>=song.totalnum){
                  this.hasMore = false
              }
          }
      },
      watch : {
          query(){
              this.search()
          }
      },
      components : {
          Scroll,
          Loading,
          NoResult
      }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>