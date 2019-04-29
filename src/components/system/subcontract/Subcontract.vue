<template>
	<div class="subcontract_list">
		<a-col :span="24" style="padding:0 20px;">
			<a-row>
				<div style="line-height:50px;">
					<a-col :span="8">
						<a-button type="primary" @click="modalNewVisible=true">
							<a-icon type="plus-circle"/>添加
						</a-button>
					</a-col>
					<a-col :span="16" style="text-align:right">关键字：
						<a-input type="text" style="width:300px" placeholder="委外单位名称，联系人，电话"></a-input>
						<a-button type="primary" icon="search">搜索</a-button>
					</a-col>
				</div>
				<a-modal
					title="新增委外单位"
					:maskClosable="false"
					centered
					v-model="modalNewVisible"
					@ok="() => modalNewVisible = false"
					@cancel="form.resetFields()"
					width="600px"
				>
					<a-form :form="form">
						<a-form-item :label-col=" { span: 6 }" :wrapper-col="{ span: 18 }" label="委外单位名称">
							<a-input v-decorator="['processName',{rules: [{ required: true, message: '请填写委外单位名称' }]}]"></a-input>
						</a-form-item>
						<a-form-item :label-col=" { span: 6 }" :wrapper-col="{ span: 18 }" label="委外联系人">
							<a-input v-decorator="['processName',{rules: [{ required: true, message: '请填写委外联系人' }]}]"></a-input>
						</a-form-item>
						<a-form-item :label-col=" { span: 6 }" :wrapper-col="{ span: 18 }" label="委外联系人电话">
							<a-input v-decorator="['processName',{rules: [{ required: true, message: '请填写委外联系人电话' }]}]"></a-input>
						</a-form-item>
						<a-form-item :label-col=" { span: 6 }" :wrapper-col="{ span: 18 }" label="备注">
							<a-textarea :autosize="{ minRows: 4, maxRows: 4 }"></a-textarea>
						</a-form-item>
					</a-form>
				</a-modal>
				<a-modal
					title="修改委外单位"
					:maskClosable="false"
					centered
					v-model="modalEditVisible"
					@ok="() => modalEditVisible = false"
					@cancel="form.resetFields()"
					width="600px"
				>
					<a-form :form="form">
						<a-form-item :label-col=" { span: 6 }" :wrapper-col="{ span: 18 }" label="委外单位名称">
							<a-input v-decorator="['processName',{rules: [{ required: true, message: '请填写委外单位名称' }]}]"></a-input>
						</a-form-item>
						<a-form-item :label-col=" { span: 6 }" :wrapper-col="{ span: 18 }" label="委外联系人">
							<a-input v-decorator="['processName',{rules: [{ required: true, message: '请填写委外联系人' }]}]"></a-input>
						</a-form-item>
						<a-form-item :label-col=" { span: 6 }" :wrapper-col="{ span: 18 }" label="委外联系人电话">
							<a-input v-decorator="['processName',{rules: [{ required: true, message: '请填写委外联系人电话' }]}]"></a-input>
						</a-form-item>
						<a-form-item :label-col=" { span: 6 }" :wrapper-col="{ span: 18 }" label="备注">
							<a-textarea :autosize="{ minRows: 4, maxRows: 4 }"></a-textarea>
						</a-form-item>
					</a-form>
				</a-modal>
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
		title: "委外单位名称",
		width: 300,
		key: "deviceNo"
	},
	{
		dataIndex: "deviceName",
		title: "委外联系人",
		width: 120,
		key: "deviceName"
	},
	{
		dataIndex: "deviceState",
		key: "deviceState",
		title: "委外联系人电话",
		width: 120,
		scopedSlots: { customRender: "deviceState" }
	},
	{
		dataIndex: "organizeName",
		key: "organizeName",
		title: "备注",
		width: 200
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
		width: 100,
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
	},
	created() {},
	watch: {}
};
</script>
