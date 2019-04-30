<template>
	<div class="admin_list">
		<a-col :span="24" style="padding:0 20px;">
			<a-row>
				<div style="line-height:50px;">
					<a-col :span="8">
						<a-button type="primary" @click="modalNewVisible=true">
							<a-icon type="plus-circle"/>添加
						</a-button>
					</a-col>
				</div>
				<a-modal
					title="新增管理员"
					:maskClosable="false"
					centered
					v-model="modalNewVisible"
					@ok="() => modalNewVisible = false"
					@cancel="form.resetFields()"
				>
					<a-form :form="form">
						<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="账号">
							<a-input v-decorator="['userName',{rules: [{ required: true, message: '请填写账号' }]}]"></a-input>
						</a-form-item>
						<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="密码">
							<a-input
								type="password"
								v-decorator="['password',{rules: [{ required: true, message: '请填写密码' }]}]"
							></a-input>
						</a-form-item>
						<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="确认密码">
							<a-input type="password"></a-input>
						</a-form-item>
						<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="绑定手机">
							<a-input></a-input>
						</a-form-item>
						<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="分配角色">
							<a-select placeholder="请选择" optionFilterProp="children">
								<a-select-option v-for="(item, index) in 10" :key="index" :value="item">{{item}}</a-select-option>
							</a-select>
						</a-form-item>
					</a-form>
				</a-modal>
				<a-modal
					:maskClosable="false"
					title="修改管理员"
					centered
					v-model="modalEditVisible"
					@ok="() => modalEditVisible = false"
					@cancel="form.resetFields()"
				>
					<a-form :form="form">
						<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="账号">
							<span></span>
						</a-form-item>
						<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="密码">
							<a-input type="password"></a-input>
						</a-form-item>
						<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="确认密码">
							<a-input type="password"></a-input>
						</a-form-item>
						<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="绑定手机">
							<a-input></a-input>
						</a-form-item>
						<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="分配角色">
							<a-select placeholder="请选择" optionFilterProp="children">
								<a-select-option v-for="(item, index) in 10" :key="index" :value="item">{{item}}</a-select-option>
							</a-select>
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
							<span class="handle_style">
								<a-popover placement="top">
									<template slot="content">
										<span>修改</span>
									</template>
									<a-icon type="edit" @click="() => modalEditVisible = true"/>
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
										<a-icon type="delete" @click/>
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
		title: "账号",
		width: 200,
		key: "deviceNo"
	},
	{
		dataIndex: "deviceName",
		title: "绑定手机",
		width: 160,
		key: "deviceName"
	},
	{
		dataIndex: "deviceState",
		key: "deviceState",
		title: "绑定角色",
		width: 160,
		scopedSlots: { customRender: "deviceState" }
	},
	{
		dataIndex: "organizeName",
		key: "organizeName",
		title: "最近登录时间",
		width: 140
	},
	{
		dataIndex: "state",
		key: "state",
		title: "状态",
		width: 80,
		scopedSlots: { customRender: "state" }
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
			columns,
			data,
			current: 1,
			pageSize: 10,
			total: 50,
			modalNewVisible: false,
			modalEditVisible: false
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
		}
	}
};
</script>
<style lang="less">
</style>

