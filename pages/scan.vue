<template>
  <v-container>
      <v-row>
        <v-col cols="12" sm="12" md="12" lg="12">
          <v-row>
            <v-col>
              <v-btn color="orange" to="/"><b>Back</b></v-btn>
            </v-col>
            <v-col>
              <h2>Date: {{$moment().format("DD MMM YYYY")}}</h2><br/>
            </v-col>
          </v-row><br/>
          <v-autocomplete 
            v-model="selected" 
            :items="users" 
            :loading="$apollo.queries.users.loading" 
            dense
            outlined
            label="Customer" 
          />
          <v-autocomplete 
            v-model="activity"
            :items="billingProfile"
            :disabled="!selected"
            :loading="$apollo.queries.categories.loading"
            dense
            outlined
            label="Activity" 
          />
          <v-text-field
            v-model="quantity"
            :items="billingProfile"
            label="Quantity"
            outlined dense
            :disabled="!selected"
            type="number"
          />
          <v-btn @click="update" color="primary" block depressed>Attach</v-btn>
        </v-col>
      </v-row>
  </v-container>
</template>
<script>
  export default {
    apollo: {
      categories: {
        loadingKey: 'categoriesLoading',
        query: require('@/graphql/billing.categories.all').default,
        update (data) {
          return data.categories
        },        
        variables() {
          return {
            filter: {},
            limit: -1,
            sort: "NAME_ASC"
          }
        },
      },
      users: {
        pollInterval: false,
        query() {
          return this.query
        },
        update (data) {

          return data.userMany
                  .map(i => ({text:`${i.profile.sellerCode} - ${i.fullName}`,value:i._id}))
                  .sort((a, b) => a.text.localeCompare(b.text))

        },        
        variables() {
          return {
            filter: {
              "type": "user"
            }
          }
        },
      },
      billingProfile() {
        return {
          query: require('@/graphql/user.profile').default,
          pollInterval: false,
          skip: true,
          variables() {
            let filters = {
              _operators: {},
            };
            return {
              id: this.selected,
              filter: filters,
            }
          },
          update(data) {
            return data.user.profile.billingProfile.categories.map(i => {
                let cat = this.getCategory(i.tag,this.categories);
                return {text:`${cat.tag} - ${cat.name}`,value:i.tag,disabled:!i.enabled,};
              }).sort((a, b) => a.text.localeCompare(b.text))
          },
          error(error) {
            this.$store.commit('setError', {
              code: 400,
              error
            });
          },
        }
      },
    },
    watch:{
      selected:{
        handler() {
          this.activity = null;
          this.$apollo.queries.billingProfile.start();
        }
      }
    },
    computed:{
      invoiceWeek(){
        let currentWeek = this.$moment().week()
        const currentDay = this.$moment().day()

        if(currentDay > 3 || currentDay === 0 ){
          return currentWeek + 1
        }else{
          currentWeek
        }
      }
    },
    methods:{
        getCategory (tag,categories) {
            return categories.find(i => i.tag == tag)
        },
      async update() {
            this.loading=true;
              await this.$apollo.mutate({
                  mutation: require('@/graphql/add-transaction').default,
                  variables: {
                    record: {
                        userId: this.selected,
                        createdBy: "61b96427d644cb914fad97b1",
                        tagName: this.activity,
                        count: 1,
                        year: this.$moment().format("YYYY"),
                        week: this.invoiceWeek,
                    },
                  },
                  update: (store, {
                    data: {}
                  }) => {},
                })
                .then((data) => {
                  alert("Updated")
                })
                .catch((error) => {
                    alert(error.message)
                  })
                .finally(() => {
                  this.loading = false;
                })
      }       
    },
    data() {
      return {
        categoriesLoading:false,
        week:this.$moment().format("W"),
        year:this.$moment().format("YYYY"),
        query: require("@/graphql/users").default,
        activity: null,
        selected: null,
        billingProfile: [],
        users: [],
        categories: [],
        quantity: 0
      }
    }
  }

</script>
