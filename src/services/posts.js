/* eslint-disable */
import axios from 'axios'
import _ from 'lodash'

class PostsService {

  getUser(id) {
    return axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
  }
  
  getPosts() {
    return axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5")
      .then((res) => {
        let posts = res.data
        let uniqueUserIds = _(posts)
          .map((post) => {
            return post.userId
          })
          .uniq()
          .value()
        return axios.all(_.map(uniqueUserIds, (userId) => {
          return this.getUser(userId)
        }))
          .then((userRes) => {
            let users = {}
            _.map(userRes, (user) => {
              users[user.data.id] = user.data
            })
            return {
              posts,
              users
            }
          })
      })
  }
}

export default new PostsService();