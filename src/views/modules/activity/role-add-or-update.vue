<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="130px">
      <el-form-item v-if=" this.dataForm.type === 1" label="用户名称">
        <el-select v-model="username" filterable placeholder= "请选择">
          <el-option
            v-for="item in userList"
            :key="item.userId"
            :label="item.username"
            :value="item.userId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item  v-if=" this.dataForm.type === 2" label="角色名称">
        <el-select v-model="roleName" filterable placeholder="请选择">
          <el-option
            v-for="item in roleList"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId">
          </el-option>
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
  import Icon from '@/icons'
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          type: '',
          name: ''
        },
        userList: [],
        roleList: [],
        username: '',
        roleName: ''
      }
    },
    created () {
      this.iconList = Icon.getNameList()
    },
    methods: {
      init (id, type) {
        this.dataForm.id = id || undefined
        this.$http({
          url: this.$http.adornUrl(type === 1 ? '/dept/user/list' : '/dept/role/list'),
          method: 'post',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (type === 1) {
            this.userList = data
          } else {
            this.roleList = data
          }
        }).then(() => {
          this.visible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields()
          })
        }).then(() => {
          if (this.dataForm.id) {
            // 修改
            this.$http({
              url: this.$http.adornUrl(type === 1 ? '/dept/user/info' : '/dept/role/info'),
              method: 'post',
              data: this.$http.adornData({
                id: this.dataForm.id
              })
            }).then(({data}) => {
              this.dataForm.id = type === 1 ? data.userId : data.roleId
              this.dataForm.name = type === 2 ? data.username : data.roleName
            })
          } else {
            this.userList = []
            this.roleList = []
          }
        }).then(() => {
          this.dataForm.type = type
        })
      },
      handleSelectMenuChange (val) {
        this.dataForm.parentId = val[val.length - 1]
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(this.dataForm.id ? `/sys/menu/update` : `/sys/menu/save`),
              method: 'post',
              data: this.$http.adornData({
                'menuId': this.dataForm.id || undefined,
                'type': this.dataForm.type,
                'name': this.dataForm.name
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