<template>
  <div class="mod-appimage">
    <avue-crud ref="crud"
               :page="page"
               :data="dataList"
               :option="tableOption"
               @search-change="searchChange"
               @selection-change="selectionChange"
               @on-load="getDataList">
      <template slot="menuLeft">
        <el-button type="primary"
                   icon="el-icon-plus"
                   size="small"
                   v-if="isAuth('sys:appimage:save')"
                   @click.stop="addOrUpdateHandle()">新增</el-button>
        <el-button type="danger"
                   @click="deleteHandle()"
                   v-if="isAuth('sys:appimage:delete')"
                   size="small"
                   :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </template>
      <template slot-scope="scope"
                slot="menu">
        <el-button type="primary"
                   icon="el-icon-edit"
                   size="small"
                   v-if=" scope.row.isUse == 0 ? isAuth('sys:appimage:use') : null"
                   @click.stop="useOrNot(scope.row,1)">应用</el-button>
        <el-button type="danger"
                   icon="el-icon-delete"
                   size="small"
                   v-if=" scope.row.isUse == 1 ? isAuth('sys:appimage:unuse') : null"
                   @click.stop="useOrNot(scope.row,0)">取消应用</el-button>
        <el-button type="primary"
                   icon="el-icon-edit"
                   size="small"
                   v-if="isAuth('sys:appimage:update')"
                   @click.stop="addOrUpdateHandle(scope.row.id,scope.row.isUse)">编辑</el-button>
        <el-button type="danger"
                   icon="el-icon-delete"
                   size="small"
                   v-if="isAuth('sys:appimage:delete')"
                   @click.stop="deleteHandle(scope.row.id)">删除</el-button>
      </template>
    </avue-crud>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible"
                   ref="addOrUpdate"
                   @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
import { tableOption } from '@/crud/sys/appimage'
import AddOrUpdate from './appimage-add-or-update'
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
        url: this.$http.adornUrl('/lunch/image/page'),
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
    addOrUpdateHandle (id, isUse) {
      if (isUse === 1) {
        this.$message({
          message: '图片已应用，无法编辑',
          type: 'error',
          duration: 1000
        })
      } else {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      }
    },
    // 删除
    deleteHandle (id) {
      var ids = id ? [id] : this.dataListSelections.map(item => {
        return item.id
      })
      this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl('/lunch/image/delete'),
          method: 'post',
          data: this.$http.adornData(ids, false)
        }).then(({ data }) => {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        }).then(() => {
          this.$router.go(0)
        })
      }).catch(() => { })
    },
    // 不发布或取消发布消息
    useOrNot (pojo, use) {
      this.$http({
        url: this.$http.adornUrl(`/lunch/image/useOrNot`),
        method: 'post',
        data: this.$http.adornData({
          'id': pojo.id,
          'fileImage': pojo.fileImage,
          'sourceImage': pojo.sourceImage,
          'isUse': use
        })
      }).then(({data}) => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      }).then(() => {
        this.$router.go(0)
      })
    }
  }
}
</script>
