<template>
	<div class="authority_list">
		<router-view></router-view>
		<div :class="[{hide:isHideList}]">
			<a-col :span="24" style="padding:0 20px;">
				<a-row>
					<div style="line-height:50px;">
						<a-col :span="8">
							<a-button type="primary" @click="$router.push({path:'/Authority/AddAuthority'})">
								<a-icon type="plus-circle"/>新增
							</a-button>
						</a-col>
					</div>
				</a-row>
				<a-row style="padding-top:10px;">
					<a-table :columns="columns" :pagination="false" :dataSource="data">
						<template slot="operation" slot-scope="text, record, index">
							<div class="editable-row-operations">
								<span class="handle_style">
									<a-popover placement="top">
										<template slot="content">
											<span>修改</span>
										</template>
										<a-icon type="edit" @click="() => edit(record,text,index)"/>
									</a-popover>&nbsp;&nbsp;
									<a-popconfirm
										title="确定删除吗？"
										@confirm="confirm"
										@cancel="cancel"
										okText="确定"
										cancelText="取消"
									>
										<a-popover placement="top">
											<template slot="content">
												<span>删除</span>
											</template>
											<a-icon type="delete" @click="() => edit(record,text,index)"/>
										</a-popover>
									</a-popconfirm>
								</span>
							</div>
						</template>
					</a-table>
					<a-pagination
						style="padding-top:12px;text-align: right;"
						showQuickJumper
						:defaultCurrent="current"
						:total="total"
						@change="onChange"
						showSizeChanger
						:pageSizeOptions="['10','20','30']"
						@showSizeChange="onShowSizeChange"
						:showTotal="total => `共 ${total} 条`"
					/>
				</a-row>
			</a-col>
		</div>
	</div>
</template>
<script>
const columns = [
	{
		dataIndex: "deviceNo",
		title: "角色名称",
		width: 300,
		key: "deviceNo"
	},
	{
		dataIndex: "deviceName",
		title: "备注",
		width: 200,
		key: "deviceName"
	},
	{
		dataIndex: "operation",
		key: "operation",
		title: "操作",
		width: 80,
		scopedSlots: { customRender: "operation" }
	}
];
const data = [
	{
		key: "0",
		deviceNo: "111",
		deviceName: "11",
		deviceState: "11",
		organizeName: "11",
		location: "11",
		state: "1",
		deviceCategoryName: "11",
		deviceModel: "11",
		workerNames: "11"
	},
	{
		key: "1",
		deviceNo: "111",
		deviceName: "11",
		deviceState: "11",
		organizeName: "11",
		location: "11",
		state: "0",
		deviceCategoryName: "11",
		deviceModel: "11",
		workerNames: "11"
	},
	{
		key: "2",
		deviceNo: "111",
		deviceName: "11",
		deviceState: "11",
		organizeName: "11",
		location: "11",
		state: "0",
		deviceCategoryName: "11",
		deviceModel: "11",
		workerNames: "11"
	}
];

export default {
	data() {
		return {
			isHideList: this.$route.params.id !== undefined ? true : false,
			columns,
			data,
			current: 1,
			pageSize: 10,
			total: 50
		};
	},
	methods: {
		confirm(e) {
			console.log(e);
			this.$message.success("Click on Yes");
		},
		cancel(e) {
			console.log(e);
			this.$message.error("Click on No");
		},
		onShowSizeChange(current, pageSize) {
			this.pageSize = pageSize;
		},
		onChange(current, pageNumber) {
			console.log("Page: ", pageNumber);
			console.log("第几页: ", current);
			this.current = current;
		},
		edit(record, text, index) {
			this.$router.push({ path: "/Authority/EditAuthority/" + record.key });
		}
	},
	created() {
		let a = this.$route.matched.find(item => item.name === "AddAuthority")
			? true
			: false;
		let b = this.$route.params.id !== undefined ? true : false;
		this.isHideList = a || b ? true : false;
	},
	watch: {
		$route() {
			let a = this.$route.matched.find(item => item.name === "AddAuthority")
				? true
				: false;
			let b = this.$route.params.id !== undefined ? true : false;
			this.isHideList = a || b ? true : false;
		}
	}
};
</script>