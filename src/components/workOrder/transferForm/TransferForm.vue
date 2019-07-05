<template>
	<div class="transfer_form">
		<a-row style="line-height:50px;">
			<a-button @click="$router.back(-1)" icon="left">返回</a-button>
			<!-- <a-button type="primary" icon="plus-circle">保存</a-button> -->
		</a-row>
		<a-row class="content_case">
			<a-form :form="form">
				<a-form-item :label-col=" { span: 2 }" :wrapper-col="{ span: 22 }" label="工作令编号">
					<span></span>
				</a-form-item>
				<a-form-item :label-col=" { span: 2 }" :wrapper-col="{ span: 22 }" label="工作令名称">
					<span></span>
				</a-form-item>
				<a-form-item :label-col=" { span: 2 }" :wrapper-col="{ span: 22 }" label="移交单名称">
					<a-input></a-input>
				</a-form-item>
				<a-form-item :label-col=" { span: 2 }" :wrapper-col="{ span: 22 }" label="承制单位">
					<a-input></a-input>
				</a-form-item>
				<a-form-item :label-col=" { span: 2 }" :wrapper-col="{ span: 22 }" label="移交单">
					<a-tabs defaultActiveKey="1" @change="callback">
						<a-tab-pane tab="手动创建" key="1">
							<a-table :pagination="false" :columns="columns" :dataSource="data" bordered rowKey="id">
								<template
									v-for="col in ['deviceNo', 'deviceName', 'deviceState','organizeName', 'location','deviceCategoryName', 'workerNames']"
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
								<template slot="locationNo" slot-scope="text, record, index">
									<div>
										<a-upload
											name="file"
											:multiple="true"
											action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
											@change="handleChange"
										>
											<a-button>
												<a-icon type="upload"/>Click to Upload
											</a-button>
										</a-upload>
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
							<div
								@click="handleAdd"
								style=" cursor: pointer;color:#1890ff;margin-top:12px;"
								class="handle_table"
							>
								<a-icon type="plus-circle"/>&nbsp;添加一行
							</div>
						</a-tab-pane>
						<a-tab-pane tab="批量导入" key="2" forceRender>
							批量导入说明：
							<br>第1步：下载并填写模板
							<a>移交单模板.xls</a> ；
							<br>第2步：将图纸文件存放到文件夹，必须按序号命名，仅支持jpg|png格式；
							<br>第3步：导入模板；
							<br>第4步：导入图纸；
							<br>第5步：校对数据并提交保存。
							<a-row style="margin-top:12px;">
								<a-table :pagination="false" :columns="columns" :dataSource="data" bordered rowKey="id">
									<template
										v-for="col in ['deviceNo', 'deviceName', 'deviceState','organizeName', 'location','deviceCategoryName', 'workerNames']"
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
									<template slot="locationNo" slot-scope="text, record, index">
										<div>
											<a-upload
												name="file"
												:multiple="true"
												action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
												@change="handleChange"
											>
												<a-button>
													<a-icon type="upload"/>Click to Upload
												</a-button>
											</a-upload>
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
							</a-row>
							<a-row style="margin-top:12px;">
								<a-col :span="3">
									<a-upload
										name="file"
										:multiple="true"
										action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
										@change="handleChange"
									>
										<a-button>
											<a-icon type="upload"/>导入模板
										</a-button>
									</a-upload>
								</a-col>
								<a-col :span="3">
									<a-upload
										name="file"
										:multiple="true"
										action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
										@change="handleChange"
									>
										<a-button>
											<a-icon type="upload"/>导入图纸
										</a-button>
									</a-upload>
								</a-col>
							</a-row>
						</a-tab-pane>
					</a-tabs>
				</a-form-item>
				<a-form-item :wrapper-col="{ span: 22,offset: 2 }">
					<a-button style="margin-right:12px;">取消</a-button>
					<a-button type="primary">保存</a-button>
				</a-form-item>
			</a-form>
		</a-row>
	</div>
</template>
<script>
const columns = [
	{
		dataIndex: "deviceNo",
		title: "序号",
		width: 90,
		key: "deviceNo",
		scopedSlots: { customRender: "deviceNo" }
	},
	{
		dataIndex: "deviceName",
		title: "图号",
		width: 100,
		key: "deviceName",
		scopedSlots: { customRender: "deviceName" }
	},
	{
		dataIndex: "deviceState",
		key: "deviceState",
		title: "名称",
		width: 100,
		scopedSlots: { customRender: "deviceState" }
	},
	{
		dataIndex: "organizeName",
		key: "organizeName",
		title: "总数量",
		width: 80,
		scopedSlots: { customRender: "organizeName" }
	},
	{
		dataIndex: "deviceModel",
		key: "deviceModel",
		title: "要求完成时间",
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
		dataIndex: "locationNo",
		key: "locationNo",
		title: "图纸",
		width: 80,
		scopedSlots: { customRender: "locationNo" }
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
export default {
	data() {
		return {
			form: this.$form.createForm(this),
			columns,
			data,
			count: 10000
		};
	},
	methods: {
		handleChange(info) {
			if (info.file.status !== "uploading") {
				console.log(info.file, info.fileList);
			}
			if (info.file.status === "done") {
				this.$message.success(`${info.file.name} file uploaded successfully`);
			} else if (info.file.status === "error") {
				this.$message.error(`${info.file.name} file upload failed.`);
			}
		},
		callback(key) {
			console.log(key);
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
		}
	},
	created() {}
};
</script>

<style lang="less">
.transfer_form {
	.content_case {
		padding: 12px 0;
		width: 80%;
		margin-left: 5%;
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
}
</style>
