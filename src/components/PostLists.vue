<template>
  <div>
    <div>
      <b-card class="post-card" align="center" v-for="post in posts" :key="post.id">
        
        <b-card-title class="post-title">
          <router-link :to="{name: 'post', params:{postId: `${post.id}`, user: users[post.userId], post}}">
          <ins>{{ post.title }}</ins>
          </router-link>
        </b-card-title>
        
        <b-row align-h="center">
          <b-col lg="8">
            <div class="post-body">{{ post.body }}</div>
          </b-col>
        </b-row>

        <br>
        <b-row>
          <b-col lg="4" offset-lg="8" class="user-name">
            <router-link :to="{name: 'user', params: { userId:`${post.userId}`, user: users[post.userId] }}">
              <ins>@{{users[post.userId].username}}({{ users[post.userId].name }})</ins>
            </router-link>
          </b-col>
        </b-row>

      </b-card>

    </div>
  </div>
</template>

<script>
/* eslint-disable */
import postService from '../services/posts'

export default {
  name: 'PostLists',
  data() {
    return {
      posts: [],
      users: {},
    }
  },
  created() {
      postService.getPosts()
        .then((res) => {
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

.post-card {
  margin-top: 10px;
  margin-bottom: 10px;
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
