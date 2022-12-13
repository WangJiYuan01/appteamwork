export default async function ({ store, redirect,error }) {
    if (store.state.auth.token && !store.state.auth.user) {
        await store.dispatch('auth/user');
    }
    let adminRules = ["user"];
    if(!adminRules.includes(store.getters.user.type)) error({statusCode:401, message:'You do not have permission to access this page.'})
}