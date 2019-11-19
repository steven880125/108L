class user_profile_show_delete_list extends ActionHandler
{
    constructor(module,action,position_id)
    {
        super(module,action);
        this.position_id=position_id;
        this.php=true;
        this.php_action='do_select_action';
    }

    ajaxSuccess(xhttp)
    {
        xhttp=JSON.parse(xhttp);
        
        if(xhttp['status_code']===0)
        {
            var content="<table border=1>\n\
                        <tr><td></td><td>&nbsp;學號&nbsp;</td><td>&nbsp;姓名&nbsp;</td><td>&nbsp;生日&nbsp;</td><td>&nbsp;地址&nbsp;</td></tr>";
            var ds=xhttp['data_set'];

            for(var index in ds)
            {
                content +="<tr><td><input type='radio' name='id' id='id' value="+ds[index]['id']+"></td><td>&nbsp;"+ds[index]['id']+"&nbsp;</td><td>&nbsp;"+ds[index]['name']+"&nbsp;</td><td>&nbsp;"+ds[index]['birth']+"&nbsp;</td><td>&nbsp;"+ds[index]['addr']+"&nbsp;</td></tr>";
            }
            content +="</table><br><input type='button' id='submit' value='送出'>";
            
            $("#"+this.position_id).html(content);
            
            this.loadModuleScript(this.module,"do_delete_action");
            
            $('#submit').on('click',function(){
                (new user_profile_do_delete_action('user_profile','do_delete_action','show_area')).run();
            });
        
        }
        else
        {
            $("#"+this.position_id).html(xhttp['status_message']);
        }
    }
    catch(e)
    {
        var msg=e+"<br>";
        msg=msg+"JSON String : "+json_str;
        $("#"+this.position_id).html(msg);
    }
    
}
