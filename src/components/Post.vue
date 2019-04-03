<template>
  <div v-if="isPostLoaded()">
    <b-card align="center">
      <h2>{{localPost.title}}</h2>
      <b-row align-h="center">
        <b-col lg="10">
          {{localPost.body}}
        </b-col>
      </b-row>
      <div clss="user-name">
        <router-link :to="{name: 'user', params: { userId:`${localPost.userId}`, user: localUser }}">
          @{{localUser.username}}({{ localUser.name }})
        </router-link>
      </div>
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
      comments: {}
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
        .catch((err) => console.log(err))
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
.username {
  font-weight: bold;
}
</style>
