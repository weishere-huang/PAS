<template>
	<div class="add_employee">
		<a-row style="line-height:50px;">
			<a-button @click="$router.back(-1)" icon="left">返回</a-button>
		</a-row>
		<a-row>
			<div class="content_case">
				<a-form :form="form">
					<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="员工编号">
						<a-input></a-input>
					</a-form-item>
					<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="姓名">
						<a-input></a-input>
					</a-form-item>
					<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="年龄">
						<a-input></a-input>
					</a-form-item>
					<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="性别">
						<a-input></a-input>
					</a-form-item>
					<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="入职时间">
						<a-input></a-input>
					</a-form-item>
					<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="以往工作年限">
						<a-input></a-input>
					</a-form-item>
					<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="所处班组">
						<a-input></a-input>
					</a-form-item>
					<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="只能/工种">
						<a-input></a-input>
					</a-form-item>
					<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="简历附件">
						<a-input></a-input>
					</a-form-item>
				</a-form>
			</div>
		</a-row>
	</div>
</template>
<script>
export default {
	data() {
		return {
			form: this.$form.createForm(this)
		};
	}
};
</script>
<style lang="less">
@border: 1px solid #dde2eb;
.add_employee {
	.content_case {
		padding: 12px 0;
		width: 60%;
		margin-left: 10%;
		h4 {
			padding: 0 14px;
		}
		.ant-divider-horizontal {
			margin: 4px 0;
		}
		.ant-form-item {
			margin-bottom: 16px;
		}
	}
}
</style>