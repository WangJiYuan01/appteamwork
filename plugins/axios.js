export default function ({ $axios, redirect, store,error }) {

  $axios.onRequest(config => {
      // store.commit('setRemoveError');
    })

    if(store.state.auth.token) $axios.setToken(store.state.auth.token, 'Bearer')

  $axios.setHeader('Content-Type', 'application/json')

  $axios.onResponse(data => {
  //   if(data.error)
  })
  $axios.onError(er => {
      try {
          if (code === 401) {
              redirect('/login')
          }
          else if (code === 422) {
              store.commit('setError',{code,error:er.response.data.errorMessage});
          }
          else if (code === 400) {
              store.commit('setError',{code,error:er.message,errors:er.response.data.errors});
          }
          else store.commit('setError',{code,error:er.response.data}); 
          
      } catch (err) {
        console.error(err)
      }
      const code = parseInt(er.response && er.response.status)
      
  })
}