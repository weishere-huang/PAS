<template>
    <div>
        <p>{{msg}}</p>
        <button @click="clickMsg">launch</button>
    </div>
</template>

<script>
export default {
  name: 'orderList',
  data () {
    return {
      msg: 'Welcome to Your OrderList'
    }
  },
  methods:{
      clickMsg(){
          this.msg='I had change';
      }
  }
}
</script>