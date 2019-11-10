<template>
    <div class="container">
<!--        <div v-for="item in currList" class="item" :class="[item.feClass]" @click="currClick(item)"></div>-->
      <swiper :options="swiperOptions" ref="mySwiper" class="content">
        <!-- slides -->
        <swiper-slide v-for="item in currList" class="item" :class="[item.feClass]" @click="this.$route.query == 'studentCurr'? studentCurrClick(item) : teacherCurrClick(item)">
<!--          <div ></div>-->
        </swiper-slide>
      </swiper>
      <div class="swiper-button-prev swiper-btn btn-prev" slot="button-prev"></div>
      <div class="swiper-button-next swiper-btn btn-next" slot="button-next"></div>
    </div>
</template>

<script>
  import { Message } from 'iview';
  import request from '@/utils/request';
  import CONSTANT from '@/utils/constant';
  import { getToken } from '@/utils/lib';
  import { openPages } from '@/utils/clientApi';

  export default {
    name: 'index',
    data: ()=>{
      return {
        currList: [],
        swiperOptions: {
          slidesPerView: 'auto',
          spaceBetween: 60,
          centerInsufficientSlides: true,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
          }
        }
      }
    },
    mounted() {
      if(this.$route.path == '/studentCurr'){
        let list = [
          {"course_id":"1","course_name":"Scratch\u521d\u7ea7\u8bfe","unique_identification":"Scratch","programing_language":"scratch"},
          {"course_id":"2","course_name":"Python\u521d\u7ea7\u8bfe","unique_identification":"Python","programing_language":"python"}
        ];
        this.dealData(list)
      }else{
        request.post(`/TCourse/courseList`,{
          token: getToken()
        })
          .then((res)=>{
            if(res.code != 0){
              Message.error(res.message);
              return
            }

            res = {
              "code":0,
              "data":{"list":
                  [
                    {"course_id":"1","course_name":"Scratch\u521d\u7ea7\u8bfe","unique_identification":"Scratch","programing_language":"scratch"},
                    {"course_id":"2","course_name":"Python\u521d\u7ea7\u8bfe","unique_identification":"Python","programing_language":"python"},
                    {"course_id":"3","course_name":"\u673a\u5668\u4eba","unique_identification":"jiq","programing_language":"jiq"},
                    {"course_id":"3","course_name":"\u673a\u5668\u4eba","unique_identification":"jiq","programing_language":"jiq"}
                  ]
              },"message":"\u6210\u529f","timestamp":"1572926993"}

            this.dealData(res.data.list);
          })
          .catch(()=>{
            Message.error(CONSTANT.API_ERROR);
          })
      }
    },
    methods: {
      studentCurrClick: function(data){
        let course_type = data.programing_language,params;
        switch(course_type){
          case 'scratch':
            params = {
              pages: [
                {
                  showType: 0,
                  name: "scratch",
                  isDefault: 1,
                  url: "http://api.kcode.bkuu.com/web/build/index.html",
                  webId: 1
                }
              ]
            };
            break;
          case 'python':
            params = {
              pages: [
                {
                  showType: 3,
                  name: "vscode",
                  isDefault: 1,
                  pCode: 1
                }
              ]
            };
        }
        openPages(params);
      },
      teacherCurrClick: function(data){
        this.$router.push({
          path: '/teacherLessonHour',
          query: {course_id: data.course_id, course_type: data.programing_language}
        })
      },
      dealData: function(list){
        this.$data.currList = list.map((item)=>{
          switch(item.programing_language){
            case 'scratch':
              item.feClass = 'scratch-class';break;
            case 'python':
            default:
              item.feClass = 'python-class';break;
          }
          return item;
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.container{
  background: url("../../../assets/public/background.png") no-repeat center center;
  background-size: cover;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .content{
    width: 1350px;
    height: 260px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .item {
      width: 380px;
      height: 238px;
      margin: 10px;
      transition: transform 0.3s;
      cursor: pointer;
    }
    .item:hover {
      -webkit-transform: scale(1.02);
      -o-transform: scale(1.02);
      transform: scale(1.02);
    }
    .python-class{
      background-image: url('../../../assets/public/python.png');
    }
    .scratch-class{
      background-image: url('../../../assets/public/scratch.png');
    }
  }

  .swiper-btn{
    width: 45px;
    height: 90px;
    background-size: 48%;
    outline: none;
  }
  .btn-prev{
    left: 0;
    border-radius: 0px 50px 50px 0px;
    background: url(../../../assets/public/preBtn.png);
  }
  .btn-prev:hover{
    background-color:#5641ae;
  }
  .btn-next {
    right: 0rem;
    border-radius: 50px 0px 0px 50px;
    background: url(../../../assets/public/nextBtn.png);
  }
  .btn-next:hover{
    background-color:#4283e2;
  }
}


</style>
