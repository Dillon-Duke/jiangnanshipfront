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
      <el-form-item label="车辆图片" prop="sourceImage">
        <el-upload
          ref="imgUpload"
          :limit=limitNum
          :on-exceed="exceedFile"
          :on-success="onSuccess"
          :on-remove="handleRemove"
          accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
          :action="upLoadUrl"
          list-type="picture-card"
          >
          <!-- list-type="picture-card" -->
          <!-- <ul v-for="index in dataForm.sourcePhoto" :key="index" class="el-upload-list el-upload-list--picture-card" style="display: inline-block">
            <li tabindex="0" class="el-upload-list__item is-success">
              <img  width="100%" :src="index" alt="暂未图片" class="el-upload-list__item-thumbnail">
            </li>
          </ul>  -->
          <el-button size="small" type="primary">点击上传</el-button>
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
      <el-button type="primary" @click="dataFormCancle()">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: 'imgUpload',
    data () {
      return {
        limitNum: 3,
        upLoadUrl: '/proxyApi/file/upload',
        visible: false,
        dataForm: {
          carId: 0,
          carName: '',
          carNumber: '',
          carPlate: '',
          carLength: '',
          carWight: '',
          carHeight: '',
          fileImage: [],
          sourceImage: [],
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
      exceedFile (files, fileList) {
        this.$notify.warning({
          title: '警告',
          message: `只能选择 ${this.limitNum} 个文件，当前共选择了 ${files.length + fileList.length} 个`
        })
      },
      onSuccess (response, file, fileList) {
        this.dataForm.fileImage.push(response.filename)  // 将文件id放在数组中
        this.dataForm.sourceImage.push(response.fdfsUrl) // 将文件id放在数组中
      },
      init (carId) {
        var ids = this.dataForm.carId = carId || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs.dataForm.resetFields()
          if (ids) {
            this.$http({
              url: this.$http.adornUrl(`/car/car/info/${this.dataForm.carId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              this.dataForm.carId = data.carId
              this.dataForm.carName = data.carName
              this.dataForm.carNumber = data.carNumber
              this.dataForm.carPlate = data.carPlate
              this.dataForm.carLength = data.carLength
              this.dataForm.carWight = data.carWight
              this.dataForm.carHeight = data.carHeight
              let reg = new RegExp('"', 'g') // g代表全部
              this.dataForm.fileImage = JSON.stringify(data.fileImage).replace(reg, '').split(';') // 字符串转数组
              this.dataForm.sourceImage = JSON.stringify(data.sourceImage).replace(reg, '').split(';') // 字符串转数组
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
              url: this.$http.adornUrl(`/car/car`),
              method: this.dataForm.carId ? 'put' : 'post',
              data: this.$http.adornData({
                'carId': this.dataForm.carId || undefined,
                'carName': this.dataForm.carName,
                'carNumber': this.dataForm.carNumber,
                'carPlate': this.dataForm.carPlate,
                'carLength': this.dataForm.carLength,
                'carWight': this.dataForm.carWight,
                'carHeight': this.dataForm.carHeight,
                'fileImage': this.dataForm.fileImage.join(';'),  // 数组转string
                'sourceImage': this.dataForm.sourceImage.join(';'), // 数组转string
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
      },
      // 表单不提交
      dataFormCancle () {
        var imageUrls = this.dataForm.sourcePhoto
        var imageUrl = imageUrls ? [imageUrls] : this.dataListSelections.map(item => {
          return item.imageUrl
        })
        if (imageUrl) {
          this.$http({
            url: this.$http.adornUrl('/file/delete'),
            method: 'delete',
            data: this.$http.adornData(imageUrl, false)
          }).then(() => {
            this.visible = false
            this.$emit('refreshDataList')
          }).catch(({res}) => {
            console.log(res)
          })
        }
      },
      // 图片删除
      handleRemove (file, fileList) {
        var fileurl = file.response.fdfsUrl
        var files = fileurl ? [fileurl] : this.dataListSelections.map(item => {
          return item.files
        })
        if (files) {
          this.$http({
            url: this.$http.adornUrl('/file/delete'),
            method: 'delete',
            data: this.$http.adornData(files, false)
          })
        }
      }
    }
  }
</script>
