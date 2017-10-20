'use strict' ;
import Vue from 'vue' ;
import tmpl from 'raw-loader!./result.vue.html'
import _ from 'lodash' ;


export default Vue.extend({
    props: ['doc'],
    template: tmpl,
    methods: {
        esc: (s) => _.escape(s)  // vuejs do this
    },
    computed: {
        op_str: function() {
            switch(this.doc.op_type) {
                case 1: return 'Приход' ;
                case 2: return 'Возврат прихода' ;
                case 3: return 'Расход' ;
                case 4: return 'Возврат расхода' ;
                default: return 'Неизвестно' ;
            }
        },
        tax_type_str: function() {
            switch(this.doc.tax_type) {
                case 1: return 'Общая' ;
                default: return 'Неизвестно' ;
            }
        }
    }
}) ;
