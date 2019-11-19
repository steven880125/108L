class user_profile_show_management_page extends ActionHandler
{
    constructor(module,action,position_id)
    {
        super(module,action);
        this.position_id=position_id;
        this.php=false;
    }
    
    showResult()
    {
        var str=`<br>
                <input type='button' value='新增' id="user_profile_insert">&nbsp;
                <input type='button' value='刪除' id="user_profile_delete">&nbsp;
                <input type='button' value='修改' id="user_profile_update">&nbsp;
                <input type='button' value='查詢' id="user_profile_select"><br><br>
                <div id="show_area"></div>`;
        $('#'+this.position_id).html(str);

        this.loadModuleScript(this.module,"show_insert_page");
        this.loadModuleScript(this.module,"show_delete_list");
        this.loadModuleScript(this.module,"show_update_list");
        this.loadModuleScript(this.module,"do_select_action");

        $('#user_profile_insert').on('click',function(){
            (new user_profile_show_insert_page('user_profile','show_insert_page','show_area')).run();
        });
        $('#user_profile_delete').on('click',function(){
            (new user_profile_show_delete_list('user_profile','show_delete_list','show_area')).run();
        });
        $('#user_profile_update').on('click',function(){
            (new user_profile_show_update_list('user_profile','show_update_list','show_area')).run();
        });
        $('#user_profile_select').on('click',function(){
            (new user_profile_do_select_action('user_profile','do_select_action','show_area')).run();
        });
    }
    
}