<template>
  <section class="author">
    <div class="banner">
      <div v-for='a in author' class="item">
        <div class="msg">
          <img :src="setAutherSrc(a.src)"/>
          <p class="name">{{a.name}}</p>
          <p class="slogan">{{a.slogan}}</p>
        </div>
        <span class="focus" v-if='a.status' @click='a.status = !a.status'>关注</span>
        <span class="focus focused" @click='a.status = !a.status' v-else>已关注</span>
      </div>
    </div>
    <section class="more">
      <div v-for='o in other' class="other">
        <div class="authorMsg">
          <img :src="setOtherSrc(o.src)"/>
          <div class="intro">
            <p class="name">{{o.name}}</p>
            <p class="slogan">{{o.slogan}}</p>
          </div>
        </div>
        <div>
          <span class="focus" v-if='o.status' @click='o.status = !o.status' >关注</span>
          <span class="focus focused" @click='o.status = !o.status' v-else>已关注</span>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  name: 'author',
  data () {
    return {
      author: [{
        src: require('../assets/author/author.jpg'),
        name: '变革家',
        slogan: '帮股权投资者把好第一关！',
        status: true
      }, {
        src: require('../assets/author/author.jpg'),
        name: '懂懂笔记',
        slogan: '20年国内财经媒体从业记录者！',
        status: true
      }, {
        src: require('../assets/author/author.jpg'),
        name: '变革家',
        slogan: '帮股权投资者把好第一关！',
        status: true
      }, {
        src: require('../assets/author/author.jpg'),
        name: '娱乐硬糖',
        slogan: '有温度的泛娱乐产业自媒体。！',
        status: true
      }],
      other: [{
        src: require('../assets/author/author.jpg'),
        name: '邝新华',
        slogan: '新周刊主笔',
        status: true
      }, {
        src: require('../assets/author/author.jpg'),
        name: '40秒',
        slogan: '认识最疯狂的天才',
        status: true
      }, {
        src: require('../assets/author/author.jpg'),
        name: '艾问iAsk',
        slogan: '科技商业价值发现者',
        status: true
      }]
    }
  },
  methods: {
    setAutherSrc (src) {
      return src
    },
    setOtherSrc (src) {
      return src
    }
  }
}
</script>

<style lang="stylus">
.author{
  background: #fff;
  border-right: 1px solid #666;
  .banner{
    background: url(../assets/author/author_banner_bg.jpg);
    .item{
      height: 210px;
      width: 45%;
      margin: 2%;
      color: #fff;
      opacity: 0.9;
      display: inline-block;
      text-align: center;
      background: #2E2E2F;
      .msg{
        display: flex;
        flex-direction: column;
        background: #262627;
        padding: 10px 0;
        justify-content: space-around;
        align-items: center;
        img{
          height: 100px;
          width: 100px;
          border-radius: 50%;
        }
        .name{
          margin: 10px 0;
        }
        .slogan{
          color: #666;
          width: 80%;
          font-size: 13px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .focus{
        width: 80px;
        font-size: 13px;
        display: inline-block;
        padding: 4px 0;
        background: #E94C3D;
        border-radius: 10px;
        cursor: pointer;
        margin: 10px 0;
      }
      .focused{
        background: #262627;
      }
    }
  }
  .more{
    padding: 10px;
    .other{
      height: 100px;
      background: #eee;
      display: flex;
      margin-bottom: 10px;
      justify-content: space-between;
      padding: 0 10px;
      align-items: center;
      .authorMsg{
        display: flex;
        justify-content: space-between;
        align-items: center;
        img{
          height: 80px;
          width: 80px;
          border-radius: 50%;
        }
        .intro{
          height: 40px;
          margin: 0 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .slogan{
            font-size: 13px;
            color: #666;
          }
        }
      }
      .focus{
        display: inline-block;
        width: 80px;
        color: #fff;
        cursor: pointer;
        font-size: 13px;
        text-align: center;
        padding: 5px 0;
        background: #D5483A;
        border-radius: 15px;
        margin-left: 10px;
      }
      .focused{
        background: #262627;
      }
    }
    
  }
}
</style>
