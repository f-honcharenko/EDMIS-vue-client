<template>
<div>
    <b-form @submit.prevent="">
      <b-form-group
        id="input-group-1"
        label="Login:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.login"
          type="login"
          placeholder="Login"
          required
          disabled
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your First Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.fname"
          placeholder="Enter name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your Last Name:" label-for="input-21">
        <b-form-input
          id="input-21"
          v-model="form.lname"
          placeholder="Enter name"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="button" variant="primary" @click="submitForm">Submit</b-button>
      <!-- <b-button type="reset" variant="danger">Reset</b-button> -->
    </b-form>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'Login',
  components:{},
  data() {
      return {
        form: {
          login: '',
          Fname: '',
          Lname: '',
        },
        show: true
      }
    },
  props: {

  },
  computed: {

  },
    beforeCreate() {
    axios.post(this.$nodeLink + "/api/user/findbytoken", { token: localStorage["token"] }).then(
      (res) => {
        console.log(res);
        if (res.status == 200) {
          this.form.login = res.data.details.login;
          this.form.fname = res.data.details.fname;
          this.form.lname = res.data.details.lname;
        }
      },
      (err) => {
        alert(err.response.data.message);
      }
    );
  },
  methods: {
    submitForm(){
      console.log(this.form);
      axios.post(this.$nodeLink+'/api/user/update', {token:localStorage['token'],fname:this.form.fname, lname:this.form.lname })
      .then((res)=>{
          alert(res.data.message);
          this.$router.go();
          // this.$router.push({name:'profile'});
      },(err)=>{
        alert(err.response.data.message);
      })
      
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#wrapper{
  display: flex;
}
#form1{
  flex:1
}
.void{
  flex:2
}

</style>
