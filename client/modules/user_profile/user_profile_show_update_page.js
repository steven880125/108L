class user_profile_show_update_page extends ActionHandler
{
    constructor(module,action,position_id)
    {
        super(module,action);
        this.position_id=position_id;
        this.php=true;
        this.data="id="+$('input[name=id]:checked').val();
        this.php_action="get_user_by_id";
    }

    ajaxSuccess(json_str)
    {
        if(this.data==="id=undefined")
        {
            $("#"+this.position_id).html("請選擇一項做更改");
        }
        else
        {
            try
            {
                var obj=JSON.parse(json_str);

                if(obj['status_code']===0)
                {
                    var ds=obj['data_set'];
                    var content="姓名：<input type='text' id='name' value="+ds[0]['name']+"><br>\n\
                                 住址：<input type='text' id='addr' value="+ds[0]['addr']+"><br>\n\
                                 生日：<input type='date' id='birth' value="+ds[0]['birth']+"><br>\n\
                                 <input type='button' id='submit' value='送出'>\n\
                                 <input type='hidden' id='id' value="+ds[0]['id']+">";

                    $("#"+this.position_id).html(content);

                    this.loadModuleScript(this.module,"do_update_action");

                    $('#submit').on('click',function(){
                        (new user_profile_do_update_action('user_profile','do_update_action','show_area')).run();
                    });
                }
                else
                {
                    $("#"+this.position_id).html(obj['status_message']);
                }
            }
            catch(e)
            {
                var msg=e+"<br>";
                msg=msg+"JSON String : "+json_str;
                $("#"+this.position_id).html(msg);
            }
        }
        
    }
    
    ajaxError(msg)
    {
        document.getElementById(this.position_id).innerHTML=msg.status;
    }
}