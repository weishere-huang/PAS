<template>
	<div class="edit_equipment">
		<a-row style="line-height:50px;">
			<a-button @click="$router.back(-1)" icon="left">返回</a-button>
		</a-row>
		<a-row>
			<div class="content_case">
				<a-form :form="form">
					<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="设备编号">
						<a-input></a-input>
					</a-form-item>
					<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="设备名称">
						<a-input></a-input>
					</a-form-item>
					<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="规格型号">
						<a-input></a-input>
					</a-form-item>
					<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="设备分类">
						<a-select placeholder="请选择" optionFilterProp="children">
							<a-select-option
								v-for="(item, index) in deviceClassigy"
								:key="index"
								:value="item.value"
							>{{item.label}}</a-select-option>
						</a-select>
					</a-form-item>
					<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="设备类别">
						<a-select showSearch placeholder="请选择" optionFilterProp="children">
							<a-select-option v-for="(item, index) in 10" :key="index" :value="item">{{item}}</a-select-option>
						</a-select>
					</a-form-item>
					<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="所属机构">
						<a-tree-select
							:dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
							:treeData="treeData"
							placeholder="请选择"
							treeDefaultExpandAll
						>
							<span slot="title" slot-scope="{key, value}">{{value}}</span>
						</a-tree-select>
					</a-form-item>
					<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="设备状态">
						<a-select showSearch placeholder="请选择" optionFilterProp="children">
							<a-select-option
								v-for="(item, index) in deviceState"
								:key="index"
								:value="item.value"
							>{{item.label}}</a-select-option>
						</a-select>
					</a-form-item>
					<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="负责人">
						<a-select mode="multiple" style="width: 100%" @change="handleChange" placeholder="请选择">
							<a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">{{(i + 9).toString(36) + i}}</a-select-option>
						</a-select>
					</a-form-item>
					<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="安装地点">
						<a-input></a-input>
					</a-form-item>
					<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="生产商">
						<a-input></a-input>
					</a-form-item>
					<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="生产商">
						<a-input></a-input>
					</a-form-item>
					<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="生产日期">
						<a-date-picker style="width:100%"/>
					</a-form-item>
					<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="购买日期">
						<a-date-picker style="width:100%"/>
					</a-form-item>
					<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="购买价格">
						<a-input></a-input>
					</a-form-item>
					<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="保修截止日期">
						<a-date-picker style="width:100%"/>
					</a-form-item>
					<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="相关资料"></a-form-item>
					<a-form-item :wrapper-col="{ span: 20,offset: 4 }">
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
const deviceClassigy = [
	{
		value: 0,
		label: "生产设备"
	},
	{
		value: 1,
		label: "非生产设备"
	},
	{
		value: 2,
		label: "辅助生产设备"
	},
	{
		value: 3,
		label: "检验检测设备"
	},
	{
		value: 4,
		label: "其他设备"
	}
];
const deviceState = [
	{
		value: 0,
		label: "在用"
	},
	{
		value: 1,
		label: "停用"
	},
	{
		value: 2,
		label: "出租"
	},
	{
		value: 3,
		label: "封存"
	},
	{
		value: 4,
		label: "报废"
	}
];
export default {
	data() {
		return {
			form: this.$form.createForm(this),
			treeData,
			deviceClassigy,
			deviceState
		};
	},
	methods: {
		handleChange(value) {
			console.log(`selected ${value}`);
		}
	}
};
</script>

<style lang="less">
@border: 1px solid #dde2eb;
.edit_equipment {
	.content_case {
		padding: 12px 0;
		width: 800px;
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
