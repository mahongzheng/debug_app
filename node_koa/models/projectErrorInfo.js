'use strict'

// const config = require('../config')

const dbHandel = require('../database/index')
const sourcemapErrMsg = require('../com/sourcemapErrMsg')
const ProjectErrorInfoModel = dbHandel.getModel('projectErrorInfo')
const ProjectModel = dbHandel.getModel('project')


const update = function (_id, ext) {
  console.log('-----------------------')

  return ProjectErrorInfoModel.update({
    _id: _id
  }, {
    $set: {
      ext: projectErrorInfo.ext
    }
  })
}

exports.insert = async function ({ projectId, date, msg, name, filename, line, mapFile, column, code, user_id, ext}) {
  const projectErrorInfo = new ProjectErrorInfoModel()
  projectErrorInfo.projectId = projectId
  projectErrorInfo.date = date
  projectErrorInfo.msg = msg
  projectErrorInfo.name = name
  projectErrorInfo.line = line
  projectErrorInfo.column = column
  projectErrorInfo.filename = filename
  projectErrorInfo.mapFile = mapFile
  projectErrorInfo.code = code
  // projectErrorInfo.ext = ext

  // 获取 错误信息
  let text = await sourcemapErrMsg({
    "projectId": projectId,
    "user_id": user_id,
    "msg": msg,
    "filename": filename,
    "line": line,
    "column": column
  })

  projectErrorInfo.ext = text
  let _RprojectErrorInfo = projectErrorInfo.save()

  return _RprojectErrorInfo
}

exports.getByName = function (projectErrorInfoName) {
  return ProjectErrorInfoModel.findOne({ name: projectErrorInfoName })
}

exports.getById = function (projectErrorInfoId) {
  return ProjectErrorInfoModel.findById(projectErrorInfoId)
}

exports.find = function (query, opt) {
  return ProjectErrorInfoModel.find(query, {}, opt)
}

exports.findOne = function (query, opt) {
  return ProjectErrorInfoModel.findOne(query, {}, opt)
}
