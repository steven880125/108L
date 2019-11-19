class ActionHandler
{
    constructor(module,js_action)
    {
        this.module=module;
        this.js_action=js_action;
        this.php_action=js_action;
        this.args=null;        
    }
    
    run()
    {
        var self=this;
        
        if(!this.php)
        {
            this.showResult();
            return;
        }

        $.ajax(
                {
                    type:"POST",
                    url:"http://fs.mis.kuas.edu.tw/~s1106137143/MVC/server/module_dispatcher.php?module="+self.module+"&action="+self.php_action,
                    data:self.data,
                    
                    success:function(json_str)
                    {
                        self.ajaxSuccess(json_str);
                    },
                    error:function(jqXHR)
                    {
                        self.ajaxError(jqXHR);
                    }
                });
    }
    
    loadScript(src,id)
    {
        var script=$('#'+id);
        
        if(script.length===0)
        {
            script=document.createElement("script");
            script.src=src;
            script.id=id;
            $("head").append(script);
        }
    }

    loadModuleScript(module,action)
    {
        var id=module+"_"+action;
        var src="http://fs.mis.kuas.edu.tw/~s1106137143/MVC/client/modules/"+module+"/"+id+".js";
        this.loadScript(src,id);
    }
    
}