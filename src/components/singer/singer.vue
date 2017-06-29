<template>
  <div class="singer">

  </div>
</template>

<script>
  import { getSingerList } from 'api/singer'
  import { ERR_OK } from 'api/config'

    export default {
      data() {
        singers:[]
      },
      created() {
        this._getSingerList()
      },
      methods:{
        _getSingerList(){
          getSingerList().then((res)=>{
              if(res.code === ERR_OK){
                console.log(res.data);
                this.singers = res.data.list
              }

          })
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
