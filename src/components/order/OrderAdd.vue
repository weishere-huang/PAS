<template>
    <div>
        <p>{{msg}}</p>
        <button @click="clickMsg">launch</button>
    </div>
</template>

<script>
export default {
  name: 'orderAdd',
  data () {
    return {
      msg: 'Welcome to Your OrderAdd'
    }
  },
  methods:{
      clickMsg(){
          this.msg='I had change OrderAdd';
      }
  }
}
</script>