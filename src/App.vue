<template>
  <div id="app">
    <f7-statusbar></f7-statusbar>
    <f7-views>
      <f7-view id="main-view" navbar-through :dynamic-navbar="true" main>
        <f7-navbar v-if="$theme.ios">
          <f7-nav-center :name="name" sliding>Chat</f7-nav-center>
        </f7-navbar>
        <f7-pages>
          <f7-page>
          <!--  <f7-button open-popup="#my-popup">Open Popup</f7-button> -->
            <f7-block-title>Contact</f7-block-title>
            <f7-list v-for="item in getUser" :key="item.Con_Id">
              <f7-list-item :link="linkid(item)">{{item.Name}}</f7-list-item>
            </f7-list>
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
      cekopen: true
    }
   },
   created:function(){
    this.$http.get('http://localhost:1234/api/Chat/',{
      headers: { "authorization": localStorage.getItem('token') }
    })
    .then(response=>{
      this.getUser=response.data
      this.cekopen=false
      console.log(response.data)
    })
    .catch(e=>{
       this.cekopen=true
    })
   },
   methods:{
    linkid:function(item)
    {
      return '/about/'+item.Con_Id
    },
    login:function()
    {
      this.$http.post('http://localhost:1234/api/Login/',{
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
   },
   name:function()
   {

   }
}
</script>