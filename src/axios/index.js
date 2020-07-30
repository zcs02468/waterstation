import { get } from "./tools";

//供水检测率接口
export const getDetectionRate = async () => await get({ url: "/smartEnergy/detectionrate" });

//施工信息情况接口
export const getConstructionInfo = async () => await get({ url: "/smartEnergy/build" });

//蓄水池水位接口
export const getReservoirLevel = async () => await get({ url: "/smartEnergy/reservoirLevel" });

//实时播报内容接口
export const getBroadcastContent = async () => await get({ url: "/smartEnergy/broadcastContent" });

//出水瞬时流量接口
export const getEffluentFlow = async () => await get({ url: "/smartEnergy/effluentFlow" });

//进水/出水压力趋势接口
export const getWaterPressure = async () => await get({ url: "/smartEnergy/waterPressure" });
