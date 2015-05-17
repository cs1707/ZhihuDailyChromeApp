(function(){
  'use strict';
  angular.module('app')
    .factory('zhihu', function($q, $http) {
      var service = {
        getBlobUrl: getBlobUrl,
        getLatest: getLatest,
        getBefore: getBefore,
        getThemes: getThemes,
        getDetail: getDetail
      };

      return service;

      function getBlobUrl(url) {
        /*
         * 获取外链图片
         */
        var d = $q.defer();
        $http({
          method: "GET",
          url: url,
          cache: true,
          responseType: 'blob'
        }).success(function(blob){
          // console.log(blob);
          // d.resolve(blob);
          // var reader = new FileReader();
          // reader.readAsDataURL(blob);
          // reader.onload = function(e){
          //   console.log(e);
          //   d.resolve(target.reuslt);
          // }
          // d.resolve(a);
          // d.resolve(new FileReaderSync().readAsDataURL(blob));
          d.resolve(window.URL.createObjectURL(blob));
        }).error(function(error){
          d.reject(error);
        });

        return d.promise;
      }

      function getLatest() {
        /*
         * 获取最新消息
         */
        var d = $q.defer();
        $http.get('http://news-at.zhihu.com/api/4/news/latest', {cache: true})
          .success(function(data){
            d.resolve(data);
          })
          .error(function(error){
            d.reject(error);
          });

        return d.promise;
      }

      function getBefore(date) {
        /*
         * 获取历史消息 date: 20150516
         */
        var d = $q.defer();
        $http.get('http://news.at.zhihu.com/api/4/news/before/' + date)
          .success(function(data){
            d.resolve(data);
          })
          .error(function(error){
            d.reject(error);
          });

        return d.promise;
      }

      function getThemes() {
        /*
         * 主题日报
         */
        var d = $q.defer();
        $http.get('http://news-at.zhihu.com/api/4/themes')
          .success(function(data){
            d.resolve(data);
          })
          .error(function(error){
            d.reject(error);
          });
        return d.promise;
      }

      function getDetail(id) {
        /*
         * 获取详细信息
         */
        var d = $q.defer();
        $http.get('http://news-at.zhihu.com/api/4/news/' + id, {cache: true})
          .success(function(data){
            d.resolve(data);
          })
          .error(function(error){
            d.reject(error);
          });

        return d.promise;
      }
    });
})();