<template>
<v-container>
  <v-row dense>
    <v-col>
      <v-btn color="orange" to="/"><b>Back</b></v-btn>
    </v-col>
    <v-col>
      <v-btn outlined @click="printImg('allBarCode')">Print All Barcode</v-btn>
    </v-col>
  </v-row>
  <v-row dense>
    <v-col>
    </v-col>
    <v-col>
      <v-simple-table dense id="allBarCode" class="table table-sm table-bordered">
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Tag</th>
            <th>Barcode</th>
            <th class="no-print">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(category,index) in categories" :key="index">
            <td>{{category.name}}</td>
            <td>{{category.tag}}</td>
            <td><barcode :id="category.tag" :value="category.tag" format="CODE128" width="1" height="25" margin="0.14" font-size="12">Show this if the rendering fails.</barcode>      </td>
            <td class="no-print"><v-btn small outlined @click="printImg(category.tag)">Print</v-btn></td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import VueBarcode from 'vue-barcode';

  export default {
    name: 'InspirePage',
    components: {
      'barcode': VueBarcode
    },    
    apollo: {
      categories: {
        loadingKey: 'categoriesLoading',
        query: require('@/graphql/billing.categories.all').default,
        update(data) {
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
    },
    methods:{
      async printImg(src) {
        await this.$htmlToPaper(src);
      }
  }
  }

</script>
