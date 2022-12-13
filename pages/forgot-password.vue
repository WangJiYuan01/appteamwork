<template>
<v-container fill-height fluid class="grey lighten-3">
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6" lg="3">
      <div class="my-4 text-center">
    <app-logo/>
    </div>
      <v-card :loading="loading" :disabled="loading">
        <v-card-title class="headline primary--text">Forgot Password</v-card-title>
        <v-card-text>
            <v-text-field v-model="user.email" dense outlined  label="Username"/>
        </v-card-text>
        <v-card-actions>
          <v-btn small text nuxt to="/login" color="primary"> Back to Login </v-btn>
          <v-spacer />
          <v-btn depressed color="primary"> Send Reset Email</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</v-container>
</template>
<script>
export default {
    layout:'guest',
    data() {
        return {
            loading:false,
            user:{
                email:"",
            }
        }
    },
    methods:{
      // async resetPassword
    }
}
</script>