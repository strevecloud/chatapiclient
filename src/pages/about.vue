<template>
  <f7-page>
    <f7-navbar :title="title" link="/" back-link="Back" sliding></f7-navbar>
    <f7-messages>
    <f7-message v-for="message in messages"
      :key="message.id"
      :text="message.Text"
      :label="message.label"
      :date="message.Date"
      :name="message.Name"
      :avatar="message.Avatar"
      :type="message.Type"
      :day="message.day"
      :time="message.time"
      @click="onClick"
      @click:text="onTextClick"
      @click:name="onNameClick"
      @click:avatar="onAvatarClick"
    ></f7-message>
  </f7-messages>
  <f7-messagebar placeholder="Message" v-model="reply" send-link="Send" @submit="onSubmit"></f7-messagebar>
  </f7-page>
</template>

<script>
  export default {
    data: function () {
      return {
        name: '',
        title:'',
        avatar: '',
        toid:'',
        userid:'',
        messages: [],
        reply:'',
        type:'',
        username:'',
        toname:'',
        conid:'',
        channel:'',
        fromid:'',
        date:''
      }
    },
    // ready () {
    //     var channel = this.$pusher.subscribe('my-channel');
    //     channel.bind('my-event', ({ data }) => {
    //        alert(data)
    //     });
    // },
    created:function(){
    let id = this.$route.params.id
    this.$http.get('http://localhost:52088/api/Chat/'+id,{
      headers: { "authorization": localStorage.getItem('token') }
    })
    .then(response=>{
      var data = response.data;
      this.messages = data.Messages
      this.name = data.Name
      this.avatar=data.Avatar
      //this.title=data.Name
      this.toid=data.To_Id
      this.fromid=data.From_Id
      this.userid=data.userid
      this.username=data.NameLogin
      this.title=data.Name
      this.conid=data.Con_Id
      this.channel=this.conid
      console.log(response.data)
      this.date=(function () {
            var now = new Date();
            var hours = now.getHours();
            var minutes = now.getMinutes();
            return hours + ':' + minutes;
          })()
    console.log(this.date)
     let types='';
    let pengirim='';
    this.pusher.subscribe('my-channel_'+this.conid, channel => {
    channel.bind('my-event_'+this.conid, ({ message,type,sentby,setbyname }) => {
      if (message.trim().length === 0) return;
      if(this.userid!=sentby)
      {
         types='received'
         pengirim = setbyname
      }
      else{
       pengirim=this.username
        types='sent'
      }
      console.log(types)
       this.messages.push({
          Name: pengirim,
          avatar: this.avatar,
          Text: message,
          Type:types,
          Date: (function () {
            var now = new Date();
            var hours = now.getHours();
            var minutes = now.getMinutes();
            return hours + ':' + minutes;
          })()

        });
    });
});
    })
    .catch(e=>{
      //this.cekopen=true;
      //window.location = "/";
      if(e)
      {
        localStorage.removeItem('token');
        window.location = "/";
      }
    })
    
   },
    methods: {
      onClick: function (event) {
        console.log('message click');
      },
      onAvatarClick: function () {
        console.log('avatar-click');
      },
      onTextClick: function () {
        console.log('text-click');
      },
      onNameClick: function () {
        console.log('name-click');
      },
      onSubmit: function (text, clear) {
        // if (text.trim().length === 0) return;
        // this.messages.push({
        //   name: this.name,
        //   avatar: this.avatar,
        //   Text: text,
        //   Date: (function () {
        //     var now = new Date();
        //     var hours = now.getHours();
        //     var minutes = now.getMinutes();
        //     return hours + ':' + minutes;
        //   })()

        // });
    this.$http.post('http://localhost:52088/api/Chat/',{
      Reply:this.reply,
      To_Id:this.toid,
      Con_Id:this.conid,
      From_Id:this.fromid,
      Timestamp:this.date
    })
    .then(response=>{
      // var data = response.data;
      // this.messages = data.Messages
      // this.name = data.Name
      // this.avatar=data.Avatar
      // this.title=data.Name
      //console.log(this.name)
     Reply:this.reply
      //console.log(response.data)
    })
    .catch(e=>{
      console.log(e)
    })
            clear();
      }
    },
    title:function(){
     this.title
     console.log(this.toname)
    },
    Datefx:function()
    {
      var now = new Date();
      var hours = now.getHours();
      var minutes = now.getMinutes();
      return hours + ':' + minutes;
    }
  }
</script>