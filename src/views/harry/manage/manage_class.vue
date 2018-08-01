<style lang="less">
    @import '../../../styles/common.less';
    @import '../../tables/components/table.less';
</style>

<template>
    <div class="container">
        班级管理(harry)
        <Row class="margin-top-15">
            <Col span="24" >
                <Card >
                    <p slot="title" style="height:35px">
                        <Row class="height-200px">
                            <Col span="21">
                                <Icon type="pinpoint"></Icon>
                                管理各中心班级
                            </Col>
                            <Col span="3">
                                <i-button type="primary" @click="add">
                                    添加新班级
                                </i-button>
                            </Col>
                        </Row>
                        <Modal
                            v-model="addClassModal"
                            title="添加新班级"
                            @on-ok="addClass">
                            <p>
                                <Row class="margin-top-10">
                                    <Col span="4">
                                        班级名称：
                                    </Col>
                                    <Col span="18">
                                        <i-input v-model="className" placeholder="请输入班级名称,如AID1803..."></i-input>
                                    </Col>
                                </Row>
                            </p>
                        </Modal>
                    </p>
                    <!-- <div class="edittable-table-height-con">
                        <can-edit-table refs="teacher-manager-class" 
                        v-model="classData" 
                        :columns-list="classHead"
                        @on-change="handleChange"
                        @on-delete="handleDel"></can-edit-table>
                    </div> -->
                    <div class="edittable-con-1">
                        <can-edit-table refs="teacher-manager-class" 
                        @on-delete="handleDel" 
                        v-model="classData" 
                        :columns-list="classHead"></can-edit-table>
                    </div>
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
let $ = require('jquery');

export default {
    name: 'manage_class',
    components: {
        canEditTable
    },
    data(){
        return{
            classHead:[
                {
                    title: '序号',
                    type: 'index',
                    width: 70,
                    align: 'center'
                },
                {
                    title: '列表号',
                    key: 'id',
                    width: 80,
                    align: 'center'
                },
                {
                    title: '班级名称',
                    align: 'center',
                    key: 'classno',
                    // width: 200,
                    editable: true
                },
                {
                    title: '所属中心',
                    align: 'center',
                    key: 'cname',
                    width:200,
                    editable: true
                },
                {
                    title: '项目经理',
                    align: 'center',
                    key: 'proman',
                    width: 200,
                    editable: true
                },
                {
                    title: '是否激活',
                    align: 'center',
                    key: 'active',
                    width: 100,
                    // color:red
                    // editable: true
                },
                {
                    title: '操作',
                    align: 'center',
                    width: 190,
                    key: 'handle',
                    handle: ['delete']
                }
            ],
            classData: [
                {
                    proman:'杨艳新',
                    id:'3',
                    cname:`python中心`,
                    classno:'3333333333',
                    active:"是"
                }
            ],
            showCurrentTableData: false,
            addClassModal:false,
            loading: true,
            className:''
        }
    },
    methods: {
        getData () {
            // 获取班级列表
            axios.get(
                'userinfo/classes',{headers:{'Authorization':'JWT  '+Cookies.get('retoken')}}
            ).then((response)=>{
                console.log(response.data.data);
                let resData=response.data.data;
                let data=[];
                for(let i=0;i<resData.length;i++){
                    data[i]={};
                    data[i].classno=resData[i].classno;
                    data[i].cname=resData[i].center.cname;
                    if(resData[i].manager==null){
                        data[i].proman="班级未激活";
                    }else{
                        data[i].proman=resData[i].manager.username;
                    }
                    data[i].id=resData[i].id;
                    data[i].active=resData[i].active==true?"已激活":"否";
                }
                console.log(data);
                this.classData=data;
            })
        },
        handleDel (val,index) {
            // this.$Message.success('删除了第' + (index + 1) + '行数据');
            console.log(this.classData[index].id)
            axios.delete(
                'userinfo/classes',
                {
                    data:{"classid":this.classData[index].id},
                    headers:{'Authorization':'JWT  '+Cookies.get('retoken')}
                }
            ).then((response)=>{
                console.log(response.data)
                if(response.data.result==true){
                    this.$Message.success('删除班级成功');
                    this.getData();
                }
            })
        },
        // handleChange (val, index) {
        //     // this.$Message.success('修改了第' + (index + 1) + '行数据');
        //     console.log(val[index]);
        // },
        //添加新班级框
        add(){
            this.addClassModal=true;
        },
        //确定添加新班级
        addClass(){
            let param = new URLSearchParams();
            param.append("classno",this.className);
            axios.post(
                'userinfo/classes',param,
                {headers:{'Authorization':'JWT  '+Cookies.get('retoken')}}
            ).then((response)=>{
                console.log(response.data);
                if(response.data.result==true){
                    this.$Message.success('添加班级成功');
                    this.getData();
                }else{
                    console.log(response.data.error)
                    this.$Message.error('已存在该班级！'); 
                }
            })
        }
    },
    created () {
        this.getData();
    }
}
</script>