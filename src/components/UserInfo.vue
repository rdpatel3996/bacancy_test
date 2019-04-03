<template>
  <div v-if="isUserLoaded()" class="panel panel-default">
    <h4>@{{localUser.username}}</h4>
    <h2>{{localUser.name}}</h2>
    <div>{{localUser.email}}</div>
    <div>{{localUser.address.street}}, {{localUser.address.suite}}, {{localUser.address.city}}, {{localUser.address.zipcode}}</div>
    <div>{{localUser.phone}}</div>
    <div>{{localUser.website}}</div>
    <div>{{localUser.company.name}}</div>
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
      localUser: _.cloneDeep(this.user)
    }
  },
  created() {
    if (!this.isUserLoaded()) {
      postService.getUser(this.userId)
        .then((userRes) => {
          this.localUser = userRes.data;
        })
        .catch((err) => console.log(err))
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
.username {
  font-weight: bold;
}
</style>
