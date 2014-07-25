/**
 * news page
 */
define(function() {

    'use strict';
    var Base = require('./base');
    var router = require('router'),
        model = require('model');
    var pageTpl = require('tpl/newsPage.tpl'),
        newsTpl = require('tpl/news.tpl');
    var NewsPage = Base.extend({

        uiEvents: {
            '.js-openNews': function(e) {
                var id = $(e.target).attr('data-id');
                router.route('/news/' + id);
            },


            '.js-loadMore': function() {
                var $list = this.$el.find('.newsList');
                model.getNews({
                    pageNum: this.pageNum++
                }).then(function(newsArr) {
                    _.each(newsArr, function(news) {
                        $list.append(_.template(newsTpl, news));
                    });
                });
            }
        },


        render: function(data) {
            var $el = _.template(pageTpl, data);
            $('#container').append($el);
        }

    });

    return NewsPage;

});
