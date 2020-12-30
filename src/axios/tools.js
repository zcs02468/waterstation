import Request from "./request";

/**
 * 公用get请求
 * @param url       接口地址
 * @param params    接口参数
 * @param msg       接口异常提示
 */
export const get = ({ url, params }) =>
Request.get(url, {
        params: params,
    })
        // .then((res) => [res.data])
        // .catch((err) => {
        //     console.log("报错接口："+ url,err);
        //     return [null];
        // });
        .then((res) => [null, res])
        .catch((err) => {
            console.log("报错接口："+ url,err);
            return [err, null];
        });

/**
 * 公用post请求
 * @param url       接口地址
 * @param params      接口参数
 * @param msg       接口异常提示
 * @param config    接口所需配置
 */
export const post = ({ url, params, config }) =>
Request.post(url, params, config)
        .then((res) => [null, res])
        .catch((err) => {
            console.log(err);
            return [err, null];
        });
