import Axios from "axios";

/**
 * 公用get请求
 * @param url       接口地址
 * @param params    接口参数
 * @param msg       接口异常提示
 */
export const get = ({ url, params }) =>
    Axios.get(url, {
        params: params,
    })
        .then((res) => [res.data])
        .catch((err) => {
            console.log("报错接口："+ url,err);
            return [null];
        });

/**
 * 公用post请求
 * @param url       接口地址
 * @param params      接口参数
 * @param msg       接口异常提示
 * @param config    接口所需配置
 */
export const post = ({ url, params, config }) =>
    Axios.post(url, params, config)
        .then((res) => [res.data])
        .catch((err) => {
            console.log(err);
            return [null];
        });
