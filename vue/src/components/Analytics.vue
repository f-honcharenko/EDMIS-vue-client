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
        <b-nav-item href="#" v-show="user.type=='admin'">Аналитика</b-nav-item>
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
      <div class="mr-5 ml-5 pr-5 pl-5">
        <div class = "m-5 p-5">
<b-list-group>
  <b-list-group-item>Всего пользователей: {{msgLength}}</b-list-group-item>
  <b-list-group-item>Всего документов: {{userLength}}</b-list-group-item>
</b-list-group>
        </div>
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
      msgLength:0,
      userLength:0,
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
    axios.post(this.$nodeLink + "/api/user/getAllUsers", { token: localStorage["token"] }).then(
      (res) => {
        if (res.status == 200) {
          this.auth = true;
          this.msgLength = res.data.details.length;
          console.log(res.data.details);
        }
      },
      (err) => {
        alert(err.response.data.message);
        console.log(err);
      }
    );
    axios.post(this.$nodeLink + "/api/msg/getAll", { token: localStorage["token"] }).then(
      (res) => {
        if (res.status == 201) {
          this.auth = true;
          this.msgs = res.data.details;
          this.userLength = res.data.details.length;
          console.log(res.data.details);
        }
      },
      (err) => {
        alert(err.response.data.message);
        console.log(err);
      }
    );
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
  },
  methods: {
    goToUserInfo(login){
          this.$router.push({name:'userInfo', params: {login:login}});
      // console.log(login);
    }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
