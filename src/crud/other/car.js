export const tableOption = {
  border: true,
  selection: true,
  index: false,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  menuWidth: 200,
  align: 'center',
  refreshBtn: true,
  searchSize: 'mini',
  addBtn: false,
  editBtn: false,
  delBtn: false,
  viewBtn: false,
  props: {
    label: 'label',
    value: 'value'
  },
  column: [{
    label: '车辆名称',
    prop: 'carName',
    search: true
  }, {
    label: '车辆编号',
    prop: 'carNumber'
  }, {
    label: '车辆品牌',
    prop: 'carModel'
  }, {
    label: 'Oid编码',
    prop: 'carOid'
  }, {
    label: '车辆长',
    prop: 'carLength'
  }, {
    label: '车辆宽',
    prop: 'carWight'
  }, {
    label: '车辆高',
    prop: 'carHeight'
  }, {
    label: '空车重量',
    prop: 'emptyWeight'
  }, {
    label: '满载重量',
    prop: 'fullWeight'
  }, {
    label: '车辆状态',
    prop: 'carState',
    type: 'select',
    dicData: [
      {
        label: '正常',
        value: 1
      }, {
        label: '占用',
        value: 2
      }, {
        label: '维修',
        value: 3
      }, {
        label: '报废',
        value: 4
      }
    ]
  }, {
    label: '所属部门',
    prop: 'followDeptName'
  }]
}

// 显示车辆图片使用
// {
//   label: '车辆图片',
//   prop: 'sourceImage',
//   type: 'upload',
//   width: 100,
//   listType: 'picture-img'
// },
