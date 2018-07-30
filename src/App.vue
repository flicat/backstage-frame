<template>
  <div id="app">
    <img src="./assets/images/logo.png">
    <router-view/>
  </div>
</template>

<script>
  import API from '@/api';

  let data = new FormData();
  data.append('name', 123);
  data.append('value', 456);

  API.billPageList({_: 'test'}).then(data => console.dir(data));
  API.billPageList.get({_: 'get'}).then(data => console.dir(data));
  API.billPageList.get(123).then(data => console.dir(data));
  API.billPageList.get(['info', 456]).then(data => console.dir(data));
  API.billPageList.post({_: 'post'}).then(data => console.dir(data));
  API.billPageList.post(data, {type: 'blob', headers: {'Content-Type': 'image/*'}}).then(data => console.dir(data));

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
