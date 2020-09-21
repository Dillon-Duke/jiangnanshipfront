<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="姓名 " prop="contName">
        <el-input v-model="dataForm.contName" placeholder="请输入联系人姓名"></el-input>
      </el-form-item>
      <el-form-item label="工号" prop="contNumber">
        <el-input v-model="dataForm.contNumber" placeholder="请输入联系人工号"></el-input>
      </el-form-item>
      <el-form-item label="所属部门" prop="contDeptName">
        <el-select v-model="dataForm.contDeptName" placeholder="请选择">
          <el-option v-for="item in deptList" :key="item.deptId" :label="item.deptName" :value="item.deptId" />
        </el-select>
      </el-form-item>
      <el-form-item label="电话" prop="contPhone">
        <el-input v-model="dataForm.contPhone" placeholder="请输入联系人手机号码"></el-input>
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
        deptList: [],
        dataForm: {
          contId: 0,
          contName: '',
          contNumber: '',
          contDeptId: '',
          contDeptName: '',
          contPhone: '',
          deptContastsIds: []
        },
        dataRule: {
          userName: [
            { required: true, message: '联系人姓名不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.contId = id || 0
        this.$http({
          url: this.$http.adornUrl('/dept/dept/list'),
          method: 'post',
          params: this.$http.adornParams()
        }).then(({data}) => {
          this.deptList = data
        }).then(() => {
          this.visible = true
          this.$nextTick(() => {
            this.$refs.dataForm.resetFields()
          })
        }).then(() => {
          if (this.dataForm.contId) {
            this.$http({
              url: this.$http.adornUrl(`/dept/contasts/info`),
              method: 'post',
              data: this.$http.adornData({
                id: this.dataForm.contId
              })
            }).then(({data}) => {
              this.dataForm.contId = data.contId
              this.dataForm.contName = data.contName
              this.dataForm.contNumber = data.contNumber
              this.dataForm.contDeptId = data.contDeptId
              this.dataForm.contDeptName = data.contDeptName
              this.dataForm.contPhone = data.contPhone
              this.dataForm.deptContastsIds = data.deptContastsIds
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
              url: this.$http.adornUrl(this.dataForm.contId ? `/dept/contasts/update` : `/dept/contasts/save`),
              method: 'post',
              data: this.$http.adornData({
                'contId': this.dataForm.contId || undefined,
                'contName': this.dataForm.contName,
                'contNumber': this.dataForm.contNumber,
                'contDeptId': this.dataForm.contDeptId,
                'contDeptName': this.dataForm.contDeptName,
                'contPhone': this.dataForm.contPhone,
                'deptContastsIds': this.dataForm.deptContastsIds
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
