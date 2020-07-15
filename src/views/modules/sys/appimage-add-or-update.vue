<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item v-if="!dataForm.id" label="图片缩略" prop="massageName">
        <el-upload
          ref="imgUpload"
          :limit=limitNum
          :on-exceed="exceedFile"
          :on-success="onSuccess"
          :on-remove="handleRemove"
          accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
          :action="upLoadUrl"
          list-type="picture-card"
          >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="图片名称" prop="customName">
        <el-input v-model="dataForm.customName" placeholder="图片名称"></el-input>
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
        limitNum: 1,
        upLoadUrl: '/proxyApi/file/upload',
        visible: false,
        dataForm: {
          id: 0,
          fileImage: '',
          sourceImage: '',
          customName: ''
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
        this.dataForm.fileImage = response.filename
        this.dataForm.sourceImage = response.fdfsUrl
      },
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs.dataForm.resetFields()
          if (id) {
            this.$http({
              url: this.$http.adornUrl(`/lunch/image/info`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id
              })
            }).then(({data}) => {
              this.dataForm.id = data.id
              this.dataForm.fileImage = data.fileImage
              this.dataForm.sourceImage = data.sourceImage
              this.dataForm.customName = data.customName
            })
          }
        })
      },
      // 设置单选框
      bindCheckBox (value) {
        if (this.dataForm.roleIdList.length > 1) {
          this.dataForm.roleIdList.splice(0, 1)
        }
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(this.dataForm.id ? `/lunch/image/update` : `/lunch/image/save`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id,
                'fileImage': this.dataForm.fileImage,
                'sourceImage': this.dataForm.sourceImage,
                'customName': this.dataForm.customName
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
