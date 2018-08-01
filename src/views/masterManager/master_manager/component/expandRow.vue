<style lang="less" scoped>
    .advanced-router{
        // height: 240px !important;
        &-tip-p{
            padding: 10px 0;
        }
    }
</style>

<template>
    <div>
        <Row class="advanced-router">
            <Col span="8">
                <span class="expand-key">所属班级：</span>
                <span class="expand-value">{{ row.classes }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">毕业院校：</span>
                <span class="expand-value">{{ row.university }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">专业：</span>
                <span class="expand-value">{{ row.major }}</span>
            </Col>
        </Row>
        <Row>
            <Col span="8">
                <span class="expand-key">系统登录名：</span>
                <span class="expand-value">{{ row.uname }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">工作经验：</span>
                <span class="expand-value">{{ row.workbg }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">备注：</span>
                <span class="expand-value">{{ row.remark }}</span>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        }
    };
</script>
