import axios from "axios"
import qs from 'qs'

axios.defaults.baseURL = "http://39.108.14.232/lqcs"
let instance = axios.create({
    headers: { 'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
    'Accept': 'application/json' }
});
//赛事请求接口
//查询
export function inquires(data){
    return axios.post("/race/race/index",qs.stringify(data))
}
//删除and批量删除
export function deleteOpens(id){
    return axios.post("/race/race/delete",qs.stringify({raceId:id}))
}
//编辑
export function compileSyncs(id){
    return axios.post("/race/race/raceDetailed",qs.stringify({raceId:id}))
}
//新增
export function newlySyncs(data){
    return axios.post("/race/race/save",qs.stringify(data))
}


//项目请求接口
//查询
export function projectInquires(name){
    return axios.post("/race/project/index",qs.stringify({projectName:name}))
}
//新增
export function projectNewly(data){
    return axios.post("/race/project/save",qs.stringify(data))
}
//删除
export function projectDelete(id){
    return axios.post("/race/project/delete",qs.stringify({projectId:id}))
}
//编辑
export function projectCompile(id){
    return axios.post("/race/project/projectDetailed",qs.stringify({raceId:id}))
}


//领队请求接口
//查询
export function managementInquires(data){
    return axios.post("/race/judgment/index",qs.stringify(data))
}
//新增
export function managementNewly(data){
    return axios.post("/race/judgment/save",qs.stringify(data))
}
//删除
export function managementDelete(id){
    return axios.post("/race/judgment/delete",qs.stringify({judgmentd:id}))
}
//编辑
export function managementCompile(id){
    return axios.post("/race/judgment/raceDetailed",qs.stringify({judgmentd:id}))
}

//运动员请求接口
//查询
export function athleteInquires(data){
    return axios.post("/race/athlete/index",qs.stringify(data))
}
//新增
export function athleteNewly(data){
    return axios.post("/race/athlete/save",qs.stringify(data))
}
//删除
export function athleteDelete(id){
    return axios.post("/race/athlete/delete",qs.stringify({athletetd:id}))
}
//编辑
export function athleteCompile(id){
    return axios.post("/race/athlete/raceDetailed",qs.stringify({athletetd:id}))
}