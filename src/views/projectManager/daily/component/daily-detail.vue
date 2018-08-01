<style lang="less" scoped>
    @import '../../../../styles/common.less';
    @import '../daily.less';
    @import './daily-detail.less';

</style>

<template>
    <div class="container">
        <!--原型 =>shopping-info.vue 订单详情页面-->
        <!-- 该页面显示日报的详情 -->
        <p> 日报表查看详情</p>
        <Row>
            <Card>
                <p slot="title">
                    <Icon type="compose"></Icon>
                    日报详情
                </p>
                <!-- <Table :columns="shopping_col" :data="shopping_data"></Table> -->
            <Row>
                <Col span="24" align="center"><h3>项目经理工作日报</h3></Col>    
            </Row> 
            <Row>
                <Col align="center" span="24">
                    <table class="daily-table">
                        <thead></thead>
                        <tbody>
                        <tr>
                            <td><b>日期</b></td>
                            <td><input type="text" v-model="dates"/></td>
                            <td><b>讲师</b></td>
                            <td>
                                <input v-model="teacher">
                                    <!-- <option value="1">魏老师</option>
                                    <option value="2">赵老师</option>
                                    <option value="3">瞿老师</option> -->
                                </input>
                            </td>
                            <td><b>课程阶段/天数</b></td>
                            <td><input type="text" v-model="courseday"/></td>
                        </tr>
                        <tr>
                            <td><b>中心名称</b></td>
                            <td><input type="text" v-model="center"/></td>
                            <td><b>班级</b></td>
                            <td>
                                <input v-model="classes"></input>
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
            </Card>
            
        </Row>
    </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios';
import Cookies from 'js-cookie';
export default {
    name: 'daily_detail',
    data(){
        return{
            dates:'',
            teacher:'',
            courseday:'',
            center:'',
            classes:'',
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
            wom_detail:''
        }
    },
    components:{
        
    },
    methods:{
        init(){
            console.log("这是日报ID")
            console.log(this.$route.query.daily_id)
            axios.get(
                '/daily/dailyshow/',
                {
                    headers:{'Authorization':'JWT  '+Cookies.get('retoken')},
                    params:{'dailyid':this.$route.query.daily_id}
                }
            ).then((response)=>{
                console.log(response.data.data[0])
                let resData=response.data.data[0];
                this.dates=resData.dates;
                this.teacher=resData.teacher.username;
                this.courseday=resData.courseday;
                this.center=resData.center;
                this.classes=resData.classes;
                this.manager=resData.manager;
                this.numofpAndActantnum=resData.numofp+"/"+resData.actantnum;
                this.proman=resData.proman;
                this.master=resData.master;
                this.pltproblem=resData.pltproblem;
                this.solveproblem=resData.solveproblem;
                this.detail=resData.detail;
                this.stuaction=resData.stuaction;
                this.solvedetail=resData.solvedetail;
                this.reviewle=resData.reviewle;
                this.absence=resData.absence;
                this.abshistory=resData.abshistory;
                this.amreview=resData.amreview;
                this.pmreview=resData.pmreview;
                this.pmfinish=resData.pmfinish;
                let stuvip=JSON.parse(resData.stuvip);
                this.stuvip_name1=stuvip[0].name;
                this.stuvip_detail1=stuvip[0].detail;
                this.stuvip_name2=stuvip[1].name;
                this.stuvip_detail2=stuvip[1].detail;
                this.stuvip_name3=stuvip[2].name;
                this.stuvip_detail3=stuvip[2].detail;
                this.other=resData.other;
                let wom=JSON.parse(resData.wom);
                this.wom_name=wom.name;
                this.wom_detail=wom.detail;
            })
        },
    },
    beforeMount(){
        this.init()
    },
    watch: {
        '$route' () {
            this.init();
        }
    }
}
</script>
