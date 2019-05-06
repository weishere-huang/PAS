<template>
	<div class="add_employee">
		<a-row style="line-height:50px;">
			<a-button @click="$router.back(-1)" icon="left">返回</a-button>
		</a-row>
		<a-row>
			<div class="content_case">
				<a-form :form="form">
					<a-form-item :label-col=" { span: 2 }" :wrapper-col="{ span: 22 }" label="员工编号">
						<a-input></a-input>
					</a-form-item>
					<a-form-item :label-col=" { span: 2 }" :wrapper-col="{ span: 22 }" label="姓名">
						<a-input></a-input>
					</a-form-item>
					<a-form-item :label-col=" { span: 2 }" :wrapper-col="{ span: 22 }" label="年龄">
						<a-input addonAfter="岁"></a-input>
					</a-form-item>
					<a-form-item :label-col=" { span: 2 }" :wrapper-col="{ span: 22 }" label="性别">
						<a-input></a-input>
					</a-form-item>
					<a-form-item :label-col=" { span: 2 }" :wrapper-col="{ span: 22 }" label="入职时间">
						<a-date-picker style="width:100%"/>
					</a-form-item>
					<a-form-item :label-col=" { span: 2 }" :wrapper-col="{ span: 22 }" label="以往工作年限">
						<a-input addonAfter="年"></a-input>
					</a-form-item>
					<a-form-item :label-col=" { span: 2 }" :wrapper-col="{ span: 22 }" label="所处班组">
						<a-tree-select
							:dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
							:treeData="treeData"
							placeholder="请选择"
							treeDefaultExpandAll
						>
							<span slot="title" slot-scope="{key, value}">{{value}}</span>
						</a-tree-select>
					</a-form-item>
					<a-form-item :label-col=" { span: 2 }" :wrapper-col="{ span: 22 }" label="只能/工种">
						<a-select showSearch placeholder="请选择" optionFilterProp="children">
							<a-select-option v-for="(item, index) in 10" :key="index" :value="item">{{item}}</a-select-option>
						</a-select>
					</a-form-item>
					<a-form-item :label-col=" { span: 2 }" :wrapper-col="{ span: 22 }" label="简历附件">
						<a-upload
							action="//jsonplaceholder.typicode.com/posts/"
							:multiple="true"
							:fileList="fileList"
							@change="handleChange"
						>
							<a-button>
								<a-icon type="upload"/>Upload
							</a-button>
						</a-upload>
					</a-form-item>
					<a-form-item :wrapper-col="{ span: 22,offset: 2 }">
						<a-button type="primary">提交</a-button>
					</a-form-item>
				</a-form>
			</div>
		</a-row>
	</div>
</template>
<script>
const treeData = [
	{
		title: "Node1",
		value: "0-0",
		key: "0-0",
		children: [
			{
				value: "0-0-1",
				key: "0-0-1",
				scopedSlots: {
					// custom title
					title: "title"
				}
			},
			{
				title: "Child Node2",
				value: "0-0-2",
				key: "0-0-2"
			}
		]
	},
	{
		title: "Node2",
		value: "0-1",
		key: "0-1"
	}
];
export default {
	data() {
		return {
			form: this.$form.createForm(this),
			treeData,
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
		handleChange(info) {
			let fileList = info.fileList;

			// 1. Limit the number of uploaded files
			//    Only to show two recent uploaded files, and old ones will be replaced by the new
			fileList = fileList.slice(-2);

			// 2. read from response and show file link
			fileList = fileList.map(file => {
				if (file.response) {
					// Component will show file.url as link
					file.url = file.response.url;
				}
				return file;
			});

			// 3. filter successfully uploaded files according to response from server
			fileList = fileList.filter(file => {
				if (file.response) {
					return file.response.status === "success";
				}
				return false;
			});

			this.fileList = fileList;
		}
	}
};
</script>
<style lang="less">
@border: 1px solid #dde2eb;
.add_employee {
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