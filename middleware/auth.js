export default async function ({ app, error, store, redirect }) {
  if (!store.state.auth.token) {
    return redirect('/login')
  }
    app.$apolloHelpers.onLogin(store.state.auth.token);
    const hasToken = !!app.$apolloHelpers.getToken()
    if (!hasToken) error({errorCode:503, message:'You have been logged out.'})  
}