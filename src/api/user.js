
export const login = ({ username, password, vm }) => {
  const data = {
    username,
    password,
    role: 'teacher'
  }
  vm.$axios.post('api/jwt-token', data)
    .then(rep => {
      if (rep.data && rep.data.token) {
        vm.$store.commit('setToken', rep.data.token)
        vm.$router.push({
          name: vm.$config.homeName
        })
      } else {
        vm.$Message.error(rep.msg)
      }
    })
    .catch(e => {
      vm.$Message.error(e)
    })
}
