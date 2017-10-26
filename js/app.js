'use strict' ;
import Vue from 'vue' ;


Vue.config.devtools = true ;
Vue.config.debug = true ;

const app = new Vue({
    data: () => ({
        vals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        index: 0,
    }),
}) ;

app.$mount('#app') ;
