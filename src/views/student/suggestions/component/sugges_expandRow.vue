<style lang="less" scoped>
    .advanced-router{
        // height: 240px !important;
        &-tip-p{
            padding: 10px 0;
        }
    }
    // 已提交 处理中 反馈中 已完成  已取消
    .red{
        color:#e13c13;
    }
    .orange{
        color:orange;
    }
    .yellow{
        color:#aaf;
    }
    .green{
        color:#18b566;
    }
    .blue{
        color:#2b85e4;
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
                <span class="expand-key">反馈进度：</span>
                <span class="expand-value" 
                    :class="{red:row.schedule==1,orange:row.schedule==2,yellow:row.schedule==3,green:row.schedule==4,blue:row.schedule==5}">{{ row.scheduled }}
                </span>
            </Col>
        </Row>
        <Row>
            <Col span="24">
                <span class="expand-key">内容详情：</span>
                <span class="expand-value">{{ row.detail }}</span>
            </Col>
        </Row>
        <Row>
            <Col span="24">
                <span class="expand-key">回馈内容：</span>
                <span class="expand-value">{{ row.solvede }}</span>
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
