<template>
  <div class="mod-goods">
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
                   v-if="isAuth('other:goods:save')"
                   @click.stop="addOrUpdateHandle()">新增</el-button>
        <el-button type="danger"
                   @click="deleteHandle()"
                   v-if="isAuth('other:goods:delete')"
                   size="small"
                   :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </template>
      <template slot-scope="scope"
                slot="menu">
        <el-button type="primary"
                   icon="el-icon-edit"
                   size="small"
                   v-if="isAuth('other:goods:update')"
                   @click.stop="addOrUpdateHandle(scope.row.goodsId)">编辑</el-button>
        <el-button type="danger"
                   icon="el-icon-delete"
                   size="small"
                   v-if="isAuth('other:goods:delete')"
                   @click.stop="deleteHandle(scope.row)">删除</el-button>
      </template>
    </avue-crud>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible"
                   ref="addOrUpdate"
                   @refreshDataList="getDataList">
    </add-or-update>
  </div>
</template>

<script>
import { tableOption } from '@/crud/other/goods'
import AddOrUpdate from './goods-add-or-update'
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
        url: this.$http.adornUrl('/other/goods/page'),
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
        this.page.currentPage = data.current
        this.page.pageSize = data.size
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
    addOrUpdateHandle (id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    // 删除
    deleteHandle (goods) {
      let carIds = goods ? [goods.goodsId] : this.dataListSelections.map(item => {
        return item.goodsId
      })
      let goodsList = goods ? [goods] : this.dataListSelections.map(item => {
        return item
      })
      this.$confirm(`确定对[id= ${carIds.join(',')}]进行[${carIds ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl('/other/goods/delete'),
          method: 'post',
          data: this.$http.adornData(goodsList, false)
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
