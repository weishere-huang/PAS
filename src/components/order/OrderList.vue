<template>
	<div class="order_list">
		<router-view></router-view>
		<div :class="[{hide:isHideList}]">
			<a-row>
				<a-col :span="24" style="padding:0 20px;">
					<a-row>
						<div style="line-height:50px;">
							<a-col :span="8">
								<a-button type="primary" @click="$router.push({path:'/OrderList/OrderAdd'})">
									<a-icon type="plus-circle"/>新增
								</a-button>
							</a-col>

							<a-col :span="16" style="text-align:right">
								关键字：
								<a-input type="text" style="width:300px" placeholder="根据设备编号，名称，位号"></a-input>
								<a-button type="primary" icon="search">搜索</a-button>
							</a-col>
						</div>
					</a-row>
					<a-row style="padding-top:10px;">
						<a-table rowKey="id" :columns="columns" :pagination="false" :dataSource="data">
							<template slot="deviceModel" slot-scope="text, record, index">
								<div>
									<a-popover placement="top">
										<template slot="content">
											<span>进行中</span>
										</template>
										<i v-if="text==0" class="iconfont" style="color:#10CF0C;">&#xe61d;</i>
									</a-popover>
									<a-popover placement="top">
										<template slot="content">
											<span>进行中</span>
										</template>
										<i v-if="text==1" class="iconfont" style="color:#F59A23;">&#xe600;</i>
									</a-popover>
									<a-popover placement="top">
										<template slot="content">
											<span>暂停</span>
										</template>
										<i v-if="text==2" class="iconfont" style="color:#027DB4;">&#xe6b4;</i>
									</a-popover>
									<a-popover placement="top">
										<template slot="content">
											<span>停止</span>
										</template>
										<i v-if="text==3" class="iconfont" style="color:#E02D2D;">&#xe61a;</i>
									</a-popover>
									<a-popover placement="top">
										<template slot="content">
											<span>进行中</span>
										</template>
										<i v-if="text==4" class="iconfont" style="color:#D8D8D8;">&#xe624;</i>
									</a-popover>
								</div>
							</template>
							<template slot="workerNames" slot-scope="text, record, index">
								<div>
									<a-tag v-if="text==0" color="#F59A23">待审批</a-tag>
									<a-tag v-if="text==1" color="#D8D8D8">已审批</a-tag>
									<a-tag v-if="text==2" color="#8400FF">被驳回</a-tag>
								</div>
							</template>
							<template slot="operation" slot-scope="text, record, index">
								<div class="editable-row-operations">
									<span class="handle_style">
										<a-popover placement="top">
											<template slot="content">
												<span>修改</span>
											</template>
											<a-icon type="edit" @click="() => edit(record,text,index)" style="cursor:pointer;"/>
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
												<a-icon type="delete"/>
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
			</a-row>
		</div>
	</div>
</template>

<script>
const columns = [
	{
		dataIndex: "deviceNo",
		title: "订单号",
		width: 90,
		key: "deviceNo"
	},
	{
		dataIndex: "deviceName",
		title: "订单标题",
		width: 120,
		key: "deviceName"
	},
	{
		dataIndex: "deviceState",
		key: "deviceState",
		title: "业务类型",
		width: 80,
		scopedSlots: { customRender: "deviceState" }
	},
	{
		dataIndex: "organizeName",
		key: "organizeName",
		title: "客户名称",
		width: 160
	},
	{
		dataIndex: "location",
		key: "location",
		title: "下单日期",
		width: 80
	},
	{
		dataIndex: "locationNo",
		key: "locationNo",
		title: "备注",
		width: 80
	},
	{
		dataIndex: "deviceCategoryName",
		key: "deviceCategoryName",
		title: "负责人",
		width: 70
	},
	{
		dataIndex: "deviceModel",
		key: "deviceModel",
		title: "生产状态",
		width: 70,
		scopedSlots: { customRender: "deviceModel" }
	},
	{
		dataIndex: "workerNames",
		key: "workerNames",
		title: "审批状态",
		width: 70,
		scopedSlots: { customRender: "workerNames" }
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
		id: "0",
		deviceNo: "111",
		deviceName: "11",
		deviceState: "11",
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
export default {
	name: "orderList",
	data() {
		return {
			form: this.$form.createForm(this),
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
	}
};
</script>
<style lang="less">
.order_list {
	i {
		font-size: 16px;
	}
}
</style>
