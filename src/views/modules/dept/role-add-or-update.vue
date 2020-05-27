<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="dataForm.roleName" placeholder="角色名称"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
      </el-form-item>
      <el-form-item label="部门" size="mini" prop="deptIdList">
        <el-checkbox-group v-model="dataForm.deptIdList" @change="bindCheckBox">
          <el-checkbox v-for="role in roleList" :key="role.deptId" :label="role.deptId">{{ role.deptName }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="权限" size="mini" prop="powerIdList">
        <el-checkbox-group v-model="dataForm.powerIdList">
          <el-checkbox v-for="role in powerList" :key="role.confId" :label="role.confId">{{ role.paramKey }}&nbsp;&nbsp;{{ role.paramValue }}</el-checkbox>
        </el-checkbox-group>
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
        roleList: [],
        powerList: [],
        menuListTreeProps: {
          label: 'deptName',
          children: 'children'
        },
        dataForm: {
          Id: 0,
          roleName: '',
          remark: '',
          deptIdList: [],
          powerIdList: [],
          roleDept: ''
        },
        dataRule: {
          roleName: [
            { required: true, message: '角色名称不能为空', trigger: 'blur' }
          ]
        },
        tempKey: -666666 // 临时key, 用于解决tree半选中状态项不能传给后台接口问题. # 待优化
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.$http({
          url: this.$http.adornUrl('/dept/config/list'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          this.powerList = data
        })
        this.$http({
          url: this.$http.adornUrl('/dept/dept/list'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          this.roleList = data
        }).then(() => {
          this.visible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields()
          })
        }).then(() => {
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/dept/role/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              this.dataForm.id = data.roleId
              this.dataForm.roleName = data.roleName
              this.dataForm.roleDept = data.deptIdList[0]
              this.dataForm.remark = data.remark
              this.dataForm.deptIdList = data.deptIdList
              this.dataForm.powerIdList = data.powerIdList
            })
          }
        })
      },
      // 设置单选框
      bindCheckBox (value) {
        if (this.dataForm.deptIdList.length > 1) {
          this.dataForm.deptIdList.splice(0, 1)
        }
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/dept/role`),
              method: this.dataForm.id ? 'put' : 'post',
              data: this.$http.adornData({
                'roleId': this.dataForm.id || undefined,
                'roleName': this.dataForm.roleName,
                'roleDept': this.dataForm.deptIdList[0],
                'remark': this.dataForm.remark,
                'deptIdList': this.dataForm.deptIdList,
                'powerIdList': this.dataForm.powerIdList
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
