'use strict' ;
import Vue from 'vue' ;


export default Vue.extend({
    props: ['err'],
    template:
        '<div>{{ err }}</div>',
}) ;
