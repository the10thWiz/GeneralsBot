Notification.requestPermission();
var notify = {
    icon:'https://cdn.discordapp.com/icons/261627238972129283/00255c253dd9da1cf8c8e0e113aaa350.png',
    tag:'bot',
    onClick:function() {if(!document.hasFocus())window.open("", "").close();},
    focus:function() {if(!document.hasFocus())window.open("", "").close();},
    cur:null,
    curId:0,
    new:function(title, message, tag) {
        if((document.hidden===true || document.msHidden===true || document.webkitHidden===true || !document.hasFocus())) {
            this.cur = new Notification(title, {
                body:message,
                icon:this.icon,
                requireInteraction:true,
                tag:(tag||this.tag),
                
            });
            this.cur.addEventListener('click', this.onClick);
            clearTimeout(this.curId);
            this.curId = window.setTimeout(function() {notify.cur.close();}, 3000);
        }
    },
};
