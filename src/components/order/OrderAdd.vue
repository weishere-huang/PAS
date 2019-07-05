<template>
	<div class="add_order">
		<a-row>
			<div class="content_case">
				<!-- <a-tabs defaultActiveKey="1">
				<a-tab-pane tab="基础信息" key="1">-->
				<a-form :form="form" layout="inline">
					<a-form-item label="订单类型">
						<a-select placeholder="请选择" style="width:178px;" optionFilterProp="children">
							<a-select-option
								v-for="(item, index) in orderClassigy"
								:key="index"
								:value="item.value"
							>{{item.label}}</a-select-option>
						</a-select>
					</a-form-item>
					<a-form-item label="订单来源">
						<a-select placeholder="请选择" style="width:178px;" optionFilterProp="children">
							<a-select-option
								v-for="(item, index) in productionState"
								:key="index"
								:value="item.value"
							>{{item.label}}</a-select-option>
						</a-select>
					</a-form-item>
					<a-form-item label="外部订单编号">
						<a-input style="width:178px;"></a-input>
					</a-form-item>
					<a-form-item label="订单标题">
						<a-input style="width:812px;"></a-input>
					</a-form-item>
					<a-form-item label="客户名称">
						<a-input style="width:812px;"></a-input>
					</a-form-item>
					<a-form-item label="计划数量">
						<a-input style="width:178px;"></a-input>
					</a-form-item>
					<a-form-item label="预计开工时间">
						<a-date-picker style="width:178px;"/>
					</a-form-item>
					<a-form-item label="预计完工时间">
						<a-date-picker style="width:178px;"/>
					</a-form-item>
					<a-form-item label="完工数量">
						<a-input style="width:178px;" disabled></a-input>
					</a-form-item>
					<a-form-item label="实际开工时间">
						<a-date-picker style="width:178px;" disabled/>
					</a-form-item>
					<a-form-item label="实际完工时间">
						<a-date-picker style="width:178px;" disabled/>
					</a-form-item>
					<a-form-item label="预估生产成本">
						<a-input style="width:178px;"></a-input>
					</a-form-item>
					<a-form-item label="实际生产成本">
						<a-input style="width:178px;"></a-input>
					</a-form-item>
					<a-form-item label="计划交货时间">
						<a-date-picker style="width:178px;"/>
					</a-form-item>
					<a-form-item label="风险预警">
						<a-select placeholder="请选择" style="width:178px;" optionFilterProp="children">
							<a-select-option
								v-for="(item, index) in productionRisk"
								:key="index"
								:value="item.value"
							>{{item.label}}</a-select-option>
						</a-select>
					</a-form-item>
					<a-form-item label="备注">
						<a-textarea style="width:814px;" :autosize="{ minRows: 4, maxRows: 4 }"></a-textarea>
					</a-form-item>
					<a-form-item label="相关资料">
						<a-upload
							action="//jsonplaceholder.typicode.com/posts/"
							:multiple="true"
							:fileList="fileList"
							@change="handleChange"
						>
							<a-button>
								<a-icon type="upload"/>文件上传
							</a-button>&nbsp;&nbsp;支持文件类型：.pdf .jpg .png .doc .docx
						</a-upload>
					</a-form-item>
					<a-form-item style="display:block;text-align:right;">
						<a-button style="margin-right:12px;" @click="confirmCancel">取消</a-button>
						<a-button type="primary">保存</a-button>
					</a-form-item>
				</a-form>
				<!-- </a-tab-pane> -->
				<!-- <a-tab-pane tab="订单内容" key="2" forceRender>
						<a-form :form="form">
							<a-form-item  label="产品内容">
								<a-table :pagination="false" :columns="columns" :dataSource="data" bordered rowKey="id">
									<template
										v-for="col in ['deviceNo', 'deviceName', 'deviceState','organizeName', 'location', 'locationNo','deviceCategoryName', 'workerNames']"
										:slot="col"
										slot-scope="text, record, index"
									>
										<div :key="col">
											<a-input
												style="margin: -5px 0"
												:value="text"
												@change="e => handleChangeTable(e.target.value, record.id, col)"
											/>
										</div>
									</template>
									<template slot="deviceModel" slot-scope="text, record, index">
										<div>
											<a-date-picker style="width:100%"/>
										</div>
									</template>
									<template slot="operation" slot-scope="text, record, index">
										<div class="editable-row-operations">
											<span class="handle_style">
												<a-popconfirm title="确定删除吗？" @confirm="onDelete(record.id)" okText="确定" cancelText="取消">
													<a-popover placement="top">
														<template slot="content">
															<span>删除</span>
														</template>
														<a-icon type="delete" style="color:red;"/>
													</a-popover>
												</a-popconfirm>
											</span>
										</div>
									</template>
								</a-table>
								<span @click="handleAdd" style=" cursor: pointer;" class="handle_table">
									<a-icon type="plus-circle"/>&nbsp;添加一行
								</span>
							</a-form-item>
							<a-form-item :wrapper-col="{ span: 22,offset: 2 }">
								<a-button style="margin-right:12px;">取消</a-button>
								<a-button type="primary">提交</a-button>
							</a-form-item>
						</a-form>
				</a-tab-pane>-->
				<!-- </a-tabs> -->
			</div>
		</a-row>
	</div>
</template>

<script>
const columns = [
	{
		dataIndex: "deviceNo",
		title: "产品编号",
		width: 90,
		key: "deviceNo",
		scopedSlots: { customRender: "deviceNo" }
	},
	{
		dataIndex: "deviceName",
		title: "产品名称",
		width: 100,
		key: "deviceName",
		scopedSlots: { customRender: "deviceName" }
	},
	{
		dataIndex: "deviceState",
		key: "deviceState",
		title: "产品型号",
		width: 100,
		scopedSlots: { customRender: "deviceState" }
	},
	{
		dataIndex: "organizeName",
		key: "organizeName",
		title: "数量",
		width: 80,
		scopedSlots: { customRender: "organizeName" }
	},
	{
		dataIndex: "location",
		key: "location",
		title: "单位",
		width: 80,
		scopedSlots: { customRender: "location" }
	},
	{
		dataIndex: "locationNo",
		key: "locationNo",
		title: "单价(元)",
		width: 80,
		scopedSlots: { customRender: "locationNo" }
	},
	{
		dataIndex: "deviceCategoryName",
		key: "deviceCategoryName",
		title: "总价(元)",
		width: 70,
		scopedSlots: { customRender: "deviceCategoryName" }
	},
	{
		dataIndex: "deviceModel",
		key: "deviceModel",
		title: "预计交货日期",
		width: 140,
		scopedSlots: { customRender: "deviceModel" }
	},
	{
		dataIndex: "workerNames",
		key: "workerNames",
		title: "备注",
		width: 160,
		scopedSlots: { customRender: "workerNames" }
	},
	{
		dataIndex: "operation",
		key: "operation",
		title: "操作",
		width: 40,
		align: "center",
		scopedSlots: { customRender: "operation" }
	}
];
const data = [
	{
		id: 0,
		deviceNo: "111",
		deviceName: "11",
		deviceState: "11",
		organizeName: "11",
		location: "11",
		locationNo: "11",
		deviceCategoryName: "11",
		deviceModel: "11",
		workerNames: "11"
	},
	{
		id: 1,
		deviceNo: "111",
		deviceName: "11",
		deviceState: "11",
		organizeName: "11",
		location: "11",
		locationNo: "11",
		deviceCategoryName: "11",
		deviceModel: "11",
		workerNames: "11"
	},
	{
		id: 2,
		deviceNo: "111",
		deviceName: "11",
		deviceState: "11",
		organizeName: "11",
		location: "11",
		locationNo: "11",
		deviceCategoryName: "11",
		deviceModel: "11",
		workerNames: "11"
	}
];
const orderClassigy = [
	{
		value: 0,
		label: "销售订单"
	},
	{
		value: 1,
		label: "委外订单"
	},
	{
		value: 2,
		label: "空"
	}
];
const productionState = [
	{
		value: 0,
		label: "待生产"
	},
	{
		value: 1,
		label: "生产中"
	},
	{
		value: 2,
		label: "暂停"
	},
	{
		value: 3,
		label: "终止"
	},
	{
		value: 4,
		label: "完成"
	}
];
const productionRisk = [
	{
		value: 0,
		label: "无"
	},
	{
		value: 1,
		label: "加急"
	},
	{
		value: 2,
		label: "预警"
	},
	{
		value: 3,
		label: "变更"
	},
	{
		value: 4,
		label: "延时"
	},
	{
		value: 5,
		label: "其他"
	}
];
export default {
	name: "orderAdd",
	data() {
		return {
			count: 10000,
			data,
			columns,
			orderClassigy,
			productionState,
			productionRisk,
			form: this.$form.createForm(this),
			fileList: [
				{
					uid: "-1",
					name: "xxx.png",
					status: "done",
					url: "http://www.baidu.com"
				}
			]
		};
	},
	methods: {
		confirmCancel() {
			this.$emit("changeAddModal", false);
		},
		onDelete(key) {
			// if (this.selectedRowKeys.length < 1) {
			// 	this.$message.error("请选择要删除的项！");
			// 	return;
			// }
			const dataSource = [...this.data];
			this.data = dataSource.filter(item => item.id !== key);
		},
		handleAdd() {
			const { count, data } = this;
			const newData = {
				id: count,
				deviceNo: "",
				deviceName: "",
				deviceState: "",
				organizeName: "",
				location: "",
				locationNo: "",
				deviceCategoryName: "",
				deviceModel: "",
				workerNames: ""
			};
			this.data = [...data, newData];
			this.count = count + 1;
		},
		handleChange(value) {
			console.log(`selected ${value}`);
		},
		handleChangeTable(value, key, column) {
			const newData = [...this.data];
			const target = newData.filter(item => key === item.id)[0];
			if (target) {
				target[column] = value;
				this.data = newData;
			}
		}
	}
};
</script>
<style lang="less">
.add_order {
	.ant-form-item-label {
		width: 120px;
	}
	.content_case {
		// padding: 12px 0;
		// width: 80%;
		// margin-left: 5%;
		h4 {
			padding: 0 14px;
		}
		.ant-divider-horizontal {
			margin: 4px 0;
		}
		.ant-form-item {
			margin-bottom: 20px;
		}
	}
	.ant-table-thead > tr > th,
	.ant-table-tbody > tr > td {
		padding: 8px;
	}
	.handle_table {
		color: #096dd9;
		padding-right: 8px;
		&:hover {
			color: #40a9ff;
		}
	}
}
</style>
