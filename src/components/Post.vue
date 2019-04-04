<template>
  <div>
    <b-alert variant="danger" :show="err !== undefined" dismissible fade>{{ err }}</b-alert>
    <div v-if="isPostLoaded()">
      <b-card class="post-card" align="center">

        <h3 class="post-title">{{localPost.title}}</h3>
        
        <br>
        <b-row align-h="center">
          <b-col lg="10">
            {{localPost.body}}
          </b-col>
        </b-row>
        
        <br>   
        <b-row>
          <b-col lg="4" offset-lg="8" class="user-name">
            <router-link :to="{name: 'user', params: { userId:`${localPost.userId}`, user: localUser }}">
              <ins>@{{localUser.username}}({{ localUser.name }})</ins>
            </router-link>
          </b-col>
        </b-row>

        <b-row align-h="center">
          <b-col lg="11">
            <div style="text-align:left" v-for="comment in comments" :key="comment.id">
              <hr/>
              {{comment.body}}
            </div>
            <hr/>
          </b-col>
        </b-row>
      
      </b-card>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import postService from '../services/posts'
import _ from 'lodash'
export default {
  name: 'Post',
  props: {
    postId: {
        type: String,
        required: true
    },
    post : {
      type: Object,
      required: false,
      default: () => {return {}}
    },
    user: {
      type: Object,
      required: false,
      default: () => {return {}}
    }
  },
  data() {
    return {
      localPost: _.cloneDeep(this.post),
      localUser: _.cloneDeep(this.user),
      comments: {},
      err: undefined
    }
  },
  created() {
    if (!this.isPostLoaded()) {
      postService.getPost(this.postId)
        .then((postRes) => {
          this.localPost = postRes.data
          if (!this.isUserLoaded()) {
            return postService.getUser(this.localPost.userId)
          }
        })
        .then((userRes) => {
          this.localUser = userRes.data
        })
        .catch((err) => {
          console.log(err)
          if (err.message) {
            this.err = err.message
          } else {
            this.err = 'Something went wrong'
          }
        })
    }
    postService.getCommentsForPost(this.postId)
      .then((commentsRes) => {
        this.comments = commentsRes.data
      })
      .catch((err) => console.log(err))
  },
  methods: {
    isPostLoaded() {
      return !_.isEmpty(this.localPost)
    },
    isUserLoaded() {
      return !_.isEmpty(this.localUser)
    },
    isCommentsLoaded() {
      return !_.isEmpty(this.comments)
    }
  }
}
</script>

<style scoped>
.post-card {
  margin-top: 10px;
}

.post-title {
  font-weight: bold;
}
.user-name {
  font-weight: bold;
  text-align: right;
}
</style>
