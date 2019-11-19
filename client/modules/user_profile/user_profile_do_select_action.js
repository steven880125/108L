class user_profile_do_select_action extends ActionHandler
{
    constructor(module,action,position_id)
    {
        super(module,action);
        this.position_id=position_id;
        this.php=true;
    }
    
    ajaxSuccess(json_str)
    {
        try
        {
            var obj=JSON.parse(json_str);
            if(obj['status_code']===0)
            {
                var content="<table border=1>\n\
                            <tr><td>&nbsp;學號&nbsp;</td><td>&nbsp;姓名&nbsp;</td><td>&nbsp;生日&nbsp;</td><td>&nbsp;地址&nbsp;</td></tr>";
                var ds=obj['data_set'];
                
                for(var index in ds)
                {
                    content +="<tr><td>&nbsp;"+ds[index]['id']+"&nbsp;</td><td>&nbsp;"+ds[index]['name']+"&nbsp;</td><td>&nbsp;"+ds[index]['birth']+"&nbsp;</td><td>&nbsp;"+ds[index]['addr']+"&nbsp;</td></tr>";
                }
                content +="</table>";
                $("#"+this.position_id).html(content);
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
    
    ajaxError(msg)
    {
        document.getElementById(this.position_id).innerHTML=msg.status;
    }
    
}