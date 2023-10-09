<!--
 * @Author: nimeimix huo.linchun@trs.com.cn
 * @Date: 2023-10-09 09:42:17
 * @LastEditors: nimeimix huo.linchun@trs.com.cn
 * @LastEditTime: 2023-10-09 10:41:02
 * @FilePath: /treatment-dashboard/src/views/business-complaint-status/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="business-complaint-status">
        <FullComplaint class="complaint-item"></FullComplaint>
        <SuperviseTransferComplaints class="complaint-item"></SuperviseTransferComplaints>
    </div>
</template>
<script>
import FullComplaint from './full-complaint'
import SuperviseTransferComplaints from './supervise-transfer-complaints'
export default{
    components:{ FullComplaint,SuperviseTransferComplaints},
    data(){
        return{}
    }
}
</script>
<style lang="less" scoped>
.business-complaint-status{
    display: flex;
    text-align: left;
    height: calc(100% - 38px);
    .complaint-item{
        flex: 1;
    }
    .complaint-item:first-of-type{
        margin-right: 16px;
    }
}
</style>