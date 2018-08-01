
<style lang="less">
    @import '../../../styles/common.less';
    @import '../../tables/components/table.less';
</style>

<template>
    <div>
        <Row class="margin-top-15">
            <Col span="24" >
                <Card >
                    <p slot="title" style="height:35px">
                        <Row class="height-200px">
                            <Col span="21">
                                <Icon type="pinpoint"></Icon>
                                管理中心
                            </Col>
                            <Col span="3">
                                <i-button type="primary" @click="add">
                                    添加中心
                                </i-button>
                            </Col>
                        </Row>
                        <Modal
                            v-model="addCenterModal"
                            title="添加中心"
                            @on-ok="addCenter">
                            <p>
                                <Row class="margin-top-10">
                                    <Col span="4">
                                        中心名称:
                                    </Col>
                                    <Col span="20">
                                        <i-input v-model="centerName" placeholder="请输入中心名称"></i-input>
                                    </Col>
                                </Row>
                                <Row  class="margin-top-10">
                                    <Col span="4">
                                        中心地址:
                                    </Col>
                                    <Col span="20">
                                        <i-input v-model="centerAds" placeholder="请输入中心地址"></i-input>
                                    </Col>
                                </Row>
                                <Row class="margin-top-10">
                                    <Col span="4">
                                        中心电话:
                                    </Col>
                                    <Col span="20">
                                        <i-input v-model="centerTel" placeholder="请输入中心电话"></i-input>
                                    </Col>
                                </Row>
                                <Row class="margin-top-10">
                                    <Col span="4">
                                        中心主任:
                                    </Col>
                                    <Col span="20">
                                        <i-input v-model="centerLeader" placeholder="请输入中心主任"></i-input>
                                    </Col>
                                </Row>
                            </p>
                            <!-- <i-button type="info">
                                这是确定按钮
                            </i-button> -->
                        </Modal>
                    </p>
                    <div class="edittable-table-height-con">
                        <can-edit-table refs="center" 
                        v-model="centerData" 
                        :columns-list="centerHead"
                        @on-change="handleChange"
                        @on-delete="handleDel"></can-edit-table>
                    </div>
                </Card>
            </Col>
            
        </Row>
    </div>
</template>

<script>
import canEditTable from '../../tables/components/canEditTable';
import tableData from '../../tables/components/table_data.js';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Modal } from 'iview';

export default {
    name: 'manage_center',
    components: {
        canEditTable
    },
    data () {
        return {
            centerHead:[
                {
                    title: '序号',
                    type: 'index',
                    width: 80,
                    align: 'center'
                },
                {
                    title: '列表号',
                    key: 'id',
                    width: 80,
                    align: 'center'
                },
                {
                    title: '中心名称',
                    align: 'center',
                    key: 'cname',
                    width: 150,
                    editable: true
                },
                {
                    title: '中心地址',
                    align: 'center',
                    key: 'ads',
                    // width: 280,
                    editable: true
                },
                {
                    title: '电话',
                    align: 'center',
                    key: 'tel',
                    width: 160,
                    editable: true
                },
                {
                    title: '中心主任',
                    align: 'center',
                    key: 'leader',
                    width: 150,
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
            centerData: [
                // {
                //     cname: '大钟寺中心',
                //     ads:'中坤广场',
                //     id:'3',
                //     tel:'3333333333',
                //     leader:'大钟寺中心主任',
                // },
                // {
                //     cname: '大钟寺中心',
                //     ads:'中坤广场',
                //     id:'4',
                //     tel:'3333333333',
                //     leader:'大钟寺中心主任',
                // },
                // {
                //     cname: '大钟寺中心',
                //     ads:'中坤广场',
                //     id:'5',
                //     tel:'3333333333',
                //     leader:'大钟寺中心主任',
                // },
            ],
            showCurrentTableData: false,
            addCenterModal:false,
            loading: true,
            centerName:'',
            centerAds:'',
            centerTel:'',
            centerLeader:''
        };
    },
    methods: {
        getData () {
            // 获取中心列表
            axios.get(
                'userinfo/center',{headers:{'Authorization':'JWT  '+Cookies.get('retoken')}}
            ).then((response)=>{
                console.log(response.data.data);
                this.centerData=response.data.data
            })
        },
        handleDel (val,index) {
            // this.$Message.success('删除了第' + (index + 1) + '行数据');
            console.log(this.centerData[index].id)
            axios.delete(
                'userinfo/center',
                {
                    data:{"centerid":this.centerData[index].id},
                    headers:{'Authorization':'JWT  '+Cookies.get('retoken')}
                }
            ).then((response)=>{
                console.log(response.data)
                if(response.data.result==true){
                    this.getData();
                }
            })
        },
        handleCellChange (val, index, key) {
            this.$Message.success('修改了第 ' + (index + 1) + ' 行列名为 ' + key + ' 的数据');
        },
        handleChange (val, index) {
            // this.$Message.success('修改了第' + (index + 1) + '行数据');
            console.log(val[index]);
            let param = new URLSearchParams();
            param.append("centerid",val[index].id);
            param.append("cname",val[index].cname);
            param.append("ads",val[index].ads);
            param.append("leader",val[index].leader);
            param.append("tel",val[index].tel);
            axios.put(
                'userinfo/center',param,
                {
                    headers:{'Authorization':'JWT  '+Cookies.get('retoken')}
                }
            ).then((response)=>{
                if(response.data.result==true){
                    this.getData();
                }
            })
        },
        add(){
            this.addCenterModal=true;
        },
        addCenter(){
            let param = new URLSearchParams();
            param.append("cname",this.centerName);
            param.append("ads",this.centerAds);
            param.append("leader",this.centerLeader);
            param.append("tel",this.centerTel);
            axios.post(
                'userinfo/center',param,
                {headers:{'Authorization':'JWT  '+Cookies.get('retoken')}}
            ).then((response)=>{
                if(response.data.result==true){
                    this.$Message.success('添加中心成功');
                    this.getData();
                }
            })
        },
        submitAddCenter(){
            // setTimeout(() => {
            //     this.addCenter = false;
            // }, 2000);
            console.log("2222")
            let content=`
                提示信息
            `;
            let config={
                title:'添加中心',
                content:content,
                okText:'确定添加',
                onOk:()=>{
                    console.log("点击了确定")
                }
            }
            this.$Modal.info(config)
        }
    },
    created () {
        this.getData();
    }
};
</script>
