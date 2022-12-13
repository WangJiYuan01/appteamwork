<template>
  
  <v-container>
      <validation-observer
        ref="observer"
        v-slot="{ invalid }"
      >
      <div style="padding: 10px 0px;background-color: lightgray; font-size: 20px; text-align: center; "><b>Storage</b></div><br/>
      <v-row>
        <v-col cols="12" sm="12" md="12" lg="12">
          <v-row>
            <v-col>
              <v-btn color="orange" to="/"><h3>Back</h3></v-btn>
            </v-col>
            <v-col>
              <h2>Date: {{$moment().format("DD MMM YYYY")}}</h2><br/>
            </v-col>
          </v-row><br/>
          <v-autocomplete 
            v-model="userId" 
            :items="users" 
            :loading="$apollo.queries.users.loading" 
            outlined
            label="Customer" 
            clearable
          />
          <v-autocomplete 
            v-model="selectedPo"
            :items="purchaseOrders"
            :disabled="!userId"
            :loading="$apollo.queries.categories.loading"
            outlined
            label="Purchase Orders" 
            clearable
          />
          <validation-provider rules="required" v-slot="{ errors }">
            <v-autocomplete 
              v-model="selectedTag"
              :items="billingProfile"
              :disabled="!userId"
              outlined
              label="Activity" 
              :error-messages="errors"
              clearable
            />
          </validation-provider>
          <validation-provider rules="required" v-slot="{ errors }">
          <v-text-field
            v-model="quantity"
            :error-messages="errors"
            label="Quantity"
            outlined
            :disabled="!userId"
            type="number"
          />
          </validation-provider>
          <div style="text-align: center">
            <v-btn @click="update" color="primary" large :disabled="invalid"><h3>Attach</h3></v-btn>
          </div>
        </v-col>
      </v-row>
      </validation-observer>
      <v-overlay :value="overlay">
        <div v-if="loading">
          <v-progress-circular
            indeterminate
            size="64"
          ></v-progress-circular>
        </div>
        <div v-else-if="resErr">
          <v-icon size="60" color="red">mdi-close-octagon-outline </v-icon>
        </div>
        <div v-else>
          <v-icon size="60" color="white ">mdi-check-outline</v-icon>
          <h2>Saved!</h2>
        </div>
    </v-overlay>
  </v-container>
</template>
<script>
  import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
  import { required } from 'vee-validate/dist/rules';

  extend('required', {
    ...required,
    message: 'This field is required'
  });

  export default {
    components: {
      ValidationProvider,
      ValidationObserver,
    },
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
                  .map(i => ({text:`${i.profile.sellerCode} - ${i.profile.companyName}`,value:i._id}))
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
              id: this.userId || '',
              filter: filters,
            }
          },
          update(data) {
            if(!this.userId) return
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
      purchaseOrders() {
        return {
          query: require('@/graphql/purchase-orders').default,
          pollInterval: false,
          skip: true,
          variables() {
            let filters = {
              _operators: {},
              userId: this.userId,
            };
            return {
              // id: this.userId || '',
              filter: filters,
            }
          },
          update(data) {
            if(!this.userId) return
            // return data.user.profile.billingProfile.categories.map(i => {
            //     let cat = this.getCategory(i.tag,this.categories);
            //     return {text:`${cat.tag} - ${cat.name}`,value:i.tag,disabled:!i.enabled,};
            //   }).sort((a, b) => a.text.localeCompare(b.text))
            console.log(data)
            return data.purchaseOrders.map(po=>{
              return {text:`${po.poInternal} - ${po.poCustomer}`,value:po.poInternal};
            })
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
      userId:{
        handler(newUserId) {
          this.selectedPo = null;
          this.selectedTag = null;
          this.quantity = 0;
          newUserId && this.$apollo.queries.billingProfile.start();
          newUserId && this.$apollo.queries.purchaseOrders.start();
        }
      }
    },
    computed:{
      invoiceWeek(){
          let currentWeek = this.$moment().format('W')
          const currentDay = this.$moment().day()
  
          console.log(currentWeek)
  
          if(currentDay > 3 || currentDay === 0 ){
            return parseInt(currentWeek) + 1
          }else{
            return currentWeek
          }
        }
    },
    methods:{
      getCategory (tag,categories) {
          return categories.find(i => i.tag == tag)
      },
      resetForm(){
        this.selectedPo = null
        this.selectedTag = null
        this.quantity = 0
        this.$refs.observer.reset()
      },
      async update() {

        this.$refs.observer.validate().then(async success => {

          if (!success) return

          this.overlay=true;

          this.loading=true;

          const rawData = [
            {
              userId: this.userId,
              // createdBy: this.$store.getters.user._id,
              createdBy: '61a41c6f3fd6afe5d34dcc9b',
              tagName: this.selectedTag,
              count: this.quantity,
              year: this.year ? this.year : this.$moment().format("YYYY"),
              week: this.invoiceWeek,
              purchaseOrderId: this.selectedPo,
              comment: 'handheld recorded'
            }
          ]

          this.$axios.post('/api/add-mst', rawData)
            .then((res) => {
                console.log(res.data)
                if(res.status === 200){

                  if(res.data.error){

                    this.loading = false
                    this.resErr = true
                    setTimeout(()=>{
                      this.overlay = false
                    }, 1500)

                  }else{
                    this.resetForm()
                    this.loading = false
                    setTimeout(()=>{
                      this.overlay = false
                    }, 1500)
                  }
                }else{

                  this.loading = false
                  this.resErr = true
                }
            })
            .catch((error) => {

              console.log(error)
              this.resetForm()
              this.loading = false

            }).finally(() => {
              setTimeout(()=>{
                this.overlay = false
              }, 1000)
              this.loading = false
              this.resErr = false
            });

          this.$nextTick(() => {
            this.$refs.observer.reset();
          });

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
        // activityItems: [
        //   {text: 'a', value: 'a'},
        //   {text: 'b', value: 'b'},
        //   {text: 'c', value: 'c'},
        //   {text: 'd', value: 'd'},
        // ],
        userId: null,
        billingProfile: [],
        users: [],
        categories: [],
        quantity: 0,
        selectedPo: null,
        selectedTag: null,
        overlay: false,
        loading: true,
        resErr: false,
      }
    }
  }

</script>
