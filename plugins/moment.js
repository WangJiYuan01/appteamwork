import Vue from 'vue'
var moment = require('moment-timezone');

moment.tz.setDefault("Australia/Sydney");
moment.updateLocale('en', {
  week: {
      dow: 4
  }
});

Vue.prototype.$moment = moment;