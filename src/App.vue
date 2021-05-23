<template>
		<b-container>
			<template v-if='loading && !rows'>
					<b-spinner class='spinner' label='Busy'></b-spinner>
			</template>
			<template v-else>
				<template v-if='error'>
					<div class='text-center text-danger'>{{error}}</div>
				</template>
				<b-table class='text-center' striped hover :items='rows'>
					<template #cell(icon)='data'>
						<img v-bind:src='data.item.icon' width='20' height = '20' />
					</template>
				</b-table>
				<div class='text-center'>
					<span>
						<span class='label'>Page: </span>
						<b-icon-chevron-bar-left
							class = 'mx-1'
							@click='firstPage'
						>
						</b-icon-chevron-bar-left>
						<b-icon-chevron-double-left
							class = 'mx-1'
							@click='prevPage'
						>
						</b-icon-chevron-double-left>
							<span>{{Math.floor(pageOffset/pageSize) + 1}}</span> /
							<span>{{Math.floor(totalEntries/pageSize) + 1}}</span>
						<b-icon-chevron-double-right
							class = 'mx-1'
							@click='nextPage'
						>
						</b-icon-chevron-double-right>
						<b-icon-chevron-bar-right
							class = 'mx-1'
							@click='lastPage'
						>
						</b-icon-chevron-bar-right>
					</span>
					<span class = 'bold'>
						<span class='label'>Page Size</span>
						<b-dropdown id='dropdown-left' variant='primary' class=ml-1>
							<template #button-content>
								{{pageSize}}
							</template>
							<b-dropdown-item @click='()=>changePageSize(10)'>10</b-dropdown-item>
							<b-dropdown-item @click='()=>changePageSize(25)'>25</b-dropdown-item>
							<b-dropdown-item @click='()=>changePageSize(50)'>50</b-dropdown-item>
							<b-dropdown-item @click='()=>changePageSize(100)'>100</b-dropdown-item>
						</b-dropdown>
					</span>
				</div>
			</template>
		</b-container>
</template>

<script>
		import { mapActions } from 'vuex';
		export default {
			created() {
				this.getCoinsData();
				setInterval(() => {
					this.getCoinsData();
				}, 5000);
			},
			computed: {
				rows() {
					const rows = this.$store.state.rows;
					return rows && rows.map(item => ({
						icon: item.iconUrl,
						name: item.name,
						symbol: item.symbol,
						'price(in $)': Number(item.price).toFixed(2),
						'change %': item.change
					}))
				},
				totalEntries() {
					return this.$store.state.totalEntries;
				},
				pageSize() {
					return this.$store.state.pageSize;
				},
				loading() {
					return this.$store.state.isLoading;
				},
				pageOffset() {
					return this.$store.state.pageOffset;
				},
				error() {
					return this.$store.state.error;
				},
			},
			methods: {
				...mapActions([
					'getCoinsData',
					'nextPage',
					'prevPage',
					'changePageSize',
					'lastPage',
					'firstPage'
				])
			}
		}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
