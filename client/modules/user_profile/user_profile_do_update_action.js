class user_profile_do_update_action extends ActionHandler
{
    constructor(module,action,position_id)
    {
        super(module,action);
        this.position_id=position_id;
        this.php=true;
        
        if($('#id').val()==="" || $('#name').val()==="" || $('#birth').val()==="")
        {
            this.data="id="+""+"&name="+""+"&addr="+""+"&birth="+"";
        }
        else
        {
            this.data="id="+$('#id').val()+"&name="+$('#name').val()+"&addr="+$('#addr').val()+"&birth="+$('#birth').val();
        }

    }

    ajaxSuccess(json_str)
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
    
    ajaxError(msg)
    {
        document.getElementById(this.position_id).innerHTML=msg.status;
    }
    
    
}