/**
 * PhotoSwipe tag
 *
 * Syntax:
 *   photoswipe /path/to/image [/path/to/thumbnail] [title] [width] [height]
 */

 var rD = /^\d+$/;

function testUrl(url) {
  var protocol = '(?:(?:[a-z]+:)?//)';
  var auth = '(?:\\S+(?::\\S*)?@)?';
  var ip = '(?:\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})?';
  var host = '(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)';
  var domain = '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*';
  var tld = '(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))';
  var port = '(?::\\d{2,5})?';
  var path = '(?:[/?#]\\S*)?';
  var regex = [
    protocol, auth, '(?:localhost|' + ip + '|' + host + domain + tld + ')',
    port, path
  ].join('');
  var regex2 = ['\.?/', path].join('');

  return RegExp(regex, 'ig').test(url) || RegExp(regex2, 'ig').test(url);
}

var photoswipe = function(args, content) {
 var url_for = hexo.extend.helper.get('url_for').bind(hexo);
  var original = args.shift(),
    thumbnail = '',
    width,
    height;

  if (args.length) {
    thumbnail = args.shift();
  }

  if (args.length >= 2 && rD.test(args[args.length - 1]) && rD.test(args[args.length - 2])) {
    height = args.pop();
    width = args.pop();
  }

  var title = args.join(' ');

  return (
    '<figure class="js-post-image" itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject">' +
      '<a class="no-barba" href="' + original + '" title="' + title + '"' + ((width && height) ? 'data-size="' + width + 'x' + height + '"' : '') + '>' +
        '<img src="' + (thumbnail || original) + '" alt="' + title + '">' +
      '</a>' +
      '<figcaption class="caption">' + ('&#x25B2; ' + title || '') + '</figcaption>' +
    '</figure>'
  );
};

hexo.extend.tag.register('photoswipe', photoswipe);
