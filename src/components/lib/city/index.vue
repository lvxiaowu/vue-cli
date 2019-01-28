<template>
    <div></div>
</template>
<script>
import citySelect from './city.js'
export default
{
  name: 'City',
  // destroyed(){
  //   console.log('destroyed')
  // },
  deactivated(){
    // console.log('deactivated')
    $(".dw-trans").remove()
  },
  methods: {
    cityInit(p){
      return citySelect.init(p);
    },
    select(city){
        city.Open()
    }
  }
}
</script>
<style lang="less">
@import "c.less";
</style>