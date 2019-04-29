<template>
	<div class="device_category">
		<a-tree :treeData="treeData" defaultExpandAll>
			<template slot="title" slot-scope="{title}">
				<span class="item_case">
					{{title}}
					&nbsp;&nbsp;&nbsp;&nbsp;
					<span class="show_icon" @click.stop>
						<a-popover placement="top">
							<template slot="content">
								<span>添加同级</span>
							</template>
							<a-icon class="icon_style" type="plus-circle" @click="modalEquativeVisible=true"/>
						</a-popover>&nbsp;&nbsp;
						<a-popover placement="top">
							<template slot="content">
								<span>添加子级</span>
							</template>
							<a-icon class="icon_style" type="plus-circle" @click="modalSublevelVisible=true"/>
						</a-popover>&nbsp;&nbsp;
						<a-popover placement="top">
							<template slot="content">
								<span>修改</span>
							</template>
							<a-icon class="icon_style" type="edit" @click="modalEditVisible=true"/>
						</a-popover>&nbsp;&nbsp;
						<a-popover placement="top">
							<template slot="content">
								<span>删除</span>
							</template>
							<a-icon class="icon_style" type="delete"/>
						</a-popover>
					</span>
				</span>
			</template>
		</a-tree>
		<a-modal
			title="新增同级分类"
			:maskClosable="false"
			centered
			v-model="modalEquativeVisible"
			@ok="() => modalEquativeVisible = false"
			@cancel="form.resetFields()"
		>
			<a-form :form="form">
				<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="分类名称">
					<a-input v-decorator="['processName',{rules: [{ required: true, message: '请填写分类名称' }]}]"></a-input>
				</a-form-item>
			</a-form>
		</a-modal>
		<a-modal
			title="新增子级分类"
			:maskClosable="false"
			centered
			v-model="modalSublevelVisible"
			@ok="() => modalSublevelVisible = false"
			@cancel="form.resetFields()"
		>
			<a-form :form="form">
				<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="分类名称">
					<a-input v-decorator="['processName',{rules: [{ required: true, message: '请填写分类名称' }]}]"></a-input>
				</a-form-item>
			</a-form>
		</a-modal>
		<a-modal
			title="修改分类"
			:maskClosable="false"
			centered
			v-model="modalEditVisible"
			@ok="() => modalEditVisible = false"
			@cancel="form.resetFields()"
		>
			<a-form :form="form">
				<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="分类名称">
					<a-input v-decorator="['processName',{rules: [{ required: true, message: '请填写分类名称' }]}]"></a-input>
				</a-form-item>
			</a-form>
		</a-modal>
	</div>
</template>
<script>
const treeData = [
	{
		title: "parent 1",
		key: "0-0",
		slots: {
			icon: "smile",
			title: "aaaa"
		},
		scopedSlots: { title: "title" },
		children: [
			{
				title: "leaf",
				key: "0-0-0",
				scopedSlots: { title: "title" },
				slots: { icon: "meh" }
			},
			{
				title: "leaf",
				key: "0-0-1",
				scopedSlots: { icon: "custom", title: "title" }
			}
		]
	}
];
export default {
	data() {
		return {
			form: this.$form.createForm(this),
			modalEquativeVisible: false,
			modalSublevelVisible: false,
			modalEditVisible: false,
			treeData
		};
	}
};
</script>
<style lang="less">
@border: 1px solid #dde2eb;
.device_category {
	.ant-tree li .ant-tree-node-content-wrapper {
		line-height: 32px;
		height: 32px;
		cursor: default;
	}
	.ant-tree-node-content-wrapper {
		width: 98%;
		display: inline-block;
		&:hover {
			.show_icon {
				display: inline-block;
			}
		}
	}
	.item_case {
		width: 100%;
		.show_icon {
			display: none;
			padding: 0 4px;
			.icon_style {
				font-size: 14px;
				cursor: pointer;
			}
		}
	}
}
</style>