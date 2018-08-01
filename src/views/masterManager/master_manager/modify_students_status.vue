<style lang="less" scoped>
    @import '../../../styles/common.less';
    @import '../../tables/components/table.less';
    .classes-message-table{
        border-collapse:collapse;
        tr{
            width:100%;
            padding:10px 10px;
            td{
                width:20%;
                border:1px solid #EBEAEA;
                text-align: center;
                padding:7px 0;
            }
        }
    }
</style>

<template>
    <div class="container">
        <Row class="margin-top-15">
            <Col span="24" >
                <Card >
                    <p slot="title" >
                        <Row class="height-200px">
                            <Col span="4">
                                <Icon type="pinpoint"></Icon>
                                管理班级
                            </Col>
                            <Col>
                                {{classname}}
                            </Col>
                        </Row>
                        <Modal
                            v-model="retardModal"
                            title="激活新班级"
                            @on-ok="retardationOK">
                            <p>
                                <Row class="margin-top-10">
                                    <Col span="4">
                                        选择留级到：
                                    </Col>
                                    <Col span="20">
                                        <Select 
                                        @on-change="toClassChange" 
                                        :model.sync="toClassid"
                                        style="width:130px">
                                            <Option :key="index" v-for="(item,index) in classList" :value="item.id">{{item.classno}}</Option>
                                        </Select>
                                    </Col>
                                </Row>
                            </p>
                        </Modal>
                    </p>
                    <table class="classes-message-table">
                        <tr style="background-color:#F9F8F8">
                            <td><b>学生姓名</b></td>
                            <td style="width:200px;">留级操作</td>
                            <td style="width:200px;">休学操作</td>
                        </tr>
                        <tr v-for="(item,index) in studentData">
                            <td>{{item.sname}}</td>
                            <td style="padding:7px 20px;">
                                <!-- :disabled="item.active=='已激活'" -->
                                <i-button type='warning' @click='retardation(item.id)'>留级</i-button>
                            </td>
                            <td style="padding:7px 20px;">
                                <i-button type='error' @click='leaveSchool(item.id)'>休学</i-button>
                            </td>
                        </tr>
                    </table>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios';
import Cookies from 'js-cookie';
import { Modal } from 'iview';
let $ = require('jquery');

export default {
    name: 'modify_students_status',
    components:{
        
    },
    data(){
        return{
            studentData: [],
            classList:[],
            showCurrentTableData: false,
            //留级选择班级框
            retardModal:false,
            loading: true,
            classname:'',
            stuid:'',
            toClassid:'',
            //当前点击进来的路由参数class_id(此页面表示班级id)
            class_id:''
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
                console.log(response.data)
                this.studentData=response.data.data;
                this.classname=response.data.classname;
            })
        },
        //留级被点击 激活留级选择班级框
        retardation(stuid){
            console.log(stuid);
            this.retardModal=true;
            //当前班级的id
            this.stuid=stuid;
            axios.get(
                'student/stuclass',
                {
                    headers:{'Authorization':'JWT  '+Cookies.get('retoken')}
                }
            ).then((response)=>{
                // let resData=JSON.parse(response.data.data);
                console.log(response.data.data)
                this.classList=response.data.data;
                // this.masterList=JSON.parse(resData.master);
                // this.managerList=JSON.parse(resData.manager);
            })
        },
        //选择要留级到哪个班级
        toClassChange(val){
            console.log(val);
            this.toClassid=val;
        },
        //确定留级
        retardationOK(){
            console.log("确定留级了！")
            let param = new URLSearchParams();
            param.append("stuid",this.stuid);
            param.append("classid",this.toClassid);
            axios.post(
                'student/stustatus',param,
                {headers:{'Authorization':'JWT  '+Cookies.get('retoken')}}
            ).then((response)=>{
                console.log(response.data);
                if(response.data.result==true){
                    this.$Message.success('留级成功！');
                    this.getData();
                }else{
                    console.log(response.data.error)
                    this.$Message.error('留级失败！'); 
                }
            })
        },
        //当前学生休学
        leaveSchool(stuid){
            console.log(stuid)
            // this.stuid=stuid;
            axios.delete(
                'student/stustatus',
                {
                    data:{"stuid":stuid},
                    headers:{'Authorization':'JWT  '+Cookies.get('retoken')}
                }
            ).then((response)=>{
                console.log(response.data);
                if(response.data.result==true){
                    this.$Message.success('休学成功！');
                    this.getData();
                }else{
                    console.log(response.data.error)
                    this.$Message.error('休学失败！'); 
                }
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