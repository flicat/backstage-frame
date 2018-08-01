<template>
  <div class="disperse_box">
    <el-dialog title="支付方式" :visible.sync="dialogPayShow" @close="onCancel" width="400px" center="center">
      <h4>请引导用户在30分钟之内支付，否则{{detail.name}}将失效。</h4>
      <el-form>
        <el-radio v-model="form.radio" label="1">微信公众号支付</el-radio>
        <el-radio v-model="form.radio" label="2">现场支付</el-radio>
      </el-form>
      <div class="dialog_footer" slot="footer">
        <el-button @click="dialogPayShow=!dialogPayShow">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="POS收款" :visible.sync="posPay" @close="onCancel" width="400px" style="text-align:center !important;"><img :src="detail.img" />
      <p style="margin:10px 0;text-align:center;">请用POS机扫描此二维码</p>
      <p style="text-align:center;"><b>支付金额：{{detail.acount | currency}}</b></p>
    </el-dialog>
    <el-dialog title="微信公众号支付" :visible.sync="wechatPay" @close="onCancel" width="400px" center="center">
      <div style="width:80%;margin:0 auto;">
        <p>1.关注微信公众号“保利公寓“</p>
        <p>2.绑定手机号（合同预留手机号）”</p>
        <p>3.收到合同账单”</p>
        <p>4.通过微信支付”</p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'pay'
  };
</script>

<style lang="less" scoped>
  .disperse_section {
    padding: 20px;
    margin-bottom: 20px;
  }
</style>

