export default ({ $request } , inject) => {
    inject('api',{
        /**
         * 获取首页轮播图
         * @returns 
         */
        IndexBanners(){
            return $request.$get('/swipeList');
        },
        /**
         * 获取宫格数据
         * @returns 
         */
        IndexGridList(){
            return $request.$get('/gridList');
        },
        /**
         * 获取运动专区
         * @returns 
         */
        IndexSports(){
            return $request.$get('/sportList');
        },
        /**
         * 一级分类
         */
        OneCategoryList(){
            return $request.$get('/oneCategory');
        },
        TwoCategoryList(cid){
            return $request.$get(`/twoCategory?id=${cid}`);
        },
        /**
         * 
         * 发送短信
         */
        SendSmsCode(mobile){
            return $request.$post('/sms',{mobile});
        },
        /**
         * 注册接口
         * @param {Object} data 
         * @returns 
         */
        Register(data){
            return $request.$post('/users/register',data);
        },
        /**
         * 登录接口
         * @param {Object} data 
         * @returns 
         */
        Login(data){
            return $request.$post('/users/login',data);
        },
        /**
         * 支付
         * @param {} data 
         */
        Order(data){
            return $request.$post('/order',data);
        },
        /**
         * 微信订单查询
         * @param {*} data 
         * @returns 
         */
        QueryOrder(data){
            return $request.$post('/queryorder',data);
        }
    })
}