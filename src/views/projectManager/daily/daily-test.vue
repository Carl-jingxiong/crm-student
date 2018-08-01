<template>
    <div class="container">
        <!-- 日报 -->
        <Row>
            <Col span="24" >
                <Card>
                    <div class="edittable-con-1">
                        <can-edit-table refs="table1" @on-delete="handleDel" v-model="tableData" :columns-list="columnsList"></can-edit-table>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script type="text/ecmascript-6">
import canEditTable from '../../tables/components/canEditTable.vue';
import axios from 'axios';
export default {
    name: 'daily_index',
    data(){
        return{
            columnsList:[
                {
                    title: '序号',
                    type: 'index',
                    width: 80,
                    align: 'center'
                },
                {
                    title: '日期',
                    align: 'center',
                    key: 'name'
                },
                {
                    title: '性别',
                    align: 'center',
                    key: 'sex'
                },
                {
                    title: '岗位',
                    align: 'center',
                    key: 'work',
                    editable: true
                },
                {
                    title: '操作',
                    align: 'center',
                    width: 120,
                    key: 'handle',
                    handle: ['delete']
                }
            ],
            tableData:[
                {
                    name: 'Aresn',
                    sex: '男',
                    work: '前端开发'
                },
                {
                    name: 'Lison',
                    sex: '男',
                    work: '前端开发'
                },
                {
                    name: 'lisa',
                    sex: '女',
                    work: '程序员鼓励师'
                }
            ]
        }
    },
    components:{
        canEditTable
    },
    methods:{
        handleDel(){},
    },
    beforeCreate(){
        // axios.get('/daily/dailyedit/').then((response)=>{
        //     console.log(response)
        // })

    }
}
</script>