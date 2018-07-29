<template>
  <div id="app">
    <img src="./assets/images/logo.png">
    <router-view/>
  </div>
</template>

<script>
  import API from '@/api';

  console.log(API.billPageList({_: 'test'}));
  console.log(API.billPageList.get({_: 'get'}));
  console.log(API.billPageList.post({_: 'post'}));
  console.log(API.billPageList.header({_: 'header'}));
  console.log(API.billPageList.url('url', 123));

  export default {
    name: 'App'
  };
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
