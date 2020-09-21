<template>
  <el-dialog
    :title="!dataForm.carId ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="车辆名称" prop="carName">
        <el-input v-model="dataForm.carName" placeholder="车辆名称"></el-input>
      </el-form-item>
      <el-form-item label="车辆编号" prop="carNumber">
        <el-input v-model="dataForm.carNumber" placeholder="车辆编号"></el-input>
      </el-form-item>
      <el-form-item label="车辆品牌" prop="carModel">
        <el-input v-model="dataForm.carModel" placeholder="车辆品牌"></el-input>
      </el-form-item>
      <el-form-item label="车辆类型" prop="carType" >
        <el-select v-model="dataForm.carType" placeholder="请选择">
          <el-option v-for="item in carTypeList" :key="item.paramKeys" :label="item.remark + ' : ' + item.paramValue" :value="item.confId" />
        </el-select>
      </el-form-item>
      <el-form-item label="Oid编码" prop="carOid">
        <el-input v-model="dataForm.carOid" placeholder="车辆品牌"></el-input>
      </el-form-item>
      <el-form-item label="车辆长" prop="carLength">
        <el-input v-model="dataForm.carLength" placeholder="车辆长"></el-input>
      </el-form-item>
      <el-form-item label="车辆宽" prop="carWight">
        <el-input v-model="dataForm.carWight" placeholder="车辆宽"></el-input>
      </el-form-item>
      <el-form-item label="车辆高" prop="carHeight">
        <el-input v-model="dataForm.carHeight" placeholder="车辆高"></el-input>
      </el-form-item>
      <el-form-item label="空车重量" prop="emptyWeight">
        <el-input v-model="dataForm.emptyWeight" placeholder="空车重量"></el-input>
      </el-form-item>
      <el-form-item label="满载重量" prop="fullWeight">
        <el-input v-model="dataForm.fullWeight" placeholder="满载重量"></el-input>
      </el-form-item>
      <el-form-item label="车辆状态" size="mini" prop="carState">
        <el-radio-group v-model="dataForm.carState">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="2">占用</el-radio>
          <el-radio :label="3">维修</el-radio>
          <el-radio :label="4">报废</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="所属部门" prop="deptIdList">
        <el-checkbox-group v-model="dataForm.deptIdList" @change="bindCheckBox">
          <el-checkbox v-for="dept in deptList" :key="dept.deptId" :label="dept.deptId">{{ dept.deptName }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormCancle()">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        limitNum: 3,
        visible: false,
        carTypeList: [],
        deptList: [],
        dataForm: {
          carId: 0,
          carName: '',
          carNumber: '',
          carModel: '',
          carType: '',
          carOid: '',
          carLength: '',
          carWight: '',
          carHeight: '',
          fileImage: '',
          sourceImage: '',
          deptIdList: [],
          emptyWeight: '',
          fullWeight: '',
          followDeptId: '',
          followDeptName: '',
          carState: 1
        },
        dataRule: {
          carName: [
            { required: true, message: '车类名不能为空', trigger: 'blur' }
          ],
          carLength: [
            { required: true, message: '车长不能为空', trigger: 'blur' }
          ],
          carWight: [
            { required: true, message: '车宽不能为空', trigger: 'blur' }
          ],
          carHeight: [
            { required: true, message: '车宽不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (carId) {
        var ids = this.dataForm.carId = carId || 0
        this.$http({
          url: this.$http.adornUrl('/other/config/carTypeList'),
          method: 'post',
          params: this.$http.adornParams()
        }).then(({data}) => {
          this.carTypeList = data
        })
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
          if (ids) {
            this.$http({
              url: this.$http.adornUrl(`/other/car/info`),
              method: 'post',
              data: this.$http.adornData({
                id: this.dataForm.carId
              })
            }).then(({data}) => {
              this.dataForm.carId = data.carId
              this.dataForm.carName = data.carName
              this.dataForm.carNumber = data.carNumber
              this.dataForm.carModel = data.carModel
              this.dataForm.carType = data.carType
              this.dataForm.carOid = data.carOid
              this.dataForm.carLength = data.carLength
              this.dataForm.carWight = data.carWight
              this.dataForm.carHeight = data.carHeight
              this.dataForm.fileImage = data.fileImage
              this.dataForm.sourceImage = data.sourceImage
              this.dataForm.emptyWeight = data.emptyWeight
              this.dataForm.fullWeight = data.fullWeight
              this.dataForm.carState = data.carState
              this.dataForm.followDeptId = data.followDeptId
              this.dataForm.followDeptName = data.followDeptName
              this.dataForm.deptIdList = data.deptIdList
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
              url: this.$http.adornUrl(this.dataForm.carId ? `/other/car/update` : `/other/car/save`),
              method: 'post',
              data: this.$http.adornData({
                'carId': this.dataForm.carId || undefined,
                'carName': this.dataForm.carName,
                'carNumber': this.dataForm.carNumber,
                'carModel': this.dataForm.carModel,
                'carType': this.dataForm.carType,
                'carOid': this.dataForm.carOid,
                'carLength': this.dataForm.carLength,
                'carWight': this.dataForm.carWight,
                'carHeight': this.dataForm.carHeight,
                'fileImage': this.dataForm.fileImage,
                'sourceImage': this.dataForm.sourceImage,
                'emptyWeight': this.dataForm.emptyWeight,
                'fullWeight': this.dataForm.fullWeight,
                'carState': this.dataForm.carState,
                'followDeptId': this.dataForm.followDeptId,
                'followDeptName': this.dataForm.followDeptName,
                'deptIdList': this.dataForm.deptIdList
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
