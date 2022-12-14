<template>
  <div>
    <div
      style="
        padding: 10px 0px;
        background-color: rgba(105, 138, 182, 1);
        font-size: 20px;
        color: white;
      "
    >
      <v-icon
        class="my-2"
        style="margin-left: 15px; margin-right: 120px"
        size="30"
        color="white lighten-2"
        >mdi-arrow-left</v-icon
      >
      <b>Create Ticket</b>
    </div>
    <br/>
    <div class="boxone">
      <ValidationObserver ref="observer" slot="{ validate, reset }">
        <form>
          <!-- ticket类型 下拉-->
          <ValidationProvider
            v-slot="{ errors }"
            name="TicketType"
            rules="required"
          >
            <v-select
              v-model="TicketType"
              :items="TicketTypeitems"
              :error-messages="errors"
              label="ticket类型"
              data-vv-name="select"
              height="20"
              required
            ></v-select>
          </ValidationProvider>

          <!-- 产品SKU 文本框-->
          <ValidationProvider
            v-slot="{ errors }"
            name="ProductSKU"
            rules="required|max:10"
          >
            <v-text-field
              v-model="ProductSKU"
              :counter="10"
              :error-messages="errors"
              label="产品SKU"
              height="20"
              required
            ></v-text-field>
          </ValidationProvider>

          <!-- 订单编号 文本框-->
          <ValidationProvider
            v-slot="{ errors }"
            name="OrderID"
            rules="required"
          >
            <v-text-field
              v-model="OrderID"
              :error-messages="errors"
              label="订单编号"
              height="20"
              required
            ></v-text-field>
          </ValidationProvider>

          <!-- 任务类型 下拉-->
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            name="TaskType"
          >
            <v-select
              v-model="TaskType"
              :items="TaskTypeitems"
              :error-messages="errors"
              label="任务类型"
              height="20"
              data-vv-name="select"
              required
            ></v-select>
          </ValidationProvider>

          <!-- 预估时间 文本框-->
          <ValidationProvider
            v-slot="{ errors }"
            name="EstimatedTime"
            rules="required"
          >
            <v-text-field
              v-model="EstimatedTime"
              :error-messages="errors"
              label="预估时间"
              height="20"
              required
            ></v-text-field>
          </ValidationProvider>

          <!-- 隔断 -->

          <!-- 详情描述 大文本框-->
          <ValidationProvider
            v-slot="{ errors }"
            name="DetailedDescription"
            rules="required"
          >
            <v-textarea
              :error-messages="errors"
              label="详情描述"
              v-model="DetailedDescription"
              height="100"
              placeholder="请描述您遇到的问题，以便我们及时为您提供帮助"
            ></v-textarea>
          </ValidationProvider>

          <!-- 文件上传 -->
          <ValidationProvider
            v-slot="{ errors }"
            name="DetailedDescription"
            rules="required"
          >
            <v-file-input
              :error-messages="errors"
              label="文件上传"
              v-model="Fileinfo"
              prepend-icon="mdi-file-upload-outline"
            >
              </v-file-input>
          </ValidationProvider>

          <!-- 发生时间 -->
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="发生时间"
                height="20"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(date)"
                >OK</v-btn
              >
            </v-date-picker>
          </v-menu>

          <!-- 紧急程度 下拉 -->
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            name="Urgency"
          >
            <v-select
              v-model="Urgency"
              :items="Urgencyitems"
              :error-messages="errors"
              label="紧急程度"
              height="20"
              data-vv-name="select"
              required
            ></v-select>
          </ValidationProvider>

          <!-- 提交人 文本框 -->
          <ValidationProvider
            v-slot="{ errors }"
            name="submitter"
            rules="required"
          >
            <v-text-field
              v-model="submitter"
              :error-messages="errors"
              label="提交人"
              height="20"
              required
            ></v-text-field>
          </ValidationProvider>

          <v-btn class="mr-4" @click="submit">Submit</v-btn>
          <v-btn @click="clear">Reset</v-btn>
        </form>
      </ValidationObserver>
    </div>
    <!-- icon用法 -->
    <!-- <v-icon class="my-6" size="30" color="red lighten-2">mdi-logout</v-icon> -->
  </div>
</template>

<script>
import { required, email, max } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

// 非空提醒
extend("required", {
  ...required,
  message: "{_field_} can not be empty !",
});
// 超长提醒
extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters !",
});
// email验证
extend("email", {
  ...email,
  message: "Email must be valid !",
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    TicketType: null,
    TicketTypeitems: ["Item 1", "Item 2", "Item 3", "Item 4"],
    ProductSKU: "",
    OrderID: "",
    TaskType: "",
    TaskTypeitems: ["Item 11", "Item 21", "Item 31", "Item 41"],
    EstimatedTime: "",
    DetailedDescription: "",
    Fileinfo:null,
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    Urgency: "",
    Urgencyitems: ["常规", "紧急", "特急"],
    submitter: "",
  }),

  methods: {
    // 提交数据
    submit() {
      console.log(this);
      this.$refs.observer.validate();
    },
    // 重置数据
    clear() {
      this.TicketType = null;
      this.ProductSKU = "";
      this.OrderID = "";
      this.TaskType = null;
      this.EstimatedTime = "";
      this.DetailedDescription = "";
      this.Fileinfo = null;
      // 发生时间
      this.Urgency = "";
      this.submitter = "";
      this.$refs.observer.reset();
    },
  },
};
</script>

<style scoped>
.boxone {
  width: 90%;
  height: 100%;
  margin: 0 auto;
  /* border: 1px solid saddlebrown; */
}
</style>