import request from "@/api/request";

export default {

    //创建设备
    createDevice(params) {
        return request.post(`/api/node/devices`, params)
    },
    //删除设备
    deleteDevice(id) {
        return request.delete(`/api/node/devices/${id}`)
    },
    //获取设备列表
    getDeviceList(page,size) {
        return request.get(`/api/node/devices`,{
            params:{
                page:page,
                size:size
            }
        })
    },

}