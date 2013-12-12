function diff_match_patch(){this.Diff_Timeout=1,this.Diff_EditCost=4}var DIFF_DELETE=-1,DIFF_INSERT=1,DIFF_EQUAL=0;diff_match_patch.Diff,diff_match_patch.prototype.diff_main=function(t,e,n,i){"undefined"==typeof i&&(i=this.Diff_Timeout<=0?Number.MAX_VALUE:(new Date).getTime()+1e3*this.Diff_Timeout);var r=i;if(null==t||null==e)throw new Error("Null input. (diff_main)");if(t==e)return t?[[DIFF_EQUAL,t]]:[];"undefined"==typeof n&&(n=!0);var f=n,a=this.diff_commonPrefix(t,e),h=t.substring(0,a);t=t.substring(a),e=e.substring(a),a=this.diff_commonSuffix(t,e);var _=t.substring(t.length-a);t=t.substring(0,t.length-a),e=e.substring(0,e.length-a);var s=this.diff_compute_(t,e,f,r);return h&&s.unshift([DIFF_EQUAL,h]),_&&s.push([DIFF_EQUAL,_]),this.diff_cleanupMerge(s),s},diff_match_patch.prototype.diff_compute_=function(t,e,n,i){var r;if(!t)return[[DIFF_INSERT,e]];if(!e)return[[DIFF_DELETE,t]];var f=t.length>e.length?t:e,a=t.length>e.length?e:t,h=f.indexOf(a);if(-1!=h)return r=[[DIFF_INSERT,f.substring(0,h)],[DIFF_EQUAL,a],[DIFF_INSERT,f.substring(h+a.length)]],t.length>e.length&&(r[0][0]=r[2][0]=DIFF_DELETE),r;if(1==a.length)return[[DIFF_DELETE,t],[DIFF_INSERT,e]];var _=this.diff_halfMatch_(t,e);if(_){var s=_[0],c=_[1],l=_[2],o=_[3],g=_[4],u=this.diff_main(s,l,n,i),F=this.diff_main(c,o,n,i);return u.concat([[DIFF_EQUAL,g]],F)}return n&&t.length>100&&e.length>100?this.diff_lineMode_(t,e,i):this.diff_bisect_(t,e,i)},diff_match_patch.prototype.diff_lineMode_=function(t,e,n){var i=this.diff_linesToChars_(t,e);t=i.chars1,e=i.chars2;var r=i.lineArray,f=this.diff_main(t,e,!1,n);this.diff_charsToLines_(f,r),this.diff_cleanupSemantic(f),f.push([DIFF_EQUAL,""]);for(var a=0,h=0,_=0,s="",c="";a<f.length;){switch(f[a][0]){case DIFF_INSERT:_++,c+=f[a][1];break;case DIFF_DELETE:h++,s+=f[a][1];break;case DIFF_EQUAL:if(h>=1&&_>=1){f.splice(a-h-_,h+_),a=a-h-_;for(var i=this.diff_main(s,c,!1,n),l=i.length-1;l>=0;l--)f.splice(a,0,i[l]);a+=i.length}_=0,h=0,s="",c=""}a++}return f.pop(),f},diff_match_patch.prototype.diff_bisect_=function(t,e,n){for(var i=t.length,r=e.length,f=Math.ceil((i+r)/2),a=f,h=2*f,_=new Array(h),s=new Array(h),c=0;h>c;c++)_[c]=-1,s[c]=-1;_[a+1]=0,s[a+1]=0;for(var l=i-r,o=l%2!=0,g=0,u=0,F=0,p=0,E=0;f>E&&!((new Date).getTime()>n);E++){for(var d=-E+g;E-u>=d;d+=2){var D,m=a+d;D=d==-E||d!=E&&_[m-1]<_[m+1]?_[m+1]:_[m-1]+1;for(var I=D-d;i>D&&r>I&&t.charAt(D)==e.charAt(I);)D++,I++;if(_[m]=D,D>i)u+=2;else if(I>r)g+=2;else if(o){var b=a+l-d;if(b>=0&&h>b&&-1!=s[b]){var v=i-s[b];if(D>=v)return this.diff_bisectSplit_(t,e,D,I,n)}}}for(var T=-E+F;E-p>=T;T+=2){var v,b=a+T;v=T==-E||T!=E&&s[b-1]<s[b+1]?s[b+1]:s[b-1]+1;for(var L=v-T;i>v&&r>L&&t.charAt(i-v-1)==e.charAt(r-L-1);)v++,L++;if(s[b]=v,v>i)p+=2;else if(L>r)F+=2;else if(!o){var m=a+l-T;if(m>=0&&h>m&&-1!=_[m]){var D=_[m],I=a+D-m;if(v=i-v,D>=v)return this.diff_bisectSplit_(t,e,D,I,n)}}}}return[[DIFF_DELETE,t],[DIFF_INSERT,e]]},diff_match_patch.prototype.diff_bisectSplit_=function(t,e,n,i,r){var f=t.substring(0,n),a=e.substring(0,i),h=t.substring(n),_=e.substring(i),s=this.diff_main(f,a,!1,r),c=this.diff_main(h,_,!1,r);return s.concat(c)},diff_match_patch.prototype.diff_linesToChars_=function(t,e){function n(t){for(var e="",n=0,f=-1,a=i.length;f<t.length-1;){f=t.indexOf("\n",n),-1==f&&(f=t.length-1);var h=t.substring(n,f+1);n=f+1,(r.hasOwnProperty?r.hasOwnProperty(h):void 0!==r[h])?e+=String.fromCharCode(r[h]):(e+=String.fromCharCode(a),r[h]=a,i[a++]=h)}return e}var i=[],r={};i[0]="";var f=n(t),a=n(e);return{chars1:f,chars2:a,lineArray:i}},diff_match_patch.prototype.diff_charsToLines_=function(t,e){for(var n=0;n<t.length;n++){for(var i=t[n][1],r=[],f=0;f<i.length;f++)r[f]=e[i.charCodeAt(f)];t[n][1]=r.join("")}},diff_match_patch.prototype.diff_commonPrefix=function(t,e){if(!t||!e||t.charAt(0)!=e.charAt(0))return 0;for(var n=0,i=Math.min(t.length,e.length),r=i,f=0;r>n;)t.substring(f,r)==e.substring(f,r)?(n=r,f=n):i=r,r=Math.floor((i-n)/2+n);return r},diff_match_patch.prototype.diff_commonSuffix=function(t,e){if(!t||!e||t.charAt(t.length-1)!=e.charAt(e.length-1))return 0;for(var n=0,i=Math.min(t.length,e.length),r=i,f=0;r>n;)t.substring(t.length-r,t.length-f)==e.substring(e.length-r,e.length-f)?(n=r,f=n):i=r,r=Math.floor((i-n)/2+n);return r},diff_match_patch.prototype.diff_commonOverlap_=function(t,e){var n=t.length,i=e.length;if(0==n||0==i)return 0;n>i?t=t.substring(n-i):i>n&&(e=e.substring(0,n));var r=Math.min(n,i);if(t==e)return r;for(var f=0,a=1;;){var h=t.substring(r-a),_=e.indexOf(h);if(-1==_)return f;a+=_,(0==_||t.substring(r-a)==e.substring(0,a))&&(f=a,a++)}},diff_match_patch.prototype.diff_halfMatch_=function(t,e){function n(t,e,n){for(var i,r,f,h,_=t.substring(n,n+Math.floor(t.length/4)),s=-1,c="";-1!=(s=e.indexOf(_,s+1));){var l=a.diff_commonPrefix(t.substring(n),e.substring(s)),o=a.diff_commonSuffix(t.substring(0,n),e.substring(0,s));c.length<o+l&&(c=e.substring(s-o,s)+e.substring(s,s+l),i=t.substring(0,n-o),r=t.substring(n+l),f=e.substring(0,s-o),h=e.substring(s+l))}return 2*c.length>=t.length?[i,r,f,h,c]:null}if(this.Diff_Timeout<=0)return null;var i=t.length>e.length?t:e,r=t.length>e.length?e:t;if(i.length<4||2*r.length<i.length)return null;var f,a=this,h=n(i,r,Math.ceil(i.length/4)),_=n(i,r,Math.ceil(i.length/2));if(!h&&!_)return null;f=_?h?h[4].length>_[4].length?h:_:_:h;var s,c,l,o;t.length>e.length?(s=f[0],c=f[1],l=f[2],o=f[3]):(l=f[0],o=f[1],s=f[2],c=f[3]);var g=f[4];return[s,c,l,o,g]},diff_match_patch.prototype.diff_cleanupSemantic=function(t){for(var e=!1,n=[],i=0,r=null,f=0,a=0,h=0,_=0,s=0;f<t.length;)t[f][0]==DIFF_EQUAL?(n[i++]=f,a=_,h=s,_=0,s=0,r=t[f][1]):(t[f][0]==DIFF_INSERT?_+=t[f][1].length:s+=t[f][1].length,r&&r.length<=Math.max(a,h)&&r.length<=Math.max(_,s)&&(t.splice(n[i-1],0,[DIFF_DELETE,r]),t[n[i-1]+1][0]=DIFF_INSERT,i--,i--,f=i>0?n[i-1]:-1,a=0,h=0,_=0,s=0,r=null,e=!0)),f++;for(e&&this.diff_cleanupMerge(t),this.diff_cleanupSemanticLossless(t),f=1;f<t.length;){if(t[f-1][0]==DIFF_DELETE&&t[f][0]==DIFF_INSERT){var c=t[f-1][1],l=t[f][1],o=this.diff_commonOverlap_(c,l),g=this.diff_commonOverlap_(l,c);o>=g?(o>=c.length/2||o>=l.length/2)&&(t.splice(f,0,[DIFF_EQUAL,l.substring(0,o)]),t[f-1][1]=c.substring(0,c.length-o),t[f+1][1]=l.substring(o),f++):(g>=c.length/2||g>=l.length/2)&&(t.splice(f,0,[DIFF_EQUAL,c.substring(0,g)]),t[f-1][0]=DIFF_INSERT,t[f-1][1]=l.substring(0,l.length-g),t[f+1][0]=DIFF_DELETE,t[f+1][1]=c.substring(g),f++),f++}f++}},diff_match_patch.prototype.diff_cleanupSemanticLossless=function(t){function e(t,e){if(!t||!e)return 6;var n=t.charAt(t.length-1),i=e.charAt(0),r=n.match(diff_match_patch.nonAlphaNumericRegex_),f=i.match(diff_match_patch.nonAlphaNumericRegex_),a=r&&n.match(diff_match_patch.whitespaceRegex_),h=f&&i.match(diff_match_patch.whitespaceRegex_),_=a&&n.match(diff_match_patch.linebreakRegex_),s=h&&i.match(diff_match_patch.linebreakRegex_),c=_&&t.match(diff_match_patch.blanklineEndRegex_),l=s&&e.match(diff_match_patch.blanklineStartRegex_);return c||l?5:_||s?4:r&&!a&&h?3:a||h?2:r||f?1:0}for(var n=1;n<t.length-1;){if(t[n-1][0]==DIFF_EQUAL&&t[n+1][0]==DIFF_EQUAL){var i=t[n-1][1],r=t[n][1],f=t[n+1][1],a=this.diff_commonSuffix(i,r);if(a){var h=r.substring(r.length-a);i=i.substring(0,i.length-a),r=h+r.substring(0,r.length-a),f=h+f}for(var _=i,s=r,c=f,l=e(i,r)+e(r,f);r.charAt(0)===f.charAt(0);){i+=r.charAt(0),r=r.substring(1)+f.charAt(0),f=f.substring(1);var o=e(i,r)+e(r,f);o>=l&&(l=o,_=i,s=r,c=f)}t[n-1][1]!=_&&(_?t[n-1][1]=_:(t.splice(n-1,1),n--),t[n][1]=s,c?t[n+1][1]=c:(t.splice(n+1,1),n--))}n++}},diff_match_patch.nonAlphaNumericRegex_=/[^a-zA-Z0-9]/,diff_match_patch.whitespaceRegex_=/\s/,diff_match_patch.linebreakRegex_=/[\r\n]/,diff_match_patch.blanklineEndRegex_=/\n\r?\n$/,diff_match_patch.blanklineStartRegex_=/^\r?\n\r?\n/,diff_match_patch.prototype.diff_cleanupEfficiency=function(t){for(var e=!1,n=[],i=0,r=null,f=0,a=!1,h=!1,_=!1,s=!1;f<t.length;)t[f][0]==DIFF_EQUAL?(t[f][1].length<this.Diff_EditCost&&(_||s)?(n[i++]=f,a=_,h=s,r=t[f][1]):(i=0,r=null),_=s=!1):(t[f][0]==DIFF_DELETE?s=!0:_=!0,r&&(a&&h&&_&&s||r.length<this.Diff_EditCost/2&&a+h+_+s==3)&&(t.splice(n[i-1],0,[DIFF_DELETE,r]),t[n[i-1]+1][0]=DIFF_INSERT,i--,r=null,a&&h?(_=s=!0,i=0):(i--,f=i>0?n[i-1]:-1,_=s=!1),e=!0)),f++;e&&this.diff_cleanupMerge(t)},diff_match_patch.prototype.diff_cleanupMerge=function(t){t.push([DIFF_EQUAL,""]);for(var e,n=0,i=0,r=0,f="",a="";n<t.length;)switch(t[n][0]){case DIFF_INSERT:r++,a+=t[n][1],n++;break;case DIFF_DELETE:i++,f+=t[n][1],n++;break;case DIFF_EQUAL:i+r>1?(0!==i&&0!==r&&(e=this.diff_commonPrefix(a,f),0!==e&&(n-i-r>0&&t[n-i-r-1][0]==DIFF_EQUAL?t[n-i-r-1][1]+=a.substring(0,e):(t.splice(0,0,[DIFF_EQUAL,a.substring(0,e)]),n++),a=a.substring(e),f=f.substring(e)),e=this.diff_commonSuffix(a,f),0!==e&&(t[n][1]=a.substring(a.length-e)+t[n][1],a=a.substring(0,a.length-e),f=f.substring(0,f.length-e))),0===i?t.splice(n-r,i+r,[DIFF_INSERT,a]):0===r?t.splice(n-i,i+r,[DIFF_DELETE,f]):t.splice(n-i-r,i+r,[DIFF_DELETE,f],[DIFF_INSERT,a]),n=n-i-r+(i?1:0)+(r?1:0)+1):0!==n&&t[n-1][0]==DIFF_EQUAL?(t[n-1][1]+=t[n][1],t.splice(n,1)):n++,r=0,i=0,f="",a=""}""===t[t.length-1][1]&&t.pop();var h=!1;for(n=1;n<t.length-1;)t[n-1][0]==DIFF_EQUAL&&t[n+1][0]==DIFF_EQUAL&&(t[n][1].substring(t[n][1].length-t[n-1][1].length)==t[n-1][1]?(t[n][1]=t[n-1][1]+t[n][1].substring(0,t[n][1].length-t[n-1][1].length),t[n+1][1]=t[n-1][1]+t[n+1][1],t.splice(n-1,1),h=!0):t[n][1].substring(0,t[n+1][1].length)==t[n+1][1]&&(t[n-1][1]+=t[n+1][1],t[n][1]=t[n][1].substring(t[n+1][1].length)+t[n+1][1],t.splice(n+1,1),h=!0)),n++;h&&this.diff_cleanupMerge(t)},diff_match_patch.prototype.diff_xIndex=function(t,e){var n,i=0,r=0,f=0,a=0;for(n=0;n<t.length&&(t[n][0]!==DIFF_INSERT&&(i+=t[n][1].length),t[n][0]!==DIFF_DELETE&&(r+=t[n][1].length),!(i>e));n++)f=i,a=r;return t.length!=n&&t[n][0]===DIFF_DELETE?a:a+(e-f)},diff_match_patch.prototype.diff_prettyHtml=function(t){for(var e=[],n=0;n<t.length;n++){var i=t[n][0],r=t[n][1];switch(i){case DIFF_INSERT:e[n]="<ins>"+r+"</ins>";break;case DIFF_DELETE:e[n]="<del>"+r+"</del>";break;case DIFF_EQUAL:e[n]=r}}return e.join("")},diff_match_patch.prototype.diff_text1=function(t){for(var e=[],n=0;n<t.length;n++)t[n][0]!==DIFF_INSERT&&(e[n]=t[n][1]);return e.join("")},diff_match_patch.prototype.diff_text2=function(t){for(var e=[],n=0;n<t.length;n++)t[n][0]!==DIFF_DELETE&&(e[n]=t[n][1]);return e.join("")},diff_match_patch.prototype.diff_levenshtein=function(t){for(var e=0,n=0,i=0,r=0;r<t.length;r++){var f=t[r][0],a=t[r][1];switch(f){case DIFF_INSERT:n+=a.length;break;case DIFF_DELETE:i+=a.length;break;case DIFF_EQUAL:e+=Math.max(n,i),n=0,i=0}}return e+=Math.max(n,i)},diff_match_patch.prototype.diff_toDelta=function(t){for(var e=[],n=0;n<t.length;n++)switch(t[n][0]){case DIFF_INSERT:e[n]="+"+encodeURI(t[n][1]);break;case DIFF_DELETE:e[n]="-"+t[n][1].length;break;case DIFF_EQUAL:e[n]="="+t[n][1].length}return e.join("	").replace(/%20/g," ")},diff_match_patch.prototype.diff_fromDelta=function(t,e){for(var n=[],i=0,r=0,f=e.split(/\t/g),a=0;a<f.length;a++){var h=f[a].substring(1);switch(f[a].charAt(0)){case"+":try{n[i++]=[DIFF_INSERT,decodeURI(h)]}catch(_){throw new Error("Illegal escape in diff_fromDelta: "+h)}break;case"-":case"=":var s=parseInt(h,10);if(isNaN(s)||0>s)throw new Error("Invalid number in diff_fromDelta: "+h);var c=t.substring(r,r+=s);n[i++]="="==f[a].charAt(0)?[DIFF_EQUAL,c]:[DIFF_DELETE,c];break;default:if(f[a])throw new Error("Invalid diff operation in diff_fromDelta: "+f[a])}}if(r!=t.length)throw new Error("Delta length ("+r+") does not equal source text length ("+t.length+").");return n},this.diff_match_patch=diff_match_patch,this.DIFF_DELETE=DIFF_DELETE,this.DIFF_INSERT=DIFF_INSERT,this.DIFF_EQUAL=DIFF_EQUAL;