<template>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <form>
                  <v-text-field
                    @keyup.enter="login"
                    v-model="username"
                    :error-messages="usernameErrors"
                    label="Email"
                    name="login"
                    prepend-icon="person"
                    type="text"
                    required
                    @input="$v.username.$touch()"
                    @blur="$v.username.$touch()"
                  ></v-text-field>

                  <v-text-field
                    @keyup.enter="login"
                    v-model="password"
                    :error-messages="passwordErrors"
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    required
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                  ></v-text-field>
                </form>
                <p class="authError" v-if="authError">{{ authError }}</p>
              </v-card-text>
              <v-card-actions>
                <v-btn to="/register" color="primary">Sign up</v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="login" color="success">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    username: { required },
    password: { required },

  },

  data() {
    return {
      username: "",
      password: "",
      authError: "",
    };
  },
  computed: {
    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.required && errors.push("Username is required.");
      return errors;
    },
      passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required.");
      return errors;
    }
  },
  methods: {
    login() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let username = this.username;
        let password = this.password;
        this.$store
          .dispatch("login", { username, password })
          .then(() => this.$router.push("/"))
          .catch(err => this.authError = "Username or password incorrect");
      }
    }
  }
};
</script>
<style>
.authError {
  color: red;
}
</style>