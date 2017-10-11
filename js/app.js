'use strict' ;
require('bootstrap/dist/css/bootstrap.css') ;
require('../css/app.css') ;
import Vue from 'vue' ;
import ErrorComponent from './components/error.js' ;
import ResultComponent from './components/result.js' ;
import Axios from 'axios' ;


Vue.config.devtools = true ;
Vue.config.debug = true ;
Vue.prototype.$http = Axios ;

const app = new Vue({
    data: () => ({
        data:      undefined,
        dev_num:   '',
        doc_num:   '',
        sign:      '',
        error_str: 'Нет ошибки'
    }),
    mounted: function() {
        window.test = {
            fill: () => {
                this.fill_test_data()
            }
        }
    },
    computed: {
        dev_num_input_ok: function() { return this.is_int(this.dev_num) },
        doc_num_input_ok: function() { return this.is_int(this.doc_num) },
        sign_input_ok: function() { return this.is_int(this.sign) },
    },
    methods: {
        is_int: (i) => /^\d+$/.test(i),
        fill_test_data: function () {
            // this.dev_num = '8710000100800642' ;
            // this.doc_num = '274' ;
            // this.sign    = '2423413917' ;
            this.dev_num = '8710000100311778' ;
            this.doc_num = '54904' ;
            this.sign    = '3632351111' ;
        },
        clr: function () {
            this.data = undefined ;
            this.dev_num = this.doc_num = this.sign = '' ;
            this.error_str = 'Нет ошибки'
        },
        query: function() {
            this.data = undefined ;
            this.error_str = 'Отправка запроса' ;

            this.$http.get('/api/', {
                params: {
                    sign:    this.sign,
                    dev_num: this.dev_num,
                    doc_num: this.doc_num
                },
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                }
            })
            .then(resp => {
                if(resp.status === 202) {
                    console.info('Server return 202 code, resend request') ;
                    this.error_str = 'Запрос принят' ;
                    this.$nextTick(function() { this.query() })  // or es6 Promise chain ?
                } else {
                    this.data = resp.data;
                    this.error_str = 'Нет ошибки'
                }
            })
            .catch(e => {
                console.error(e.response.status + ': ' + e.response.statusText) ;

                if (e.response.status === 400)
                    this.error_str = 'Ошибка в запросе' ;
                else if (e.response.status === 404)
                    this.error_str = 'Не найдено' ;
                else
                    this.error_str = 'Ошибка: ' + e.response.statusText ;
            }) ;
        }
    },
    components: {
        'result-component': ResultComponent,
        'error-component': ErrorComponent
    }
}) ;

app.$mount('#app') ;
