/**
 * Created by meathill on 14-1-21.
 */
;(function (ns) {
  var TITLES = {
    'all': '全部攻略',
    'offline': '离线管理'
  };

  ns.GUI = Backbone.View.extend({
    $router: null,
    events: {
      'tap': 'tapHandler',
      'click .back-button': 'preventDefault',
      'tap .back-button': 'backButton_clickHandler'
    },
    initialize: function () {
      Hammer(this.el, {
        drag: false
      });
      this.page = $('#page-container');
    },
    activeNavButton: function (str) {
      this.$('#main-nav [href$="#/' + str + '"]').addClass('pure-button-active')
        .siblings().removeClass('pure-button-active');
    },
    backHome: function () {
      this.page.removeClass('active');
      this.$el.attr('class', '');
      this.$('h1').text('游戏泡泡');
    },
    showPage: function (url, className) {
      this.page
        .html('<i class="fa fa-spin fa-spinner fa-4x" id="loading"></i>')
        .load(url, function (response, status, xhr) {
          if (status === 'error') {
            this.innerHTML = '加载失败';
          }
        })
        .addClass('active');
      this.$el.attr('class', className);
      this.$('h1').text(TITLES[className] || '游戏泡泡');
    },
    backButton_clickHandler: function () {
      var hash = location.hash.substr(2)
        , paths = hash.split('/');
      if (paths.length === 0) {
        location.href = 'popo:return';
      } else {
        this.$router.navigate('#/' + paths.slice(0, -1).join('/'));
      }
    },
    preventDefault: function (event) {
      event.preventDefault();
    },
    tapHandler: function () {
      this.$('.pure-menu').remove();
    }
  });
}(Nervenet.createNameSpace('Gamepop.view')));