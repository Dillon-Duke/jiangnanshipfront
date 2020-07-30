<template>
  <div class="mod-role">
    <avue-crud ref="crud"
               :page="page"
               :data="dataList"
               :option="tableOption"
               @search-change="searchChange"
               @selection-change="selectionChange"
               @on-load="getDataList">
      <template slot="menuLeft">
      </template>
      <template slot-scope="scope"
                slot="menu">
      <el-button type="primary"
                   icon="el-icon-plus"
                   size="small"
                   v-if="isAuth('activity:role:save') && scope.row.userRole === undefined"
                   @click.stop="addOrUpdateHandle(undefined, scope.row.userRole)">{{scope.row.userRole == 2 ? '新增角色' : '新增用户'}}</el-button>
        <el-button type="danger"
                   icon="el-icon-delete"
                   size="small"
                   v-if="isAuth('activity:role:update')  && scope.row.userRole !== undefined"
                   @click.stop="addOrUpdateHandle(scope.row.userRoleId, scope.row.userRole)">{{scope.row.userRole == 2 ? '修改角色' : '修改用户'}}</el-button>
      </template>
    </avue-crud>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible"
                   ref="addOrUpdate"
                   @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
import { tableOption } from '@/crud/activity/role'
import AddOrUpdate from './role-add-or-update'
export default {
  data () {
    return {
      dataList: [],
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      tableOption: tableOption,
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10 // 每页显示多少条
      }
    }
  },
  components: {
    AddOrUpdate
  },
  methods: {
    // 获取数据列表
    getDataList (page, params) {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/activity/process/task/page'),
        method: 'post',
        params: this.$http.adornParams(
          Object.assign(
            {
              current: page == null ? this.page.currentPage : page.currentPage,
              size: page == null ? this.page.pageSize : page.pageSize
            },
            params
          )
        )
      }).then(({ data }) => {
        this.dataList = data.records
        this.page.total = data.total
        this.dataListLoading = false
      })
    },
    // 条件查询
    searchChange (params) {
      this.getDataList(this.page, params)
    },
    // 多选变化
    selectionChange (val) {
      this.dataListSelections = val
    },
    // 新增 / 修改
    addOrUpdateHandle (id, type) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id, type)
      })
    },
    // 删除
    deleteHandle (id) {
      var userIds = id ? [id] : this.dataListSelections.map(item => {
        return item.userId
      })
      this.$confirm(`确定对[id=${userIds.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl('/activity/process/task/delete'),
          method: 'post',
          data: this.$http.adornData(userIds, false)
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
