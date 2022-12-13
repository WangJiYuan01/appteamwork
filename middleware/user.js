export default async function ({ store, redirect }) {
    if (store.state.auth.token && !store.state.auth.user) {
        await store.dispatch('auth/user');
    }
}