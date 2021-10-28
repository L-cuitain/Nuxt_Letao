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
         * 注册
         */
        Register(data){
            return $request.$post('/users/register',data);
        }
    })
}