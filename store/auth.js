export const state = () => ({
    token:localStorage.getItem('_token') || null,
    user:null,
    app:{
        name:'idropship',
    }
})
export const getters = {
    profile: state => {
        return state.user;
      }
}

export const mutations = {
    setToken(state,token){
        localStorage.setItem('_token',token) ;
        state.token = token;
    },
    setUser(state,user){
        state.user = user;
    },
    removeToken(state){
        localStorage.removeItem('_token') ;
        state.user = null;
        state.token = null;
    },
}
export const actions = {
    async login (context,data) {
        return new Promise((resolve,reject) => this.$axios.post('api/login',data).then(res => {
            this.$axios.setToken(res.data.data.token, 'Bearer')
            context.commit('setToken',res.data.data.token);
            return resolve(res)
        }).catch(error=> reject(error)))
    },
    async logout (context,data) {
        return new Promise((resolve,reject) => this.$axios.post('api/logout',data).then(res => {
            context.commit('removeToken');
            return resolve(res)
        }).catch(error=> reject(error)))
    },
    async user (context,data) {
        return new Promise((resolve,reject) => this.$axios.get('api/user').then(res => {
            context.commit('setUser',res.data.data);
            return resolve(res)
        }).catch(error=> reject(error)))
    },
}
