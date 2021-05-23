import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		isLoading: false,
		rows: undefined,
		totalEntries: 0,
		pageOffset: 0,
		pageSize: 10,
		error: ''
  },
  mutations: {
		setRows(state, {rows, totalEntries}) {
			state.rows = rows;
			state.totalEntries = totalEntries;
		},
		nextPage(state) {
			if(state.pageOffset + state.pageSize < state.totalEntries) {
				state.pageOffset+=state.pageSize;
			}
		},
		prevPage(state) {
			if(state.pageOffset - state.pageSize > 0) {
				state.pageOffset-=state.pageSize;
			} else {
				state.pageOffset = 0
			}
		},
		goToFirstPage(state) {
			state.pageOffset = 0;
		},
		goToLastPage(state) {
			state.pageOffset = state.totalEntries - (state.totalEntries % state.pageSize);
		},
		changePageSize(state, value) {
			state.pageSize = value;
			state.pageOffset = 0;
		},
		changeLoadingStatus(state, value) {
			state.isLoading = value
		},
		changeErrorStatus(state, error) {
			state.error = error;
		}
  },
  actions: {
		getCoinsData({commit, state}) {
			commit('changeLoadingStatus', true);
			axios.get(`https://api.coinranking.com/v1/public/coins/?limit=${state.pageSize}&offset=${state.pageOffset}`)
			.then(response => {
					commit('changeLoadingStatus', false);
					commit('changeErrorStatus', '');
					const rows = response.data.data.coins;
					const totalEntries = response.data.data.stats.total;
					commit('setRows', {rows, totalEntries});
			})
			.catch(error => {
					commit('changeLoadingStatus', false);
					commit('changeErrorStatus', 'We are unable to process your request, will send you a notification once we get the result');
					console.log(error);
			})
		},
		changePageSize ({commit, dispatch}, value) {
			commit('changePageSize', value)
			dispatch('getCoinsData');
		},
		nextPage ({commit, dispatch}) {
			commit('nextPage');
			dispatch('getCoinsData');
		},
		prevPage ({commit, dispatch}) {
			commit('prevPage');
			dispatch('getCoinsData');
		},
		lastPage ({commit, dispatch}) {
			commit('goToLastPage');
			dispatch('getCoinsData');
		},
		firstPage ({commit, dispatch}) {
			commit('goToFirstPage');
			dispatch('getCoinsData');
		},
	}
});
