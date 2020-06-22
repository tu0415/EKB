import * as types from "./types";

const state = {
	address:''
	
}

const mutations = {
	addressEvt(state, value) {
		state.address = value
		console.log(state.address)
	},
	
}

const actions = {

}

const getters = {
	
}

export default {
	state,
	getters,
	actions,
	mutations
}
