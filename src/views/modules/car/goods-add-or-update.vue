<template>
  <el-dialog
    :title="!dataForm.goodsId ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label-width="120px" label="工程编号" prop="proCode">
        <el-input v-model="dataForm.proCode" placeholder="工程编号"></el-input>
      </el-form-item>
      <el-form-item label-width="120px" label="驳运类别" prop="goodsType">
        <el-input v-model="dataForm.goodsType" placeholder="驳运类别"></el-input>
      </el-form-item>
      <el-form-item label-width="120px" label="驳运物件" prop="goodsCode">
        <el-input v-model="dataForm.goodsCode" placeholder="驳运物件"></el-input>
      </el-form-item>
      <el-form-item label-width="120px" label="驳运重量" prop="goodsWeight">
        <el-input v-model="dataForm.goodsWeight" placeholder="驳运重量"></el-input>
      </el-form-item>
      <el-form-item label-width="120px" label="物品长" prop="goodsLength">
        <el-input v-model="dataForm.goodsLength" placeholder="物品长"></el-input>
      </el-form-item>
      <el-form-item label-width="120px" label="物品宽" prop="goodsWidth">
        <el-input v-model="dataForm.goodsWidth" placeholder="物品宽"></el-input>
      </el-form-item>
      <el-form-item label-width="120px" label="物品高" prop="goodsHigh">
        <el-input v-model="dataForm.goodsHigh" placeholder="物品高"></el-input>
      </el-form-item>
      <el-form-item label-width="120px" label="是否大型分段" prop="isBigGoods">
        <el-radio-group v-model="dataForm.isBigGoods">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label-width="120px" label="是否超长宽高" prop="isOverSize">
        <el-radio-group v-model="dataForm.isOverSize">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          goodsId: 0,
          proCode: '',
          goodsType: '',
          goodsCode: '',
          goodsWeight: '',
          goodsLength: '',
          goodsWidth: '',
          goodsHigh: '',
          goodsImg: '',
          goodsSource: '',
          isBigGoods: '',
          isOverSize: ''
        },
        dataRule: {
          proCode: [
            { required: true, message: '工程编号不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (goodsId) {
        var ids = this.dataForm.goodsId = goodsId || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs.dataForm.resetFields()
          if (ids) {
            this.$http({
              url: this.$http.adornUrl(`/car/goods/info/${this.dataForm.goodsId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              this.dataForm.goodsId = data.goodsId
              this.dataForm.proCode = data.proCode
              this.dataForm.goodsType = data.goodsType
              this.dataForm.goodsCode = data.goodsCode
              this.dataForm.goodsWeight = data.goodsWeight
              this.dataForm.goodsLength = data.goodsLength
              this.dataForm.goodsWidth = data.goodsWidth
              this.dataForm.goodsHigh = data.goodsHigh
              this.dataForm.goodsImg = data.goodsImg
              this.dataForm.goodsSource = data.goodsSource
              this.dataForm.isBigGoods = data.isBigGoods
              this.dataForm.isOverSize = data.isOverSize
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/car/goods`),
              method: this.dataForm.goodsId ? 'put' : 'post',
              data: this.$http.adornData({
                'goodsId': this.dataForm.goodsId || undefined,
                'proCode': this.dataForm.proCode,
                'goodsType': this.dataForm.goodsType,
                'goodsCode': this.dataForm.goodsCode,
                'goodsWeight': this.dataForm.goodsWeight,
                'goodsLength': this.dataForm.goodsLength,
                'goodsWidth': this.dataForm.goodsWidth,
                'goodsHigh': this.dataForm.goodsHigh,
                'goodsImg': this.dataForm.goodsImg,
                'goodsSource': this.dataForm.goodsSource,
                'isBigGoods': this.dataForm.isBigGoods,
                'isOverSize': this.dataForm.isOverSize
              })
            }).then(({data}) => {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.visible = false
                  this.$emit('refreshDataList')
                }
              })
            })
          }
        })
      }
    }
  }
</script>
