var Ajax = {
    ajax: null,

    init(){
        //Cache the object
        if (!this.ajax) {
            this.ajax = new XMLHttpRequest();
        }
        return this.ajax;
    },

    get(url, callback){
        var request = this.init();
        request.open("GET", url);
        request.onload = () => {
            var data = request.responseText;
            var json = JSON.parse(data);
            callback(json);
        }
        request.send();
    }
};