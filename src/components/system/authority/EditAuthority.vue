<template>
	<div class="edit_authority">
		<a-row style="line-height:50px;">
			<a-button @click="$router.back(-1)" icon="left">返回</a-button>
		</a-row>
		<a-row>
			<div class="content_case">
				<a-form :form="form">
					<a-form-item :label-col=" { span: 2 }" :wrapper-col="{ span: 22 }" label="角色名称">
						<a-input></a-input>
					</a-form-item>
					<a-form-item :label-col=" { span: 2 }" :wrapper-col="{ span: 22 }" label="备注">
						<a-textarea placeholder :autosize="{ minRows: 4, maxRows: 4 }"/>
					</a-form-item>
					<a-form-item :label-col=" { span: 2 }" :wrapper-col="{ span: 22 }" label="角色名称">
						<a-tree
							checkable
							@expand="onExpand"
							:expandedKeys="expandedKeys"
							:autoExpandParent="autoExpandParent"
							v-model="checkedKeys"
							:selectedKeys="selectedKeys"
							:treeData="treeData"
						/>
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
		title: "0-0",
		key: "0-0",
		children: [
			{
				title: "0-0-0",
				key: "0-0-0",
				children: [
					{ title: "0-0-0-0", key: "0-0-0-0" },
					{ title: "0-0-0-1", key: "0-0-0-1" },
					{ title: "0-0-0-2", key: "0-0-0-2" }
				]
			},
			{
				title: "0-0-1",
				key: "0-0-1",
				children: [
					{ title: "0-0-1-0", key: "0-0-1-0" },
					{ title: "0-0-1-1", key: "0-0-1-1" },
					{ title: "0-0-1-2", key: "0-0-1-2" }
				]
			},
			{
				title: "0-0-2",
				key: "0-0-2"
			}
		]
	},
	{
		title: "0-1",
		key: "0-1",
		children: [
			{ title: "0-1-0-0", key: "0-1-0-0" },
			{ title: "0-1-0-1", key: "0-1-0-1" },
			{ title: "0-1-0-2", key: "0-1-0-2" }
		]
	},
	{
		title: "0-2",
		key: "0-2"
	}
];
export default {
	data() {
		return {
			form: this.$form.createForm(this),
			treeData,
			expandedKeys: [],
			autoExpandParent: true,
			checkedKeys: [],
			selectedKeys: []
		};
	},
	methods: {
		onExpand(expandedKeys) {
			console.log("onExpand", expandedKeys);
			this.expandedKeys = expandedKeys;
			this.autoExpandParent = false;
		},
		onCheck(checkedKeys) {
			console.log("onCheck", checkedKeys);
			this.checkedKeys = checkedKeys;
		}
	}
};
</script>
<style lang="less">
.edit_authority {
	.content_case {
		padding: 12px 0;
		width: 80%;
		margin-left: 5%;
		.ant-divider-horizontal {
			margin: 4px 0;
		}
		.ant-form-item {
			margin-bottom: 20px;
		}
	}
}
</style>
