<template>
	<div class="work_order_list">
		<router-view></router-view>
		<div :class="[{hide:isHideList}]">
			<a-row>
				<a-col :span="24" style="padding:0 20px;">
					<a-row>
						<div style="line-height:50px;">
							<a-col :span="12">
								<a-button @click="addVisible=true">
									<a-icon style="color:#1890ff;" type="plus"/>新增
								</a-button>
								<a-button @click="editVisible=true">
									<a-icon style="color:#1890ff;" type="edit"/>修改
								</a-button>
								<a-popconfirm title="确定删除吗?" @confirm="() => onDelete">
									<a-button>
										<a-icon style="color:#1890ff;" type="delete"/>删除
									</a-button>
								</a-popconfirm>
								<a-button @click>
									<a-icon style="color:#1890ff;" type="edit"/>投产
								</a-button>
								<a-button @click>
									<i class="iconfont" style="color:#1890ff;margin-right:8px;">&#xe625;</i>恢复
								</a-button>
								<a-button @click>
									<i class="iconfont" style="color:#1890ff;margin-right:8px;">&#xe62d;</i>暂停
								</a-button>
								<a-button @click>
									<i class="iconfont" style="color:#1890ff;margin-right:8px;">&#xe6aa;</i>终止
								</a-button>
								<a-button @click="toTransferOrder">
									<i class="iconfont" style="color:#1890ff;margin-right:8px;">&#xe60b;</i>移交单
								</a-button>
							</a-col>

							<a-col :span="12" style="text-align:right">
								<a-select placeholder="请选择" optionFilterProp="children" style="width:100px;">
									<a-select-option value="1">全部</a-select-option>
									<a-select-option value="2">待生产</a-select-option>
									<a-select-option value="3">生产中</a-select-option>
									<a-select-option value="4">暂停中</a-select-option>
									<a-select-option value="5">已终止</a-select-option>
									<a-select-option value="6">完成</a-select-option>
								</a-select>
								<a-input type="text" style="width:300px" placeholder="工作令号/订单号/名称"></a-input>
								<a-button type="primary">查询</a-button>
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
							<template slot="deviceModel" slot-scope="text, record, index">
								<div>
									<template slot="content">
										<span>生产中</span>
									</template>
									<i v-if="text==0" class="iconfont" style="color:#10CF0C;">
										&#xe61d;
										<span style="font-size:14px;">生产中</span>
									</i>

									<template slot="content">
										<span>待生产</span>
									</template>
									<i v-if="text==1" class="iconfont" style="color:#F59A23;">
										&#xe600;
										<span style="font-size:14px;">待生产</span>
									</i>

									<template slot="content">
										<span>暂停</span>
									</template>
									<i v-if="text==2" class="iconfont" style="color:#027DB4;">
										&#xe6b4;
										<span style="font-size:14px;">暂停</span>
									</i>

									<template slot="content">
										<span>终止</span>
									</template>
									<i v-if="text==3" class="iconfont" style="color:#E02D2D;">
										&#xe61a;
										<span style="font-size:14px;">终止</span>
									</i>

									<template slot="content">
										<span>完成</span>
									</template>
									<i v-if="text==4" class="iconfont" style="color:#D8D8D8;">
										&#xe624;
										<span style="font-size:14px;">完成</span>
									</i>
								</div>
							</template>
							<template slot="workerNames" slot-scope="text, record, index">
								<div>
									<a-tag v-if="text==0" color="#F59A23">待审批</a-tag>
									<a-tag v-if="text==1" color="#D8D8D8">已审批</a-tag>
									<a-tag v-if="text==2" color="#8400FF">被驳回</a-tag>
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
			</a-row>
		</div>
		<a-modal
			title="新增工作令"
			:footer="null"
			width="800px"
			:visible="addVisible"
			@cancel="handleCancel(1)"
			:maskClosable="false"
		>
			<add-work-order v-on:changeAddModal="changeAddModal"></add-work-order>
		</a-modal>
		<a-modal
			title="修改工作令"
			:footer="null"
			width="800px"
			:visible="editVisible"
			@cancel="handleCancel(2)"
			:maskClosable="false"
		>
			<edit-work-order v-on:changeEditModal="changeEditModal"></edit-work-order>
		</a-modal>
	</div>
</template>
<script>
import AddWorkOrder from "./AddWorkOrder";
import EditWorkOrder from "./EditWorkOrder";
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
const columns = [
	{
		dataIndex: "deviceNo",
		title: "工作令号",
		width: 100,
		key: "deviceNo"
	},
	{
		dataIndex: "deviceName",
		title: "关联订单",
		width: 100,
		key: "deviceName"
	},
	{
		dataIndex: "deviceCategoryName",
		key: "deviceCategoryName",
		title: "工作令名称",
		width: 160
	},
	{
		dataIndex: "organizeName",
		key: "organizeName",
		title: "移交单",
		width: 80
	},
	{
		dataIndex: "locationNo",
		key: "locationNo",
		title: "状态",
		width: 80,
		scopedSlots: { customRender: "deviceModel" }
	},
	{
		dataIndex: "deviceState",
		key: "deviceState",
		title: "负责人",
		width: 100,
		scopedSlots: { customRender: "deviceState" }
	},
	{
		dataIndex: "deviceModel",
		key: "deviceModel",
		title: "创建时间",
		width: 120
	}
];
const data = [
	{
		id: "0",
		deviceNo: "111",
		deviceName: "11",
		deviceState: "11",
		organizeName: "11",
		location: "11",
		locationNo: "1",
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
		locationNo: "0",
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
		locationNo: "2",
		deviceCategoryName: "11",
		deviceModel: "0",
		workerNames: "1"
	}
];
export default {
	name: "orderList",
	data() {
		return {
			rowSelection,
			form: this.$form.createForm(this),
			isHideList: this.$route.params.id !== undefined ? true : false,
			columns,
			data,
			current: 1,
			pageSize: 10,
			total: 50,
			editVisible: false,
			addVisible: false
		};
	},
	methods: {
		toTransferOrder(){
			this.$router.push({path:"/WorkOrderList/transferOrder/"+1})
		},
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
		moreOperation({ key }) {
			console.log(key);
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
			this.$router.push({ path: "/OrderList/OrderEdit/" + record.id });
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
		AddWorkOrder,
		EditWorkOrder
	}
};
</script>
<style lang="less">
@import url("../../assets/layout.less");
.work_order_list {
}
</style>
