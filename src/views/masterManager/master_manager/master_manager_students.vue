<style lang="less" scoped>
    @import '../../advanced-router/advanced-router.less';
</style>

<template>
    <div>
    <!-- 管理学生(班主任) -->
        <Row>
            <Card>
                <p slot="title">
                    <Icon type="ios-list"></Icon>
                    班级列表
                </p>
                <Row type="flex" justify="center" align="middle" class="advanced-router">
                    <Table :columns="classListColumns" :data="classListData" style="width: 100%;"></Table>
                </Row>
            </Card>
        </Row>
    </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios';
import Cookies from 'js-cookie';
export default {
    name: 'master_manager_students_index',
    data(){
        return{
            //班级表头
            classListColumns:[
                {
                    type: 'index',
                    title: '序号',
                    width: 60
                },
                {
                    title: '列表号',
                    key: 'class_id',
                    width:80,
                    align:'center'
                },
                {
                    title: '班级名称',
                    key: 'classno',
                    align: 'center'
                },
                {
                    title: '项目经理',
                    key: 'manager',
                    align: 'center'
                },
                {
                    title: '班主任',
                    key: 'master'
                },
                {
                    title: '所属中心',
                    key: 'center'
                },
                {
                    title: '学生信息详情',
                    key: 'show_more',
                    align: 'center',
                    render: (h, params) => {
                        return h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                    let query = {class_id: params.row.class_id};
                                    this.$router.push({
                                        name: 'class_student_detail',
                                        query: query
                                    });
                                }
                            }
                        }, '查看详情');
                    }
                },
                {
                    title: '修改基础信息',
                    key: 'show_more',
                    align: 'center',
                    render: (h, params) => {
                        return h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                    let query = {class_id: params.row.class_id};
                                    this.$router.push({
                                        name: 'modify_students_message',
                                        query: query
                                    });
                                }
                            }
                        }, '修改基础信息');
                    }
                },
                {
                    title: '修改学籍信息',
                    key: 'show_more',
                    align: 'center',
                    render: (h, params) => {
                        return h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                    let query = {class_id: params.row.class_id};
                                    this.$router.push({
                                        name: 'modify_students_status',
                                        query: query
                                    });
                                }
                            }
                        }, '修改学籍信息');
                    }
                }
            ],
            //班级列表信息
            classListData:[
                {
                    class_id:'1',
                    classno:'AID6666',
                    manager:'yikun',
                    master:'lvlu',
                    center:'大钟寺中心'
                }
            ],
        }
    },
    components:{
        
    },
    methods:{
        //获取班级列表信息，从了解详情跳转到班级学生的详情
        getData(){
            axios.get(
                'userinfo/classes',
                {headers:{'Authorization':'JWT  '+Cookies.get('retoken')}}
            ).then((response)=>{
                let resData=response.data.data;
                let data=[];
                for(let i=0;i<resData.length;i++){
                    data[i]={};
                    data[i].classno=resData[i].classno;
                    data[i].class_id=resData[i].id;
                    data[i].center=resData[i].center.cname;
                    data[i].master=resData[i].master.username;
                    data[i].manager=resData[i].manager.username;
                }
                this.classListData=data;
            })
        }
    },
    created(){
        this.getData();
    }
}
</script>