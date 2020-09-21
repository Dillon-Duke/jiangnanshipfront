<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="消息名称" prop="massageName">
        <el-input v-model="dataForm.massageName" placeholder="请输入消息名称"></el-input>
      </el-form-item>
      <el-form-item label="消息内容" prop="massageDetail">
        <el-input type="textarea" :rows="3" placeholder="请输入消息内容" v-model="dataForm.massageDetail" />
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
          id: 0,
          massageName: '',
          massageDetail: '',
          fileName: '',
          fileResource: '',
          isPublish: 0
        },
        dataRule: {
          massageName: [
            { required: true, message: '消息名称不能为空', trigger: 'blur' }
          ],
          massageDetail: [
            { required: true, message: '消息内容不能为空', trigger: 'blur' }
          ],
          isPublish: [
            { required: true, message: '是否发布不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs.dataForm.resetFields()
        })
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(`/common/massage/info`),
            method: 'post',
            data: this.$http.adornData({
              id: this.dataForm.id
            })
          }).then(({data}) => {
            this.dataForm.massageName = data.massageName
            this.dataForm.massageDetail = data.massageDetail
            this.dataForm.fileName = data.fileName
            this.dataForm.fileResource = data.fileResource
            this.dataForm.isPublish = data.isPublish
          })
        }
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
              url: this.$http.adornUrl(this.dataForm.id ? `/common/massage/update` : `/common/massage/save`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'massageName': this.dataForm.massageName,
                'massageDetail': this.dataForm.massageDetail,
                'fileName': this.dataForm.fileName,
                'fileResource': this.dataForm.fileResource,
                'isPublish': this.dataForm.isPublish
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
