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
    label: '消息名称',
    prop: 'massageName',
    search: true
  }, {
    label: '消息内容',
    prop: 'massageDetail'
  }, {
    label: '消息附件',
    prop: 'fileResource'
  }, {
    label: '是否发布',
    prop: 'isPublish',
    dicData: [
      {
        label: '发布',
        value: 1
      }, {
        label: '未发布',
        value: 0
      }
    ]
  }]
}
