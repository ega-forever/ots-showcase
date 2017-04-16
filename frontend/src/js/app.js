Vue.locales = {
  default: (window.navigator.userLanguage || window.navigator.language).includes('ru') ? 'ru' : 'en',
  dict: {
    en: require('./locales/locale-en_US.json'),
    ru: require('./locales/locale-ru_RU.json')
  }
};

Vue.http.interceptors.push((request, next) => {
  request.headers.set('Authorization', `Bearer ${location.hash.replace('#access_token=', '')}`);
  request.headers.set('Accept', 'application/json');
  next()
})

const app = new Vue({
  el: '#app',
  data: {
    demo: [
      {title: 'test', description: 'some text', stock_price: 34, suggested_price: 54, view: false},
      {title: 'test', description: 'some text', view: false},
      {title: 'test', description: 'some text', view: false},
      {title: 'test', description: 'some text', view: false},
      {title: 'test', description: 'some text', view: false},
      {title: 'test', description: 'some text', view: false}
    ],
    page: 1,
    search: '',
    show_main: true,
    new_item: {},
    access_token: location.hash.replace('#', '')
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
    },
    save: function(item) {
      this.show_main = true;
      this.new_item = {};
    },
    goPage: function(event) {
      event.preventDefault();
      this.page = Number(_.get(event, 'target.dataset.page', 1));
    },
    getItems: function() {

      this.$http.get('http://localhost:8080/api/projects')
        .then(response => {

          console.log(response);

      }, response => {
        console.log(response);
      });

    },
  },
  mounted: function() {
    console.log('mounted');
    console.log('token', this.access_token);
    this.getItems();
  },

  computed: {
    items: function() {
      return this.search ?
        _.chain(this.demo)
          .filter(item =>
            item.description.includes(this.search)
          )
          .take(5)
          .value() :
        this.demo.slice((this.page - 1) * 5, this.page + 4);
    },
    pageCount: function() {
      return Math.ceil(this.demo.length / 5)
    }
  },

  filters: {
    translate: function(value) {
      return _.get(Vue.locales.dict[Vue.locales.default], value)
    }
  }
});