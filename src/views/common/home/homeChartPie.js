export const optionPie = {
  title: {
    text: '车辆状态统计',
    subtext: '平板车',
    left: 'center',
    top: '4%'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    left: 'center',
    top: 'bottom',
    data: ['正常', '占用', '维修', '报废']
  },
  toolbox: {
    show: true,
    feature: {
      mark: {show: true},
      dataView: {show: true, readOnly: false},
      magicType: {
        show: true,
        type: ['pie', 'funnel']
      },
      restore: {show: true},
      saveAsImage: {show: true}
    }
  },
  series: {
    name: '数量',
    type: 'pie',
    radius: [25, 100],
    center: ['50%', '53%'],
    roseType: 'area',
    data: []
  }
}
