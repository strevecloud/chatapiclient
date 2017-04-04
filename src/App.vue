<template>
  <div id="app">
    <!-- <f7-statusbar></f7-statusbar> -->
    <f7-views>
      <f7-view id="main-view" navbar-through :dynamic-navbar="true" main>
        <f7-navbar v-if="$theme.ios">
          <f7-nav-center :name="userloginname" sliding>Welcome {{username}}</f7-nav-center>
        </f7-navbar>
        <f7-pages>
          <f7-page>
          <!--  <f7-button open-popup="#my-popup">Open Popup</f7-button> -->
            <f7-block-title>Contact</f7-block-title>
            <!-- <f7-list v-for="item in getUser" :key="item.Con_Id">
              <f7-list-item :link="linkid(item)">{{item.ToName}}</f7-list-item>
            </f7-list> -->
            <f7-toolbar id="tabbar" tabbar :hidden="hidden">
  <f7-link icon="icon-1" text="Chatlist" tab-link="#tab1"></f7-link>
  <f7-link icon="icon-2" text="Status" tab-link="#tab2"></f7-link>
</f7-toolbar>
            <f7-tabs swipeable animated>
  <f7-tab id="tab1" active>
  
            <f7-list media-list>
            <f7-list-item v-for="item in getUser" :key="item.Con_Id"
              :link="linkid(item)"
              media="<img src='http://lorempixel.com/160/160/people/1' width='50px'>"
              :title="titletoname(item)"
              :subtitle="lastmessage(item)"
              :after="timestamp(item)"
            ><f7-badge v-if="badge" color="red">{{badge}}</f7-badge></f7-list-item>
          </f7-list>
          </f7-tab>
          <f7-tab id="tab2">
            <f7-accordion-item v-for="n in 5">
    <f7-accordion-toggle>
    <f7-card title="hei">
            </f7-card>
    </f7-accordion-toggle>
    <f7-accordion-content>
     <f7-card title="<img src='http://lorempixel.com/1000/600/people/6/' width='100%'>" 
            content="test" 
            footer="Card Footer">
            </f7-card>
    </f7-accordion-content>
  </f7-accordion-item>
            
          </f7-tab>
</f7-tabs>
          </f7-page>
        </f7-pages>
      </f7-view>
    </f7-views>

    <f7-popup id="my-popup" tablet-fullscreen :opened="cekopen">
    <f7-page login-screen no-navbar>
    <f7-login-screen-title>Welcome To My Site</f7-login-screen-title>
    <f7-list form>
      <f7-list-item>
        <f7-label>Username</f7-label>
        <f7-input name="username" type="text" v-model="name" placeholder="Username"></f7-input>
      </f7-list-item>
      <f7-list-item>
        <f7-label>Password</f7-label>
        <f7-input name="password" type="password" v-model="password" placeholder="Password"></f7-input>
      </f7-list-item>
    </f7-list>
    <f7-list>
      <f7-list-button title="Sign In" @click="login"></f7-list-button>
      <f7-list-label>
        <!-- <p>Click Sign In to close Login Screen</p> -->
      </f7-list-label>
    </f7-list>
  </f7-page>
      </f7-popup>
  </div>
</template>

<script>
export default{
   data(){
    return{
      link:'',
      name:'',
      password:'',
      getUser:[],
      cekopen: true,
      username:'',
      channel:'',
      hidden:false,
      badge:0
    }
   },
   created:function(){
    this.$http.get('http://localhost:52088/api/Chat/',{
      headers: { "authorization": localStorage.getItem('token') }
    })
    .then(response=>{
      this.getUser=response.data.ListChat
      this.cekopen=false
      this.username = response.data.NameLogin
      this.channel='my-channel'+this.username
      console.log(response.data)
      this.pusher = new Pusher('e566743c8d2d940b3849',{
      authEndpoint: 'http://localhost:52088/api/Pusher/',
    });
    //let dd = ;
    console.log(this.channel)
     var channel = this.pusher.subscribe(this.channel);
    channel.bind('newmessage', function(data) {
      console.log(data)
    });
    })
    .catch(e=>{
       this.cekopen=true
       //console.log(e)
    })
    //Pusher.logToConsole = true;
   },
   methods:{
    linkid:function(item)
    {
      return '/about/'+item.Con_Id
    },
    titletoname:function(item)
    {
      return item.Name
    },
    lastmessage:function(item)
    {
      return item.Reply
    },
    timestamp:function(item)
    {
      return item.Timestamp
    },
    userloginname:function(){
    console.log(this.username)
    return this.username
   },
    login:function()
    {
      this.$http.post('http://localhost:52088/api/Login/',{
        name:this.name,
        password:this.password
      })
      .then(response=>{
        localStorage.setItem('token', response.data.token);
        this.cekopen=false
        location.reload()
      })
      .catch(e=>{
        console.log(e)
        if(e)
        {
        localStorage.removeItem('token');
        window.location = "/";
        }
      })
    }
   }
}
</script>