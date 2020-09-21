<template>
  <div>
    <header>
      <h1>江南后台</h1>
      <div class="showTime">
        {{ nowDate + ' ' + nowTime + ' ' + nowWeek }}
      </div>
    </header>
    <section class="meanbox">
      <div class="column">
        <div class="panel-main">
          <div class="panel-type">
            <h2 class="content-title">平板车车辆信息</h2>
            <div class="content">正常车辆数量：{{platformNormalCarCount}} 辆车</div>
            <div class="content">所有车辆数量：{{platformTotalCarCount}} 辆车</div>
            <div class="panel-footer" />
          </div>
          <div class="panel-type">
            <h2 class="content-title">叉车车辆信息</h2>
            <div class="content">正常车辆数量：{{forkNormalCarCount}} 辆车</div>
            <div class="content">所有车辆数量：{{forkTotalCarCount}} 辆车</div>
            <div class="panel-footer" />
          </div>
          <div class="panel-type">
            <h2 class="content-title">龙门吊车辆信息</h2>
            <div class="content">正常车辆数量：{{gantryCraneNormalCarCount}} 辆车</div>
            <div class="content">所有车辆数量：{{gantryCraneTotalCarCount}} 辆车</div>
            <div class="panel-footer" />
          </div>
          <div class="panel-type">
            <h2 class="content-title">塔吊车辆信息</h2>
            <div class="content">正常车辆数量：{{towerCraneNormalCarCount}} 辆车</div>
            <div class="content">所有车辆数量：{{towerCraneTotalCarCount}} 辆车</div>
            <div class="panel-footer" />
          </div>
          <div class="panel-type">
            <h2 class="content-title">高空车车辆信息</h2>
            <div class="content">正常车辆数量：{{superVehicleNormalCarCount}} 辆车</div>
            <div class="content">所有车辆数量：{{superVehicleTotalCarCount}} 辆车</div>
            <div class="panel-footer" />
          </div>
        </div>
        <div class="panel-curvedtable">
           <div id="chartOne" style="width: 100%;height: 100%;"></div>
          <div class="panel-footer" />
        </div>
      </div>
      <div class="column">
        <div class="panel">
          <div id="chartPie" style="width: 100%;height: 110%;"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel">
          <div class="panel-footer" />
        </div>
        
      </div>
    </section>
  </div>
</template>
<script>
  import { optionOne } from './home/homeChartOne'
  import { optionPie } from './home/homeChartPie'
  export default {
    name: 'barchart',
    mounted () {
      this.currentTime()
      this.getChartOne()
      this.getChartPie()
      this.getTypeCarNumber()
    },
    data () {
      return {
        nowDate: '',
        nowTime: '',
        nowWeek: '',
        platformTotalCarCount: '',
        platformNormalCarCount: '',
        forkTotalCarCount: '',
        forkNormalCarCount: '',
        gantryCraneTotalCarCount: '',
        gantryCraneNormalCarCount: '',
        towerCraneTotalCarCount: '',
        towerCraneNormalCarCount: '',
        superVehicleTotalCarCount: '',
        superVehicleNormalCarCount: ''
      }
    },
    methods: {
      getChartOne () {
        // 基于准备好的dom，初始化echarts实例
        let myChartOne = this.$echarts.init(document.getElementById('chartOne'))
        myChartOne.showLoading()
        // 绘制基本图表
        myChartOne.setOption(optionOne)
        // 获取数据
        this.$http({
          url: this.$http.adornUrl('/home/getTaskMessage'),
          method: 'post',
          params: this.$http.adornParams()
        }).then(({data}) => {
          myChartOne.hideLoading()
          myChartOne.setOption({
            series: [{
              data: data.value
            }],
            xAxis: [{
              data: data.name
            }]
          })
        })
      },
      getChartPie () {
        // 基于准备好的dom，初始化echarts实例
        let myChartPie = this.$echarts.init(document.getElementById('chartPie'))
        // myChartPie.showLoading()
        // 绘制基本图表
        myChartPie.setOption(optionPie)
        // 获取数据
        this.$http({
          url: this.$http.adornUrl('/home/getCarStartCount'),
          method: 'post',
          params: this.$http.adornParams()
        }).then(({data}) => {
          myChartPie.hideLoading()
          myChartPie.setOption({
            series: [{
              data: data
            }]
          })
        })
      },
      getTypeCarNumber () {
        this.$http({
          url: this.$http.adornUrl('/home/getTypeCarTaskCount'),
          method: 'post',
          params: this.$http.adornParams()
        }).then(({data}) => {
          this.platformTotalCarCount = data.platformTotalCarCount
          this.platformNormalCarCount = data.platformNormalCarCount
          this.forkTotalCarCount = data.forkTotalCarCount
          this.forkNormalCarCount = data.forkNormalCarCount
          this.gantryCraneTotalCarCount = data.gantryCraneTotalCarCount
          this.gantryCraneNormalCarCount = data.gantryCraneNormalCarCount
          this.towerCraneTotalCarCount = data.towerCraneTotalCarCount
          this.towerCraneNormalCarCount = data.towerCraneNormalCarCount
          this.superVehicleTotalCarCount = data.superVehicleTotalCarCount
          this.superVehicleNormalCarCount = data.superVehicleNormalCarCount
        })
      },
      currentTime () {
        setInterval(this.getDate, 500)
      },
      getDate: function () {
        var _this = this
        let mms = new Date().getMonth() + 1
        let yy = new Date().getFullYear()
        let mm = mms < 10 ? '0' + mms : mms
        let dd = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()
        let week = new Date().getDay()
        let hh = new Date().getHours()
        let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
        let sf = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds()
        if (week === 1) {
          this.nowWeek = '星期一'
        } else if (week === 2) {
          this.nowWeek = '星期二'
        } else if (week === 3) {
          this.nowWeek = '星期三'
        } else if (week === 4) {
          this.nowWeek = '星期四'
        } else if (week === 5) {
          this.nowWeek = '星期五'
        } else if (week === 6) {
          this.nowWeek = '星期六'
        } else {
          this.nowWeek = '星期日'
        }
        _this.nowTime = hh + ':' + mf + ':' + sf
        _this.nowDate = yy + '/' + mm + '/' + dd
      }
    }
  }
</script>
<style lang="scss">
header {
  position: relative;
  height: 70px;
  background-color:ivory ;
  background-size: 100% 100%;
  h1 {
    font-size: 35px;
    text-align: left;
    line-height: 70px;
  }
  .showTime {
    top: 0px;
    position: absolute;
    right: 30px;
    line-height: 75px;
    font-size: 20px;
  }
}
.meanbox {
  display: flex;
  min-width: 1024px;
  max-width: 1920px;
  margin: 0 auto;
  padding: 5px 5px 0;
  .column {
    flex: 3;
    padding: 5px 5px 5px;
  }
  .column:nth-child(1) {
    flex: 7;
  }
  .panel {
    position: relative;
    height: 340px;
    padding: 0px 15px 40px;
    border: 1px solid rgba(245, 252, 154, 0.774);
    background-color: ivory ;
    margin-bottom: 10px;
    &::before {
      position: absolute;
      left: 0;
      top: 0;
      width: 10px;
      height: 10px;
      border-left: 2px solid rgb(255, 243, 133);
      border-top: 2px solid rgb(255, 243, 133);
      content: "";
    }
    &::after {
      position: absolute;
      right: 0;
      top: 0;
      width: 10px;
      height: 10px;
      border-right: 2px solid rgb(255, 243, 133);
      border-top: 2px solid rgb(255, 243, 133);
      content: "";
    }
    .panel-footer {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      &::before {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 10px;
      height: 10px;
      border-left: 2px solid rgb(255, 243, 133);
      border-bottom: 2px solid rgb(255, 243, 133);
      content: "";
      }
    &::after {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 10px;
      height: 10px;
      border-right: 2px solid rgb(255, 243, 133);
      border-bottom: 2px solid rgb(255, 243, 133);
      content: "";
      }
    }
  }
  .panel:nth-child(2) {
    height: 180px;
  }
  .panel-main {
    position: relative;
    width: 100%;
    height: 130px;
    padding-bottom: 20px;
    .panel-type {
      position: relative;
      width: 18%;
      float: left;
      margin-right: 1%;
      margin-left: 1%;
      height: 100%;
      background-color: ivory;
      &::before {
      position: absolute;
      left: 0;
      top: 0;
      width: 10px;
      height: 10px;
      border-left: 2px solid rgb(255, 243, 133);
      border-top: 2px solid rgb(255, 243, 133);
      content: "";
      }
      &::after {
        position: absolute;
        right: 0;
        top: 0;
        width: 10px;
        height: 10px;
        border-right: 2px solid rgb(255, 243, 133);
        border-top: 2px solid rgb(255, 243, 133);
        content: "";
      }
      .panel-footer {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      &::before {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 10px;
      height: 10px;
      border-left: 2px solid rgb(255, 243, 133);
      border-bottom: 2px solid rgb(255, 243, 133);
      content: "";
      }
      &::after {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 10px;
        height: 10px;
        border-right: 2px solid rgb(255, 243, 133);
        border-bottom: 2px solid rgb(255, 243, 133);
        content: "";
        }
      }
      .content-title {
        text-align: center;
      }
      .content {
        position: relative;
        padding-bottom: 10px;
        left: 17px;
        font-size: 14px;
      }
    }
  }
  .panel-curvedtable {
    position: relative;
    width: 100%;
    height: 400px;
    background-color: ivory;
    &::before {
      position: absolute;
      left: 0;
      top: 0;
      width: 10px;
      height: 10px;
      border-left: 2px solid rgb(255, 243, 133);
      border-top: 2px solid rgb(255, 243, 133);
      content: "";
      }
      &::after {
        position: absolute;
        right: 0;
        top: 0;
        width: 10px;
        height: 10px;
        border-right: 2px solid rgb(255, 243, 133);
        border-top: 2px solid rgb(255, 243, 133);
        content: "";
      }
      .panel-footer {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      &::before {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 10px;
      height: 10px;
      border-left: 2px solid rgb(255, 243, 133);
      border-bottom: 2px solid rgb(255, 243, 133);
      content: "";
      }
      &::after {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 10px;
        height: 10px;
        border-right: 2px solid rgb(255, 243, 133);
        border-bottom: 2px solid rgb(255, 243, 133);
        content: "";
        }
      }
  }
}
</style>