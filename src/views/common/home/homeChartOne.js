export const optionOne = {
  title: {
    text: '每日任务实时统计',
    left: '0.5%',
    top: '1.5 %'
  },
  tooltip: {},
  xAxis: {
    data: [],
    name: '任务量'
  },
  yAxis: {},
  series: [{
    name: '任务量',
    type: 'bar',
    data: [],
    itemStyle: {
      normal: {
        color: '#555'
      }
    }
  }]
}
