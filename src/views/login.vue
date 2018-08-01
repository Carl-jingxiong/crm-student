<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">输入任意用户名和密码即可</p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
    function getCookie(sName){
        var aCookie=document.cookie.split("; ");
        for(var i=0;i<aCookie.length;i++){
            var aCrumb=aCookie[i].split("=");
            if(sName==aCrumb[0])
                return (aCrumb[1]);
        }
        return null;
    }
</script>
<script>
import Cookies from 'js-cookie';
import axios from 'axios';
export default {
    data () {
        return {
            form: {
                userName: 'harry',
                password: 'python1234'
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleSubmit () {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    let param = new URLSearchParams();
                    param.append("username", this.form.userName);
                    param.append("userpwd", this.form.password);
                    axios.post('/userinfo/userlogin', param)
                    .then((response)=>{
                        console.log(response.data)
                        if(response.data.result==true){
                            Cookies.set("retoken",response.data.data.token);
                            Cookies.set('user', this.form.userName);
                            Cookies.set('password','xxx');
                            Cookies.set('identity',response.data.data.url)
                            this.$store.commit('setAvator', `${response.data.data.headimg}`);
                            
                            let identity=response.data.data.url;
                            if(identity=='managerindex'){
                                Cookies.set('access',1);
                            }else if(identity=='harryindex'){
                                Cookies.set('access',2);
                            }else if(identity=='fengindex'){
                                Cookies.set('access',3);
                            }else if(identity=='teacherindex'){
                                Cookies.set('access',4);
                            }else if(identity=='masterindex'){
                                Cookies.set('access',5);
                            }else if(identity=='eduindex'){
                                Cookies.set('access',7);
                            }
                            
                            this.$router.push({
                                name: 'home_index'
                            });
                        }else{
                            this.$Message.warning('用户名或者密码不正确！');
                            console.log(response.data)
                        }
                    });
                }
            });
        },
    },
    created () {
        
    }
};
</script>

<style>

</style>
