<style lang="less">
    @import '../../../styles/common.less';
    @import '../../tables/components/table.less';
</style>

<template>
    <div class="container">
        管理项目经理(教学经理页面)
        <Row class="margin-top-15">
            <Col span="24" >
                <Card >
                    <p slot="title" style="height:35px">
                        <Row class="height-200px">
                            <Col span="21">
                                <Icon type="pinpoint"></Icon>
                                管理项目经理
                            </Col>
                            <Col span="3">
                                <i-button type="primary" @click="add">
                                    添加项目经理
                                </i-button>
                            </Col>
                        </Row>
                        <Modal
                            v-model="addProjectModal"
                            title="添加项目经理"
                            @on-ok="addProject">
                            <p>
                                <Row class="margin-top-10">
                                    <Col span="6">
                                        项目经理姓名：
                                    </Col>
                                    <Col span="18">
                                        <i-input v-model="proName" placeholder="请输入项目经理姓名"></i-input>
                                    </Col>
                                </Row>
                                <Row  class="margin-top-10">
                                    <Col span="6">
                                        电话：
                                    </Col>
                                    <Col span="18">
                                        <i-input v-model="proTel" placeholder="请输入电话"></i-input>
                                    </Col>
                                </Row>
                                <Row class="margin-top-10">
                                    <Col span="6">
                                        邮箱：
                                    </Col>
                                    <Col span="18">
                                        <i-input v-model="proEmail" placeholder="请输入邮箱"></i-input>
                                    </Col>
                                </Row>
                                <Row class="margin-top-10">
                                    <Col span="6">
                                        所属中心：
                                    </Col>
                                    <Col span="18">
                                        <i-select :model.sync="centerid" @on-change="centerChange">
                                            <i-option v-for="item in centerList" :value="item.id">{{item.cname}}</i-option>
                                        </i-select>
                                    </Col>
                                </Row>
                                <Row class="margin-top-10">
                                    <Col span="6">
                                        领导：
                                    </Col>
                                    <Col span="18">
                                        <i-select :model.sync="leaderid" @on-change="leaderChange">
                                            <i-option v-for="item in leaderList" :value="item.id">{{item.username}}</i-option>
                                        </i-select>
                                    </Col>
                                </Row>
                                <Row class="margin-top-10">
                                    <Col span="6">
                                        系统登录名：
                                    </Col>
                                    <Col span="18">
                                        <i-input v-model="loginname" placeholder="请输入后端管理系统登录名"></i-input>
                                    </Col>
                                </Row>
                            </p>
                        </Modal>
                    </p>
                    <div class="edittable-table-height-con">
                        <can-edit-table refs="teacher-manager-project" 
                        v-model="projectData" 
                        :columns-list="projectHead"
                        @on-change="handleChange"
                        @on-delete="handleDel"></can-edit-table>
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
    name: 'manage_projct_index',
    components: {
        canEditTable
    },
    data () {
        return {
            projectHead:[
                {
                    title: '序号',
                    type: 'index',
                    width: 50,
                    align: 'center'
                },
                {
                    title: '列表号',
                    key: 'id',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '项目经理',
                    align: 'center',
                    key: 'username',
                    width: 100,
                    editable: true
                },
                {
                    title: '电话',
                    align: 'center',
                    key: 'tel',
                    width:140,
                    editable: true
                },
                {
                    title: '邮箱',
                    align: 'center',
                    key: 'uemail',
                    width: 180,
                    editable: true
                },
                {
                    title: '所属中心',
                    align: 'center',
                    key: 'cname',
                    width: 150,
                    // editable: true
                },
                {
                    title: '上级领导',
                    align: 'center',
                    key: 'leader',
                    // width: 100,
                    // editable: true
                },
                {
                    title: '系统登录名',
                    align: 'center',
                    key: 'loginname',
                    // width: 150,
                    // editable: true
                },
                {
                    title: '操作',
                    align: 'center',
                    width: 190,
                    key: 'handle',
                    handle: ['edit', 'delete']
                }
            ],
            projectData: [
                {
                    username:'杨艳新',
                    uemail:'akajdhlf@skdjhf',
                    ads:'中坤广场',
                    id:'3',
                    cname:`python中心`,
                    tel:'3333333333',
                    leader:'harry',
                }
            ],
            centerList:[],
            leaderList:[],
            showCurrentTableData: false,
            addProjectModal:false,
            loading: true,
            proName:'',
            proTel:'',
            proEmail:'',
            proLeader:'',
            loginname:'',
            centerid:'',
            leaderid:'',
        };
    },
    methods: {
        getData () {
            // 获取项目经理列表
            axios.get(
                'userinfo/manager',{headers:{'Authorization':'JWT  '+Cookies.get('retoken')}}
            ).then((response)=>{
                console.log(response.data.data);
                let resData=response.data.data;
                let data=[];
                for(let i=0;i<resData.length;i++){
                    data[i]={};
                    data[i].username=resData[i].username;
                    data[i].uemail=resData[i].uemail;
                    data[i].cname=resData[i].center.cname;
                    data[i].tel=resData[i].tel;
                    data[i].leader=resData[i].leader.username;
                    data[i].id=resData[i].id;
                    data[i].loginname=resData[i].loginname;
                }
                this.projectData=data;
            })
        },
        handleDel (val,index) {
            // this.$Message.success('删除了第' + (index + 1) + '行数据');

            console.log(this.projectData[index].id)
            axios.delete(
                'userinfo/manager',
                {
                    data:{"managerid":this.projectData[index].id},
                    headers:{'Authorization':'JWT  '+Cookies.get('retoken')}
                }
            ).then((response)=>{
                console.log(response.data)
                if(response.data.result==true){
                    this.getData();
                }
            })
        },
        // handleCellChange (val, index, key) {
        //     this.$Message.success('修改了第 ' + (index + 1) + ' 行列名为 ' + key + ' 的数据');
        // },
        handleChange (val, index) {
            // this.$Message.success('修改了第' + (index + 1) + '行数据');
            console.log(val[index]);
            let param = new URLSearchParams();
            param.append("managerid",val[index].id);
            param.append("manname",val[index].username);
            param.append("tel",val[index].tel);
            param.append("email",val[index].uemail);
            axios.put(
                'userinfo/manager',param,
                {
                    headers:{'Authorization':'JWT  '+Cookies.get('retoken')}
                }
            ).then((response)=>{
                if(response.data.result==true){
                    this.getData();
                }
            })
        },
        //添加项目经理框
        add(){
            //请求中心列表加载
            this.addProjectModal=true;
            axios.get(
                'userinfo/center',
                {
                    headers:{'Authorization':'JWT  '+Cookies.get('retoken')}
                }
            ).then((response)=>{
                console.log(response.data.data);
                this.centerList=response.data.data;
            });
            //请求项目经理的领导列表
            axios.get(
                'daily/aboutleader',
                {
                    headers:{'Authorization':'JWT  '+Cookies.get('retoken')},
                    params:{"add":1}
                }
            ).then((response)=>{
                console.log(response.data.data);
                this.leaderList=response.data.data;
            })
        },
        //添加项目经理参数
        addProject(){
            let param = new URLSearchParams();
            param.append("manname",this.proName);
            param.append("email",this.proEmail);
            param.append("centerid",this.centerid);
            param.append("leaderid",this.leaderid);
            param.append("tel",this.proTel);
            param.append("loginname",this.loginname);
            axios.post(
                'userinfo/manager',param,
                {headers:{'Authorization':'JWT  '+Cookies.get('retoken')}}
            ).then((response)=>{
                if(response.data.result==true){
                    this.$Message.success('添加项目经理成功');
                    this.getData();
                }else{
                    console.log(response.data.error)
                    this.$Message.error(`系统登录名重复！请更换登录名！`);
                }
            })
        },
        centerChange(val){
            console.log(val);
            this.centerid=val;
        },
        leaderChange(val){
            console.log(val);
            this.leaderid=val;
        }
    },
    created () {
        this.getData();
    }
};
</script>