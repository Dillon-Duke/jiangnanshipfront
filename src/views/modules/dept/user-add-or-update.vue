<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="dataForm.userName" placeholder="登录帐号"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="realName">
        <el-input v-model="dataForm.realName" placeholder="真实姓名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" :class="{ 'is-required': !dataForm.id }">
        <el-input v-model="dataForm.password" type="password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="comfirmPassword" :class="{ 'is-required': !dataForm.id }">
        <el-input v-model="dataForm.comfirmPassword" type="password" placeholder="确认密码"></el-input>
      </el-form-item>
      <el-form-item label="性别" size="mini" prop="sex">
        <el-radio-group v-model="dataForm.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="dataForm.age" placeholder="年龄"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="dataForm.phone" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="部门" prop="userDeptName">
        <el-select v-model="dataForm.userDeptName" filterable placeholder="请选择对应的部门" @change="getRoleList(dataForm.userDeptName)" style="width:270px;" >
          <el-option v-for="item in deptList" :key="item.deptId" :label="item.deptName" :value="item.deptId" />
        </el-select>
      </el-form-item>
      <el-form-item label="角色" prop="roleIdList">
        <el-select v-model="dataForm.roleIdList" multiple filterable placeholder="请选择对应的角色" style="width:270px;" >
          <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId" />
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
  import { isPhone } from '@/utils/validate'
  export default {
    name: 'imgUpload',
    data () {
      var validatePassword = (rule, value, callback) => {
        if (!this.dataForm.id && !/\S/.test(value)) {
          callback(new Error('密码不能为空'))
        } else {
          callback()
        }
      }
      var validateComfirmPassword = (rule, value, callback) => {
        if (!this.dataForm.id && !/\S/.test(value)) {
          callback(new Error('确认密码不能为空'))
        } else if (this.dataForm.password !== value) {
          callback(new Error('确认密码与密码输入不一致'))
        } else {
          callback()
        }
      }
      var validatePhone = (rule, value, callback) => {
        if (!isPhone(value)) {
          callback(new Error('手机号格式错误'))
        } else {
          callback()
        }
      }
      return {
        visible: false,
        deptList: [],
        roleList: [],
        dataForm: {
          id: 0,
          userName: '',
          realName: '',
          password: '',
          comfirmPassword: '',
          sex: '',
          age: '',
          userSalt: '',
          phone: '',
          roleIdList: [],
          deptIdsList: [],
          userRoleId: '',
          userRoleName: '',
          fileImage: '',
          sourceImage: '',
          userDeptId: '',
          userDeptName: ''
        },
        dataRule: {
          userName: [
            { required: true, message: '用户名不能为空', trigger: 'blur' }
          ],
          realName: [
            { required: true, message: '用户真实姓名不能为空', trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ],
          comfirmPassword: [
            { validator: validateComfirmPassword, trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '手机号不能为空', trigger: 'blur' },
            { validator: validatePhone, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.$http({
          url: this.$http.adornUrl('/dept/dept/list'),
          method: 'post',
          params: this.$http.adornParams()
        }).then(({data}) => {
          this.deptList = data
        })
        this.$http({
          url: this.$http.adornUrl('/dept/role/roleList'),
          method: 'post',
          data: this.$http.adornData({
            'id': id
          })
        }).then(({data}) => {
          this.roleList = data
        }).then(() => {
          this.visible = true
          this.$nextTick(() => {
            this.$refs.dataForm.resetFields()
          })
        }).then(() => {
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/dept/user/info`),
              method: 'post',
              data: this.$http.adornData({
                id: this.dataForm.id
              })
            }).then(({data}) => {
              this.dataForm.userName = data.username
              this.dataForm.realName = data.realName
              this.dataForm.sex = data.sex
              this.dataForm.age = data.age
              this.dataForm.userSalt = data.userSalt
              this.dataForm.phone = data.phone
              this.dataForm.roleIdList = data.roleIdList
              this.dataForm.userRoleId = data.userRoleId
              this.dataForm.deptIdsList = data.deptIdsList
              this.dataForm.userRoleName = data.userRoleName
              this.dataForm.userDeptId = data.userDeptId
              this.dataForm.userDeptName = data.userDeptName
              this.dataForm.fileImage = data.fileImage
              this.dataForm.sourceImage = data.sourceImage
            })
          }
        })
      },
      // 设置单选框
      getRoleList (id) {
        // 清空下一个框
        this.dataForm.roleIdList = ''
        this.$http({
          url: this.$http.adornUrl('/dept/role/roleUser'),
          method: 'post',
          data: this.$http.adornData({
            'id': id
          })
        }).then(({data}) => {
          this.roleList = data
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(this.dataForm.id ? `/dept/user/update` : `/dept/user/save`),
              method: 'post',
              data: this.$http.adornData({
                'userId': this.dataForm.id || undefined,
                'username': this.dataForm.userName,
                'realName': this.dataForm.realName,
                'password': this.dataForm.password,
                'age': this.dataForm.age,
                'sex': this.dataForm.sex,
                'userSalt': this.dataForm.userSalt,
                'phone': this.dataForm.phone,
                'userRoleId': this.dataForm.userRoleId,
                'userRoleName': this.dataForm.userRoleName,
                'userDeptId': this.dataForm.userDeptId,
                'userDeptName': this.dataForm.userDeptName,
                'roleIdList': this.dataForm.roleIdList,
                'fileImage': this.dataForm.fileImage,
                'sourceImage': this.dataForm.sourceImage
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
