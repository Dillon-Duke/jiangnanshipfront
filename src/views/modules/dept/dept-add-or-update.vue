<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="部门名称" prop="deptName">
        <el-input v-model="dataForm.deptName" placeholder="部门名称"></el-input>
      </el-form-item>
      <el-form-item label="部门编号" prop="deptCode">
        <el-input v-model="dataForm.deptCode" placeholder="部门编号"></el-input>
      </el-form-item>
      <el-form-item label="父类部门">
        <el-cascader
          expand-trigger="hover"
          :options="deptList"
          :props="deptListTreeProps"
          change-on-select
          v-model="selectedDept"
          @change="handleSelectDeptChange">
        </el-cascader>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { treeDataTranslate, idList } from '@/utils'
  export default {
    data () {
      return {
        visible: false,
        deptList: [],
        selectedDept: [],
        deptListTreeProps: {
          value: 'deptId',
          label: 'deptName'
        },
        dataForm: {
          id: 0,
          deptName: '',
          deptCode: '',
          parentId: '',
          remark: ''
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.$http({
          url: this.$http.adornUrl('/dept/dept/list'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          this.deptList = treeDataTranslate(data, 'deptId')
        }).then(() => {
          this.visible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields()
          })
        }).then(() => {
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/dept/dept/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              this.dataForm.id = data.deptId
              this.dataForm.deptName = data.deptName
              this.dataForm.deptCode = data.deptCode
              this.dataForm.remark = data.remark
              this.selectedDept = idList(this.deptList, data.parentId, 'deptId', 'children').reverse()
            })
          } else {
            this.selectedDept = []
          }
        })
      },
      handleSelectDeptChange (val) {
        this.dataForm.parentId = val[val.length - 1]
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/dept/dept`),
              method: this.dataForm.id ? 'put' : 'post',
              data: this.$http.adornData({
                'deptId': this.dataForm.id || undefined,
                'deptName': this.dataForm.deptName,
                'deptCode': this.dataForm.deptCode,
                'parentId': this.dataForm.parentId,
                'remark': this.dataForm.remark
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
