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
            <em>[{{user.position}}]</em>
          </template>
          <b-dropdown-item :to="{name:'profile'}">Profile</b-dropdown-item>
          <b-dropdown-item :to="{name:'login'}">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  </div>
  <div v-show="!auth">
    <b-spinner label="Spinning"></b-spinner>
  </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LK",
  components: {},
  data() {
    return {
      user:{
      },
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
  },
  methods: {
    
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
