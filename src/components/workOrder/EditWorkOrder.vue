<template>
	<div class="edit_work_order">
		<a-form :form="form" layout="inline">
			<a-form-item label="关联订单">
				<a-input style="width:230px;" placeholder="请选择"></a-input>
			</a-form-item>
			<a-form-item label="加工类别">
				<a-input style="width:230px;"></a-input>
			</a-form-item>
			<a-form-item label="工作令号">
				<a-input style="width:230px;"></a-input>
			</a-form-item>
			<a-form-item label="工作令名称">
				<a-input style="width:230px;"></a-input>
			</a-form-item>
			<a-form-item label="负责人">
				<a-input style="width:230px;" placeholder="请选择负责人"></a-input>
			</a-form-item>
			<a-form-item label="备注">
				<a-textarea style="width:600px;" :autosize="{ minRows: 4, maxRows: 4 }"></a-textarea>
			</a-form-item>
			<a-form-item label="相关附件">
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
	</div>
</template>
<script>
export default {
	data() {
		return {
			form: this.$form.createForm(this),
			fileList: []
		};
	},
	methods: {
		confirmCancel() {
			this.$emit("changeEditModal", false);
		},
		handleChange(info) {
			let fileList = [...info.fileList];
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
			this.fileList = fileList;
		}
	}
};
</script>
<style lang="less">
.edit_work_order {
	.ant-form-item-label {
		width: 120px;
	}
	.ant-form-item {
		margin-bottom: 20px;
	}
}
</style>