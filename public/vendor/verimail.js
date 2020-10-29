/*License: MIT. See the LICENSE-file for more information.*/var Comfirm=Comfirm||{};Comfirm.AlphaMail=Comfirm.AlphaMail||{};var Verimail=Comfirm.AlphaMail.Verimail=function(a){this.options={url:"http://jsapi.comfirm.se/verify/v1/",token:null,enforceTld:true,denyTempEmailDomains:false,language:"en",richTextMessages:true,distanceFunction:null};for(key in a){if(a.hasOwnProperty(key)){this.options[key]=a[key]}}this.setLanguage(this.options.language,"en");this.Service={};this.Service.verify=function(a,b){b(Verimail.Status.CorrectSyntax,"It looks OK!")}};Verimail.Status={MxServerDownError:-7,MissingMxRecordsError:-6,DomainError:-5,BlockedError:-4,InvalidPart:-3,SyntaxError:-2,EmptyError:-1,CorrectSyntax:0,Pending:1,EmailExists:2,EmailExistsOnSocialNetworks:3,AcceptAllPolicy:4};Verimail.Language={en:{success:"Email looks OK",typo:"Did you mean <span class='suggestion'>%s</span>?",invalidTld:"Top level domain <span class='tld'>%s</span> does not exist",domainBlocked:"Domain <span class='blocked'>%s</span> is not allowed",invalidFormat:"Email is not correctly formatted",empty:"Email is empty"},sv:{success:"E-postadressen är godkänd",typo:"Menade du <span class='suggestion'>%s</span>?",invalidTld:"Toppdomänen <span class='tld'>%s</span> existerar inte",domainBlocked:"Domänen <span class='domain'>%s</span> är inte tillåten",invalidFormat:"Ogiltig e-postadress",empty:"E-postadressen är tom"}};Verimail.MostCommonEmailDomains={"gmail.com":null,"msn.com":null,"hotmail.com":null,"hotmail.co.uk":null,"yahoo.com":null,"yahoo.co.uk":null,"facebook.com":null,"live.com":null,"mail.com":null,"gmx.com":null,"aol.com":null,"verizon.net":null,"comcast.net":null,"googlemail.com":null,"att.net":null,"mail.com":null,"mac.com":null,"rocketmail.com":null,"ymail.com":null};Verimail.MostCommonTlds={com:null,org:null,edu:null,gov:null,uk:null,net:null,ca:null,de:null,jp:null,fr:null,au:null,us:null,ru:null,ch:null,it:null,nl:null,se:null,dk:null,no:null,es:null,mil:null};Verimail.IANARegisteredTlds={ac:null,ad:null,ae:null,aero:null,af:null,ag:null,ai:null,al:null,am:null,an:null,ao:null,aq:null,ar:null,arpa:null,as:null,asia:null,at:null,au:null,aw:null,ax:null,az:null,ba:null,bb:null,bd:null,be:null,bf:null,bg:null,bh:null,bi:null,biz:null,bj:null,bm:null,bn:null,bo:null,br:null,bs:null,bt:null,bv:null,bw:null,by:null,bz:null,ca:null,cat:null,cc:null,cd:null,cf:null,cg:null,ch:null,ci:null,ck:null,cl:null,cm:null,cn:null,co:null,com:null,coop:null,cr:null,cu:null,cv:null,cw:null,cx:null,cy:null,cz:null,de:null,dj:null,dk:null,dm:null,"do":null,dz:null,ec:null,edu:null,ee:null,eg:null,er:null,es:null,et:null,eu:null,fi:null,fj:null,fk:null,fm:null,fo:null,fr:null,ga:null,gb:null,gd:null,ge:null,gf:null,gg:null,gh:null,gi:null,gl:null,gm:null,gn:null,gov:null,gp:null,gq:null,gr:null,gs:null,gt:null,gu:null,gw:null,gy:null,hk:null,hm:null,hn:null,hr:null,ht:null,hu:null,id:null,ie:null,il:null,im:null,"in":null,info:null,"int":null,io:null,iq:null,ir:null,is:null,it:null,je:null,jm:null,jo:null,jobs:null,jp:null,ke:null,kg:null,kh:null,ki:null,km:null,kn:null,kp:null,kr:null,kw:null,ky:null,kz:null,la:null,lb:null,lc:null,li:null,lk:null,lr:null,ls:null,lt:null,lu:null,lv:null,ly:null,ma:null,mc:null,md:null,me:null,mg:null,mh:null,mil:null,mk:null,ml:null,mm:null,mn:null,mo:null,mobi:null,mp:null,mq:null,mr:null,ms:null,mt:null,mu:null,museum:null,mv:null,mw:null,mx:null,my:null,mz:null,na:null,name:null,nc:null,ne:null,net:null,nf:null,ng:null,ni:null,nl:null,no:null,np:null,nr:null,nu:null,nz:null,om:null,org:null,pa:null,pe:null,pf:null,pg:null,ph:null,pk:null,pl:null,pm:null,pn:null,post:null,pr:null,pro:null,ps:null,pt:null,pw:null,py:null,qa:null,re:null,ro:null,rs:null,ru:null,rw:null,sa:null,sb:null,sc:null,sd:null,se:null,sg:null,sh:null,si:null,sj:null,sk:null,sl:null,sm:null,sn:null,so:null,sr:null,st:null,su:null,sv:null,sx:null,sy:null,sz:null,tc:null,td:null,tel:null,tf:null,tg:null,th:null,tj:null,tk:null,tl:null,tm:null,tn:null,to:null,tp:null,tr:null,travel:null,tt:null,tv:null,tw:null,tz:null,ua:null,ug:null,uk:null,us:null,uy:null,uz:null,va:null,vc:null,ve:null,vg:null,vi:null,vn:null,vu:null,wf:null,ws:null,ye:null,yt:null,za:null,zm:null,zw:null};Verimail.TempEmailDomains={com:{mytrashmail:null,mailmetrash:null,trashymail:null,mailinator:null,mailexpire:null,temporaryinbox:null,rtrtr:null,sharklasers:null,guerrillamailblock:null,guerrillamail:null},net:{guerrillamail:null,tempemail:null},org:{guerrillamail:null,spamfree24:null,jetable:null},fr:{tempomail:null},de:{guerrillamail:null},biz:{guerrillamail:null}};Verimail.getLevenshteinDistance=function(a,b){try{b=!"0"[0]}catch(c){b=true}return function(c,d){if(c==d)return 0;if(!c.length||!d.length)return d.length||c.length;if(b){c=c.split("");d=d.split("")}var e=c.length+1,f=d.length+1,g=0,h=0,i=[[0]],j,k,l;while(++h<f)i[0][h]=h;h=0;while(++h<e){l=k=0;j=c[g];i[h]=[h];while(++k<f){i[h][k]=a(i[g][k]+1,i[h][l]+1,i[g][l]+(j!=d[l]));++l}++g}return i[e-1][f-1]}}(Math.min,false);Verimail.getClosestString=function(a,b,c,d){c=c||.5;var e=Number.MAX_VALUE,f=false;d=d||Verimail.getLevenshteinDistance;if(!(a in b)){for(var g in b){var h=d(a,g);if(h<e&&h/a.length<c){e=h;f=g}}}return f};Verimail.getClosestTld=function(a,b,c){return Verimail.getClosestString(a,Verimail.MostCommonTlds,b,c)};Verimail.getClosestEmailDomain=function(a,b,c){return Verimail.getClosestString(a,Verimail.MostCommonEmailDomains,b,c)};Verimail.testEmailFormat=function(a){return/^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(a)};Verimail.prototype.setLanguage=function(a,b){this.options.language=a&&a in Verimail.Language?a:b};Verimail.prototype.getLanguageText=function(a,b){var c=Verimail.Language[this.options.language][a];if(b){c=c.replace("%s",b)}if(!this.options.richTextMessages){c=Verimail.stripHtml(c)}return c};Verimail.stripHtml=function(a){if(a!=null&&a.indexOf("<")!=-1){if(typeof document!=="undefined"){var b=document.createElement("DIV");b.innerHTML=a;a=b.textContent||b.innerText}else{a=a.replace(/(<([^>]+)>)/ig,"")}}return a};Verimail.getEmailAddressSegments=function(a){var b="local";var c={local:"",domain:"",tld:""};for(var d=0;d<a.length;++d){var e=a.charAt(d);switch(b){case"local":if(e=="@"){b="domain"}else{c.local+=e}break;case"domain":if(e=="."){b="tld"}else{c.domain+=e}break;case"tld":if(e=="."){c.domain+="."+c.tld;c.tld=""}else{c.tld+=e}break}}c.fullDomain=c.domain+"."+c.tld;return c};Verimail.prototype.verify=function(a,b){a=(a||"").toLowerCase();var c=null,d=null,e=null;var f=function(a){return"<span class='correction'>"+a+"</span>"};if(!a||a.length==0||a.replace&&a.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,"").replace(/\s+/g," ").length==0){c=Verimail.Status.EmptyError;d=this.getLanguageText("empty")}else if(!Verimail.testEmailFormat(a)){c=Verimail.Status.SyntaxError;d=this.getLanguageText("invalidFormat")}else{var g=Verimail.getEmailAddressSegments(a);if(this.options.denyTempEmailDomains&&g.tld in Verimail.TempEmailDomains&&g.domain in Verimail.TempEmailDomains[g.tld]){c=Verimail.Status.BlockedError;d=this.getLanguageText("domainBlocked",g.fullDomain)}else{if(this.options.enforceTld){if(!g.tld){c=Verimail.Status.InvalidPart;d=this.getLanguageText("invalidFormat")}else if(!(g.tld in Verimail.IANARegisteredTlds)){c=Verimail.Status.InvalidPart;var h=Verimail.getClosestTld(g.tld,10,this.options.distanceFunction);if(h){var i=Verimail.getClosestEmailDomain(g.domain+"."+h,.25,this.options.distanceFunction);if(i){e=g.local+"@"+i;d=this.getLanguageText("typo",g.local+"@"+f(i))}else{e=g.local+"@"+g.domain+"."+h;d=this.getLanguageText("typo",g.local+"@"+g.domain+"."+f(h))}}else{d=this.getLanguageText("invalidTld",g.tld)}}}}}if(c===null||c==Verimail.SyntaxError){var i=Verimail.getClosestEmailDomain(g.domain+"."+g.tld,.3,this.options.distanceFunction);if(i){c=Verimail.Status.CorrectSyntax;e=g.local+"@"+i;d=this.getLanguageText("typo",g.local+"@"+f(i))}else{c=Verimail.Status.CorrectSyntax;d=d||this.getLanguageText("success")}}b(c,d,e)};