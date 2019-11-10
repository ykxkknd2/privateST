<template>
  <div class="container">
    <div class="back">
      <img
        src="../../../assets/public/back.png"
        title="返回"
        alt="返回"
        @click="handleBack"
      />
    </div>
    <div class="content">
      <div class="content-top">
        <p class="content-title">{{ title }}</p>
      </div>
      <div class="content-bottom">
        <div class="content-bottom-body">
          <div
            class="content-bottom-part"
            v-for="(item, index) in list"
            :key="index"
            @click.stop.prevent="handleChoose(item)"
          >
            <div class="content-bottom-part-top">
              <span>{{index}}</span>
            </div>
            <div class="content-bottom-part-center">
              <p>{{ item.lession_name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
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
        list: []
      }
    },
    computed: {
      title: function(){
        return this.$route.query.course_type == 'scratch'? 'scratch课时列表' : 'python课时列表'
      }
    },
    mounted() {
      request.post(`/TLesson/lessonList `,{
        token: getToken(),
        course_id: this.$route.query.course_id
      })
        .then((res)=>{
          if(res.code != 0){
            Message.error(res.message);
            return
          }

          this.$data.list = res.data.list;
        })
        .catch(()=>{
          Message.error(CONSTANT.API_ERROR);
        })
    },
    methods: {
      handleChoose: function(item){
        let course_type = this.$route.query.course_type,params;
        switch(course_type){
          case 'scratch':
            params = {
              pages: [
                {
                  showType: 0,
                  name: "scratch",
                  isDefault: 1,
                  // url: "https://general.vipcode.com/freePlatformShell.html?platform=3",
                  url: "http://api.kcode.bkuu.com/web/build/index.html",
                  webId: 1
                },
                {
                  showType: 0,
                  name: "课件",
                  isDefault: 0,
                  url: item.courseware_url,
                  webId: 2
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
                },
                {
                  showType: 0,
                  name: "课件",
                  isDefault: 0,
                  url: item.courseware_url
                }
              ]
            };
            break;
          default:
            params = {
              pages: [
                {
                  showType: 0,
                  name: "课件",
                  isDefault: 1,
                  url: item.courseware_url
                },
              ]
            };
        }
        openPages(params);
      },
      handleBack: function(){
        this.$router.go(-1);
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .container{
    background: url("../../../assets/public/background.png") no-repeat center center;
    background-size: cover;
    background-attachment: fixed;
    overflow: auto;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    min-width: 1090px;
    min-height: 537px;
    display: flex;
    justify-content: center;
    align-items: center;

    .back{
      position: absolute;
      top: 30px;
      left: 30px;
      cursor: pointer;
    }

    .back:hover{
      opacity: 0.7;
    }

    .content{
      width: 1090px;
      background: #fff;
      border-radius: 10px;

      .content-top{
        height: 62px;
        border: solid 2px #addbf2;
        border-radius: 10px 10px 0px 0px;
        background-color: #44b1ff;
        border-bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        /*overflow: auto;*/
        .content-title {
          font-family: MicrosoftYaHei;
          font-size: 22px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #ffffff;
          text-align: center;
          line-height: 26px;
          max-width: 990px;
          overflow:hidden;
          text-overflow:ellipsis;
          display:-webkit-box;
          -webkit-box-orient:vertical;
          -webkit-line-clamp:2;
          word-wrap: break-word;
        }
      }

      .content-bottom{
        width: 100%;
        height: 459px;
        margin: 0 auto;
        /*position: relative;*/
        background-color: rgb(140,199,241);
        overflow: auto;
        align-items: center;
        justify-content: center;
        border-radius: 0 0 10px 10px;

        .content-bottom-body{
          margin-top: 20px;

          .content-bottom-part{
            width: 720px;
            border: solid 4px #44b1ff;
            position: relative;
            text-align: left;
            background-color: #fff;
            box-sizing: border-box;
            border-radius: 6px;
            margin: 0 auto 20px;
            display: block;
            cursor: pointer;

            span {
              display: inline-block;
              margin-left: 9px;
            }

            .content-bottom-part-top{
              background-image: url(../../../assets/teacher/lessonHourIcon.png);
              background-size: 100% 100%;
              background-repeat: no-repeat;
              width: 41px;
              height: 29px;
              font-size: 20px;
              line-height: 22px;
              cursor: pointer;
              color: #ffffff;
              position: absolute;
              top: 0;
              left: 0;
            }

            .content-bottom-part-center{
              padding: 4px 4px 4px 62px;
              min-height: 52px;
              max-height: 62px;
              display: flex;
              align-items: center;
              p {
                font-size: 16px;
                line-height: 20px;
                letter-spacing: 1.6px;
                color: #323232;
                overflow: hidden;
                text-overflow:ellipsis;
                display:-webkit-box;
                -webkit-box-orient:vertical;
                -webkit-line-clamp: 2;
                word-wrap: break-word;
              }
            }
          }
        }
      }
    }
  }

  @media screen and (min-width: 1550px) {
    .container{
      min-width: 1200px;
      min-height: 800px;
      .content{
        width: 1300px;
        .content-bottom{
          height: 657px;
        }
      }

      .back{
        top: 60px;
        left: 80px;
      }
    }
  }
</style>
