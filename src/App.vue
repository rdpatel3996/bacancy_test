<template>
  <div id="app"> 
    <b-container>
      <b-row class="justify-content-md-center">
        <router-link to="/">Home</router-link>
      </b-row>
      <b-row class="justify-content-md-center">
        <b-col>
          <router-view></router-view>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>

export default {
  name: 'app',
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
