Ember.TEMPLATES.application=Ember.Handlebars.template(function(e,s,a,r,h){this.compilerInfo=[4,">= 1.0.0"],a=this.merge(a,Ember.Handlebars.helpers),h=h||{};var t,n,l,p,d="",u=a.helperMissing,i=this.escapeExpression;return n={},l={},p={hash:{},contexts:[s],types:["ID"],hashContexts:l,hashTypes:n,data:h},h.buffer.push(i((t=a.render||s&&s.render,t?t.call(s,"header",p):u.call(s,"render","header",p)))),h.buffer.push("\n\n<div id='main-outlet'>\n  "),n={},l={},h.buffer.push(i(a._triageMustache.call(s,"outlet",{hash:{},contexts:[s],types:["ID"],hashContexts:l,hashTypes:n,data:h}))),h.buffer.push("\n</div>\n\n"),n={},l={},p={hash:{},contexts:[s],types:["ID"],hashContexts:l,hashTypes:n,data:h},h.buffer.push(i((t=a.render||s&&s.render,t?t.call(s,"modal",p):u.call(s,"render","modal",p)))),h.buffer.push("\n"),d});