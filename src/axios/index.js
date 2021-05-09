import { get } from "./tools";

// const baseUrl = 'http://218.242.28.28:800'
const baseUrl = ''

//获取微信登陆二维码
export const getQrCode = async () => await get({url:"/smartEnergy/weixin/qrCode"});

//查询登录状态
export const getToken = async (params) => await get({url:"/smartEnergy/weixin/findLoginToken", params});

//今日值班
export const getTodayWaterDuy = async () => await get({ url: baseUrl + "/smartEnergy/todayWaterDuty" });

//供水检测率接口
export const getDetectionRate = async () => await get({ url: baseUrl + "/smartEnergy/waterDetectionrate" });

//供水检测率趋势
export const getWaterTendency = async () => await get({ url: baseUrl + "/smartEnergy/waterTendency" });
// export const getWaterTendency = async () => await get({ url: 'http://218.242.28.28:800/smartEnergy/waterTendency' });

//用水情况
export const getWaterUsage = async () => await get({ url: baseUrl + "/smartEnergy/waterUsage" });

//水质指数雷达图
export const getWaterQuality = async () => await get({url: baseUrl + "/smartEnergy/waterQuality"})

//饮用水水质指数值
export const getWaterQualityNum = async () => await get({url: baseUrl + "/smartEnergy/waterQualityNum"})

//施工信息情况接口
export const getConstructionInfo = async () => await get({ url: baseUrl + "/smartEnergy/build" });

//蓄水池水位接口
export const getReservoirLevel = async () => await get({ url: baseUrl + "/smartEnergy/reservoirLevel" });

//实时播报内容接口
export const getBroadcastContent = async () => await get({ url: baseUrl + "/smartEnergy/broadcastContent" });

// 用水趋势图
export const getEffluentFlow = async () => await get({ url: baseUrl + "/smartEnergy/findWaterConsumptionTrend" });

//进水/出水压力趋势接口
export const getWaterPressure = async () => await get({ url: baseUrl + "/smartEnergy/findMinimumFlow" });
// export const getWaterPressure = async () => await get({ url: baseUrl + "/smartEnergy/waterPressure" });

//泵站供水量接口
export const getWaterVolume = async () => await get({ url: baseUrl + "/smartEnergy/waterVolume" });

//用户累计用水量接口
export const getWaterConsumption = async () => await get({ url: baseUrl + "/smartEnergy/waterConsumption" });
// export const getWaterConsumption = async () => await get({ url: 'http://218.242.28.28:800/smartEnergy/waterConsumption'});

//应急物资接口 
export const getEmergencyInfo = async () => await get({ url: baseUrl + "/smartEnergy/emergencyInfo" });

//关闭警报
export const closeAlarm = async() => await get({url:baseUrl + '/smartEnergy/saveInstantaneousFlowAlarmLog'})


//flood
//当日值班接口
export const getTodayDuty = async () => await get({ url: baseUrl + "/smartEnergy/todayDuty" });

//应急看板接口
export const getBulletinBoard = async () => await get({ url: baseUrl + "/smartEnergy/bulletinBoard" });

//积水接口
export const getPondingStandard = async () => await get({ url: baseUrl + "/smartEnergy/pondingStandard" });
//积水接口
export const getPonding = async ()=> await get({url: baseUrl + '/smartEnergy/ponding'})

//排水泵站运行情况接口
export const getDrainagePumpingPlant = async () => await get({ url: baseUrl + "/smartEnergy/drainagePumpingPlant" });

//河道及水池水位接口
export const getRiverCourseLevel = async () => await get({ url: baseUrl + "/smartEnergy/riverCourseLevel" });

//雨量接口
export const getRainfall = async () => await get({ url: baseUrl + "/smartEnergy/rainfall" });

//防汛监测气象信息接口 http://47.110.226.205:8980/smartEnergy/metar
// export const getWeather = async ()=> await get({url: baseUrl + '/smartEnergy/metar'});
export const getWeather = async () => await get({url:baseUrl + '/smartEnergy/weatherInformation'});

//二十四、	河道水质（五类水）接口
export const getRiverWaterQuality = async ()=> await get({url: baseUrl + '/smartEnergy/riverWaterQuality'});

//二十五、	获取声音报警配置接口
export const getAlarm = async ()=> await get({url: baseUrl + '/smartEnergy/getAlarm'});

// 二十六、	根据物资仓库点位获取应急物资信息接口
// 1.	接口访问地址：http://47.110.226.205:8980/smartEnergy/getEmergencyMaterials?materialsWarehouse=
export const getEmergencyMaterials = async (location)=> await get({url: baseUrl + `/smartEnergy/getEmergencyMaterials?materialsWarehouse=${location}`});

//获取视频token
export const getVideoToken = async ()=> await get({url: baseUrl + '/smartEnergy/token'});

//获取视频设备列表
export const getDeviceList = async ()=> await get({url: baseUrl + '/smartEnergy/getDeviceList'});

//根据设备序列号获取视频URL
export const getDeviceUrl = async (deviceSerial)=> await get({url: baseUrl + `/smartEnergy/getDeviceUrl?deviceSerial=${deviceSerial}`});



//获取气象信息
export const getFloodWeatherInfo = async()=> await get({url: baseUrl + '/smartEnergy/getFloodWeatherInfo'});

//地图手环点位
export const getWristbandList = async ()=> await get({url: baseUrl + '/smartEnergy/findWristbandList'});

//地图执法记录仪点位
export const getSinglePawn = async ()=> await get({url: baseUrl + '/smartEnergy/findSinglePawn'});

//河道及水池水位和地图点位
export const getFloodControlAndWaterLevel = async()=> await get({url: baseUrl + '/smartEnergy/floodControlAndWaterLevel'});

//排水泵运行情况
export const getFloodControlAndDrainage = async()=> await get({url: baseUrl + '/smartEnergy/floodControlAndDrainage'});