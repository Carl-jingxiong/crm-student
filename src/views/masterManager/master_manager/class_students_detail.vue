<style lang="less">
    @import '../../../styles/common.less';
    @import '../../tables/components/table.less';
    @import '../../advanced-router/advanced-router.less';
</style>

<template>
    <div>
        班级学生详情(班主任)
        <Row class="margin-top-15">
            <Col span="24" >
                <Card >
                    <p slot="title">
                        <Row class="height-200px">
                            <Col span="4">
                                <Icon type="pinpoint"></Icon>
                                学生详情
                            </Col>
                            <Col span="8">
                                {{classname}}
                            </Col>
                        </Row>
                    </p>
                    <!-- 学生详情展示表格 -->
                    <Table :columns="studentHead" :data="studentData"></Table>
                </Card> 
            </Col>
        </Row>
    </div>
</template>

<script type="text/ecmascript-6">
import canEditTable from '../../tables/components/canEditTable';
import tableData from '../../tables/components/table_data.js';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Modal } from 'iview';
import expandRow from './component/expandRow';

export default {
    name: 'class_student_detail',
    components:{
        canEditTable,
        expandRow
    },
    data(){
        return{
            studentHead: [
                {
                    type: 'expand',
                    width: 50,
                    render: (h, params) => {
                        return h(expandRow, {
                            props: {
                                row: params.row
                            }
                        });
                    }
                },
                {
                    title: '姓名',
                    key: 'sname'
                },
                {
                    title: '年龄',
                    key: 'age'
                },
                {
                    title: '性别',
                    key: 'sex'
                },
                {
                    title: '学历',
                    key: 'edu'
                },
                {
                    title: '手机号',
                    key: 'mobile'
                },
                {
                    title: 'QQ号',
                    key: 'QQ'
                }
            ],
            studentData: [
                {
                    sname: '王小明',
                    age: 18,
                    sex:'男',
                    edu:'统招本科',
                    mobile: '938457093248705284',
                    QQ:'287349837',

                    classes:"AID",
                    major: '系',
                    uname:'登录名',
                    remark:'这是备注',
                    university:'家里蹲大学',
                    workbg:'5年'
                }
            ],
            showCurrentTableData: false,
            class_id:'',
            classname:''
        }
    },
    methods: {
        init(){
            this.class_id=this.$route.query.class_id;
            this.getData();
        },
        getData () {
            // 获取学生列表
            axios.get(
                'student/stuedit',
                {
                    headers:{'Authorization':'JWT  '+Cookies.get('retoken')},
                    params:{'classid':this.class_id}
                }
            ).then((response)=>{
                this.studentData=response.data.data;
                this.classname=response.data.classname;
            })
        }
    },
    beforeMount(){
        this.init();
    },
    watch: {
        '$route' () {
            this.init();
        }
    }
    
}
</script>