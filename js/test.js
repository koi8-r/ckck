'use strict' ;


let partial_fn = (a, b, c) => a + b +c ;
let partial_fn2 = partial_fn.bind({}, 10, 10) ;
console.log(partial_fn(10, 10, 1)) ;
console.log(partial_fn2(1)) ;


const success_timeout = 1000 ;
const error_timeout = 3000 ;


let async_fn = () => new Promise((resolve, reject) => {
    setTimeout(() => resolve('Success'), success_timeout) ;
    setTimeout(() => reject('Error'), error_timeout) ;
}) ;


let async_fn_2 = (v) => new Promise((resolve, reject) => {
    reject(new Error(`Async error: ${v}`)) ;  // same as: throw new Error
}) ;


async_fn()
    .then( res => {
        console.log(`Res1: ${res}`) ;
        return 'Awesome'
    })
    .then( res => {
        console.log(`Res2: ${res}`) ;
        return async_fn_2(res.toUpperCase())
    })
    .then( res => {
        console.log(`Res3: ${res}`) ;
        throw new Error('Fuuu') ;
    }, e => {
        console.log(`Res3: error`) ;
        throw new Error('Fuuu2') ;
    })
    .then( res => console.info('ok1') )
    .then( res => console.info('ok2') )
    .catch( err =>
        console.error(err.message)
    )
;


// ----


let n = 0 ;

async_fn = () => {
   return new Promise((resolve, reject) => {
       setTimeout(() => {
           console.log(n) ;
           if(n > 3)
               reject(n) ;
           else
               resolve(n++) ;
       }, 1500)
   })
} ;


let reducer_fn = () => {
    return async_fn()
        .then(res => {
            if(res !== 3)
                return reducer_fn() ;
            else
                return res
        }).catch(e => {
            throw e
        })
} ;


reducer_fn()
    .then(res => {
        console.info(`resolve: ${res}`) ;
    })
    .catch(err => {
        console.error(`error: ${err}`) ;
    }) ;
