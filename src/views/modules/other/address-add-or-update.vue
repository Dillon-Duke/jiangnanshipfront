<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="地址名称" prop="addressName">
        <el-input v-model="dataForm.addressName" placeholder="部门名称"></el-input>
      </el-form-item>
      <el-form-item label="地址Gps" prop="addressPositionGps">
        <el-input v-model="dataForm.addressPositionGps" placeholder="部门编号"></el-input>
      </el-form-item>
      <el-form-item label="父类地址">
        <el-cascader expand-trigger="hover" clearable filterable :options="addressList" :props="addressListTreeProps"
          change-on-select v-model="selectedAddress" @change="handleSelectAddressChange">
        </el-cascader>
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
        addressList: [],
        selectedAddress: [],
        addressListTreeProps: {
          value: 'id',
          label: 'addressName'
        },
        dataForm: {
          id: 0,
          addressName: '',
          addressPositionGps: '',
          parentId: ''
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.$http({
          url: this.$http.adornUrl('/other/address/list'),
          method: 'post',
          data: this.$http.adornData({
            parentId: 0
          })
        }).then(({data}) => {
          this.addressList = treeDataTranslate(data, 'id')
        }).then(() => {
          this.visible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields()
          })
        }).then(() => {
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/other/address/info`),
              method: 'post',
              data: this.$http.adornData({
                id: this.dataForm.id
              })
            }).then(({data}) => {
              this.dataForm.id = data.id
              this.dataForm.addressName = data.addressName
              this.dataForm.addressPositionGps = data.addressPositionGps
              this.selectedAddress = idList(this.addressList, data.parentId, 'id', 'children').reverse()
            })
          } else {
            this.selectedAddress = []
          }
        })
      },
      handleSelectAddressChange (val) {
        this.dataForm.parentId = val[val.length - 1]
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(this.dataForm.id ? `/other/address/update` : `/other/address/save`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'addressName': this.dataForm.addressName,
                'addressPositionGps': this.dataForm.addressPositionGps,
                'parentId': this.dataForm.parentId
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
