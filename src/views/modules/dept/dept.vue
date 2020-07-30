<template>
  <div class="mod-dept">
    <el-form :inline="true"
             :model="dataForm">
      <el-form-item>
        <el-button v-if="isAuth('dept:dept:save')"
                   type="primary"
                   @click="addOrUpdateHandle()">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList"
              border
              style="width: 100%;"
              row-key="deptId">
      <el-table-column prop="deptName"
                       align="center"
                       treeKey="deptId"
                       width="200"
                       label="部门名称">
      </el-table-column>
      <el-table-column prop="deptCode"
                       align="center"
                       width="200"
                       label="部门编号">
      </el-table-column>
      <el-table-column prop="remark"
                       header-align="center"
                       align="center"
                       width="200"
                       label="备注">
      </el-table-column>
      <el-table-column prop="createDate"
                       header-align="center"
                       align="center"
                       width="200"
                       label="创建时间">
      </el-table-column>
      <el-table-column fixed="right"
                       header-align="center"
                       align="center"
                       label="操作">
        <template slot-scope="scope">
          <el-button v-if="isAuth('dept:dept:update')"
                     type="text"
                     size="small"
                     @click="addOrUpdateHandle(scope.row.deptId)">修改</el-button>
          <el-button v-if="isAuth('dept:dept:delete')"
                     type="text"
                     size="small"
                     @click="deleteHandle(scope.row.deptId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible"
                   ref="addOrUpdate"
                   @refreshDataList="getDataList"></add-or-update>
  </div>
</template>
<script>
import AddOrUpdate from './dept-add-or-update'
import { treeDataTranslate } from '@/utils'
export default {
  data () {
    return {
      dataForm: {},
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
        url: this.$http.adornUrl('/dept/dept/list'),
        method: 'post',
        params: this.$http.adornParams()
      }).then(({ data }) => {
        this.dataList = treeDataTranslate(data, 'deptId')
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
          url: this.$http.adornUrl(`/dept/dept/delete`),
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