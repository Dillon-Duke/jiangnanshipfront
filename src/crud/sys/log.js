export const tableOption = {
  border: true,
  menu: false, // 移除操作栏
  index: false,
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  refreshBtn: true,
  addBtn: false,
  editBtn: false,
  delBtn: false,
  viewBtn: false,
  props: {
    label: 'label',
    value: 'value'
  },
  column: [{
    label: '用户名',
    prop: 'username',
    search: true
  }, {
    label: '用户操作',
    prop: 'operation',
    search: true
  }, {
    label: '请求方法',
    prop: 'method'
  }, {
    label: '请求参数',
    prop: 'params'
  }, {
    label: '执行时长(毫秒)',
    prop: 'time'
  }, {
    label: 'IP地址',
    prop: 'ip'
  }, {
    label: '创建时间',
    prop: 'createDate'
  }]
}
