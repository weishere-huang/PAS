<template>
	<div class="enterprise_list">
		<router-view></router-view>
		<div :class="[{hide:isHideList}]">
			<a-row>
				<a-col :span="24" style="padding:0 20px;">
					<a-row>
						<div style="line-height:50px;">
							<a-col :span="8">
								<a-button @click="addVisible=true">
									<a-icon style="color:#1890ff;" type="plus"/>新增
								</a-button>
								<a-button @click="edit">
									<a-icon style="color:#1890ff;" type="edit"/>修改
								</a-button>
								<a-popconfirm title="确定删除吗?" @confirm="() => onDelete">
									<a-button>
										<a-icon style="color:#1890ff;" type="delete"/>删除
									</a-button>
								</a-popconfirm>
							</a-col>
						</div>
					</a-row>
					<a-row style="padding-top:10px;">
						<a-table
							rowKey="id"
							:columns="columns"
							:pagination="false"
							:dataSource="data"
							:rowSelection="rowSelection"
						>
							<template slot="deviceState" slot-scope="text, record, index">
								<a-switch
									checkedChildren="启用"
									unCheckedChildren="禁用"
									:defaultChecked="text==1"
									@change="changeState(record,index)"
								/>
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
			</a-row>
		</div>
		<a-modal
			title="新增企业"
			:footer="null"
			width="600px"
			:visible="addVisible"
			@cancel="handleCancel(1)"
			:maskClosable="false"
		>
			<add-enterprise v-on:changeAddModal="changeAddModal"></add-enterprise>
		</a-modal>
		<a-modal
			title="修改企业"
			:footer="null"
			width="600px"
			:visible="editVisible"
			@cancel="handleCancel(2)"
			:maskClosable="false"
		>
			<edit-enterprise v-on:changeEditModal="changeEditModal"></edit-enterprise>
		</a-modal>
	</div>
</template>
<script>
const columns = [
	{
		dataIndex: "deviceNo",
		title: "企业ID",
		width: 90,
		key: "deviceNo"
	},
	{
		dataIndex: "deviceName",
		title: "企业名称",
		width: 180,
		key: "deviceName"
	},
	{
		dataIndex: "deviceCategoryName",
		key: "deviceCategoryName",
		title: "联系人",
		width: 90
	},
	{
		dataIndex: "organizeName",
		key: "organizeName",
		title: "手机号",
		width: 120
	},
	{
		dataIndex: "locationNo",
		key: "locationNo",
		title: "企业账号",
		width: 120
	},
	{
		dataIndex: "deviceState",
		key: "deviceState",
		title: "启用状态",
		width: 80,
		scopedSlots: { customRender: "deviceState" }
	},
	{
		dataIndex: "location",
		key: "location",
		title: "创建时间",
		width: 120
	}
];
const data = [
	{
		id: "0",
		deviceNo: "111",
		deviceName: "11",
		deviceState: "1",
		organizeName: "11",
		location: "11",
		locationNo: "11",
		deviceCategoryName: "11",
		deviceModel: "1",
		workerNames: "0"
	},
	{
		id: "1",
		deviceNo: "111",
		deviceName: "11",
		deviceState: "11",
		organizeName: "11",
		location: "11",
		locationNo: "11",
		deviceCategoryName: "11",
		deviceModel: "3",
		workerNames: "2"
	},
	{
		id: "2",
		deviceNo: "111",
		deviceName: "11",
		deviceState: "11",
		organizeName: "11",
		location: "11",
		locationNo: "11",
		deviceCategoryName: "11",
		deviceModel: "0",
		workerNames: "1"
	}
];
const rowSelection = {
	onChange: (selectedRowKeys, selectedRows) => {
		console.log(
			`selectedRowKeys: ${selectedRowKeys}`,
			"selectedRows: ",
			selectedRows
		);
	},
	onSelect: (record, selected, selectedRows) => {
		console.log(record, selected, selectedRows);
	},
	onSelectAll: (selected, selectedRows, changeRows) => {
		console.log(selected, selectedRows, changeRows);
	}
};
import AddEnterprise from "./Add";
import EditEnterprise from "./edit";
export default {
	name: "orderList",
	data() {
		return {
			rowSelection,
			addVisible: false,
			editVisible: false,
			isHideList: this.$route.params.id !== undefined ? true : false,
			columns,
			data,
			current: 1,
			pageSize: 10,
			total: 50
		};
	},
	methods: {
		onDelete() {},
		changeEditModal(params) {
			this.editVisible = params;
		},
		changeAddModal(params) {
			this.addVisible = params;
		},
		handleCancel(a) {
			if (a == 1) {
				this.addVisible = false;
			}
			if (a == 2) {
				this.editVisible = false;
			}
		},
		changeState(row, index) {
			console.log(row, index);
		},
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
			// this.$router.push({ path: "/OrderList/OrderEdit/" + record.id });
			this.editVisible = true;
		}
	},
	created() {
		let a = this.$route.matched.find(item => item.name === "OrderAdd")
			? true
			: false;
		let b = this.$route.params.id !== undefined ? true : false;
		this.isHideList = a || b ? true : false;
	},
	watch: {
		$route() {
			let a = this.$route.matched.find(item => item.name === "OrderAdd")
				? true
				: false;
			let b = this.$route.params.id !== undefined ? true : false;
			this.isHideList = a || b ? true : false;
		}
	},
	components: {
		AddEnterprise,
		EditEnterprise
	}
};
</script>
<style lang="less">
.enterprise_list {
}
</style>
