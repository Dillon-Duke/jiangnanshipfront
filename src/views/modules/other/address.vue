<template>
  <div class="mod-address">
    <el-form :inline="true" :model="dataForm">
      <el-form-item>
        <el-button v-if="isAuth('other:address:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" border style="width: 100%;" row-key="id">
      <el-table-column prop="addressName" header-align="center" align="left" treeKey="id" width="350" label="地址名称"></el-table-column>
      <el-table-column prop="addressPositionGps" align="center" width="500" label="地址Gps信息"></el-table-column>
      <el-table-column prop="createDate"  header-align="center" align="center" width="350" label="创建地址时间"></el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" label="操作">
        <template slot-scope="scope">
          <el-button v-if="isAuth('other:address:update')" type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button v-if="isAuth('other:address:delete')" type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>
<script>
import AddOrUpdate from './address-add-or-update'
import { treeDataTranslate } from '@/utils'
export default {
  data () {
    return {
      dataList: [],
      dataListLoading: false,
      addOrUpdateVisible: false
    }
  },
  components: {
    AddOrUpdate
  },
  activated () {
    this.getDataList()
  },
  methods: {
    // 初始化获取数据列表
    getDataList () {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/other/address/list'),
        method: 'post',
        data: this.$http.adornData({
          parentId: -1
        })
      }).then(({ data }) => {
        this.dataList = treeDataTranslate(data, 'id')
        this.dataListLoading = false
      })
    },
    // 新增 / 修改
    addOrUpdateHandle (id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    // 删除
    deleteHandle (id) {
      this.$confirm(`确定对[id=${id}]进行[删除]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl(`/other/address/delete`),
          method: 'post',
          data: this.$http.adornData({
            id: id
          })
        }).then(({ data }) => {
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1500,
            onClose: () => {
              this.getDataList()
            }
          })
        })
      })
    }
  }
}
</script>