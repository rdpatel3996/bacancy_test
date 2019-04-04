<template>
  <div>
    <b-alert variant="danger" :show="err !== undefined" dismissible fade>{{ err }}</b-alert>
    <div v-if="isUserLoaded()">
      <b-card class="user-card" align="center">
        <h4 class='username'>@{{localUser.username}}</h4>
        <h2 class='name'>{{localUser.name}}</h2>
        <div>{{localUser.email}}</div>
        <div>{{localUser.address.street}}, {{localUser.address.suite}}, {{localUser.address.city}}, {{localUser.address.zipcode}}</div>
        <div>{{localUser.phone}}</div>
        <div>{{localUser.website}}</div>
        <div>{{localUser.company.name}}</div>
      </b-card>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import postService from '../services/posts'
import _ from 'lodash'
export default {
  name: 'UserInfo',
  props: {
    userId: {
      type: String,
      required: true
    },
    user: {
      type: Object,
      required: false,
      default: () => {return {}}
    }
  },
  data() {
    return {
      localUser: _.cloneDeep(this.user),
      err: undefined
    }
  },
  created() {
    if (!this.isUserLoaded()) {
      postService.getUser(this.userId)
        .then((userRes) => {
          this.localUser = userRes.data;
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
  },
  methods: {
    isUserLoaded() {
      return !_.isEmpty(this.localUser)
    }
  }
}
</script>

<style scoped>
.user-card {
  margin-top: 10px;
}
.username {
  font-weight: bold;
}
.name {
  font-weight: bold;
}
</style>
