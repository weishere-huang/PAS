<template>
	<div class="public_add_personnel">
		<a-row>
			<a-col :span="5" style="padding-right:16px;">
				<div class="organization_case">
					<a-tree :treeData="treeData" @select="treeSelect" defaultExpandAll></a-tree>
				</div>
			</a-col>
			<a-col :span="19">
				<div>
					<div style="margin-bottom: 16px">
						<a-button type="primary" @click="start" :disabled="!hasSelected" :loading="loading">提交</a-button>
						<span style="margin-left: 8px">
							<template v-if="hasSelected">{{`已选择 ${selectedRowKeys.length} 人`}}</template>
						</span>
						<a-input-search placeholder="请输入关键字" style="width: 200px;float:right;" @search="onSearch"/>
					</div>
					<a-table
						size="small"
						:rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
						:columns="columns"
						:dataSource="data"
					/>
				</div>
			</a-col>
		</a-row>
	</div>
</template>
<script>
const columns = [
	{
		title: "员工编号",
		dataIndex: "name"
	},
	{
		title: "姓名",
		dataIndex: "age"
	},
	{
		title: "只能/工种",
		dataIndex: "address"
	},
	{
		title: "所处班组",
		dataIndex: "class"
	}
];
const treeData = [
	{
		title: "parent 1",
		key: "0-0",
		slots: {
			icon: "smile",
			title: "aaaa"
		},
		scopedSlots: { title: "title" },
		children: [
			{
				title: "leaf",
				key: "0-0-0",
				scopedSlots: { title: "title" },
				slots: { icon: "meh" }
			},
			{
				title: "leaf",
				key: "0-0-1",
				scopedSlots: { icon: "custom", title: "title" }
			}
		]
	}
];
const data = [];
for (let i = 0; i < 46; i++) {
	data.push({
		key: i,
		name: `Edward King ${i + 1}`,
		age: 32,
		address: `London, Park Lane no. ${i + 1}`,
		class: `${i + 1} 班`
	});
}

export default {
	data() {
		return {
			treeData,
			data,
			columns,
			selectedRowKeys: [], // Check here to configure the default column
			loading: false
		};
	},
	computed: {
		hasSelected() {
			return this.selectedRowKeys.length > 0;
		}
	},
	methods: {
		treeSelect(value) {
			console.log(value);
		},
		onSearch(value) {
			console.log(value);
		},
		start() {
			this.loading = true;
			// ajax request after empty completing
			setTimeout(() => {
				this.loading = false;
				this.selectedRowKeys = [];
			}, 1000);
		},
		onSelectChange(selectedRowKeys) {
			console.log("selectedRowKeys changed: ", selectedRowKeys);
			this.selectedRowKeys = selectedRowKeys;
		}
	}
};
</script>
<style lang="less">
.public_add_personnel {
	.organization_case {
		border: 1px solid #d9d9d9;
		border-radius: 4px;
		height: 500px;
		overflow: scroll;
	}
}
</style>
