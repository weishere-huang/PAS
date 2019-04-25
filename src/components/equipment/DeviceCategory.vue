<template>
	<div>
		<a-tree defaultExpandAll>
			<a-tree-node v-for="(item, index) in treeData" :key="index" :title="item.title">
				<a-tree-node v-for="(item1, index1) in item.children" :key="index1" :title="item1.title"></a-tree-node>
			</a-tree-node>
		</a-tree>
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
		children: [
			{ title: "leaf", key: "0-0-0", slots: { icon: "meh" } },
			{ title: "leaf", key: "0-0-1", scopedSlots: { icon: "custom" } }
		]
	}
];
export default {
	data() {
		return {
			treeData
		};
	}
};
</script>
