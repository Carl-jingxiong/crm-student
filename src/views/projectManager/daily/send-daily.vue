<style lang="less" scoped>
    @import '../../../styles/common.less';
    @import './daily.less';
    @import './component/daily-detail.less';
</style>

<template>
    <div class="container">
        <!-- 该页面发送日报-->
        <Row>
            <Card v-show="showDaily">
                <p slot="title">
                    <Icon type="compose"></Icon>
                    发送日报
                </p>
                <!-- <Table :columns="shopping_col" :data="shopping_data"></Table> -->
                <Row >
                    <Col span="24" align="center"><h3>项目经理工作日报</h3></Col>    
                </Row>
                <Row >
                    <Col align="center" span="24">
                        <table class="daily-table">
                            <thead></thead>
                            <tbody>
                            <tr>
                                <td><b>日期</b></td>
                                <td><input type="text" v-model="dates"/></td>
                                <td><b>讲师</b></td>
                                <td>
                                    <!-- <i-select :model.sync="teacher" style="width:130px">
                                        <i-option v-for="item in teacherList" :value="item.value">{{ item.label }}</i-option>
                                    </i-select> -->
                                    <Select @on-change="teacherChange" 
                                    :model.sync="teacher" 
                                    style="width:130px">
                                        <Option :key="index" v-for="(item,index) in teacherList" :value="item.value">{{item.label}}</Option>
                                    </Select>
                                </td>
                                <td><b>课程阶段/天数</b></td>
                                <td><input type="text" v-model="courseday"/></td>
                            </tr>
                            <tr>
                                <td><b>中心名称</b></td>
                                <td><input type="text" v-model="center"/></td>
                                <td><b>班级</b></td>
                                <td>
                                    <Select 
                                    @on-change="classesChange" 
                                    :model.sync="classes"
                                    style="width:130px">
                                        <Option :key="index" v-for="(item,index) in classesList" :value="item.value">{{item.label}}</Option>
                                    </Select>
                                </td>
                                <td><b>教学经理</b></td>
                                <td><input type="text" v-model="manager"/></td>
                            </tr>
                            <tr>
                                <td><b>班级人数/出勤</b></td>
                                <td><input type="text"  placeholder="总人数/出勤人数" v-model="numofpAndActantnum"/></td>
                                <td><b>项目经理</b></td>
                                <td><input type="text" v-model="proman"/></td>
                                <td><b>班主任</b></td>
                                <td><input type="text" v-model="master"/></td>
                            </tr>
                            <tr>
                                <td colspan="6"><b>日常工作</b></td>
                            </tr>
                            <tr>
                                <td rowspan="3"><b>设备环境远程平台运行情况</b></td>
                                <td colspan="3" rowspan="2"><b>远程平台出现的问题</b></td>
                                <td colspan="2" rowspan="2"><b>处理结果</b></td>
                            </tr>
                            <tr>
                            </tr>
                            <tr>
                                <td colspan="3"><input type="text" v-model="pltproblem"/></td>
                                <td colspan="2"><input type="text" v-model="solveproblem"/></td>
                            </tr>
                            <tr>
                                <td rowspan="2"><b>今日教学内容</b></td>
                                <td colspan="2"><b>今日教学内容</b></td>
                                <td><b>学生掌握情况</b></td>
                                <td colspan="2"><b>项目经理解决措施/建议/求助</b></td>
                            </tr>
                            <tr>
                                <td colspan="2"><input type="text" v-model="detail"/></td>
                                <td><input type="text" v-model="stuaction"/></td>
                                <td colspan="2"><input type="text" v-model="solvedetail"/></td>
                            </tr>
                            <tr>
                                <td rowspan="5"><b>早晚自习情况</b></td>
                                <td><b>早晚自习</b></td>
                                <td>早/晚:</td>
                                <td><input type="text" v-model="reviewle"/></td>
                                <td><b>当日缺勤学生为:</b></td>
                                <td><input type="text" v-model="absence"/></td>
                            </tr>
                            <tr>
                                <td><b>缺勤历史</b></td>
                                <td colspan="4"><input type="text" v-model="abshistory" placeholder="姓名(累计次数)、姓名(累计人次)..."/></td>
                            </tr>
                            <tr>
                                <td><b>早自习安排</b></td>
                                <td colspan="4"><input type="text" v-model="amreview"/></td>
                            </tr>
                            <tr>
                                <td><b>晚自习安排</b></td>
                                <td colspan="4"><input type="text" v-model="pmreview"/></td>
                            </tr>
                            <tr>
                                <td><b>晚自习完成情况</b></td>
                                <td colspan="4"><input type="text" v-model="pmfinish"/></td>
                            </tr>
                            <tr>
                                <td rowspan="4"><b>今日关注学员</b></td>
                                <td><b>姓名</b></td>
                                <td colspan="4"><b>问题/情况说明&nbsp;&nbsp;解决方案/建议</b></td>
                            </tr>
                            <tr>
                                <td><input type="text" v-model="stuvip_name1"/></td>
                                <td colspan="4"><input type="text" v-model="stuvip_detail1"/></td>
                            </tr>
                            <tr>
                                <td><input type="text" v-model="stuvip_name2"/></td>
                                <td colspan="4"><input type="text" v-model="stuvip_detail2"/></td>
                            </tr>
                            <tr>
                                <td><input type="text" v-model="stuvip_name3"/></td>
                                <td colspan="4"><input type="text" v-model="stuvip_detail3"/></td>
                            </tr>
                            <tr>
                                <td><b>其他反馈事项</b></td>
                                <td colspan="5"><input type="text" v-model="other"/></td>
                            </tr>
                            <tr>
                                <td rowspan="2"><b>口碑/回访</b></td>
                                <td><b>姓名</b></td>
                                <td colspan="4"><b>情况</b></td>
                            </tr>
                            <tr>
                                <td><input type="text" v-model="wom_name"/></td>
                                <td colspan="4"><input type="text" v-model="wom_detail"/></td>
                            </tr>
                            </tbody>
                        </table>
                    </Col>
                </Row>
                <Row >
                    <Col span="24" align="center">
                        <i-button  type="info"  @click="handleSendDaily">
                            确认提交
                        </i-button>
                    </Col>
                </Row>
            </Card>
            <Card v-show="showYN">
                <p slot="title">
                    <Icon type="compose"></Icon>
                    发送学生信息表
                </p>
                <Row >
                    <Col span="24" align="center"><h3>学生信息表</h3></Col>    
                </Row>
                <Row >
                    <Col align="center" span="24">
                        <table class="student-yn">
                            <tr>
                                <td colspan="2"><b>班级信息</b></td>
                                <td colspan="2"><b>学习阶段</b></td>
                            </tr>
                            <tr>
                                <td colspan="2" name="yn-class"><b>{{YN_classes}}</b></td>
                                <td colspan="2" name="yn-stage"><b>{{YN_stage}}</b></td>
                            </tr>
                            <tr>
                                <td><b>学员姓名</b></td>
                                <td><b>备注</b></td>
                                <td><b>考试</b></td>
                                <td><b>作业情况</b></td>
                            </tr>
                            <tbody class="yn-detail">
                                <!-- <tr v-for="(item,index) in studentList" :studentId="item.id">
                                    <td>{{item.sname}}</td>
                                    <td><input v-model="YN_other" type="text"/></td>
                                    <td>
                                        <Select 
                                        @on-change="YNChange"
                                        :model.sync="YNValue"
                                        style="width:150px"
                                        >
                                            <Option 
                                            :key="index"  
                                            v-for="(item,index) in YNvalueList"  :value="item.value" 
                                            >
                                                {{item.label}}
                                            </Option>
                                        </Select>
                                    </td>
                                    <td>
                                        <Select
                                        @on-change="YNNumChange"
                                        :model.sync="YNNumValue"
                                        style="width:150px" 
                                        >
                                            <Option 
                                            :key="index" 
                                            v-for="(item,index) in YNnumList" :value="item.value">
                                                {{item.label}}
                                            </Option>
                                        </Select>
                                    </td>
                                </tr> -->
                            </tbody>
                        </table>
                    </Col>
                </Row>
                <Row >
                    <Col span="24" align="center">
                        <i-button  type="info"  @click="handleSendYN">
                            确认提交
                        </i-button>
                    </Col>
                </Row>
            </Card>
        </Row>
    </div>
</template>


<script type="text/ecmascript-6">
// import $ from 'jquery';
import axios from 'axios';
import Cookies from 'js-cookie';
let $ = require('jquery');
export default {
    name: 'sendDaily_index',
    data(){
        return{
            dates:'',
            courseday:'',
            center:'',
            manager:'' ,
            numofpAndActantnum:'',
            proman:'',
            master:'',
            pltproblem:'',
            solveproblem:'',
            detail:'',
            stuaction:'',
            solvedetail:'',
            reviewle:'',
            absence:'',
            abshistory:'',
            amreview:'',
            pmreview:'',
            pmfinish:'',
            stuvip_name1:'',
            stuvip_detail1:'',
            stuvip_name2:'',
            stuvip_detail2:'',
            stuvip_name3:'',
            stuvip_detail3:'',
            other:'',
            wom_name:'',
            wom_detail:'',
            teacherList:[],
            teacher:'',
            classesList:[],
            classes:'',
            //是否显示日报
            showDaily:true,
            //是否显示YN 表
            showYN:false,
            YN_other:'',
            YN_classes:'',
            YN_stage:'',
            day:'',
            month:'',
            sendStudentList:[]     
        }
    },
    methods:{
        YNChange(val){
            console.log(val)
        },
        YNNumChange(val){
            console.log(val)
        },
        teacherChange(val){
            this.teacher=val;
        },
        classesChange(val){
            this.classes=val;
        },
        //发送日报
        handleSendDaily(){
            let param = new URLSearchParams(); 
            param.append('dates',this.dates);
            param.append('courseday',this.courseday);
            param.append('center',this.center);
            param.append('numofp',this.numofpAndActantnum.split("/")[0]);
            param.append('actantnum',this.numofpAndActantnum.split("/")[1]);
            param.append('proman',this.proman);
            param.append('manager',this.manager);
            param.append('master',this.master);
            param.append('pltproblem',this.pltproblem);
            param.append('solveproblem',this.solveproblem);
            param.append('detail',this.detail);
            param.append('stuaction',this.stuaction);
            param.append('solvedetail',this.solvedetail);
            param.append('reviewle',this.reviewle);
            param.append('absence',this.absence);
            param.append('abshistory',this.abshistory);
            param.append('amreview',this.amreview);
            param.append('pmreview',this.pmreview);
            param.append('pmfinish',this.pmfinish);
            let stuvip=[
                {
                    name:`${this.stuvip_name1}`,
                    detail:`${this.stuvip_detail1}`
                },
                {
                    name:`${this.stuvip_name2}`,
                    detail:`${this.stuvip_detail2}`
                },
                {
                    name:`${this.stuvip_name3}`,
                    detail:`${this.stuvip_detail3}`
                },
            ];
            param.append('stuvip',JSON.stringify(stuvip));
            param.append('other',this.other);
            let wom={
                name:`${this.wom_name}`,
                detail:`${this.wom_detail}`
            };
            param.append('wom',JSON.stringify(wom));
            param.append('teacher',this.teacher);
            param.append('classes',this.classes);
            console.log(param)
            axios.post(
                '/daily/dailyedit/',param,
                {headers:{'Authorization':'JWT  '+Cookies.get('retoken')}}
            ).then((response)=>{
                console.log(response.data)
                if(response.data.result==true){
                    // this.$Message.success('日报提交成功，请勿重复提交！');
                    //日报提交成功
                    this.successDaily(true);
                    this.showDaily=false;
                    this.showYN=true;
                    this.loadYN();
                }
            }).catch((err)=>{console.log(err)})

        },
        //发送日报成功提示信息的函数
        successDaily (nodesc) {
            this.$Notice.success({
                title: '日报添加成功，请勿重复提交！',
                desc: nodesc ? '' : '这里是通知描述这里,是通知描述这里是通知描述这里,是通知描述这里,是通知描述这里是通知描述这里是通知描述'
            });
        },
        successYN (nodesc) {
            this.$Notice.success({
                title: '学生信息表提交成功，请勿重复提交！',
                desc: nodesc ? '' : '这里是通知描述这里,是通知描述这里是通知描述这里,是通知描述这里,是通知描述这里是通知描述这里是通知描述'
            });
        },
        //加载YN表基本信息和循环学生YN表的函数
        loadYN(){
            axios.get(
                '/daily/dailyny/',
                {
                    headers:{'Authorization':'JWT  '+Cookies.get('retoken')},
                    params:{'classesid':this.classes}
                }
            ).then((response)=>{
                console.log(response.data)
                let resData=response.data.data;
                if(response.data.result==true){
                    this.YN_classes=resData.classes;
                    let stage=resData.day;
                    if(stage<10){stage="D0"+stage}else{stage="D"+stage};
                    this.YN_stage=stage;
                }
                this.day=resData.day;
                this.month=resData.month;
                this.sendStudentList=resData.students;
                var html="";
                for(var item of resData.students){
                    html+=`<tr studentId="${item.id}">
                        <td name="sname" style="border:1px solid #000; text-align:center;height:30px;">${item.sname}</td>
                        <td style="border:1px solid #000; text-align:center;height:33px;">
                            <input name="other" type="text" style="width:100%;height:100%;border:none;"/>
                        </td>
                        <td style="border:1px solid #000; text-align:center;height:33px;">
                            <select name="student-test" style="background-color: transparent;width:100%;height:100%;display:block;">
                                <option value="y">Y</option>
                                <option value="n">N</option>
                            </select>
                        </td >
                        <td style="border:1px solid #000; text-align:center;height:33px;">
                            <select name="student-val" style="background-color: transparent;width:100%;height:100%;display:block;">
                                <option value="5">5</option>
                                <option value="4">4</option>
                                <option value="3">3</option>
                                <option value="2">2</option>
                                <option value="1">1</option>
                                <option value="0">0</option>
                            </select>
                        </td>
                    </tr>`
                }
                $(".yn-detail").html(html);
                var $stuTest=$("select[name=student-test]");
                console.log($stuTest);
                $stuTest.css({
                    "background-color":"#C6EFCE",
                    "color":"#506153"
                }).change(function(e){testChange(e)});
                function testChange(e){
                    var $tar=$(e.target);
                    var $testVal=$tar.find("option:selected").val();
                    if($testVal=="y"){
                        $tar.css({
                            "background-color":"#C6EFCE",
                            "color":"#506153"
                        })
                    }else if($testVal=="n"){
                        $tar.css({
                            "background-color":"#FFC7CE",
                            "color":"#9C2D75"
                        })
                    }
                }
                var $stuVal=$("select[name=student-val]");
                $stuVal.css({
                    "color":"#00B050"
                }).change(function(e){valChange(e)});
                function valChange(e){
                    var $tar=$(e.target);
                    var $valVal=$tar.find("option:selected").val();
                    if($valVal=="5"||$valVal=="4"){
                        $tar.css({
                            "color":"#07B254"
                        })
                    }else if($valVal=="3"||$valVal=="2"){
                        $tar.css({
                            "color":"#000"
                        })
                    }else{
                        $tar.css({
                            "color":"red"
                        })
                    }
                }
            })
        },
        //发送YN表
        handleSendYN(){
            var $yndetail=$(".yn-detail");
            
            let param = new URLSearchParams();
            param.append("classesid",this.classes);
            param.append("day",this.day);
            param.append("month",this.month);
            let data=[];
            for(var i=0;i<this.sendStudentList.length;i++){
                data[i]={};
                var $tr=$($yndetail.children("tr")[i]);
                data[i].sname=$tr.find("[name=sname]").html();
                data[i].id=$tr.attr("studentId");
                data[i].other=$tr.find("input[name=other]").val();
                data[i].ny=$tr.find("[name=student-test]").find("option:selected").val();
                data[i].score=$tr.find("[name=student-val]").find("option:selected").val();
            }
            console.log(typeof(JSON.stringify(data)));
            data=JSON.stringify(data);
            param.append("data",data);

            axios.post(
                '/daily/dailyny/',
                param,
                {
                    headers:{'Authorization':'JWT  '+Cookies.get('retoken')}
                }
            ).then((response)=>{
                if(response.data.result==true){
                    console.log(response.data)
                    this.successYN(true);
                    //YN表提交成功后跳转
                    this.$router.push({
                        name: 'daily'
                    });
                }else{
                    
                }
            }).catch((error)=>{
                console.log("这是失败了")
            })
        }
    },
    components:{

    },
    //创建好之后加载日报基本信息
    created(){

        //在日报表中自动填入当天的时间
        let date=new Date();
        let month="";
        if((date.getMonth()+1)<10){
            month="0"+(date.getMonth()+1);
        }else{
            month=""+(date.getMonth()+1);
        }
        let nowDay="";
        if((date.getDate())<10){
            nowDay="0"+date.getDate();
        }else{
            nowDay=""+date.getDate();
        }
        date=`${date.getFullYear()}${month}${nowDay}`;
        this.dates=date;
        // let param = new URLSearchParams(); 
        // param.append("managerid", 1);
        axios.post(
            '/daily/dailydetail/',
            {"managerid":"1"},
            {headers:{'Authorization':'JWT  '+Cookies.get('retoken')}}
        ).then((response)=>{
            if(response.data.result==true){
                let resData=response.data.data;
                // resData是最开始加载日报表的时候需要自动填入的数据
                // console.log(resData)
                //循环加载教师列表
                let teacherData=[];
                for(var i=0;i<resData.teacher.length;i++){
                    teacherData[i]={};
                    teacherData[i].value=resData.teacher[i].id;
                    teacherData[i].label=resData.teacher[i].username;
                }
                this.teacherList=teacherData;
                //循环加载班级列表
                let classesData=[];
                for(var i=0;i<resData.classes.length;i++){
                    classesData[i]={};
                    classesData[i].value=resData.classes[i].id;
                    classesData[i].label=resData.classes[i].classno;
                }
                console.log(teacherData)
                this.classesList=classesData;
                this.center=resData.center;
                this.proman=resData.proman;
                this.master=resData.master;
            }
        })
    },
    beforeCreate(){
        
    },
    watch:{
        
    }
}
</script>



