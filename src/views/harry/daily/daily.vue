<style lang="less" scoped>
    @import '../../projectManager/daily/daily.less';
</style>

<template>
    <div class="container">
        查看日报(harry)
        <div class="container">
        <!--原型 =>argument-page.vue 带参页面 -->
        <!--daily.vue 日报列表 点击了解详情跳转页面显示该日报详情 => daily-detail.vue -->
        <Row>
            <Card span="24">
                <p slot="title">
                    <Icon type="ios-list"></Icon>
                    日报列表(传递参数查看日报详情)
                </p>
                <Row type="flex" justify="center" align="middle" class="advanced-router">
                    <Table :columns="dailyListColumns" :data="dailyListData" style="width: 100%;"></Table>
                </Row>
            </Card>
        </Row>
    </div>
    </div>
</template>

<script type="text/ecmascript-6">   
import axios from 'axios';
import Cookies from 'js-cookie';
export default {
    name: 'harrydaily_index',
    data(){
        return{
            dailyListColumns:[
                {
                    type: 'index',
                    title: '序号',
                    width: 60
                },
                {
                    title: '日期',
                    key: 'day',
                    align: 'center'
                },
                {
                    title: '班级',
                    key: 'classes',
                    align: 'center'
                },
                {
                    title: '列表号',
                    key: 'daily_id',
                },
                {
                    title: '项目经理',
                    key: 'projectManager'
                },
                {
                    title: '查看详情',
                    key: 'show_more',
                    align: 'center',
                    render: (h, params) => {
                        return h('Button', {
                            props: {
                                type: 'text',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                    let query = {daily_id: params.row.daily_id};
                                    this.$router.push({
                                        name: 'daily_detail',
                                        query: query
                                    });
                                }
                            }
                        }, '了解详情');
                    }
                }
            ],
            dailyListData:[
                // {
                //     day:'这是是日期数据',
                //     classes:'这个班级',
                //     daily_id:'1',
                //     projectManager:'这是项目经理'
                // },
                
            ]
        }
    },
    components:{
        
    },
    methods:{
        
    },
    created(){
        axios.get(
            '/daily/dailyedit/',{headers:{'Authorization':'JWT  '+Cookies.get('retoken')}}).then((response)=>{
                let data=[];
                let resData=response.data.data;
                console.log(resData);
                for(let i=0;i<resData.length;i++){
                    data[i]={};
                    data[i].day=resData[i].dates;
                    data[i].classes=resData[i].classes;
                    data[i].daily_id=resData[i].id;
                    data[i].projectManager=resData[i].proman;
                }
                this.dailyListData=data;
                
            }).catch((err)=>{console.log(err)})
    }
}
</script>