<template>
	<div class="enterprise_edit">
		<a-form :form="form">
			<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 18 }" label="企业名称">
				<span></span>
			</a-form-item>
			<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 18 }" label="联系人">
				<a-input
					placeholder="填写姓名"
					v-decorator="[
                    'linkman',
                    {rules: [{ required: true, message: '填写联系人' }]}
                    ]"
				></a-input>
			</a-form-item>
			<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 18 }" label="手机号">
				<a-input
					placeholder="填写手机号（用于接收通知、找回密码等）"
					v-decorator="[
                    'phone',
                    {rules: [{ required: true, message: '填写手机号' }]}
                    ]"
				></a-input>
			</a-form-item>
			<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 18 }" label="企业账号">
				<span></span>
			</a-form-item>
			<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 18 }" label="营业执照">
				<a-upload
					action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
					listType="picture-card"
					:fileList="fileList"
					@preview="handlePreview"
					@change="handleChange"
					v-decorator="[
                    'logo',
                    {rules: [{ required: true, message: '上传营业执照' }]}
                    ]"
				>
					<div v-if="fileList.length < 1">
						<a-icon type="plus"/>
						<div class="ant-upload-text">Upload</div>
					</div>
				</a-upload>
				<a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
					<img alt="example" style="width: 100%" :src="previewImage">
				</a-modal>
			</a-form-item>
			<a-form-item :wrapper-col="{ span: 18,offset: 4 }" style="text-align: right;">
				<a-button style="margin-right:12px;" @click="confirmCancel">取消</a-button>
				<a-button type="primary" @click="handleSubmit">保存</a-button>
			</a-form-item>
		</a-form>
	</div>
</template>
<script>
export default {
	data() {
		return {
			previewVisible: false,
			form: this.$form.createForm(this),
			fileList: [],
			previewImage: ""
		};
	},
	methods: {
		confirmCancel() {
			this.$emit("changeEditModal", false);
		},
		handleCancel() {
			this.previewVisible = false;
		},
		handlePreview(file) {
			this.previewImage = file.url || file.thumbUrl;
			this.previewVisible = true;
		},
		handleChange({ fileList }) {
			this.fileList = fileList;
		},
		handleChange() {},
		handleSubmit(e) {
			e.preventDefault();
			this.form.validateFieldsAndScroll((err, values) => {
				if (!err) {
					console.log("Received values of form: ", values);
					this.$emit("changeEditModal", false);
				}
			});
		}
	}
};
</script>

<style lang="less">
@import url("../../assets/less/publicStyle.less");
.enterprise_edit {
}
</style>

