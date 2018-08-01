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
        复学页面(班主任)
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
                            v-model="backSchoolModal"
                            title="激活新班级"
                            @on-ok="backSchoolOK">
                            <p>
                                <Row class="margin-top-10">
                                    <Col span="4">
                                        选择复学到：
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
                            <td><b>性别</b></td>
                            <td><b>手机号</b></td>
                            <td><b>QQ号码</b></td>
                            <td style="width:200px;">复学操作</td>
                        </tr>
                        <tr v-for="(item,index) in studentData">
                            <td>{{item.sname}}</td>
                            <td>{{item.sex}}</td>
                            <td>{{item.mobile}}</td>
                            <td>{{item.QQ}}</td>
                            <td style="padding:7px 20px;">
                                <!-- :disabled="item.active=='已激活'" -->
                                <i-button type='success' @click='backSchool(item.id)'>复学</i-button>
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
    name: 'back_school_index',
    data(){
        return{
            studentData: [],
            classList:[],
            showCurrentTableData: false,
            //留级选择班级框
            backSchoolModal:false,
            loading: true,
            classname:'',
            stuid:'',
            toClassid:'',
            //当前点击进来的路由参数class_id(此页面表示班级id)
            class_id:''
        }
    },
    components:{

    },
    methods: {
        getData () {
            // 获取休学的学生列表
            axios.get(
                'student/stustatus',
                {
                    headers:{'Authorization':'JWT  '+Cookies.get('retoken')}
                }
            ).then((response)=>{
                // console.log(response.data.data)
                this.studentData=response.data.data;
                this.classname=response.data.classname;
            })
        },
        //点击复学框 加载可以回的班级
        backSchool(stuid){
            // console.log(stuid);
            this.backSchoolModal=true;
            //当前班级的id
            this.stuid=stuid;
            axios.get(
                'student/stuclass',
                {
                    headers:{'Authorization':'JWT  '+Cookies.get('retoken')}
                }
            ).then((response)=>{
                // console.log(response.data.data)
                this.classList=response.data.data;
            })
        },
        //选择要复学到哪个班级
        toClassChange(val){
            // console.log(val);
            this.toClassid=val;
        },
        //确定复学
        backSchoolOK(){
            // console.log("确定复学了！")
            let param = new URLSearchParams();
            param.append("stuid",this.stuid);
            param.append("classid",this.toClassid);
            axios.get(
                'student/stustatus',
                {
                    headers:{'Authorization':'JWT  '+Cookies.get('retoken')},
                    params:{"stuid":this.stuid,"classid":this.toClassid}
                }
            ).then((response)=>{
                // console.log(response.data);
                if(response.data.result==true){
                    this.$Message.success('复学成功！');
                    this.getData();
                }else{
                    // console.log(response.data.error)
                    this.$Message.error('复学失败！'); 
                }
            })
        },
    },
    created(){
        this.getData();
    }
}
</script>