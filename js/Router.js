/**
 * Created by meathill on 14-1-21.
 */
;(function (ns) {
  ns.Router = Backbone.Router.extend({
    $gui: null,
    game: '',
    type: '',
    routes: {
      "": 'backHome',
      "search(/:keyword)": "showSearch",
      'remote/:game(/*path)': 'showRemoteGuide',
      'no-guide/:game(/:name)': 'showNoGuidePage'
    },
    backHome: function () {
      ga.pageview('home');
    },
    showRemoteGuide: function (game, path) {
      path = path ? path : '';
      var isIndex = !path
        , isList = /\/list/.test(path)
        , type = isIndex ? 'index' : (isList ? 'list' : 'detail');
      this.type = 'game';
      this.game = game;
      this.$gui.showPopupPage(config.remote + game + '/' + path, 'remote game-page guide-' + type);
      ga.pageview('remote/' + game + '/' + path);
    },
    showSearch: function (keyword) {
      this.type = 'search';
      this.$gui.showPopupPage('template/search.html', 'search-result', {keyword: keyword});
      ga.pageview('search');
    },
    showNoGuidePage: function (game, name) {
      this.type = 'no-game';
      this.game = game;
      this.$gui.showPopupPage('template/no-guide.html', 'no-guide');
      ga.pageview('no-guide/' + game + '/' + name);
    }
  });
}(Nervenet.createNameSpace('gamepop')));