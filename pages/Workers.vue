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
      <b>Workers</b>
    </div>
    <!-- 三合一 -->
    <div class="mainbox">
      <div class="boxleft box">
        <p>未到岗</p>
        <p>1人</p>
      </div>
      <div class="boxcen box">
        <p>待接单</p>
        <p>2人</p>
      </div>
      <div class="boxright box">
        <p>任务中</p>
        <p>3人</p>
      </div>
    </div>

    <!-- 表单 -->
    <div class="form">
      <v-container class="grey lighten-5">
        <!-- 表头 -->
        <v-row class="mb-4"  no-gutters>
          <v-col>
            <v-card class="pa-2" tile>仓库人员</v-card>
          </v-col>
        </v-row>

        <!-- 表身 -->
        <v-row class="mb-2" no-gutters style="text-align:center">
          <v-col v-for="n in item" :key="n">
            <v-card class="pa-2" tile outlined>{{n}}</v-card>
          </v-col>
        </v-row>

        <!-- 第一行 -->
        <v-row class="mb-1" no-gutters style="text-align:center">
          <v-col v-for="n in items.one" :key="n">
            <v-card class="pa-2" tile outlined >{{n}}</v-card>
          </v-col>
        </v-row>

        <!-- 第二行 -->
        <v-row class="mb-1" no-gutters style="text-align:center">
          <v-col v-for="n in items.two" :key="n">
            <v-card class="pa-2" tile outlined >{{n}}</v-card>
          </v-col>
        </v-row>

        <!-- 第三行 -->
        <v-row class="mb-1" no-gutters style="text-align:center">
          <v-col v-for="n in items.three" :key="n">
            <v-card class="pa-2" tile outlined >{{n}}</v-card>
          </v-col>
        </v-row>

        <!-- 第四行 -->
        <v-row class="mb-1" no-gutters style="text-align:center">
          <v-col v-for="n in items.fore" :key="n">
            <v-card class="pa-2" tile outlined >{{n}}</v-card>
          </v-col>
        </v-row>

        <!-- 第五行 -->
        <v-row class="mb-1" no-gutters style="text-align:center">
          <v-col v-for="n in items.five" :key="n">
            <v-card class="pa-2" tile outlined >{{n}}</v-card>
          </v-col>
        </v-row>

        <!-- 第六行 -->
        <v-row class="mb-1" no-gutters style="text-align:center">
          <v-col v-for="n in items.six" :key="n">
            <v-card class="pa-2" tile outlined >{{n}}</v-card>
          </v-col>
        </v-row>

      </v-container>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            item:["人员","状态","今日接单","平均时长"],
            items:{
                one:["张三","待接单","10","10"],
                two:["李四","待接单","5","10"],
                three:["王五","任务中","6","10"],
                fore:["赵六","任务中","5","10"],
                five:["钱七","任务中","1","10"],
                six:["陈八","未到岗","0","10"],
            }
        }
    }
};
</script>

<style scoped>
.mainbox {
  width: 100%;
  height: 130px;
  border-bottom: 1px #ccc solid;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.box {
  width: 120px;
  height: 88px;
  border: 1px solid #ccc;
  border-radius: 15px;
  color: aliceblue;
  text-align: center;
}
.box p {
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
}
.boxleft {
  background-color: rgba(72, 126, 219, 1);
}
.boxcen {
  background-color: rgba(62, 163, 122, 1);
}
.boxright {
  background-color: rgba(255, 116, 37, 1);
}

.form {
  width: 100%;
  height: 440px;
  border-top: 1px #ccc solid;
  border-bottom: 1px #ccc solid;
  margin-top: 25px;
}
</style>