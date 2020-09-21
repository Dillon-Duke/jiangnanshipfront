<template>
  <el-dialog
    :title="!dataForm.goodsId ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label-width="120px" label="工程编号" prop="proCode">
        <el-input v-model="dataForm.proCode" placeholder="工程编号"></el-input>
      </el-form-item>
      <el-form-item label-width="120px" label="物品类别" prop="goodsType">
        <el-input v-model="dataForm.goodsType" placeholder="驳运类别"></el-input>
      </el-form-item>
      <el-form-item label-width="120px" label="分段编号" prop="goodsCode">
        <el-input v-model="dataForm.goodsCode" placeholder="驳运物件"></el-input>
      </el-form-item>
      <el-form-item label-width="120px" label="物品重量" prop="goodsWeight">
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
      <el-form-item label="物品图片" prop="sourceImage">
        <el-upload
          ref="imgUpload"
          :limit=limitNum
          :on-exceed="exceedFile"
          :on-success="onSuccess"
          :on-remove="handleRemove"
          accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
          :action="upLoadUrl"
          list-type="picture-card">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label-width="120px" label="是否大型分段" prop="isBigGoods">
        <el-radio-group v-model="dataForm.isBigGoods">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label-width="120px" label="是否超长宽高" prop="isOverSize">
        <el-radio-group v-model="dataForm.isOverSize">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="0">超高</el-radio>
          <el-radio :label="1">超宽</el-radio>
          <el-radio :label="0">超高宽</el-radio>
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
    name: 'imgUpload',
    data () {
      return {
        limitNum: 3,
        upLoadUrl: '/proxyApi/file/upload',
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
          fileImage: [],
          sourceImage: [],
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
      exceedFile (files, fileList) {
        this.$notify.warning({
          title: '警告',
          message: `只能选择 ${this.limitNum} 个文件，当前共选择了 ${files.length + fileList.length} 个`
        })
      },
      onSuccess (response, file, fileList) {
        this.dataForm.fileImage.push(response.filename)  // 将文件id放在数组中
        this.dataForm.sourceImage.push(response.fdfsUrl) // 将文件id放在数组中
      },
      init (goodsId) {
        var ids = this.dataForm.goodsId = goodsId || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs.dataForm.resetFields()
          if (ids) {
            this.$http({
              url: this.$http.adornUrl(`/other/goods/info`),
              method: 'post',
              data: this.$http.adornData({
                id: this.dataForm.goodsId
              })
            }).then(({data}) => {
              this.dataForm.goodsId = data.goodsId
              this.dataForm.proCode = data.proCode
              this.dataForm.goodsType = data.goodsType
              this.dataForm.goodsCode = data.goodsCode
              this.dataForm.goodsWeight = data.goodsWeight
              this.dataForm.goodsLength = data.goodsLength
              this.dataForm.goodsWidth = data.goodsWidth
              this.dataForm.goodsHigh = data.goodsHigh
              let reg = new RegExp('"', 'g') // g代表全部
              this.dataForm.fileImage = JSON.stringify(data.fileImage).replace(reg, '').split(';') // 字符串转数组
              this.dataForm.sourceImage = JSON.stringify(data.sourceImage).replace(reg, '').split(';') // 字符串转数组
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
              url: this.$http.adornUrl(this.dataForm.goodsId ? `/other/goods/update` : `/other/goods/save`),
              method: 'post',
              data: this.$http.adornData({
                'goodsId': this.dataForm.goodsId || undefined,
                'proCode': this.dataForm.proCode,
                'goodsType': this.dataForm.goodsType,
                'goodsCode': this.dataForm.goodsCode,
                'goodsWeight': this.dataForm.goodsWeight,
                'goodsLength': this.dataForm.goodsLength,
                'goodsWidth': this.dataForm.goodsWidth,
                'goodsHigh': this.dataForm.goodsHigh,
                'fileImage': this.dataForm.fileImage.join(';'),  // 数组转string
                'sourceImage': this.dataForm.sourceImage.join(';'), // 数组转string
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
