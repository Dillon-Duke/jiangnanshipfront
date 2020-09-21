<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="参数类型" prop="paramKey" >
        <el-select v-model="dataForm.paramKey" placeholder="请选择">
          <el-option v-for="item in configTypeList" :key="item.paramKeys" :label="item.paramValue" :value="item.operatorType" />
        </el-select>
      </el-form-item>
      <el-form-item label="参数值" prop="paramValue">
        <el-input v-model="dataForm.paramValue" placeholder="参数值"></el-input>
      </el-form-item>
      <el-form-item v-if="dataForm.paramKey == '3'" label="操作类型" prop="operatorType">
        <el-radio-group v-model="dataForm.operatorType">
          <el-radio :label="1">选择</el-radio>
          <el-radio :label="2">输入</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="dataForm.paramKey == '4'" label="重要程度" prop="operatorType">
        <el-input v-model="dataForm.operatorType" placeholder="请输入数值，数值越大，重要程度越高" />
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
  export default {
    data () {
      return {
        visible: false,
        configTypeList: [],
        dataForm: {
          confId: 0,
          paramKey: '',
          paramValue: '',
          operatorType: '',
          remark: ''
        },
        dataRule: {
          paramKey: [
            { required: true, message: '参数名不能为空', trigger: 'blur' }
          ],
          paramValue: [
            { required: true, message: '参数值不能为空', trigger: 'blur' }
          ]
        },
        carTypeEnumsProps: {
          label: 'name'
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.$http({
          url: this.$http.adornUrl('/other/config/list'),
          method: 'post',
          params: this.$http.adornParams()
        }).then(({data}) => {
          this.configTypeList = data
        }).then(() => {
          this.visible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields()
          })
        }).then(() => {
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/other/config/info`),
              method: 'post',
              data: this.$http.adornData({
                id: this.dataForm.id
              })
            }).then(({data}) => {
              this.dataForm.confId = data.confId
              this.dataForm.paramKey = data.paramKey
              this.dataForm.paramValue = data.paramValue
              this.dataForm.operatorType = data.operatorType
              this.dataForm.remark = data.remark
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(this.dataForm.id ? '/other/config/update' : `/other/config/save`),
              method: 'post',
              data: this.$http.adornData({
                'confId': this.dataForm.confId || undefined,
                'paramKey': this.dataForm.paramKey,
                'paramValue': this.dataForm.paramValue,
                'operatorType': this.dataForm.operatorType,
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
