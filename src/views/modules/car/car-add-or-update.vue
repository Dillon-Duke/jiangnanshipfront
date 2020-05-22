<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="车辆名称" prop="carName">
        <el-input v-model="dataForm.carName" placeholder="车辆名称"></el-input>
      </el-form-item>
      <el-form-item label="车辆编号" prop="carNumber">
        <el-input v-model="dataForm.carNumber" placeholder="车辆编号"></el-input>
      </el-form-item>
      <el-form-item label="车辆牌照" prop="carPlate">
        <el-input v-model="dataForm.carPlate" placeholder="车辆牌照"></el-input>
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
      <el-form-item label="车辆图片" prop="sourcePhoto">
        <el-upload
          class="upload-demo"
          action="#"
          list-type="picture"
          multiple
          :limit="1"
          :on-exceed="handleExceed"
          :on-success="onSuccess">
          <el-button size="small" type="primary">选择图片</el-button>
        </el-upload>
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
          carName: '',
          carNumber: '',
          carPlate: '',
          carLength: '',
          carWight: '',
          carHeight: '',
          carPhoto: '',
          sourcePhoto: '',
          emptyWeight: '',
          fullWeight: '',
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
      handleExceed (files, fileList) {
        alert('一次最多只能上传一张图片')
      },
      onSuccess (response, file, fileList) {
        debugger
        this.$http({
          url: this.$http.adornUrl(`/file/upload`),
          method: 'post',
          params: file
        }).then((data) => {
          debugger
          this.dataForm.sourcePhoto = data.sourcePhoto
        })
      },
      init (id) {
        var ids = this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs.dataForm.resetFields()
          if (ids) {
            this.$http({
              url: this.$http.adornUrl(`/sys/car/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              this.dataForm.carName = data.carName
              this.dataForm.carNumber = data.carNumber
              this.dataForm.carPlate = data.carPlate
              this.dataForm.carLength = data.carLength
              this.dataForm.carWight = data.carWight
              this.dataForm.carHeight = data.carHeight
              this.dataForm.carPhoto = data.carPhoto
              this.dataForm.sourcePhoto = data.sourcePhoto
              this.dataForm.emptyWeight = data.emptyWeight
              this.dataForm.fullWeight = data.fullWeight
              this.dataForm.carState = data.carState
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/sys/car`),
              method: this.dataForm.id ? 'put' : 'post',
              data: this.$http.adornData({
                'carId': this.dataForm.id || undefined,
                'carName': this.dataForm.carName,
                'carNumber': this.dataForm.carNumber,
                'carPlate': this.dataForm.carPlate,
                'carLength': this.dataForm.carLength,
                'carWight': this.dataForm.carWight,
                'carHeight': this.dataForm.carHeight,
                'carPhoto': this.dataForm.carPhoto,
                'sourcePhoto': this.dataForm.sourcePhoto,
                'emptyWeight': this.dataForm.emptyWeight,
                'fullWeight': this.dataForm.fullWeight,
                'carState': this.dataForm.carState
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
