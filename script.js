var app = angular.module("myapp",['ngRoute']).config(function($routeProvider){
    $routeProvider
    .when("/home",{
        templateUrl: 'trangchu.html',
    })
    .when("/club",{
        templateUrl: 'club.html',
        controller: 'myCtrl'
    })
    .when("/product",{
        templateUrl: 'product.html',
        controller: 'productCtrl'
    })
    .when("/sale",{
        templateUrl: 'sale.html',
        controller: 'saleCtrl'
    })
    .when("/cart",{
        templateUrl: 'cart.html',
        controller: 'cartCtrl'
    })
    .when("/detail/:id",{
        templateUrl: 'detail.html',
        controller: 'detailCtrl'
    })
    .otherwise({
        redirectTo: '/home'
    })
}).controller("myCtrl", function myfunc($scope,$http){
    $scope.giohang = [];
    $scope.clothes = [];
    $scope.repeatCount = 5;
    $http.get('shirt.json').then(
                function (res) {
                    $scope.clothes = res.data;
                    $scope.pageCount = Math.ceil($scope.dsSp.length / 3);
                    console.log(res);
                },
                function (res) {
                    alert('lỗi');
                }
            )
           
}
).controller("productCtrl", function myfunc($scope,$http){
    $scope.mua = function (sp) {
                    var chuaCo = true;
                    //TH1: chưa có sp trong giỏ hàng
                    for (const item of $scope.$parent.giohang) {
                        //TH2: Có sản phẩm tăng lên
                        if (item.name == sp.name) {
                            item.soluong++;
                            chuaCo = false;
                            break;
                        }
                    }
                    if (chuaCo) {
                        sp.soluong = 1;
                        $scope.$parent.giohang.push(sp);
                    }
                }
                $scope.page = 1;
        $scope.limit = 3;
        $scope.start = ($scope.page - 1) * $scope.limit;

        $scope.totalPage = Math.ceil($scope.clothes.length / $scope.limit);
        $scope.numOfPage = Array.from(Array($scope.totalPage).keys());
    $scope.showPage = function (p) {
      $scope.page = p;
      $scope.start = ($scope.page - 1) * $scope.limit;
    };
    $scope.cot = "";
    $scope.kieu = "";
    $scope.order = function (cot, kieu) {
      $scope.cot = cot;
      $scope.kieu = kieu;
    };
}).controller("cartCtrl", function myfunc($scope, $http){
    $http.get('shirt.json').then(
                function (res) {
                    $scope.clothes = res.data;
                    console.log(res);
                },
                function (res) {
                    alert('lỗi');
                }
            )
    $scope.fee= 30000;
    $scope.discount=0.2;
    $scope.tinhTongTien = function () {
        var tong = 0;
        for (const item of $scope.$parent.giohang) {
            tong = tong + item.price * item.soluong;
        }
        return tong;
    }
    $scope.tongall = (($scope.tinhTongTien() * (1-$scope.discount))) + $scope.fee ;
    $scope.xoa = function(id){
        $scope.$parent.giohang = $scope.$parent.giohang.filter(sp=>sp.id==id);
    }
    $scope.xoaHet = function(){
        $scope.$parent.giohang=[];
    }
}).controller('detailCtrl', function($scope,$routeParams){
    var id = $routeParams.id;
    $scope.newsp = $scope.$parent.clothes.filter(sp => sp.id == id)[0];
    // for (const item of $scope.$parent.dsSP) {
    //     if(item.id == id){
    //         $scope.sanpham = item;
    //     }
    // }
    $scope.mua = function (sp) {
        var chuaCo = true;
        //TH1: chưa có sp trong giỏ hàng
        for (const item of $scope.$parent.giohang) {
            //TH2: Có sản phẩm tăng lên
            if (item.name == newsp.name) {
                item.soluong++;
                chuaCo = false;
                break;
            }
        }
        if (chuaCo) {
            newsp.soluong = 1;
            $scope.$parent.giohang.push(newsp);
        }
    }
}).filter('percentage', function ($filter) {
    return function (input) {
        return $filter('number')(input * 100) + '%';
    }
});