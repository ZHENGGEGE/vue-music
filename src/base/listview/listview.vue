<template>
    <scroll class="listview"
            :data="data"
            ref="listview"
            :listenScroll="listenScroll"
            :probeType="probeType"
            @scroll="scroll"
    >
        <ul>
          <li v-for="group in data" class="list-group" ref="listGroup">
            <h2 class="list-group-title">{{ group.title }}</h2>
            <ul>
              <li v-for="item in group.items" class="list-group-item">
                <img v-lazy="item.avatar" alt="" class="avatar">
                <span class="name">{{item.name}}</span>
              </li>
            </ul>
          </li>
        </ul>
      <div class="list-shortcut" @touchstart="onShortTouchStart" @touchmove="onShortTouchMove">
        <ul>
          <li v-for="(item,index) in shortcutList"
              class="item"
              :class="{'current':currentIndex===index}"
              :data-index="index">
            {{item}}
          </li>
        </ul>
      </div>
    </scroll>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import { getData } from 'common/js/dom'

  const ANCHOR_HEIGHT = 18

    export default {
      created(){
          this.touch = {}
          this.listenScroll = true
          this.listHeight = []
          this.probeType = 3
      },
        data(){
          return{
            scrollY:-1,
            currentIndex:0
          }

        },
        props: {
            data: {
              type:Array,
              default:[]
            }
        },
        computed: {
          shortcutList(){
              return this.data.map((group)=>{
                  return group.title.substr(0,1)
              })
          }
        },
        methods:{
          onShortTouchStart(e){
            let anchorIndex = getData(e.target,'index')
            let firstTouch = e.touches[0]
            this.touch.y1 = firstTouch.pageY
            this.touch.anchorIndex = anchorIndex
            this._scrollTo(anchorIndex)
          },
          onShortTouchMove(e){
            let firstTouch = e.touches[0]
            this.touch.y2 = firstTouch.pageY
            let delta = (this.touch.y2-this.touch.y1)/ ANCHOR_HEIGHT | 0
            let anchorIndex = parseInt(this.touch.anchorIndex) + delta
            //console.log(anchorIndex)
            this._scrollTo(anchorIndex)
          },
          scroll(pos){
              this.scrollY = pos.y
          },
          _scrollTo(index){
              if(!index && index!==0){
                  return
              }
              //console.log(index)
            if(index < 0){
                  index = 0
            }else if(index > this.listHeight.length - 2){
                index = this.listHeight.length - 2
            }
            this.scrollY = -this.listHeight[index]
            this.$refs.listview.scrollToElement(this.$refs.listGroup[index],0)
          },
          _calculateHeight(){
            this.listHeight = []
            const list = this.$refs.listGroup
            let height = 0
            this.listHeight.push(height)
            for(let i = 0; i < list.length; i++){
                let item = list[i]
              height+= item.clientHeight
              this.listHeight.push(height)
            }
          }
        },
        watch:{
            data() {
                setTimeout(() =>{
                    this._calculateHeight()
                },20)
            },
          scrollY(newY) {
            const listHeight = this.listHeight
            //当滚动到顶部，newY>0
            if(newY>0){
              this.currentIndex = 0
              return
            }
            //在中间部分滚动
            for(let i = 0;i<listHeight.length;i++){
                let height1 = listHeight[i]
                let height2 = listHeight[i+1]
              if (-newY>=height1 &&-newY<height2){
                this.currentIndex = i
                //console.log(this.currentIndex)
                return
              }
            }
            //当滚动到底部，且-newY大于最后一个元素的上限
            this.currentIndex = listHeight.length - 2
          }
        },
        components:{
            Scroll
        }
    }
</script>

<style scoped rel="stylesheet/stylus" lang="stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
