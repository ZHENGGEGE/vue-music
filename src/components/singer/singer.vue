<template>
  <div class="singer">

  </div>
</template>

<script>
  import { getSingerList } from 'api/singer'
  import { ERR_OK } from 'api/config'
  import Singer from 'common/js/singer'

  const HOT_NAME = '热门'
  const HOT_SINGER_LEN = 10

    export default {
      data() {
        return {
          singers: []
        }
      },
      created() {
        this._getSingerList()
      },
      methods: {
        _getSingerList(){
          getSingerList().then((res) => {
              console.log(res.data)
            if (res.code === ERR_OK) {
//              this.singers = this._normalizeSinger(res.data.list)
//              console.log(this.singers)
              this.singers = res.data.list
              console.log(this._normalizeSinger(this.singers))
            }

          })
        },
        _normalizeSinger(list) {
          let map = {
            hot: {
              title: HOT_NAME,
              items: []
            }
          }
          list.forEach((item,index)=>{
            if(index < HOT_SINGER_LEN){
              map.hot.items.push(new Singer({
                  id: item.Fsinger_mid,
                  name: item.Fsinger_name
              })
              )
            }
            const key = item.Findex
            if (!map[key]) {
              map[key] = {
                title: key,
                items: []
              }
            }
            map[key].items.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            }))
          })
          console.log(map)
        }
      }
    }
</script>

<style scoped lang="stylus" >
  .singer
    position: fixed
    width:100%
    top:88px
    bottom:0

</style>
