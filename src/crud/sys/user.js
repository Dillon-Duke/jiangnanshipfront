export const tableOption = {
  border: true,
  selection: true,
  index: false,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  menuWidth: 350,
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
    label: '用户名',
    prop: 'username',
    search: true
  }, {
    label: '真实姓名',
    prop: 'realName'
  }, {
    label: '性别',
    prop: 'sex',
    dicData: [
      {
        label: '男',
        value: 1
      }, {
        label: '女',
        value: 2
      }
    ]
  }, {
    label: '年龄',
    prop: 'age'
  }, {
    label: '手机号码',
    prop: 'phone'
  }, {
    label: '状态',
    prop: 'status',
    type: 'select',
    dicData: [
      {
        label: '禁用',
        value: 0
      }, {
        label: '正常',
        value: 1
      }
    ]

  }]
}
