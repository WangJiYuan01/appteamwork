<template>
  <v-container fill-height fluid class="grey lighten-3 login-bgjpg">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" lg="3">
        <v-card elevation="15" height="300" :disabled="loading">
          <v-row justify="center" align="center" class="fill-height">
            <v-col cols="12" sm="12" md="8" lg="12">
              <v-img width="90" class="mx-4" position="center center" :src="logo"></v-img>
               <span class="px-4">Warehouse Plus</span>
              <v-form @submit.prevent="login">
                <v-card-text>
                  <v-text-field :error-messages="errors.username" v-model="user.username" dense filled outlined label="Username" />
                  <v-text-field :error-messages="errors.password" v-model="user.password" type="password" dense filled outlined label="Password" />
                  <v-btn :loading="loading" depressed block type="submit" color="primary">Login</v-btn>
                  <v-btn small text nuxt to="/forgot-password" color="primary"> Forgot Password</v-btn>
                </v-card-text>
              </v-form>
            </v-col>
          </v-row>
          <v-card-text>
            <v-subheader class="overline">© Copyright {{$moment().format("YYYY")}} CSG3PL Warehouse Plus v1.1</v-subheader>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  export default {
    layout: 'guest',
    data() {
      return {
      logo:require("@/assets/images/csg-3pl-logo-1.png"),
        loading: false,
        user: {
          username: "",
          password: "",
        },
        errors:{}
      }
    },
    methods: {
      async login() {
        this.loading = true;
        this.errors = {}
        await this.$store.dispatch("auth/login", this.user)
          .then(res => {
            if (['super_admin','admin','warehouse'].includes(res.data.data.user.type)) this.$router.push("/");
          })
          .catch(err => {
            if(err.response && err.response.status == 422) this.errors = err.response.data.errors;
            if(err.response && err.response.status == 422 && err.response.data.errorMessage) this.errors.password = err.response.data.errorMessage;
          })
          .finally(() => this.loading = false)
      }
    }
  }

</script>
<style>
  .login-bgjpg {
    background-image: url("@/assets/images/archive-g79beeaa43_1920.jpg");
  }

  .background {
    filter: blur(4px);
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }

  .foreground {
    backdrop-filter: blur(25px);
    border-radius: 5px;
    padding: 10px;
  }

  /* No .wrapper needed! */

  .blurred {
    backdrop-filter: blur(8px);
  }

</style>