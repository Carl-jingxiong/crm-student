<style lang="less">
    @import '../../../styles/common.less';
    @import '../../tables/components/table.less';
    @import '../../advanced-router/advanced-router.less';
</style>

<template>
    <div class="container">
        学生投诉(学生权限页面)
        <Row class="margin-top-15">
            <Col span="24" >
                <Card >
                    <p slot="title">
                        <Row class="height-200px">
                            <Col span="4">
                                <Icon type="pinpoint"></Icon>
                                学生详情
                            </Col>
                            <!-- <Col span="8">
                                {{classname}}
                            </Col> -->
                        </Row>
                    </p>
                    <Row style="height:50px;">
                        <Col span="4">
                            <b></b>
                        </Col>
                        <Col span="4">
                            <i-button type="primary" @click='suggestButton(1)' style="width:120px">建议</i-button>
                        </Col>
                        <Col span="4">
                            <i-button type="success" @click='suggestButton(2)' style="width:120px">赞美</i-button>
                        </Col>
                        <Col span="4">
                            <i-button type="warning" @click='suggestButton(3)'  style="width:120px">疑问</i-button>
                        </Col>
                        <Col span="4">
                            <i-button type="error" @click='suggestButton(4)' style="width:120px">投诉</i-button>
                        </Col>
                    </Row>
                    <Modal
                        v-model="studentSuggestModal" 
                        :title="feedback_title" 
                        @on-ok="studentSuggestOK">
                        <p>
                            <Row class="margin-top-10">
                                <Col span="4">
                                    {{feedback_teacher}}
                                </Col>
                                <Col span="20">
                                    <Select 
                                    @on-change="chooseTeacher" 
                                    :model.sync="teacher_id"
                                    style="width:130px">
                                        <Option :key="index" v-for="(item,index) in teacherlist" :value="item.id">{{item.username}}</Option>
                                    </Select>
                                </Col>
                            </Row>
                            <Row class="margin-top-10">
                                <Col span="4">联系电话：</Col>
                                <Col span="10">
                                    <i-input :maxlength="11" v-model="stu_phone" placeholder="请输入联系电话..."></i-input>
                                </Col>
                            </Row>
                            <Row class="margin-top-10">
                                <Col span="4">详细内容：</Col>
                                <Col span="10">
                                    <i-input type="textarea" v-model="stu_detail" :rows="4" placeholder="请输入详细内容..."></i-input>
                                </Col>
                            </Row>
                        </p>
                    </Modal>
                    <!-- 建议详情展示表格 -->
                    <Table :columns="suggestionHead" :data="suggestionData"></Table>
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
import sugges_expandRow from './component/sugges_expandRow';

export default {
    name: 'student_suggestions_index',
    components:{
        canEditTable,
        sugges_expandRow
    },
    data(){
        return{
            suggestionHead: [
                {
                    type: 'expand',
                    width: 50,
                    render: (h, params) => {
                        return h(sugges_expandRow, {
                            props: {
                                row: params.row
                            }
                        });
                    }
                },
                {
                    title: '姓名',
                    key: 'stuid'
                },
                {
                    title: '反馈讲师',
                    key: 'teacher'
                },
                {
                    title: '反馈类型',
                    key: 'coclassifyd'
                },
                {
                    title: '反馈日期',
                    key: 'codate'
                },
                {
                    title: '反馈时间',
                    key: 'cotime'
                },
                {
                    title: '联系电话',
                    key: 'tel'
                }
            ],
            suggestionData: [
                {
                    stuid: '学生姓名',
                    teacher: '讲师名称',
                    coclassifyd:'反馈类型',
                    codate:'日期',
                    cotime: '时间',
                    tel:'12345678879',

                    classes:"AID",
                    scheduled: '反馈进度',
                    detail:'反馈内容详情'
                }
            ],
            teacherlist:[],
            // showCurrentTableData: false,
            studentSuggestModal:false,
            teacher_id:'',
            feedback_title:'我有建议',
            feedback_teacher:'建议讲师：',
            feedback_id:'',
            stu_phone:'',
            stu_detail:''
        }
    },
    methods: {
        getData () {
            //获取讲师列表
            axios.get(
                'complaint/teacherlist',
                {
                    headers:{'Authorization':'JWT  '+Cookies.get('retoken')},
                }
            ).then((response)=>{
                if(response.data.result==true){
                    console.log(response.data.data)
                    this.teacherlist=response.data.data;
                }
            })
            axios.get(
                'complaint/pcomplaint',
                {
                    headers:{'Authorization':'JWT  '+Cookies.get('retoken')},
                    params:{'orderid':''}
                }
            ).then((response)=>{
                console.log(response.data.data.data)
                this.suggestionData=response.data.data.data;
            })
        },
        suggestButton(type_id){
            this.studentSuggestModal=true;
            
            if(type_id==1){
                //建议按钮
                this.feedback_id=1;
                this.feedback_title='我有建议';
                this.feedback_teacher='建议讲师：';
            }else if(type_id==2){
                //赞美按钮
                this.feedback_id=2;
                this.feedback_title='我有赞美';
                this.feedback_teacher='赞美讲师：';
            }else if(type_id==3){
                //疑问按钮
                this.feedback_id=3;
                this.feedback_title='我有疑问';
                this.feedback_teacher='疑问讲师：';
            }else if(type_id==4){
                //投诉按钮
                this.feedback_id=4;
                this.feedback_title='我有投诉';
                this.feedback_teacher='投诉讲师：';
            }
        },
        //学生建议框页面点击OK
        studentSuggestOK(){
            // complaint/pcomplaint
            if(this.stu_phone.length!=11){
                this.$Message.error('手机号码格式不正确！');
            }else{
                let param = new URLSearchParams();
                param.append("teacherid", this.teacher_id);
                param.append("coclassify", this.feedback_id);
                param.append("tel", this.stu_phone);
                param.append("detail", this.stu_detail);
                axios.post(
                    'complaint/pcomplaint/',param,
                    {headers:{'Authorization':'JWT  '+Cookies.get('retoken')}}
                ).then((response)=>{
                    // console.log(response.data)
                    this.$Message.success('反馈成功，请勿重复反馈！');
                })
            }
            this.teacher_id='';
            this.stu_phone='';
            this.stu_detail='';
        },
        chooseTeacher(val){
            this.teacher_id=val;
        }
    },
    created(){
        this.getData();
    }
}
</script>