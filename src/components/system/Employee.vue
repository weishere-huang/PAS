<template>
	<div class="employee_list">
		<router-view></router-view>
		<div :class="[{hide:isHideList}]">
			<a-col :span="24" style="padding:0 20px;">
				<a-row>
					<div style="line-height:50px;">
						<a-col :span="8">
							<a-button type="primary" @click="$router.push({path:'/Employee/AddEmployee'})">
								<a-icon type="plus-circle"/>添加
							</a-button>
						</a-col>

						<a-col :span="16" style="text-align:right">关键字：
							<a-input type="text" style="width:300px" placeholder="姓名，员工编号"></a-input>
							<a-button type="primary" icon="search">搜索</a-button>
						</a-col>
					</div>
				</a-row>
				<a-row style="padding-top:10px;">
					<a-table :columns="columns" :pagination="false" :dataSource="data">
						<template slot="state" slot-scope="text, record, index">
							<div>
								<a-switch
									checkedChildren="正常"
									unCheckedChildren="禁用"
									:defaultChecked="record.state==0?true:false"
								/>
							</div>
						</template>
						<template slot="operation" slot-scope="text, record, index">
							<div class="editable-row-operations">
								<span>
									<a @click="() => edit(record,text,index)">修改</a>
									&nbsp;
									<a @click="() => edit(record,text,index)">删除</a>
								</span>
							</div>
						</template>
					</a-table>
					<a-pagination
						style="padding-top:12px;"
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
		title: "员工编号",
		width: 90,
		key: "deviceNo"
	},
	{
		dataIndex: "deviceName",
		title: "姓名",
		width: 120,
		key: "deviceName"
	},
	{
		dataIndex: "deviceState",
		key: "deviceState",
		title: "性别",
		width: 70,
		scopedSlots: { customRender: "deviceState" }
	},
	{
		dataIndex: "organizeName",
		key: "organizeName",
		title: "所处班组",
		width: 140
	},
	{
		dataIndex: "location",
		key: "location",
		title: "只能/工种",
		width: 70
	},
	{
		dataIndex: "state",
		key: "state",
		title: "状态",
		width: 70,
		scopedSlots: { customRender: "state" }
	},
	{
		dataIndex: "operation",
		key: "operation",
		title: "操作",
		width: 70,
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
			visible: false,
			isHideList: this.$route.params.id !== undefined ? true : false,
			allClassify: [
				"生产设备",
				"非生产设备",
				"辅助生产设备",
				"检验检测设备",
				"其他设备"
			],
			columns,
			data,
			current: 1,
			pageSize: 10,
			total: 50
		};
	},
	methods: {
		onShowSizeChange(current, pageSize) {
			this.pageSize = pageSize;
		},
		onChange(current, pageNumber) {
			console.log("Page: ", pageNumber);
			console.log("第几页: ", current);
			this.current = current;
		},
		edit(record, text, index) {
			this.$router.push({ path: "/Employee/EditEmployee/" + record.key });
		},
		save(key) {
			const newData = [...this.data];
			const target = newData.filter(item => key === item.key)[0];
			if (target) {
				delete target.editable;
				this.data = newData;
				this.cacheData = newData.map(item => ({ ...item }));
			}
		},
		cancel(key) {
			const newData = [...this.data];
			const target = newData.filter(item => key === item.key)[0];
			if (target) {
				Object.assign(
					target,
					this.cacheData.filter(item => key === item.key)[0]
				);
				delete target.editable;
				this.data = newData;
			}
		}
	},
	created() {
		let a = this.$route.matched.find(item => item.name === "AddEmployee")
			? true
			: false;
		let b = this.$route.params.id !== undefined ? true : false;
		this.isHideList = a || b ? true : false;
	},
	watch: {
		$route() {
			let a = this.$route.matched.find(item => item.name === "AddEmployee")
				? true
				: false;
			let b = this.$route.params.id !== undefined ? true : false;
			this.isHideList = a || b ? true : false;
		}
	}
};
</script>
