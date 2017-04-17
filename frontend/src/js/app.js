/**
 * @type {module}
 * @description main client side app, running on Vue2
 */

Vue.http.interceptors.push((request, next) => {
  request.headers.set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
  request.headers.set('Accept', 'application/json');
  next(response => {
    if (response.status === 401)
      location.href = '/auth/google'
  })
});

const app = new Vue({
  router: new VueRouter({}),
  el: '#app',
  data: {
    notes: [
      /*      {title: 'test', description: 'some text', stock_price: 34, suggested_price: 54, view: false},
       {title: 'test', description: 'some text', view: false},
       {title: 'test', description: 'some text', view: false},
       {title: 'test', description: 'some text', view: false},
       {title: 'test', description: 'some text', view: false},
       {title: 'test', description: 'some text', view: false}*/
    ],
    page: 1,
    search: '',
    show_main: !location.hash.includes('/new'),
    new_item: {},
    new_item_valid: false
  },
  methods: {
    changeLocale: function(locale) {
      Vue.locales.default = locale;
      this.$forceUpdate()
    },
    view: function(item) {
      item.view = !item.view;
    },
    edit: function(item) {
      this.$http.put('http://localhost:8080/api/projects', item)
        .then(response => {
          console.log(response);
        });

    },
    remove: function(item) {
      console.log('!!!');
      this.$http.delete(`http://localhost:8080/api/projects?id=${item.id}`)
        .then(response => {
          console.log(response);
          this.notes = _.reject(this.notes, {id: item.id});
        });

    },
    save: function() {

      this.$http.post('http://localhost:8080/api/projects', this.new_item)
        .then(response => {
          console.log(response);
          location.hash = '#list';
          this.new_item = {};
          this.getItems();
        });

    },
    goPage: function(event) {
      event.preventDefault();
      this.page = Number(_.get(event, 'target.dataset.page', 1));
    },
    getItems: function() {

      this.$http.get('http://localhost:8080/api/projects')
        .then(response => {
          this.notes = response.body
            .map(item => _.set(item, 'view', false));
        });

    },
    validateItem: function(item) {
      return _.get(item, 'description', '').length > 0 &&
        _.get(item, 'title', '') > 0 &&
          item.stock_price > 0 &&
          item.suggested_price > 0
    }
  },
  mounted: function() {
    let reg = new RegExp(/access_token=(.*)/);
    if (reg.test(location.hash)) {
      console.log('set');
      localStorage.setItem('access_token', _.get(location.hash.match(reg), '1'))
    }
    this.getItems();
  },

  computed: {
    items: function() {
      return this.search ?
        _.chain(this.notes)
          .filter(item =>
            item.description.includes(this.search) ||
            item.title.includes(this.search)
          )
          .take(5)
          .value() :
        this.notes.slice((this.page - 1) * 5, this.page + 4);
    },
    pageCount: function() {
      return Math.ceil(this.notes.length / 5)
    }
  },

  filters: {
    formatDate: (date) =>
      moment(date).format('DD.MM.YYYY')
  },

  watch: {
    $route: function(to, from) {
      this.show_main = !to.path.includes('/new');
    }
  }
});