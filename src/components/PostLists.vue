<template>
  <div>
    <div>
      <div class="post panel panel-default" v-for="post in posts" :key="post.id">
        <div class="post-title panel-body">{{ post.title }}</div>
        <div class="post-body">{{ post.body }}</div>
        <div clss="user-name">{{ users[post.userId].name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import postService from '../services/posts'

export default {
  name: 'HomePage',
  data() {
    return {
      posts: [],
      users: {},
    }
  },
  created() {
      postService.getPosts()
        .then((res) => {
          console.log(res)
          this.posts = res.posts
          this.users = res.users
        })
        .catch(error => console.log(error))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.post-title {
  font-weight: bold
}

.post {
  padding-top: 10px;
  padding-bottom: 10px;
}

.post-body {
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-name {
  text-align: right;
}
</style>
