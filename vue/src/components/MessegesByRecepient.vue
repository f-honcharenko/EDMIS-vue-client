<template>
  <div>
    <div v-show="auth">
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#" :to="{name:'mainPage'}">EDMIS</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#" :to="{name:'MessegesBySender'}">Отправленые</b-nav-item>
        <b-nav-item href="#" :to="{name:'MessegesByRecepient'}">Входящие</b-nav-item>
        <b-nav-item href="#" v-show="user.type=='admin'" :to="{name:'users'}">Пользователи</b-nav-item>
        <b-nav-item href="#" v-show="user.type=='admin'" :to="{name:'Analytics'}">Аналитика</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form v-show="user.type=='admin'">
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>


        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>{{user.login}}</em>
            <em>[{{user.type}}]</em>
          </template>
          <b-dropdown-item :to="{name:'profile'}">Profile</b-dropdown-item>
          <b-dropdown-item :to="{name:'login'}">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  
  </b-navbar>
  
    <b-button v-b-modal.modal-prevent-closing>New Document</b-button>


    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Submit Your Name"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
          :state="nameState"
        >
          <b-form-input
            id="name-input"
            v-model="name"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Content"
          label-for="name-input2"
          invalid-feedback="Name is required"
          :state="nameState"
        >
          <b-form-input
            id="name-input2"
            v-model="content"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>

 <div v-for="msg in msgs" :key="msg._id" >
<b-card :header="'from: '+msg.sender" class="text-center m-5">
        <b-card-text>{{msg.content}}</b-card-text>
      </b-card>
<!-- <b-card bg-variant="info" text-variant="white" :header="user.login+' ['+user.position+']'" class="text-center mt-2 mb-2 mr-5 ml-5  " @click="goToUserInfo(user.login)" >
        <b-card-text>{{user.fname+' '+user.lname}}</b-card-text> -->
 </div>
 
  </div>
  <div v-show="!auth">
    <b-spinner label="Spinning"></b-spinner>
  </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Messeges",
  components: {},
  data() {
    return {
      user:{
      },
      msgs:{

      },
      name: '',
      content: '',
        nameState: null,
        submittedNames: [],
      users:[],
      auth:false
    };
  },
  props: {},
  computed: {},
  beforeCreate() {
    axios.post(this.$nodeLink + "/api/user/findbytoken", { token: localStorage["token"] }).then(
      (res) => {
        if (res.status == 200) {
          this.auth = true;
          this.user = res.data.details;
          console.log(res.data);
        }
      },
      (err) => {
        alert(err.response.data.message);
        console.log(err);
      }
    );
    axios.post(this.$nodeLink + "/api/msg/getByRecepient", { token: localStorage["token"] }).then(
      (res) => {
        if (res.status == 201) {
          this.auth = true;
          this.msgs = res.data.details;
          console.log(res.data);
        }
      },
      (err) => {
        alert(err.response.data.message);
        console.log(err);
      }
    );
  },
  methods: {
    goToUserInfo(login){
          this.$router.push({name:'userInfo', params: {login:login}});
      // console.log(login);
    },
    handleOk(){
      console.log(this.name+" "+this.content);
      axios.post(this.$nodeLink + "/api/msg/send", { token: localStorage["token"], recepient:this.name, content:this.content }).then(
      (res) => {
        if (res.status == 201) {
          this.auth = true;
          this.msgs = res.data.details;
          this.$router.go();
          console.log(res.data);
        }
      },
      (err) => {
        alert(err.response.data.message);
        console.log(err);
      }
    );
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
