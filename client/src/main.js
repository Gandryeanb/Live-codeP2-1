var app = new Vue({
  el: '#app',
  data: {
    host: 'http://localhost:3000',

    isAlreadyLogin: 0,
    currentUser: null,

    loginEmailForm: '',
    loginPassForm: '',

    registNameForm: '',
    registEmailForm: '',
    registPasswordForm: '',

    createEventName: '',
    createEventLocation: '',
    createEventAddress: '',

    searchInput: '',

    eventList: []
  },
  created () {
    this.isLogin()
    this.getEvent()
  },
  watch: {
    searchInput() {
      if(this.searchInput === '') {
        this.getEvent()
      } else {
        this.getEventByName(this.searchInput)
      }
    }
  },
  methods: {
    getUserData() {
      axios({
        url: `${this.host}/users`,
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('token')
        }
      })
        .then(data => {
          this.currentUser = data.data.id
        })
        .catch(err => {
          console.log(err)
        })
    },
    regist() {
      axios({
        url: `${this.host}/users/register`,
        method: 'POST',
        data: {
          name: this.registNameForm,
          email: this.registEmailForm,
          password: this.registPasswordForm
        }
      })
        .then(data => {
          console.log('regist success')
        })
        .catch(err => {
          console.log(err)
        })
    },
    modalRegist() {
      $('.ui.mini.modal.regist').modal('show')
    },
    deleteEventById (id) {
      axios({
        url: `${this.host}/events/${id}`,
        method: 'DELETE',
        headers: {
          access_token: localStorage.getItem('token')
        }
      })
        .then(data => {
          this.getEvent()
        })
        .catch(err => {
          console.log(err)
        })
    },
    getEventByName(query) {
      axios({
        url: `${this.host}/events/search/${query}`,
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('token')
        }
      })
        .then(data => {
          this.eventList = data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    createEvent() {
      axios({
        url: `${this.host}/events`,
        method: 'POST',
        headers: {
          access_token: localStorage.getItem('token')
        },
        data : {
          name: this.createEventName,
          location: this.createEventLocation,
          address: this.createEventAddress
        }
      })
        .then(data => {
          this.createEventName = ''
          this.createEventLocation = ''
          this.createEventAddress = ''
          this.getEvent()
        })
        .catch(err => {
          console.log(err)
        })
    }, 
    getEvent () {
      axios({
        url: `${this.host}/events`,
        method: 'GET'
      })
        .then(data => {
          this.eventList = data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    logout () {
      localStorage.removeItem('token')
      this.isAlreadyLogin = 0
    },
    isLogin () {
      let token = localStorage.getItem('token')
      if (token) {
        this.isAlreadyLogin = 1
        this.getUserData()
      } else {
        this.isAlreadyLogin = 0
      }
    },
    login () {
      axios({
        url: `${this.host}/users/login`,
        method: 'POST',
        data: {
          email: this.loginEmailForm,
          password: this.loginPassForm
        }
      })
        .then(data => {
          localStorage.setItem('token', data.data.token)
          this.isAlreadyLogin = 1
          this.loginEmailForm = ''
          this.loginPassForm = ''
          this.getUserData()
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})