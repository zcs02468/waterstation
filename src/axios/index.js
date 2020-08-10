import { get } from "./tools";

const baseUrl = 'http://47.110.226.205:8980'

//供水检测率接口
export const getDetectionRate = async () => await get({ url: baseUrl + "/smartEnergy/detectionrate" });

//施工信息情况接口
export const getConstructionInfo = async () => await get({ url: baseUrl + "/smartEnergy/build" });

//蓄水池水位接口
export const getReservoirLevel = async () => await get({ url: baseUrl + "/smartEnergy/reservoirLevel" });

//实时播报内容接口
export const getBroadcastContent = async () => await get({ url: baseUrl + "/smartEnergy/broadcastContent" });

//出水瞬时流量接口
export const getEffluentFlow = async () => await get({ url: baseUrl + "/smartEnergy/effluentFlow" });

//进水/出水压力趋势接口
export const getWaterPressure = async () => await get({ url: baseUrl + "/smartEnergy/waterPressure" });

//泵站供水量接口
export const getWaterVolume = async () => await get({ url: baseUrl + "/smartEnergy/waterVolume" });

//用户累计用水量接口
export const getWaterConsumption = async () => await get({ url: baseUrl + "/smartEnergy/waterConsumption" });

//flood
//当日值班接口
export const getTodayDuty = async () => await get({ url: baseUrl + "/smartEnergy/todayDuty" });

//应急看板接口
export const getBulletinBoard = async () => await get({ url: baseUrl + "/smartEnergy/bulletinBoard" });
