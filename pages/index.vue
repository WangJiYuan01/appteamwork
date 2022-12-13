<template>
  <v-container>
    <v-row>
      <v-col class="col my-2">
        <v-btn
          style="height: 150px;background-color: #85C1E9; width: 100%;"
          elevation="2"
          to="/purchaseOrder"
        >
          <h2>Purchase<br/>Order</h2>
        </v-btn>
      </v-col>
      <v-col class="col my-2">
        <v-btn
          style="height: 150px;background-color: #BB8FCE; width: 100%;"
          elevation="2"
          to="/order"
        >
          <v-icon>mdi-package-variant-closed</v-icon>
          <h2>Order</h2>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="col my-2">
        <v-btn
          style="height: 150px;background-color: #F7DC6F; width: 100%;"
          elevation="2"
          to="/return"
        >
          <v-icon left>
            mdi-truck-delivery-outline
          </v-icon>
          <h2>Return</h2>
        </v-btn>
      </v-col>
      
      <v-col class="col my-2">
        <v-btn
          style="height: 150px;background-color: #DC7633; width: 100%;"
          elevation="2"
          to="/storage"
        >
          <v-icon left>
            mdi-tag-arrow-down
          </v-icon>
          <h2>Storage</h2>
        </v-btn>
      </v-col>
    </v-row>
    <!-- <v-row>
      <v-col class="col my-2">
        <v-btn
          style="height: 150px;background-color: orange; width: 100%;"
          elevation="2"
          to="bar-codes"
        >
          <v-icon left>mdi-format-list-bulleted-square</v-icon>
          <h2>Barcodes</h2>
        </v-btn>
      </v-col>
      <v-col class="col">
      </v-col>
    </v-row> -->
  </v-container>
</template>

<script>
export default {

}
</script>

<style scoped>
  .col{
    height: 150px;
    text-align: center;
    line-height: 150px;
  }

  .colBtn{
    height: 150px;
    background-color: orange; 
    width: 100%;
  }

</style>