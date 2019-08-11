<template>
  <div>
    <h4>Register</h4>
    <form @submit.prevent="register">
      <label for="first_name">Fist Name</label>
      <div>
        <input id="first_name" type="text" v-model="first_name" required autofocus />
      </div>

      <label for="last_name">Last Name</label>
      <div>
        <input id="last_name" type="text" v-model="last_name" required autofocus />
      </div>

      <label for="last_name">Username</label>
      <div>
        <input id="username" type="text" v-model="username" required autofocus />
      </div>

      <label for="email">E-Mail Address</label>
      <div>
        <input id="email" type="email" v-model="email" required />
      </div>

      <label for="password">Password</label>
      <div>
        <input id="password" type="password" v-model="password" required />
      </div>

      <label for="password-confirm">Confirm Password</label>
      <div>
        <input
          id="password-confirm"
          type="password"
          v-model="password_confirmation"
          required
        />
      </div>

      <div>
        <button type="submit">Register</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    };
  },
  methods: {
    register: function() {
      let data = {
        first_name: this.first_name,
        last_name: this.last_name,
        username: this.username,
        email: this.email,
        password: this.password,
      };
      console.log(data)
       this.$http
        .post("http://localhost:8000/users/", data)
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
    }
  }
};
</script>
