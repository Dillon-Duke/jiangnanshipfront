<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="130px">
      <el-form-item v-if="dataForm.username !== null" label="角色名称" prop="roleName" >
        <el-select v-model="dataForm.roleName" @change="getUserList(dataForm.roleName)" filterable placeholder="请选择对应的角色" >
          <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId" />
        </el-select>
      </el-form-item>
      <el-form-item label="用户名称" prop="userNameList" >
        <el-select v-model="dataForm.userNameList" multiple filterable placeholder="请选择对应的用户">
          <el-option v-for="item in userList" :key="item.userId" :label="item.realName" :value="item.userId" />
        </el-select>
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
          userNameList: [],
          userRoleId: '',
          userName: '',
          roleName: ''
        },
        userList: [],
        roleList: []
      }
    },
    methods: {
      init (id, type) {
        this.dataForm.id = id || undefined
        this.$http({
          url: this.$http.adornUrl('/dept/role/list'),
          method: 'post'
        }).then(({data}) => {
          this.roleList = data
        }).then(() => {
          this.visible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields()
          })
        }).then(() => {
          if (this.dataForm.id) {
            // 修改
            this.$http({
              url: this.$http.adornUrl('/activity/process/task/info'),
              method: 'post',
              data: this.$http.adornData({
                id: this.dataForm.id
              })
            }).then(({data}) => {
              this.dataForm.id = data.id
              this.dataForm.userNameList = data.userNameList
              this.dataForm.userRoleId = data.userRoleId
              this.dataForm.roleName = data.roleName
              this.dataForm.userName = data.userName
            })
          }
        }).then(() => {
          this.dataForm.type = type
        })
      },
      handleSelectMenuChange (val) {
        this.dataForm.parentId = val[val.length - 1]
      },
      // 获得对应的用户列表
      getUserList (id) {
        // 清空下一个框
        this.dataForm.userNameList = ''
        this.$http({
          url: this.$http.adornUrl('/dept/user/roleUser'),
          method: 'post',
          data: this.$http.adornData({
            'id': id
          })
        }).then(({data}) => {
          this.userList = data
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(this.dataForm.id ? `/activity/process/task/update` : `/activity/process/task/save`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'userNameList': this.dataForm.userNameList,
                'userRoleId': this.dataForm.userRoleId,
                'roleName': this.dataForm.roleName,
                'userName': this.dataForm.userName
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

<style lang="scss">
  .mod-menu {
    .menu-list__input,
    .icon-list__input {
       > .el-input__inner {
        cursor: pointer;
      }
    }
    &__icon-popover {
      max-width: 420px;
    }
    &__icon-list {
      max-height: 180px;
      padding: 0;
      margin: -8px 0 0 -8px;
      > .el-button {
        padding: 8px;
        margin: 8px 0 0 8px;
        > span {
          display: inline-block;
          vertical-align: middle;
          width: 18px;
          height: 18px;
          font-size: 18px;
        }
      }
    }
    .icon-list__tips {
      font-size: 18px;
      text-align: center;
      color: #e6a23c;
      cursor: pointer;
    }
  }
</style>