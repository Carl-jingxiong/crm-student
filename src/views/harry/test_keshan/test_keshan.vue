<style lang="less">
    @import '../../../styles/common.less';
    @import '../../tables/components/table.less';
</style>

<template>
    <div class="container">
        测试页面-可删
        <i-table border :content="self" :columns="columns7" :data="data6"></i-table>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: 'test_keshan_index',
    data(){
        return{
            self: this,
            columns7: [
                {
                    title: '姓名',
                    key: 'name',
                    render (row, column, index) {
                        return `<Icon type="person"></Icon> <strong>${row.name}</strong>`;
                    }
                },
                {
                    title: '年龄',
                    key: 'age'
                },
                {
                    title: '地址',
                    key: 'address'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render (row, column, index) {
                        return `<i-button type="primary" size="small" @click="show(${index})">查看</i-button> <i-button type="error" size="small" @click="remove(${index})">删除</i-button>`;
                    }
                }
            ],
            data6: [
                {
                    name: '王小明',
                    age: 18,
                    address: '北京市朝阳区芍药居'
                },
                {
                    name: '张小刚',
                    age: 25,
                    address: '北京市海淀区西二旗'
                },
                {
                    name: '李小红',
                    age: 30,
                    address: '上海市浦东新区世纪大道'
                },
                {
                    name: '周小伟',
                    age: 26,
                    address: '深圳市南山区深南大道'
                }
            ]
            
        }
    },
    methods: {
        show (index) {
            this.$Modal.info({
                title: '用户信息',
                content: `姓名：${this.data6[index].name}<br>年龄：${this.data6[index].age}<br>地址：${this.data6[index].address}`
            })
        },
        remove (index) {
            this.data6.splice(index, 1);
        }
    },
    components:{

    }
}
</script>