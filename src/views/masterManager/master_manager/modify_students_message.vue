<style lang="less">
    @import '../../../styles/common.less';
    @import '../../tables/components/table.less';
    @import '../../advanced-router/advanced-router.less';
</style>

<template>
    <div>
        修改学生基础信息(班主任)
        <Row class="margin-top-15">
            <Col span="24" >
                <Card >
                    <p slot="title" style="height:35px">
                        <Row class="height-200px">
                            <Col span="4">
                                <Icon type="pinpoint"></Icon>
                                学生详情
                            </Col>
                            <Col span="17">
                                {{classname}}
                            </Col>
                            <Col span="3">
                                <i-button type="primary" @click="add">
                                    添加学生
                                </i-button>
                            </Col>
                        </Row>
                        <Modal
                            v-model="addStudentModal"
                            title="添加学生"
                            @on-ok="addStudent">
                            <p>
                                <Row class="margin-top-10">
                                    <Col span="4" class="padding-top-5">
                                        学生姓名:
                                    </Col>
                                    <Col span="6">
                                        <i-input v-model="sname" placeholder="请输入学生姓名"></i-input>
                                    </Col>
                                    <Col class="padding-left-20 padding-top-5" span="3">
                                        性别:
                                    </Col>
                                    <Col span="6">
                                        <Select 
                                        @on-change="sexChange"
                                        :model.sync="sex">
                                            <Option value="2">女</Option>
                                            <Option value="1">男</Option>
                                        </Select>
                                    </Col>
                                </Row>
                                <Row  class="margin-top-10">
                                    <Col span="4" class="padding-top-5">
                                        年龄:
                                    </Col>
                                    <Col span="6">
                                        <i-input v-model="age" placeholder="请输入年龄"></i-input>
                                    </Col>
                                    <Col span="4" class="padding-left-20 padding-top-5">
                                        学历:
                                    </Col>
                                    <Col span="6">
                                        <Select 
                                        @on-change="eduChange"
                                        :model.sync="edu">
                                            <Option value="6">博士</Option>
                                            <Option value="5">硕士</Option>
                                            <Option value="4">自考本科</Option>
                                            <Option value="3">自考专科</Option>
                                            <Option value="2">统招本科</Option>
                                            <Option value="1">统招大专</Option>
                                            <Option value="0">高中</Option>
                                        </Select>
                                    </Col>
                                </Row>
                                <Row class="margin-top-10">
                                    <Col span="4" class="padding-top-5">
                                        毕业院校:
                                    </Col>
                                    <Col span="15">
                                        <i-input v-model="university" placeholder="请输入毕业院校"></i-input>
                                    </Col>
                                </Row>
                                <Row class="margin-top-10">
                                    <Col span="4" class="padding-top-5">
                                        专业:
                                    </Col>
                                    <Col span="6">
                                        <i-input v-model="major" placeholder="请输入专业"></i-input>
                                    </Col>
                                    <Col span="4" class="padding-left-20 padding-top-5">
                                        工作经验:
                                    </Col>
                                    <Col span="6">
                                        <Select 
                                        @on-change="workbgChange"
                                        :model.sync="workbg">
                                            <Option value="0">无</Option>
                                            <Option value="1">在读</Option>
                                            <Option value="2">1年</Option>
                                            <Option value="3">2年</Option>
                                            <Option value="4">3年</Option>
                                            <Option value="5">4年</Option>
                                            <Option value="6">5年</Option>
                                            <Option value="7">5-7年</Option>
                                            <Option value="8">8-10年</Option>
                                            <Option value="9">10年</Option>
                                            <Option value="10">半年</Option>
                                        </Select>
                                    </Col>
                                </Row>
                                <Row class="margin-top-10">
                                    <Col span="4" class="padding-top-5">
                                        手机号:
                                    </Col>
                                    <Col span="6">
                                        <i-input v-model="mobile" placeholder="请输入手机号"></i-input>
                                    </Col>
                                    <Col span="4" class="padding-left-20 padding-top-5">
                                        QQ:
                                    </Col>
                                    <Col span="6">
                                        <i-input v-model="QQ" placeholder="请输入QQ号"></i-input>
                                    </Col>
                                </Row>
                                <Row class="margin-top-10">
                                    <Col span="4" class="padding-top-5">
                                        备注:
                                    </Col>
                                    <Col span="20">
                                        <i-input v-model="remark" ></i-input>
                                    </Col>
                                </Row>
                            </p>
                        </Modal>
                    </p>
                    <!-- 修改学生信息的表格 -->
                    <div class="edittable-table-height-con">
                        <can-edit-table refs="modify_smessage" 
                        v-model="studentData" 
                        :columns-list="studentHead"
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
import axios from 'axios';
import Cookies from 'js-cookie';
import { Modal } from 'iview';

export default {
    name: 'modify_students_message',
    components:{
        canEditTable,
    },
    data(){
        return{
            studentHead: [
                {
                    title: '序号',
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '列表号',
                    key: 'id',
                    width: 80,
                    align: 'center'
                },
                {
                    title: '姓名',
                    width:120,
                    align: 'center',
                    key: 'sname',
                    editable: true
                },
                {
                    title: '性别',
                    width:100,
                    align: 'center',
                    key: 'sex'
                },
                {
                    title: '手机号',
                    width:180,
                    align: 'center',
                    key: 'mobile',
                    editable: true                    
                },
                {
                    title: 'QQ号',
                    width:150,
                    align: 'center',
                    key: 'QQ',
                    editable: true
                },
                {
                    title: '备注',
                    align: 'center',
                    key: 'remark',
                    editable: true
                },
                {
                    title: '操作',
                    align: 'center',
                    width: 190,
                    key: 'handle',
                    handle: ['edit', 'delete']
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
            addStudentModal:false,
            loading: true,
            sname:'',//
            sex:'',
            age:'',
            edu:'',
            university:'',
            major:'',
            workbg:'',
            mobile:'',//
            QQ:'',//
            remark:'',//
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
                // console.log(response.data)
                this.classname=response.data.classname;
                this.studentData=response.data.data;
            })
        },
        handleDel (val,index) {
            // this.$Message.success('删除了第' + (index + 1) + '行数据');
            console.log(this.studentData[index].id)
            axios.delete(
                'student/stuedit',
                {
                    data:{"stuid":this.studentData[index].id},
                    headers:{'Authorization':'JWT  '+Cookies.get('retoken')}
                }
            ).then((response)=>{
                // console.log(response.data)
                if(response.data.result==true){
                    this.getData();
                }
            })
        },
        handleChange (val, index) {
            // this.$Message.success('修改了第' + (index + 1) + '行数据');
            // console.log(val[index]);
            axios.put(
                'student/stuedit',val[index],
                {
                    headers:{'Authorization':'JWT  '+Cookies.get('retoken')}
                }
            ).then((response)=>{
                if(response.data.result==true){
                    this.getData();
                }
            })
        },
        //添加学生功能方法
        add(){
            this.addStudentModal=true;
        },
        addStudent(){
            let param = new URLSearchParams();
            param.append("sname",this.sname);
            param.append("sex",this.sex);
            param.append("age",this.age);
            param.append("edu",this.edu);
            param.append("university",this.university);
            param.append("major",this.major);
            param.append("workbg",this.workbg);
            param.append("mobile",this.mobile);
            param.append("QQ",this.QQ);
            param.append("remark",this.remark);
            param.append("classid",this.class_id);
            axios.post(
                'student/stuedit',param,
                {headers:{'Authorization':'JWT  '+Cookies.get('retoken')}}
            ).then((response)=>{
                if(response.data.result==true){
                    this.$Message.success('添加学生成功！');
                    this.getData();
                }
            })
        },
        sexChange(val){
            this.sex=val;
        },
        eduChange(val){
            this.edu=val;
        },
        workbgChange(val){
            this.workbg=val;
        }
        //添加学生的方法结束
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