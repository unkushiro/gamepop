/**
 * Created by meathill on 14-8-27.
 */
;(function (ns) {
  'use strict';

  ns.AutoLoad = Backbone.View.extend({
    list: null,
    timeout: 0,
    page: 1,
    events: {
      'destroy': 'destroyHandler',
      'scroll': 'scrollHandler'
    },
    initialize: function (options) {
      this.list = options.list;
      this.src = this.list.data('src');
      if (this.src) {
        this.src = (this.list.data('base') ? config[this.list.data('base')] : config.remote) + this.src;
      }
    },
    fetch: function () {
      this.page += 1;
      // 如果没有src，则触发load事件，交给其它mediator处理
      if (!this.src) {
        return this.list.trigger('need-more');
      }
      $.ajax(this.src.replace('{page}', this.page), {
        dataType: 'html',
        context: this,
        success: function (response) {
          if (response) {
            this.list.append(response).removeClass('loading').trigger('refresh');
          } else {
            this.list.removeClass('loading auto-load').addClass('no-more');
            setTimeout(function () {
              list.removeClass('no-more');
            }, 3000);
            this.undelegateEvents();
          }
        }
      });
    },
    scrollHandler: function () {
      clearTimeout(this.timeout);
      var self = this
        , list = this.list;
      if (this.el.scrollHeight - this.el.scrollTop - this.el.clientHeight < 10) {
        this.timeout = setTimeout(function () {
          if (list.length === 0 || list.hasClass('loading')) {
            return;
          }
          list.addClass('loading');
          self.fetch();
        }, 100);
      }
    }
  });
}(Nervenet.createNameSpace('gamepop.view')));