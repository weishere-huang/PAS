<template>
	<div class="order_select">
		<div style="margin-bottom:20px;">
			<a-input style="width:90%;" placeholder="订单编号/订单标题/客户名称"></a-input>
			<a-button type="primary">搜索</a-button>
		</div>
		<a-table
			rowKey="id"
			:columns="columns"
			:pagination="false"
			:dataSource="data"
			:rowSelection="rowSelection"
		></a-table>
		<span style="float:left;line-height:32px;margin-top:12px;color:#999999">*只能选择待产和生产中的订单！</span>
		<a-pagination
			style="padding-top:12px;text-align: right;"
			:defaultCurrent="current"
			:total="total"
			@change="onChange"
			@showSizeChange="onShowSizeChange"
			:showTotal="total => `共 ${total} 条`"
		/>
		<div style="margin-top:20px;text-align:right">
			<a-button>取消</a-button>
			<a-button type="primary">确认</a-button>
		</div>
	</div>
</template>
<script>
const columns = [
	{
		dataIndex: "deviceNo",
		title: "订单编号",
		width: "15%",
		key: "deviceNo"
	},
	{
		dataIndex: "deviceName",
		title: "订单标题",
		width: "20%",
		key: "deviceName"
	},
	{
		dataIndex: "deviceCategoryName",
		key: "deviceCategoryName",
		title: "订单状态",
		width: "15%"
	},
	{
		dataIndex: "organizeName",
		key: "organizeName",
		title: "客户名称",
		width: "45%"
	}
];
const data = [
	{
		id: "0",
		deviceNo: "111",
		deviceName: "11",
		deviceState: "11",
		organizeName: "11",
		location: "11",
		locationNo: "11",
		deviceCategoryName: "11",
		deviceModel: "1",
		workerNames: "0"
	},
	{
		id: "1",
		deviceNo: "111",
		deviceName: "11",
		deviceState: "11",
		organizeName: "11",
		location: "11",
		locationNo: "11",
		deviceCategoryName: "11",
		deviceModel: "3",
		workerNames: "2"
	},
	{
		id: "2",
		deviceNo: "111",
		deviceName: "11",
		deviceState: "11",
		organizeName: "11",
		location: "11",
		locationNo: "11",
		deviceCategoryName: "11",
		deviceModel: "0",
		workerNames: "1"
	}
];
const rowSelection = {
	type: "radio",
	onChange: (selectedRowKeys, selectedRows) => {
		console.log(
			`selectedRowKeys: ${selectedRowKeys}`,
			"selectedRows: ",
			selectedRows
		);
	},
	onSelect: (record, selected, selectedRows) => {
		console.log(record, selected, selectedRows);
	},
	onSelectAll: (selected, selectedRows, changeRows) => {
		console.log(selected, selectedRows, changeRows);
	}
};
export default {
	data() {
		return {
			rowSelection,
			data,
			columns,
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
		}
	}
};
</script>
