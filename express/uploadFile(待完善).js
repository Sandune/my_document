var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var formidable = require('formidable');
var ResStatus = require('../../../common/response');

var setHeadJson = function (res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Authorization,Content-Type,Accept,Origin,User-Agent,DNT,Cache-Control,X-Token,X-Mx-ReqToken,Keep-Alive,X-Requested-With,If-Modified-Since');
	res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader('Content-Type', 'text/json;charset=utf-8');
}

const FILE_PATH = '../../../public/books/awards/';

router.post('/uploadAwardIcon', function(req, res) {
  setHeadJson(res);

  var reqMethod = req.method.toLowerCase();

  if (reqMethod === 'options') {
      console.log('options 请求时，返回 200');

      // 返回结果
      res.writeHead(200, {
          'Content-type': 'text/html'
      });

      res.end('options OK');
      return;
  }

  var form = new formidable.IncomingForm();

  // 处理 request
  form.parse(req, function(err, fields, files) {
      if (err) {
          return console.log('formidable, form.parse err');
      }

      console.log('formidable, form.parse ok');

      var item;

      // 计算 files 长度
      var length = 0;
      for (item in files) {
          length++;
      }

      if (length === 0) {
          console.log('files no data');
          return;
      }

      for (item in files) {
          var file = files[item];
          // formidable 会将上传的文件存储为一个临时文件，现在获取这个文件的目录
          var tempfilepath = file.path;
          // 获取文件类型
          var type = file.type;

          // 获取文件名，并根据文件名获取扩展名
          var filename = file.name;
          var extname = filename.lastIndexOf('.') >= 0 ?
              filename.slice(filename.lastIndexOf('.') - filename.length) :
              '';
          // 文件名没有扩展名时候，则从文件类型中取扩展名
          if (extname === '' && type.indexOf('/') >= 0) {
              extname = '.' + type.split('/')[1];
          }
          // 将文件名重新赋值为一个随机数（避免文件重名）
          filename = Math.random().toString().slice(2) + extname;

          // 构建将要存储的文件的路径
          //var filenewpath = '/home/zoe/static/img/upload/thumbnail/' + filename;
          var filenewpath = path.resolve(__dirname, FILE_PATH) + '/' + filename;
          
          // 将临时文件保存为正式的文件
          fs.rename(tempfilepath, filenewpath, function(err) {
              // 存储结果
              var result = '';

              if (err) {
                  // 发生错误
                  console.log('fs.rename err');
                  result = 'error|save error';
                  res.send(ResStatus.error(result))
              } else {
                  // 保存成功
                  console.log('fs.rename done');
                  // 拼接图片url地址
                  result = 'public/awards/' + filename;
                  res.send(ResStatus.success(result))
              }

          }); // fs.rename
      }
  });
});

router.options('/uploadAwardIcon', function(req, res) {
  setHeadJson(res);

  var reqMethod = req.method.toLowerCase();

  if (reqMethod === 'options') {
      console.log('options 请求时，返回 200');

      // 返回结果
      res.writeHead(200, {
          'Content-type': 'text/html'
      });

      res.end('options OK');
      return;
  }

  var form = new formidable.IncomingForm();

  // 处理 request
  form.parse(req, function(err, fields, files) {
      if (err) {
          return console.log('formidable, form.parse err');
      }

      console.log('formidable, form.parse ok');

      var item;

      // 计算 files 长度
      var length = 0;
      for (item in files) {
          length++;
      }

      if (length === 0) {
          console.log('files no data');
          return;
      }

      for (item in files) {
          var file = files[item];
          // formidable 会将上传的文件存储为一个临时文件，现在获取这个文件的目录
          var tempfilepath = file.path;
          // 获取文件类型
          var type = file.type;

          // 获取文件名，并根据文件名获取扩展名
          var filename = file.name;
          var extname = filename.lastIndexOf('.') >= 0 ?
              filename.slice(filename.lastIndexOf('.') - filename.length) :
              '';
          // 文件名没有扩展名时候，则从文件类型中取扩展名
          if (extname === '' && type.indexOf('/') >= 0) {
              extname = '.' + type.split('/')[1];
          }
          // 将文件名重新赋值为一个随机数（避免文件重名）
          filename = Math.random().toString().slice(2) + extname;

          // 构建将要存储的文件的路径
          var filenewpath = path.resolve(__dirname, FILE_PATH) + '/' + filename;
          
          // 将临时文件保存为正式的文件
          fs.rename(tempfilepath, filenewpath, function(err) {
              // 存储结果
              var result = '';

              if (err) {
                  // 发生错误
                  console.log('fs.rename err');
                  result = 'error|save error';
                  res.send(ResStatus.error(result))
              } else {
                  // 保存成功
                  console.log('fs.rename done');
                  // 拼接图片url地址
                  result = 'public/awards/' + filename;
                  res.send(ResStatus.success(result))
              }

          }); // fs.rename
      }
  });
});

module.exports = router