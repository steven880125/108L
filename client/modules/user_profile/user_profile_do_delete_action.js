class user_profile_do_delete_action extends ActionHandler
{
    constructor(module,action,position_id)
    {
        super(module,action);
        this.position_id=position_id;
        this.php=true;
        this.data="id="+$('input[name=id]:checked').val();
    }
    
    ajaxSuccess(json_str)
    {
        if(this.data==="id=undefined")
        {
            $("#"+this.position_id).html("請選擇一項做刪除");
        }
        else
        {
            try
            {
                var obj=JSON.parse(json_str);
                if(obj['status_code']===0)
                {
                    $("#"+this.position_id).html(obj['status_message']);
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