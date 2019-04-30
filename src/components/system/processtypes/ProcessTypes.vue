<template>
	<div class="process_types">
		<a-col :span="24" style="padding:0 20px;">
			<a-row>
				<div style="line-height:50px;">
					<a-col :span="8">
						<a-button type="primary" @click="modalNewVisible=true">
							<a-icon type="plus-circle"/>添加
						</a-button>
					</a-col>
					<a-col :span="16" style="text-align:right">关键字：
						<a-input type="text" style="width:300px" placeholder="工序类型"></a-input>
						<a-button type="primary" icon="search">搜索</a-button>
					</a-col>
				</div>
				<a-modal
					title="新增工序类型"
					:maskClosable="false"
					centered
					v-model="modalNewVisible"
					@ok="() => modalNewVisible = false"
					@cancel="form.resetFields()"
				>
					<a-form :form="form">
						<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="工序名称">
							<a-input v-decorator="['processName',{rules: [{ required: true, message: '请填写工序名称' }]}]"></a-input>
						</a-form-item>
						<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="备注">
							<a-textarea :autosize="{ minRows: 4, maxRows: 4 }"></a-textarea>
						</a-form-item>
					</a-form>
				</a-modal>
				<a-modal
					title="修改工序类型"
					:maskClosable="false"
					centered
					v-model="modalEditVisible"
					@ok="() => modalEditVisible = false"
					@cancel="form.resetFields()"
				>
					<a-form :form="form">
						<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="工序名称">
							<a-input v-decorator="['processName',{rules: [{ required: true, message: '请填写工序名称' }]}]"></a-input>
						</a-form-item>
						<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="备注">
							<a-textarea :autosize="{ minRows: 4, maxRows: 4 }"></a-textarea>
						</a-form-item>
					</a-form>
				</a-modal>
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
</template>
<script>
const columns = [
	{
		dataIndex: "deviceNo",
		title: "工序类型",
		width: 400,
		key: "deviceNo"
	},
	{
		dataIndex: "deviceName",
		title: "备注",
		width: 240,
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
			form: this.$form.createForm(this),
			modalNewVisible: false,
			modalEditVisible: false,
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
			this.modalEditVisible = true;
		}
	}
};
</Script>