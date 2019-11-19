class user_profile_show_insert_page extends ActionHandler
{
    constructor(module,action,position_id)
    {
        super(module,action);
        this.position_id=position_id;
        this.php=false;
    }

    showResult()
    {
        var str=`新增：<br><br>
                 學號：<input type='text' id='id'><br>
                 姓名：<input type='text' id='name'><br>
                 住址：<input typw='text' id='addr'><br>
                 生日：<input type='date' id='birth'><br>
                 <input type='button' id='submit' value='送出'>`;
        $('#'+this.position_id).html(str);
        
        this.loadModuleScript(this.module,"do_insert_action");

        $('#submit').on('click',function(){
            (new user_profile_do_insert_action('user_profile','do_insert_action','show_area')).run();
        });
    }
}