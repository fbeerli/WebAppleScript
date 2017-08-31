
var vPathAjax               = "/ajax_template_01.php";
var vPathImg                = "/img/";
var aFileData               = [];
var vEditMode               = false;              // defines edit mode on/off
var vThisApplicationName    = "template_01";
var aCurrentView            = ["view"];
var vCurrentMode            = 'user';
var vSmallSize              = 560;

//var vGlobalSessionId = "Session_Id_Test";
var vMenuWidth              = 300;
var aMonthLong              = [];

var vTest                           = "aber so ein test"


var aLangText = {
    'title':            'Template 01',
    'title.sub.start':  'StartSite',
    'title.sub.info':   'Information',
    'info.info':        'Information',
    'menu.start':       'StartSite', 
    'menu.edit.on':     'EditMode on', 
    'menu.edit.off':    'EditMode off', 
    'menu.root.on':     'RootMode on', 
    'menu.root.off':    'RootMode off', 
    'menu.info':        'Information',
    'menu.test':        'Test'
}





$('document').ready(function(){ start() });


function start(){
    $('#div_main').empty().append( '<div id="div_header"></div><div id="div_content"></div>' ).show();
    createHeader(); 

    //vGlobalCurrentApplication = vThisApplicationName;
    //setGlobalAppLang( vGlobalCurrentLanguage, setMonthLong );
//  set the current month in object oMonth

    $(document).click( function( event ){
        event.stopPropagation();
        $('#div_modal_menu').hide();
    });
    //template_01AjaxFirstTimeOnly();
    //vFaicon = vPathImg + 'black.png'
    //$('#favicon').attr( "href", "" + vPathImg + "black.png" );
}






function template_01KeyboardEventHandler(){
    $(document).unbind().keydown(function(event) {});
    // keyup does not insert a character in edit mode
    $(document).keyup(function(event) {
        event = event || window.event;
        event.stopPropagation();
        // alert ( event.keyCode );

//  =====  BIRTHDAY VIEW  =====  //
        if( aCurrentView[0] == "view" ){
            if( event.keyCode == 27 ) gotoBack();                                   // 27 == ESC
            if( event.keyCode == 37 ) {                                                     // 37 == curosr left
                oTemplate_01.setCurrentMonth( -1 );
                gotoSite( "view" );
            } 
            if( event.keyCode == 39 ) {                                                     // 39 == corsor right
                oTemplate_01.setCurrentMonth( 1 );
                gotoSite( "view" );
            } 
            if( event.keyCode == 65 ) switchAdminMode();                            // 65 == a -> admin mode on/off
            if( event.keyCode == 69 ) switchAdminMode();                            // 69 == e -> edit mode on/off (admin)
            if( event.keyCode == 70 ) gotoSite();                                   // 70 == f -> find
            if( event.keyCode == 72 ) gotoSite( "info" );                           // 72 == h -> help
            if( event.keyCode == 73 ) gotoSite( "info" );                           // 73 == i -> info
            if( event.keyCode == 77 ) createMenu();                                 // 77 == m -> menu
            if( event.keyCode == 78 ) gotoSite( "new" );                   // 78 == n -> new
            if( event.keyCode == 82 ) checkGlobalEventRootEdit();                           // 82 == r -> root mode

//  =====  BIRTHDAY DETAIL  =====  //
        }else if( aCurrentView[0] == "detail" ){
            if( event.keyCode == 27 ) gotoSite( "back" );                           // 27 == ESC
            if( event.keyCode == 65 ) switchAdminMode();                            // 65 == a -> admin/edit mode on/off
            if( event.keyCode == 68 ) template_01CheckPermissionDeleteTemplate_01();                              // 68 == d -> delete
            if( event.keyCode == 69 ) switchAdminMode();                            // 69 == e -> edit/admin mode on/off
            if( event.keyCode == 73 ) gotoSite( "info" );                           // 73 == i -> info
            if( event.keyCode == 78 ) gotoSite( "new" );                   // 78 == n -> new
            if( event.keyCode == 82 ) checkGlobalEventRootEdit();                           // 82 == r -> root mode

//  =====  BIRTHDAY NEW  =====  //
        }else if( aCurrentView[0] == "new" ){
            if( event.keyCode == 27 ) { gotoSite( "back") }                         // 27 == ESC
            if( event.ctrlKey && event.keyCode == 83 ) {                                    // 83 == Ctrl + s
                template_01CheckPermissionInsert();
            }
            if( $('#ipt_template_01').is(':focus') && event.keyCode == 13 ){                   // 13 == enter
                template_01CheckPermissionInsert();
            }
            if( $('#ipt_birthtime').is(':focus') && event.keyCode == 13 ){                  // 13 == enter
                template_01CheckPermissionInsert();  
            }
            if( $('#ipt_prename').is(':focus') && event.keyCode == 13 ){                    // 13 == enter
                template_01CheckPermissionInsert();
            }
            if( $('#ipt_name').is(':focus') && event.keyCode == 13 ){                       // 13 == enter
                template_01CheckPermissionInsert(); 
            }
            if( event.ctrlKey && event.keyCode == 82 ) checkGlobalEventRootEdit();          // 82 == r -> root mode
            if( event.ctrlKey && event.keyCode == 65 ) switchAdminMode();           // 65 == a -> admin mode on/off
            if( event.ctrlKey && event.keyCode == 69 ) switchAdminMode();           // 69 == e -> edit mode on/off (admin)


//  =====  BIRTHDAY EDIT  =====  //
        }else if( aCurrentView[0] == "edit" ){
            if( $('#ipt_template_01').is(':focus') ){
                event.stopPropagation();
                if( event.keyCode == 13 ) template_01CheckPermissionTemplate_01Update();                            // 13 == enter
            }
            if( $('#ipt_birthtime').is(':focus') ){
                event.stopPropagation();
                if( event.keyCode == 13 ) template_01CheckPermissionTemplate_01Update();                            // 13 == enter
            }
            if( $('#ipt_prename').is(':focus') ){
                event.stopPropagation();
                if( event.keyCode == 13 ) template_01CheckPermissionTemplate_01Update();                            // 13 == enter
            }
            if( $('#ipt_name').is(':focus') ){
                event.stopPropagation();
                if( event.keyCode == 13 ) template_01CheckPermissionTemplate_01Update();                            // 13 == enter
            } 
            if( event.keyCode == 27 ) gotoSite( "back" );                             // 27 == ESC
            if( event.ctrlKey && event.keyCode == 82 ) checkGlobalEventRootEdit();            // 82 == r -> root mode
            if( event.ctrlKey && event.keyCode == 65 ) switchAdminMode();             // 65 == a -> admin/edit mode on/off
            if( event.ctrlKey && event.keyCode == 69 ) switchAdminMode();             // 69 == e -> edit/admin mode on/off
            if( event.ctrlKey && event.keyCode == 83 ) template_01CheckPermissionTemplate_01Update();               // 83 == Ctrl + s - save


        //  =====  INFORMATION  =====  //

        }else if( aCurrentView[0] == "info" ){
            if( event.ctrlKey && event.keyCode == 65 ) switchAdminMode();                                       // 65 == a -> admin/edit mode on/off
            if( event.ctrlKey && event.keyCode == 69 ) switchAdminMode();                                       // 69 == e -> edit/admin mode on/off
            if( event.keyCode == 27 ) gotoSite( "back")                                                         // 27 == ESC
            if( event.keyCode == 71 ) $('#global_tbl_info>tbody>tr:nth-child(1)').click();                              // 71 == g -> general   
            if( event.keyCode == 76 ) $('#global_tbl_info>tbody>tr:nth-child(5)').click();                              // 76 == l -> language   
            if( event.keyCode == 77 ) createMenu();                                                             // 77 == m -> menu   
            if( event.keyCode == 82 ) checkGlobalEventRootEdit();                                                       // 82 == r -> root mode
            if( event.keyCode == 83 ) $('#global_tbl_info>tbody>tr:nth-child(3)').click();                              // 83 == s -> shortcut     
            if( event.keyCode == 85 ) $('#global_tbl_info>tbody>tr:nth-child(9)').click();                              // 85 == u -> user     
            if( event.keyCode == 86 ) $('#global_tbl_info>tbody>tr:nth-child(7)').click();                              // 86 == v -> version/report     
        }
    });
}





//  --------------------  MENU  ---------------------  //


function createMenu(){
    $('#div_modal_menu').empty().remove();
    function getMenu(){
        function getList( vLi ){
            if( vLi == "start" )    return '<li id="li_start"><img src="' + vPathImg + 'start.png" />' + aLangText['menu.start'] + '</li>';
            if( vLi == "admin_on" ) return '<li id="li_admin_on"><img src="' + vPathImg + 'edit.png" />' + aLangText['menu.edit.on'] + '</li>';
            if( vLi == "admin_off" )return '<li id="li_admin_off"><img src="' + vPathImg + 'edit.png" />' + aLangText['menu.edit.off'] + '</li>';
            if( vLi == "root_on" )  return '<li id="li_root_on"><img src="' + vPathImg + 'admin.png" />' + aLangText['menu.root.on'] + '</li>';
            if( vLi == "root_off" ) return '<li id="li_root_off"><img src="' + vPathImg + 'admin.png" />' + aLangText['menu.root.off'] + '</li>';
            if( vLi == "info" )     return '<li id="li_info"><img src="' + vPathImg + 'info.png" />' + aLangText['menu.info'] + '</li>';
            if( vLi == "test" )     return '<li id="li_test"><img src="' + vPathImg + 'test.png" />' + aLangText['menu.test'] + '</li>';
        }
        var vContent = '<div id="div_modal_menu" tabindex="1"><div id="div_menu"><ul>';
        if( aCurrentView[0] == "view" ){
            vContent += getList( "start" );
            if( vEditMode ){ vContent += getList( "admin_off" ) }else{ vContent += getList( "admin_on" ) };
            if( vCurrentMode == "root" ){ vContent += getList( "root_off" ) }else{ vContent += getList( "root_on" ) };
            vContent += getList( "info" );
            vContent += getList( "test" );
            //vContent += getList( "test" );
        }else{
            vContent += getList( "start" );
            if( vEditMode ){ vContent += getList( "admin_off" ) }else{ vContent += getList( "admin_on" ) };
            if( vCurrentMode == "root" ){ vContent += getList( "root_off" ) }else{ vContent += getList( "root_on" ) };
            vContent += getList( "info" );
            vContent += getList( "test" );
            //vContent += getList( "test" );
        }
        vContent += '</ul></div></div>';

        $('#div_main').append( vContent ).show();
    }

    if( $( "#div_modal_menu" ).is(":visible") ) {                // if the menu is already visible -> remove it
        $( "#div_modal_menu" ).remove();
        $( "#div_content" ).show();
    }else{
        var vTop  = $("#div_header_right").position().top + $("#div_header_right").outerHeight();
        var vLeft = $("#div_header_right").offset().left + $("#div_header_right").outerWidth() - vMenuWidth;
        getMenu();
        var vWindowWidth = $(window).width();
        var vOffset = $("#div_header_right").offset();
        var vPosition = $("#div_header_right").position();
        if( vWindowWidth > vSmallSize ){
            x = vOffset.left + $("#div_header_right").outerWidth() - vMenuWidth;
            y = vPosition.top + $("#div_header_right").outerHeight() + 10;
            $( "#div_menu" ).css({left:x, top:y});
            $( "#div_menu" ).width(vMenuWidth);
        }else{
            x = 0;
            y = vPosition.top + $("#div_header_right").outerHeight();
            w = $(window).innerWidth();
            $( "#div_menu" ).css({left:x, top:y+10});
            $( "#div_menu" ).width(w);
            $( "#div_modal_menu" ).show();
        }
        expandShrink( "expand", $('#div_menu') );
    }
    //$('#div_modal_menu').focus();

//  EVENTS
    //$( window ).resize(function(){ $( "#div_modal_menu" ).empty().remove(); $('#div_content').show() });

    $('#div_modal_menu').click( function( event ){
        event.stopPropagation();
        expandShrink( "shrink", $('#div_menu') );
    });

    $('#div_modal_menu').keyup( function(event){
        event = event || window.event;
        event.stopPropagation();
        if( event.keyCode == 27 ) expandShrink( "shrink", $('#div_menu') );               // 27 == ESC -> close menu
        if( event.keyCode == 65 ) switchAdminMode();                                    // 65 == a   -> enable Admin mode
        if( event.keyCode == 72 ) globalGoHome();                                               // 72 == h   -> start
        if( event.keyCode == 73 ) gotoSite( "info", 0 );                                // 73 == i   -> information
        if( event.keyCode == 77 ) expandShrink( "shrink", $('#div_menu') );               // 77 == m   -> close menu
        if( event.keyCode == 82 ) checkGlobalEventRootEdit();                                   // 82 == r   -> root mode
        if( event.keyCode == 83 ) gotoBirtdaySite( "view");                            // 83 == s   -> startsite
    });

    //  EVENTS

    $(window).resize(function(){ $("#div_modal_menu").hide(); });

    $('#li_start').click(function(){ gotoSite("view") });
    $('#li_admin_on').click(function(){ vEditMode = true; $('.cls_edit').show(); });
    $('#li_admin_off').click(function(){ vEditMode = false; $('.cls_edit').hide(); });
    $('#li_root_on').click(function(){ checkGlobalEventRootEdit(); });
    $('#li_root_off').click(function(){ checkGlobalEventRootEdit(); }); 
    $('#li_info').click(function(){ gotoSite("info") });
    $('#li_test').click(function(){ gotoSite( "irgendwas_falsches" ); });
}



//  ==========  GOTO  BACK  ==========  //

function gotoBack( vView ){
//  goes one step back in the View
    if( aCurrentView[0] == "view" ){ 
        globalGoHome();
    }else{
        aCurrentView.shift();
        if( aCurrentView.length == 0 ) aCurrentView.unshift("view");                 // last entry always "view"
        gotoSite( aCurrentView[0] );
    }
}




//  ==========  GOTO SITE  ==========  //


function gotoSite( vView ){
    var vFunctionName = "gotoSite(" + vView + ")";  
    if( vView == "view" || vView == "back"){                                   // view
        setCurrentView( "view" )
        createHeader();
        createView();
    }else if( vView == "detail" ){                                             // detail
        setCurrentView( vView )
        createHeader();
        template_01CreateDetail();
    }else if( vView == "new" ){                                                // new
        if( aGlobalPermissionInfo['permission_fk'] > 2 ){
            setCurrentView( vView )
            createHeader();
            template_01CreateNew();
        }else{
            globalShowMessage( [aLangText['template_01.message.permission.edit.template_01'], aGlobalUserInfo['user']] );
        }
    }else if( vView == "edit" ){                                               // edit
        if( aGlobalPermissionInfo['permission_fk'] > 2 ){
            setCurrentView( vView )
            createHeader();
            template_01CreateEdit();
        }else{
            globalShowMessage( [aLangText['template_01.message.permission.edit.template_01'], aGlobalUserInfo['user']] );
        }
    }else if( vView == "info" ){                                                        // info
        //setGlobalAppReport();
        //globalAjaxGetSessionInfo();
        setCurrentView( vView )
        createHeader();
        createInforamtion();
    }else{
        globalShowMessage('Error in application ' + vThisApplicationName + '<br>in function:<br><b>' + vFunctionName + 
            '</b><br>There is no action defined for the passed parameter.<br>Please contact the Administrator.');
    }
    template_01KeyboardEventHandler();

    if(vEditMode) $('.cls_edit').show();
}




//  =====================  CREATE HEADER  ========================




function createHeader(){
    clearAll();
    var vContent = '' +
        '<table>' +
            '<tr>' +
                '<td>' +
                    '<div id="div_header_left">' +
                        '<img id="img_back" src="' + vPathImg + 'back.png" />' +
                        '<img id="img_home" src="' + vPathImg + 'start.png" />' +
                    '</div>' +
                '</td>' +
                '<td><h1 class="cls_root_edit" name="ipt text lang template_01.title 0">' + aLangText['title'] + '</h1></td>' +
                '<td>' +
                    '<div id="div_header_right">' +
                        '<img src="' + vPathImg + 'menu.png" />' +
                    '</div>' +
                '</td>' +
            '</tr>' +
        '</table>'+
        '<table id="tbl_nav">'+
            '<tr>';
    if( aCurrentView[0] == "info" ){
        vContent += ''+
            '<td id="td_month"><h2 class="cls_root_edit" name="ipt text lang info.information 0">' + 
                aLangText['title.sub.info'] + '</h2>' +
            '</td>';
    }else{
        vContent += ''+
            '<td id="td_month"><h2>' + aLangText['title.sub.start'] + '</h2></td>';
    }
    vContent += ''+
            '</tr>'+
        '</table>';
    $('#div_header').empty().append( vContent ).show();

    if( aCurrentView[0] == "view" ){
        $('#img_home').show();$('#img_back').hide();
    }else{
        $('#img_home').hide();$('#img_back').show();
    }

    $("#div_header_left").click(function(){ gotoBack() });
    $("#td_before").click(function(){ oTemplate_01.setCurrentMonth( -1 ); gotoSite( "view" ); });
    $("#td_next").click(function(){ oTemplate_01.setCurrentMonth( 1 ); gotoSite( "view" ); });
    $("#div_header_right").click(function(e){ e.stopPropagation(); createMenu(); });
}







//  =====================  CREATE CONTENT  ========================



function createView(){
    var vContent = '' +
        '<pre>'+
            '<h3 class="cls_root_edit" name="ipt text lang template_01.template_01s 0">' + aLangText['template_01.template_01s'] + '</h3>     ' +
            '<img id="img_add_template_01" class="cls_edit" src="' + vPathImg + '/add.png" alt="add.png" style="width:18px">'+
        '</pre>';
    if( oTemplate_01.vDataMonth.length > 0 ){
        vContent += '' +
        '<table class="cls_tbl_lst_2">' +
            '<tr>' +
                '<th title="' + aLangText['template_01.pk.title'] + '" class="cls_root_edit" name="ipt text lang template_01.pk 0">' 
                    + aLangText['template_01.pk'] + '</th>' +
                '<th title="' + aLangText['template_01.birth.date.title'] + '" class="cls_root_edit" name="ipt text lang template_01.birth.date 0">' 
                    + aLangText['template_01.birth.date'] + '</th>' +
                '<th title="' + aLangText['template_01.prename.title'] + '" class="cls_root_edit" name="ipt text lang template_01.prename 0">' 
                    + aLangText['template_01.prename'] + '</th>' +
                '<th title="' + aLangText['template_01.name.title'] + '" class="cls_root_edit" name="ipt text lang template_01.name 0">' 
                    + aLangText['template_01.name'] + '</th>' +
                '<th title="' + aLangText['template_01.file.title'] + '" class="cls_root_edit" name="ipt text lang template_01.file 0">' 
                    + aLangText['template_01.file'] + '</th>' +
                '<th></th>' +
                '<th></th>' +
            '</tr>' ;
        for( var i = 0; i < oTemplate_01.vDataMonth.length; i++ ){
            vContent += '<tr>'+
                '<td>' + oTemplate_01.vDataMonth[i][0] + '</td>' +
                '<td>' + template_01GetDateToShow( oTemplate_01.vDataMonth[i][1], "short" ) + '</td>' +
                '<td>' + oTemplate_01.vDataMonth[i][5] + '</td>' +
                '<td>' + oTemplate_01.vDataMonth[i][6] + '</td>' +
                '<td>' + oTemplate_01.vDataMonth[i][8] + '</td>' +
                '<td title="Geburtstag löschen">&nbsp;' +
                    '<img class="cls_edit" src="' + vPathImg + 'delete.png" style="width:16px"></img></td>' +
                '<td title="Geburtstag ändern">&nbsp;' +
                    '<img class="cls_edit" src="' + vPathImg + 'edit.png" style="width:16px;"></img></td>' +
            '</tr>';
        }
    }else{
        vContent += '<p>Keine Daten</p>';
    }
    vContent += '</table>';
    $( '#div_content' ).empty().append( vContent ).show();
    if( vEditMode ) $('.cls_edit').show();

    //  EVENT
    $( "#img_add_template_01").click(function(){ gotoSite( "new" ) });

    $(".cls_tbl_lst_2 th").click( function(){
        vColumn = $( this ).index();
        if( vColumn < 4 ){                                      // click in table header
            if( vColumn == 2) vColumn = 5;
            if( vColumn == 3) vColumn = 6;
            if( vColumn == 4) vColumn = 8;
            oTemplate_01.sortTemplate_01DataMonth( vColumn );
            createView();
        };
    });
    $(".cls_tbl_lst_2 td").click( function(){
        vRow = $( this ).parent().index();
        vColumn = $( this ).index();
        //alert( "row: " + vRow + "\ncolumn: " + vColumn );
        if( vRow > 0 && vColumn < 5 ){                           // click in table content
            oTemplate_01.vCurrentMonthRow = vRow -1;
            //alert( "PK: " + oTemplate_01.vDataMonth[oTemplate_01.vCurrentMonthRow][0] );
            gotoSite( "detail" );
        }else if( vRow > 0 && vColumn == 5 ){                    // click on image delete
            oTemplate_01.vCurrentMonthRow = vRow -1;
            template_01CheckPermissionDeleteTemplate_01();
        }else if( vRow > 0 && vColumn == 6 ){                    // click on image edit
            oTemplate_01.vCurrentMonthRow = vRow -1;
            gotoSite( "edit" );
        }
    });
}

function template_01CreateNew(){                   // NEW
    var vContent = '<pre><h3 class="cls_root_edit" name="ipt text lang template_01.create.new 0">' + aLangText['template_01.create.new'] + '</h3></pre>'+
        '<table class="cls_tbl_input">' +
            '<tr>' +
                '<td class="cls_root_edit" name="ipt text lang template_01.template_01 0">' + aLangText['template_01.template_01'] + '</td>' +
                '<td><input id="ipt_template_01" type="text" placeholder="tt.mm.jjjj"></td>' +
            '</tr>' +
            '<tr>' +
                '<td class="cls_root_edit" name="ipt text lang template_01.birth.time 0">' + aLangText['template_01.birth.time'] + '</td>' +
                '<td><input id="ipt_birthtime" type="text" placeholder="hh:mm:ss"></td>'+
            '</tr>' +
            '<tr>' +
                '<td class="cls_root_edit" name="ipt text lang template_01.prename 0">' + aLangText['template_01.prename'] + '</td>' +
                '<td><input id="ipt_prename" type="text"></td>' +
            '</tr>' +
            '<tr>' +
                '<td class="cls_root_edit" name="ipt text lang template_01.name 0">' + aLangText['template_01.name'] + '</td>' +
                '<td><input id="ipt_name" type="text"></td>' +
            '</tr>' +
            '<tr>' +
                '<td class="cls_root_edit" name="ipt text lang template_01.description 0">' + aLangText['template_01.description'] + '</td>' +
                '<td><textarea id="ta_remark"></textarea></td>' +
            '</tr>' +
            '<tr>' +
                '<td><button id="btn_cancel" class="cls_pointer" class="cls_root_edit" name="ipt text lang template_01.cancel 0">' +
                    aLangText['template_01.cancel'] + '</button></td>' +
                '<td><button id="btn_insert_template_01" class="cls_pointer" class="cls_root_edit" name="ipt text lang template_01.save 0">' +
                    aLangText['template_01.save'] + '</button></td>' +
            '</tr>' +
        '</table><br>';
    $("#div_content").empty().append( vContent ).show();

    $("#btn_cancel").click(function(){ gotoSite( "back" ), $('#ipt_fileselect').remove() });
    $("#btn_insert_template_01").click(function(){ template_01CheckPermissionInsert() });
    $("#ipt_template_01").focus().select();
}

function template_01CreateDetail(){                                            // FILE and DETAIL
    var vIdx = oTemplate_01.vCurrentMonthRow;
    //var vImagePreview = new Array(); var vImagePreviewCounter = 0;
    var vGebTime = "unbekannt";
    if( oTemplate_01.vDataMonth[vIdx][2] > 0 ){
        vGebTime = template_01GetTimeToShow( oTemplate_01.vDataMonth[vIdx][2] );
    }
    var vContent = 
        '<pre>'+
            '<h3 class="cls_root_edit" name="ipt text lang template_01.detail 0">' + aLangText['template_01.detail'] + '</h3>' +
            '<img id="img_edt_birtday" class="cls_edit" src="' + vPathImg + 'edit.png" style="margin-left:1.6em;padding:0;width:16px" />'+
            '<img id="img_add_birtday" class="cls_edit" src="' + vPathImg + 'add.png" style="margin-left:1.6em;padding:0;width:16px" />'+
            '<img id="img_del_birtday" class="cls_edit" src="' + vPathImg + 'delete.png" style="margin-left:1.6em;padding:0;width:16px" />'+
        '</pre>'+
        '<table class="cls_tbl_shw">' +
            '<tr>' +
                '<td class="cls_root_edit" name="ipt text lang template_01.pk 0">' + aLangText['template_01.pk'] + '</td>' +
                '<td id="td_pk">' + oTemplate_01.vDataMonth[vIdx][0] + '</td>' +
            '</tr>' +
            '<tr>' +
                '<td class="cls_root_edit" name="ipt text lang template_01.template_01 0">' + aLangText['template_01.template_01'] + '</td>' +
                '<td>' + template_01GetDateToShow( oTemplate_01.vDataMonth[vIdx][1], "short" ) + '</td>' +
            '</tr>' +
            '<tr>' +
                '<td class="cls_root_edit" name="ipt text lang template_01.birth.time 0">' + aLangText['template_01.birth.time'] + '</td>' +
                '<td>' + vGebTime + '</td>' +
            '</tr>';
        if( oTemplate_01.vDataMonth[vIdx][3] > 0 ){
            vContent += ''+
            '<tr>' +
                '<td class="cls_root_edit" name="ipt text lang template_01.dead.day 0">' + aLangText['template_01.dead.date'] + '</td>' +
                '<td>' + template_01GetDateToShow( oTemplate_01.vDataMonth[vIdx][3], "short" )+ '</td>' +
            '</tr>'+
            '<tr>' +
                '<td class="cls_root_edit" name="ipt text lang template_01.dead.time 0">' + aLangText['template_01.dead.time'] + '</td>' +
                '<td>' + template_01GetDateToShow( oTemplate_01.vDataMonth[vIdx][4] )+ '</td>' +
            '</tr>';
        }; vContent += ''+
            '<tr>' +
                '<td class="cls_root_edit" name="ipt text lang template_01.prename 0">' + aLangText['template_01.prename'] + '</td>' +
                '<td>' + oTemplate_01.vDataMonth[vIdx][5] + '</td>' +
            '</tr>' +
            '<tr>' +
                '<td class="cls_root_edit" name="ipt text lang template_01.name 0">' + aLangText['template_01.name'] + '</td>' +
                '<td>' + oTemplate_01.vDataMonth[vIdx][6] + '</td>' +
            '</tr>' +
            '<tr>' +
                '<td class="cls_root_edit" name="ipt text lang template_01.description 0">' + aLangText['template_01.description'] + '</td>' +
                //'<td>' + oTemplate_01.vDataMonth[vIdx][7].replace(/<br>/g,"\n") + '</td></tr>' +
                '<td>' + globalGetBrForNewLine( oTemplate_01.vDataMonth[vIdx][7] ) + '</td></tr>' +
        '</table><br>'+
        '<pre><h3 class="cls_root_edit" name="ipt text lang template_01.birth.file 0"> ' + aLangText['template_01.file']  +
            '<img src="'+vPathImg+'add.png" id="img_add_file" class="cls_edit" style="margin-left:1em;width:16px" /></h3>'+
        '</pre>';
    if( oTemplate_01.vDataMonth[vIdx][8] > 0){
        vContent += '<table id="tbl_fil_lst"></table><br>';
        template_01AjaxGetFileData( template_01CreateFileList );
    }else{
        vContent += '<p>keine Dateien vorhanden</p><br><br>';
    }
    $("#div_content").empty().append( vContent ).show();

//  EVENT
    $('#img_edt_birtday').click( function(){ gotoSite( "edit" )} );
    $('#img_add_birtday').click( function(){ gotoSite( "new" )} );
    $('#img_del_birtday').click( function(){ template_01CheckPermissionDeleteTemplate_01(); });
    $('#img_add_file').click( function(){ template_01CheckPermissionFileSelect() } );
}

function template_01CreateFileList(){                      // FILE LIST
    var vContent =
        '<tr>' +
            '<th class="cls_root_edit" name="ipt text lang template_01.pk 0">' + aLangText['template_01.pk'] + '</th>' +
            '<th class="cls_root_edit" name="ipt text lang template_01.file 0">' + aLangText['template_01.file'] + '</th>' +
            '<th class="cls_root_edit" name="ipt text lang template_01.size 0">' + aLangText['template_01.size'] + '</th>' +
            '<th class="cls_root_edit" name="ipt text lang template_01.type 0">' + aLangText['template_01.type'] + '</th>' +
            '<th class="cls_root_edit" name="ipt text lang template_01.date 0">' + aLangText['template_01.date'] + '</th>' +
            '<th></th>' +
        '</th>';
    for( var i = 0; i < oFile.vFile.length; i++ ){
        vContent +=
            '<tr>' +
                '<td>' + oFile.vFile[i].vFilePk + '</td>' +
                '<td><a href="' + vPathAjax + '?session_id=' + vGlobalSessionId +
                        '&action=download_file&' +
                        'filename=' + oFile.vFile[i].vFilePk + '.' + oFile.vFile[i].vExtension + '&' +
                        'filename_orig=' + oFile.vFile[i].vName + '">' +
                        oFile.vFile[i].vName + '</a></td>' +
                '<td>' + template_01GetSizeFormat( oFile.vFile[i].vSize ) + '</td>' +
                '<td>' + oFile.vFile[i].vType + '</td>' +
                '<td>' + template_01GetDateTimeToShow( oFile.vFile[i].vLastmodified/1000 ) + '</td>' +
                '<td><img class="cls_edit" src="' + vPathImg + 'delete.png" width="16px"/></td>' +
            '</tr>';
    }
    $('#tbl_fil_lst').empty().append( vContent ).append('<br>').show();
    //if( vEditMode ) $('.cls_edit').show();

//  EVENT
    $("#tbl_fil_lst td").click( function(){
        vRow = $( this ).parent().index();
        vColumn = $( this ).index();
        //        alert( "row: " + vRow + "\ncolumn: " + vColumn );
        //            oFile.vCurFilePos = vRow -1;
        //alert( oFile.vFile[oFile.vCurFilePos].vFilePk );
        if( vRow > 0 && vColumn == 5 ){                    // click on image delete
            oFile.vCurFilePos = vRow -1;
            template_01AjaxDeleteFile( vRow - 1 );
        }
    });
}



function template_01CreateEdit(){                                  // EDIT
    var vIdx   = oTemplate_01.vCurrentMonthRow;
    v  = template_01GetDateToShow( oTemplate_01.vDataMonth[vIdx][1], "dd.mm.yyyy" );
    vBirthtime = template_01GetTimeToShow( oTemplate_01.vDataMonth[vIdx][2] );
    vPrename   = oTemplate_01.vDataMonth[vIdx][5] ;
    vName      = oTemplate_01.vDataMonth[vIdx][6] ;
    vRemark    = oTemplate_01.vDataMonth[vIdx][7] ;
    var vContent = '<pre><h3 class="cls_root_edit" name="ipt text lang template_01.edit 0">' + aLangText['template_01.edit'] + '</h3></pre>' +
        '<table class="cls_tbl_input">' +
            '<tr>' +
                '<td class="cls_root_edit" name="ipt text lang template_01.pk 0">' + aLangText['template_01.pk'] + '</td>' +
                '<td id="td_pk">' + oTemplate_01.vDataMonth[vIdx][0] + '</td>' + 
            '</tr>' +
            '<tr>' +
                '<td class="cls_root_edit" name="ipt text lang template_01.birth.date 0">' + aLangText['template_01.birth.date'] + '</td>' +
                '<td><input id="ipt_template_01" type="text" value="' + v + '"></td>' + 
            '</tr>' +
            '<tr>' +
                '<td class="cls_root_edit" name="ipt text lang template_01.birth.time 0">' + aLangText['template_01.birth.time'] + '</td>' +
                '<td><input id="ipt_birthtime" type="text" value="' + vBirthtime + '"></td>' +
            '</tr>' +
            '<tr>' +
                '<td class="cls_root_edit" name="ipt text lang template_01.prename 0">' + aLangText['template_01.prename'] + '</td>' +
                '<td><input id="ipt_prename" type="text" value="' + vPrename + '"></td>' +
            '</tr>' +
            '<tr>' +
                '<td class="cls_root_edit" name="ipt text lang template_01.name 0">' + aLangText['template_01.name'] + '</td>' +
                '<td><input id="ipt_name" type="text" value="' + vName + '"></td>' +
            '</tr>' +
            '<tr>' +
                '<td class="cls_root_edit" name="ipt text lang template_01.description 0">' + aLangText['template_01.description'] + '</td>' +
                '<td><textarea id="ta_remark">' + vRemark + '</textarea></td>' +
            '</tr>' +
            '<tr><td class="cls_td_empty"></td><td></td></tr>' +
            '<tr>' +
                '<td><button id="btn_cancel" class="cls_pointer">' + aLangText['kernel.button.cancel'] + '</button></td>' +
                '<td><button id="btn_update_template_01" class="cls_pointer">' + aLangText['kernel.button.save'] + '</button></td>' +
            '</tr>' +
        '</table><br>';
    
    $("#div_content").empty().append( vContent ).show();
    $("#ipt_template_01").focus().select();

//  EVENT
    $("#btn_cancel").click(function(){ gotoSite( "back" ) });
    $("#btn_update_template_01").click(function(){ template_01CheckPermissionTemplate_01Update() });

}





//  -------  INFORMATION  -------  //

function createInforamtion(){
    var vContent = '<br>' +
    '<table id="global_tbl_info">' +
        '<tr>' +
            '<td>' +
                '<img src="' + vPathImg + 'arrow_right.png">' +
                '<img src="' + vPathImg + 'arrow_down.png">' +
            '</td>' +
            '<td>' +
                '<h3 class="cls_root_edit" name="ipt text lang kernel.info.general 0">' + aLangText["kernel.info.general"] + '</h3>' +
            '</td>' +
        '</tr>' +
        '<tr>' +
            '<td></td>'+
            '<td>'+
                '<div class="cls_root_edit" name="ta text lang template_01.info.general.text 0">' + aLangText["template_01.info.general.text"] +
                '</div>' +
            '</td>' +
        '</tr>'+
        '<tr>' +
            '<td>' +
                '<img src="' + vPathImg + 'arrow_right.png">' +
                '<img src="' + vPathImg + 'arrow_down.png">' +
            '</td>'+
            '<td>' +
                '<h3 class="cls_root_edit" name="ipt text lang kernel.info.shortcut 0">' + aLangText["kernel.info.shortcut"] + '</h3>' +
            '</td>' +
        '</tr>'+
        '<tr>'+
            '<td></td>'+
            '<td><div>' +
                '<table id="global_info_tbl_shortcut" class="cls_root_edit" name="ta text lang template_01.info.shortcut.text 0">' +
                    aLangText["template_01.info.shortcut.text"] + '</table>' +
                '</div>' +
            '</td>' +
        '</tr>' +
        '<tr>' +
            '<td>' +
                '<img src="' + vPathImg + 'arrow_right.png">' +
                '<img src="' + vPathImg + 'arrow_down.png">' +
            '</td>'+
            '<td>' +
                '<h3 class="cls_root_edit" name="ipt text lang kernel.info.language 0">' + aLangText['kernel.info.language'] + '</h3>'+
            '</td>' +
        '</tr>'+
        '<tr>'+
            '<td></td><td>' +
                '<div id="global_info_div_language">' +                        // LANGUAGE
                '</div>' +
            '</td>' +
        '</tr>' +
        '<tr>' +
            '<td>' +
                '<img src="' + vPathImg + 'arrow_right.png">' +
                '<img src="' + vPathImg + 'arrow_down.png">' +
            '</td>'+
            '<td>' +
                '<h3 class="cls_root_edit" name="ipt text lang kernel.info.version 0">' + aLangText["kernel.info.version"] + '</h3>' +
            '</td>' +
        '</tr>'+
        '<tr>'+
            '<td></td>'+
            '<td>' +
                '<div id="global_info_div_report">' +
                '</div>' +
            '</td>' +
        '</tr>' +
            '<tr>' +
                '<td>' +
                    '<img src="' + vPathImg + 'arrow_right.png">' +
                    '<img src="' + vPathImg + 'arrow_down.png">' +
                '</td>'+
                '<td>' +
                    '<h3 class="cls_root_edit" name="ipt text lang kernel.info.user 0">' + aLangText
["kernel.info.user"] + '</h3>' +
                '</td>' +
            '</tr>'+
            '<tr>'+
                '<td></td>'+
                '<td>' +
                    '<div id="global_info_div_user"></div>' +
                '</td>' +
            '</tr>' +
        '</table><br><br>' +
        '<button id="btn_close_info" name="ipt text lang kernel.button.close 0">' + 
            aMyAppLangTex['kernel.button.close'] + '</button><br><br>';
    $('#div_content').empty().append( vContent ).show();
    $('#div_content').addClass('global_div_info');
    globalCreateTableReport();
    globalCreateTableUserInfo();
    template_01CreateInfoLanguage();

    $('#btn_close_info').click(function(){ gotoBack(); });
    $('#global_tbl_info>tbody>tr:nth-child(odd)').click( function(event){                  // expand or shrink
        event.stopPropagation();
        vTrIdx = $( this ).index();
        if( $('#global_tbl_info>tbody>tr').eq( vTrIdx + 1).find('div').is(':visible') ){
            $('#global_tbl_info>tbody>tr').eq( vTrIdx + 1).show();
            expandShrink( "shrink", $('#global_tbl_info>tbody>tr').eq( vTrIdx + 1).find('div') );
            $('#global_tbl_info>tbody>tr').eq( vTrIdx).find('img:nth-child(1)').show();
            $('#global_tbl_info>tbody>tr').eq( vTrIdx).find('img:nth-child(2)').hide();
        }else{
            $('#global_tbl_info>tbody>tr').eq( vTrIdx + 1).show();
            expandShrink( "expand", $('#global_tbl_info>tbody>tr').eq( vTrIdx + 1).find('div') );
            $('#global_tbl_info>tbody>tr').eq( vTrIdx).find('img:nth-child(1)').hide();
            $('#global_tbl_info>tbody>tr').eq( vTrIdx).find('img:nth-child(2)').show();
        }
    });
    $('#global_tbl_info>tbody>tr:nth-child(odd)').mousedown( function(event){ event.preventDefault(); });  // prevent word selection

    $('#btn_en').click(function(){                                              // LANGUAGE
        if( vGlobalCurrentLanguage != "en" ){
            //setGlobalAppLang('en', [gotoSite, aCurrentView[0] ] );
            setGlobalAppLang( 'en', setMonthLong );
        }
    });
    $('#btn_ge').click(function(){
        if( vGlobalCurrentLanguage != "ge" ){
            //setGlobalAppLang('ge', [gotoSite, aCurrentView[0] ] );
            setGlobalAppLang( 'ge', setMonthLong );
        }
    });
    if( vCurrentMode == "root" ) setGlobalEventRootEditable();

}


function template_01CreateInfoLanguage(){                      // LANGUAGE
    var vContent =
        '<button id="btn_en" class="cls_info_language"><img src="' + vPathImg + 'flag_greatbritain.png"/>' +
            aMyAppLangTex['kernel.info.lang.english'];
            if( vGlobalCurrentLanguage == "en") vContent += '<img id="img_ok" src="' + vPathImg + 'ok.png"/>';
            vContent +='</button>' +
        '<button id="btn_ge" class="cls_info_language"><img src="' + vPathImg + 'flag_germany.png"/>' +
            aMyAppLangTex['kernel.info.lang.german'];
            if( vGlobalCurrentLanguage == "ge") vContent += '<img id="img_ok" src="' + vPathImg + 'ok.png"/>';
            vContent +='</button>' +
        '</button>' +
    $('#global_info_div_language').empty().append(vContent);

//  EVENT
    $('#btn_en').unbind().click(function(){                                              // LANGUAGE
        if( vGlobalCurrentLanguage != "en" ){
            //setGlobalAppLang( 'en' );
            setGlobalAppLang( 'en', setMonthLong );
        }
    });
    $('#btn_ge').unbind().click(function(){
        if( vGlobalCurrentLanguage != "ge" ){
            //setGlobalAppLang( 'ge' );
            setGlobalAppLang( 'ge', setMonthLong );
        }
    });
}




//  =====  AJAX  =====  //

//  =====  AJAX  =====  //

//  =====  AJAX  =====  //





function template_01AjaxFirstTimeOnly(){
    var vFunctionName = "template_01AjaxFirstTimeOnly";
    $('.cls_pointer').addClass('cls_wait');
    $('#div_main').css('cursor','wait');
    $.post( vPathAjax, {
        action:"check_data_available", 
        session_id: vGlobalSessionId
    }, 
        function( data ) {
            vError = data.error;
        }
    ).done(function( data ){
        $('#div_main').css('cursor','default');
        $('.cls_pointer').removeClass('cls_wait');
        if( vError ){
            template_01AjaxError(vFunctionName, vError);
        }else{
            template_01AjaxGetTemplate_01Data( gotoSite, "view" );
        }
    }).fail(function( msg ){
        template_01AjaxFailMessage(vFunctionName,msg);
    });
}



//  ==============   BIRTHDAY DATA    ==================



function template_01AjaxGetTemplate_01Data( vCallBack, vValue ){
    vFunctionName = "template_01AjaxGetTemplate_01Data";
    $('.cls_pointer').addClass('cls_wait');
    $('#div_main').css('cursor','wait');
    $.post( vPathAjax, {
        action:"get_all", 
        session_id:vGlobalSessionId }, 
        function( data ) {
            vError = data.error;
        }
    ).done(function( data ){
        $('#div_main').css('cursor','default');
        $('.cls_pointer').removeClass('cls_wait');
        if( vError ){
            template_01AjaxError(vFunctionName, vError);
        }else{
            oTemplate_01.setData( data.template_01 );
            vCallBack( vValue );
        }
    }).fail(function( msg ){
        template_01AjaxFailMessage(vFunctionName,msg);
    });
}

function template_01CheckPermissionInsert(){
    var vCheck  = template_01CheckTemplate_01Date( $('#ipt_template_01').val() );
    if( vCheck != 0 ){
        template_01AjaxInsertTemplate_01();
    }else if( vCheck == 0 ){
        globalShowMessage( aLangText['template_01.message.date.format'] );
    }
}
function template_01AjaxInsertTemplate_01(){                  // inserts the template_01-data and after that the file will be uploaded
    vFunctionName  = "template_01AjaxInsertTemplate_01";
    var v  = template_01CheckTemplate_01Date( $('#ipt_template_01').val() );
    var vBirthtime = template_01GetTime( $('#ipt_birthtime').val() );
    var vPrename   = $('#ipt_prename').val();
    var vName      = $('#ipt_name').val();
    var vRemark    = $('#ta_remark').val();
    $(".cls_pointer").addClass('cls_wait');
    $('#div_main').css('cursor','wait');
    $.post( vPathAjax, {
        action:"insert_template_01",
        session_id:vGlobalSessionId,
        template_01:v,
        birthtime:vBirthtime,
        prename:vPrename,
        name:vName,
        remark:vRemark
    }, function( data ) {
        vError = data.error;
    }).done(function( data ){
        $('#div_main').css('cursor','default');
        $(".cls_pointer").removeClass('cls_wait');
        if( vError ){
            template_01AjaxError(vFunctionName, vError);
        }else{
            oTemplate_01.setData( data.template_01 );
            gotoSite( "view" );
            //var vLastTemplate_01Pk = data.last_id;
            //template_01FileUpload( vLastTemplate_01Pk );
        }
    }).fail(function( msg ){
        template_01AjaxFailMessage(vFunctionName,msg);
    });
}

function template_01CheckPermissionTemplate_01Update(){
    var vCheck  = template_01CheckTemplate_01Date( $('#ipt_template_01').val() );
    if( vCheck != 0 ){
        template_01AjaxUpdateTemplate_01();
    }else{
        globalShowMessage( aLangText['template_01.message.date.format'] );
    }
}
function template_01AjaxUpdateTemplate_01(){
    vFunctionName = "template_01AjaxUpdateTemplate_01";
    var vPk = $('#td_pk').text();
    var v   = template_01CheckTemplate_01Date( $("#ipt_template_01").val() );
    var vBirthtime  = template_01GetTime( $("#ipt_birthtime").val() );
    var vPrename    = $("#ipt_prename").val();
    var vName       = $("#ipt_name").val();
    var vRemark     = $("#ta_remark").val();
    $(".cls_pointer").addClass('cls_wait');
    $('#div_main').css('cursor','wait');
    $.post( vPathAjax, {
        action:"update_template_01",
        session_id:vGlobalSessionId,
        pk:vPk,
        template_01:v,
        birthtime:vBirthtime,
        prename:vPrename,
        name:vName,
        remark:vRemark
    }, function( data ) {
        vError = data.error;
    }).done(function( data ){
        $('#div_main').css('cursor','default');
        $(".cls_pointer").removeClass('cls_wait');
        if( vError ){
            template_01AjaxError(vFunctionName, vError);
        }else{
            oTemplate_01.setData( data.template_01 );
            var vLastTemplate_01Pk = data.last_id;
            gotoSite( "detail" );
        }
    }).fail(function( msg ){
        template_01AjaxFailMessage(vFunctionName,msg);
    });
}

function template_01CheckPermissionDeleteTemplate_01(){           // DELETE
    if( aGlobalPermissionInfo['permission_fk'] > 2 ){
        var vPk = oTemplate_01.vDataMonth[oTemplate_01.vCurrentMonthRow][0];
        var vMsg = aLangText['template_01.message.delete.template_01'].replace( '$1', vPk );
        globalShowConfirm( vMsg, [template_01AjaxDeleteTemplate_01, vPk], "YesNo" );
    }else{
        globalShowMessage( [aLangText['template_01.message.permission.delete.template_01'], aGlobalUserInfo['user']] );
    }
}
function template_01AjaxDeleteTemplate_01( vPk ){
    vFunctionName = "template_01AjaxDeleteTemplate_01";
    //var vPk = oTemplate_01.vDataMonth[vIdxTemplate_01Month][0];
    //var vPk = oTemplate_01.vDataMonth[oTemplate_01.vCurrentMonthRow][0];
    $(".cls_pointer").addClass('cls_wait');
    $('#div_main').css('cursor','wait');
    $.post( vPathAjax, {
        action:"delete_template_01",
        session_id:vGlobalSessionId,
        pk:vPk }, 
        function( data ) {
        vError = data.error;
    }).done(function( data ){
        $('#div_main').css('cursor','default');
        $(".cls_pointer").removeClass('cls_wait');
        if( vError ){
            template_01AjaxError(vFunctionName, vError);
        }else{
            oTemplate_01.setData( data.template_01 );
            createView();
        }
    }).fail(function( msg ){
        template_01AjaxFailMessage(vFunctionName,msg);
    });
}

function template_01AjaxDeleteFile(){
    vFunctionName = "template_01AjaxDeleteFile";
    //var vFilePk = oPreview.vImagePreview[oPreview.vCurrentPreviewPosition].vFilePk;
    var vFilePk = oFile.vFile[oFile.vCurFilePos].vFilePk;
    var vPk = oTemplate_01.vDataMonth[oTemplate_01.vCurrentMonthRow][0];
    if( confirm("Möchten Sie die Datei mit dem PK " + vFilePk + " wirklich löschen?") ){
        $(".cls_pointer").addClass('cls_wait');
        $('#div_main').css('cursor','wait');
        $.post( vPathAjax, {
            action:"delete_file",
            session_id:vGlobalSessionId,
            pk:vPk,
            file_pk:vFilePk }, 
            function( data ) {
            vError = data.error;
        }).done(function( data ){
            $('#div_main').css('cursor','default');
            $(".cls_pointer").removeClass('cls_wait');
            if( vError ){
                template_01AjaxError(vFunctionName, vError);
            }else{
                oFile.addFile( data.file_data );
                template_01CreateDetail();
            }
        }).fail(function( msg ){
            template_01AjaxFailMessage(vFunctionName,msg);
        });
    }
}
function template_01AjaxGetFile(){             // not used at the moment
    vFunctionName = "template_01AjaxGetFile";
    var vFilePk = oPreview.vImagePreview[oPreview.vCurrentPreviewPosition].vFilePk;
    var vFileName = oPreview.vImagePreview[oPreview.vCurrentPreviewPosition].vName;
    var vFile = vFilePk + "_" + vFileName;
    $.get( vPathAjax, {
        action:"download_file",
        session_id:vGlobalSessionId,
        filename:vFile
    }); 
}

function template_01FileUpload( vLastTemplate_01Pk ){
    var vPk = oTemplate_01.vDataMonth[oTemplate_01.vCurrentMonthRow][0];
    if( document.getElementById('ipt_fileselect') ){
        vFile = document.getElementById('ipt_fileselect').files;
        if( vFile ){
            for (var i= 0, f; file= vFile[i]; i++){
                //var vProgressBar = $('#prg_file_upload'+i);
                //var vResult = $('#td_upload_result'+i);
                template_01XhrFileUpload( vPk, file );
            }
        }
    }
    $("#ipt_fileselect").remove();              // clear/empty the file select dialog
    template_01AjaxGetTemplate_01Data( gotoSite, "detail" );
}
function template_01XhrFileUpload( vPk, file ){
    //$('prg_file_upload'+1).show();
    var formData = new FormData();
    formData.append("session_id", vGlobalSessionId);
    formData.append("action", "upload_file");
    formData.append("pk", vPk);
    formData.append("file", file);
    formData.append("filename", file.name);
    formData.append("filetype", file.type);
    formData.append("filesize", file.size);
    formData.append("lastmodified", file.lastModified);
    var xhr = new XMLHttpRequest();

    // progress bar
    xhr.upload.addEventListener("progress", function(e){
        if( e.lengthComputable ){
            var vPercent = Math.round(e.loaded / e.total * 100);
            //console.log( "percent: " + vPercent );
            //vProgressBar.attr("value", vPercent );
        }
    },false);
    // load
    xhr.upload.addEventListener("load", function(e){
        //vResult.text("upload successful");
    },false);
    // loaded
    xhr.upload.addEventListener("loaded", function(e){
        //vResult.text("upload finished");
    },false);
    // error
    xhr.upload.addEventListener("error", function(e){
        //vResult.text("error in upload");
    },false);
    // abort
    xhr.upload.addEventListener("abort", function(e){
        //vResult.text("upload canceled");
    },false);

    // file receive or failed
    xhr.onreadystatechange = function(e){
        if(xhr.readyState == 4 ){
            //console.log("upload finished: " + xhr.responseText);
        }
    };

    // start upload
    //xhr.open("POST", "/cloud/template_01/ajax_template_01.php", false);
    xhr.open("POST", vPathAjax, false);
    xhr.send( formData );
}

function template_01AjaxGetFileData( vCallBack ){
    vFunctionName = "template_01AjaxGetFileData";
    var vPk = oTemplate_01.vDataMonth[oTemplate_01.vCurrentMonthRow][0];
    $('.cls_pointer').addClass('cls_wait');
    $('#div_main').css('cursor','wait');
    $.post( vPathAjax, {
        action:"get_file_data", 
        session_id:vGlobalSessionId,
        pk:vPk }, 
        function( data ) {
            vError = data.error;
        }
    ).done(function( data ){
        $('#div_main').css('cursor','default');
        $('.cls_pointer').removeClass('cls_wait');
        if( vError ){
            template_01AjaxError(vFunctionName, vError);
        }else{
            oFile.addFile( data.file_data );
            vCallBack();
        }
    }).fail(function( msg ){
        template_01AjaxFailMessage(vFunctionName,msg);
    });
}

function template_01AjaxError( vFunctionname, vError ){
    globalShowMessage("Error in application<br>" + vThisApplicationName + "<br>In function: " + vFunctionName + 
        "<br>" + vError );
}
function template_01AjaxFailMessage( vFunctionname, msg ){
    globalShowMessage("Error in application<br>" + vThisApplicationName + "<br>In function: " + vFunctionName + 
        "<br>" + msg + "<br>probably networkconnection is down" );
}


//  ==================  END AJAX  =================




function template_01CheckPermissionFileSelect(){
    if( aGlobalUserInfo['user'].toUpperCase() === "gast".toUpperCase() ||
        aGlobalUserInfo['user'].toUpperCase() === "guest".toUpperCase() ){
        globalShowMessage( aMyAppLangTex['kernel.message.guest.file.upload.no'] );
    }else if( aGlobalPermissionInfo['permission_fk'] > 2 ){
        showFileSelect();
    }else{
        globalShowMessage( [aLangText['photo.message.permission.photo.upload'], aGlobalUserInfo['user']] );
    }
}
function showFileSelect(){
    $( "#ipt_fileselect" ).remove();
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    if( msie > 0 ){
        globalShowMessage( aLangText['template_01.file.ie.not'] );
        //alert( "Diese Methode funktioniert im IE nicht." );
    }else{
        if( !document.getElementById( "frm_file_upload" ) ){
            $("#div_main").append('<input id="ipt_fileselect" type="file" multiple="multiple" style="display:none"></input>');
        }
        var vFileSelect = document.getElementById("ipt_fileselect");
        vFileSelect.click();
        vFileSelect.addEventListener("change", function(){
            var vFile = document.getElementById('ipt_fileselect').files;
            if( vFile.length > 5 ){
                globalShowMessage( aLangText['template_01.file.select.max'] );
                //alert( "Es dürfen nicht mehr als 5 Dateien auf einmal ausgewählt werden." );
            }else{
                template_01FileUpload();
                //vCallBack( vDate, vPrename, vName, vRemark );
            }
        }, false );
    }
}








//  ==========   OBJECT BIRTHDAY   ============




var oTemplate_01 = {
    vCurrentMonth: 8,
    vData: [],
    vDataMonth: [],         // data from one month only
    vCurrentMonthRow: 0,
    vSortDirection: ['DESC','DESC','DESC','DESC','DESC','DESC','DESC','DESC'],
    vSortColumn: 1,                 // Template_01-date

    // returns the long string month depending on vCurrentMonth 
    getMonth: function(){
        return aMonthLong[this.vCurrentMonth];   
    },
    //  sets the new vCurrentMonth and returns the new actual month
    setCurrentMonth: function( vVal ){                //  vVal == 1 => next month; or vVal == -1 => month before; 
        this.vCurrentMonth = this.vCurrentMonth + vVal;
        if( this.vCurrentMonth > 11 ){
            this.vCurrentMonth = 0;
        }else if( this.vCurrentMonth < 0 ){
            this.vCurrentMonth = 11;
        }
        this.setMonthData();
        return this.getMonth();
    },

    //  sets the data from database to the local variable this.vData
    setData: function( vData ){
        this.vData = vData;
        this.setMonthData();
    },

    //  set the vDataMonth that contains the data for the current month
    setMonthData: function(){
        this.vDataMonth = [];
        for( i=0; i<this.vData.length; i++ ){
            var vMth = this.vData[i][1]
            vMth = vMth.toString();
            //vMth = vMth.substr(4,2);
            vMth = vMth.substr((vMth.length-4),2);
            vMth = parseInt(vMth);
            vMth--;
            //console.log( this.vData[i][1] + " - " + vMth );
            if( vMth == oTemplate_01.vCurrentMonth ){
                this.vDataMonth.push( this.vData[i] );
            }
        }
        this.vSortDirection[1] = "DESC";
        this.sortTemplate_01DataMonth( 1 );
    },
    sortTemplate_01DataMonth: function( vColumn ){
        this.vSortColumn = vColumn;
        if( this.vSortDirection[vColumn] == "DESC"){
            this.vSortDirection[vColumn] = "ASC";
            if( vColumn == 1 ){                             // column 1 == Birthdate -> has to be sortet after DAY not date
                this.vDataMonth.sort( function (a, b){
                    aa = parseInt( a[vColumn].toString().substr(6,2) );
                    bb = parseInt( b[vColumn].toString().substr(6,2) );
                    if( this.aa > this.bb ) return 1;
                    if( this.bb < this.bb ) return -1;
                    return 0;
                });
            }else{
                this.vDataMonth.sort( function (a, b){
                    if( a[vColumn] > b[vColumn] ) return 1;
                    if( a[vColumn] < b[vColumn] ) return -1;
                    return 0;
                });
            }
        }else if( this.vSortDirection[vColumn] == "ASC" ){
            this.vSortDirection[vColumn] = "DESC";
            if( vColumn == 1 ){                             // column 1 == Birthdate -> has to be sortet after DAY not date
                this.vDataMonth.sort( function (a, b){
                    aa = a[vColumn].toString().substr(6,2);
                    bb = b[vColumn].toString().substr(6,2);
                    if( this.aa < this.bb ) return 1;
                    if( this.bb > this.bb ) return -1;
                    return 0;
                });
            }else{
                this.vDataMonth.sort( function (a, b){
                    if( a[vColumn] < b[vColumn] ) return 1;
                    if( a[vColumn] > b[vColumn] ) return -1;
                    return 0;
                });
            }
        }
    },

    //  deletes one record from vData and creates the vDataMonth new
    deleteTemplate_01Data: function( vPk ){
        this.vDataMonth = [];
        for( i=0; i<this.vData.length; i++ ){
            if( vData[i][0] == vPk ){
                vData.splice( i, 1);
            }else{
                var vMth = this.vData[i][1]
                vMth = vMth.toString();
                vMth = vMth.substr(4,2);
                vMth = parseInt(vMth);
                vMth--;
                //console.log( this.vData[i][1] + " - " + vMth );
                if( vMth == oTemplate_01.vCurrentMonth ){
                    this.vDataMonth.push( this.vData[i] );
                }
            }
        }
    }
}


var oFile = {
    vCurFilePos: 0,
    vFile: [],

    addFile: function( aFileData ){
        this.vFile = [];                        // clear/empty the array
        this.vCurFilePos = 0;
        for( var i=0; i<aFileData.length; i++ ){        // run through the file data given from database
            var vFileNew = new File( aFileData[i] );
            this.vFile.push( vFileNew );
        }
    }
}

function File(vProperty){
    this.vFilePk       = vProperty[0];
    this.vName         = vProperty[1];
    this.vExtension    = vProperty[2];
    this.vType         = vProperty[3];
    this.vSize         = vProperty[4];
    this.vLastmodified = vProperty[5];
    this.vRemark       = vProperty[6];
}   


var oInfo = {
    vUserPk:"",
    vPrename:"",
    vName:"",
    vEmail:"",
    vNatel:"",
    vLogin:0,
    vStart:0,
    vLast:0,
    vIp:0,
    vBrowser:"",    

    addInfo: function( vInfoData ){
        this.vUserPk  = vInfoData[0];
        this.vUser    = vInfoData[1];
        this.vPrename = vInfoData[2];
        this.vName    = vInfoData[3];
        this.vEmail   = vInfoData[4];
        this.vNatel   = vInfoData[5];
        this.vLogin   = vInfoData[6];
        this.vStart   = vInfoData[7];
        this.vLast    = vInfoData[8];
        this.vIp      = vInfoData[9];
        this.vBrowser = vInfoData[10];
    }
}











//  ==============  FUNCTION  ================  //
//  ==============  FUNCTION  ================  //
//  ==============  FUNCTION  ================  //

function expandShrink( vDirection, oObject, oObjectFocus ){
    if( vDirection == "expand" ){
        oObject.show();         // set height to zero
        var vObjHeight = oObject.height();
        oObject.height(0).show();         // set height to zero
        oObject.animate({
            height: vObjHeight
            },{
            complete: function(){
            }
        });
    }else{
        oObject.animate({
            height: "0"
            },{
            complete: function(){
                oObject.css('height','auto').hide();
                if( oObjectFocus ) oObjectFocus.focus();        // set focus if oObjectFocus is given
                $( "#div_modal_menu" ).unbind().empty().remove();           // special for the menu 
            }
        });
    }
}




function setMonthLong(){
    aMonthLong = [];
    aMonthLong = [aLangText['template_01.month.january'],
                           aLangText['template_01.month.february'],
                           aLangText['template_01.month.march'],
                           aLangText['template_01.month.april'],
                           aLangText['template_01.month.mai'],
                           aLangText['template_01.month.june'],
                           aLangText['template_01.month.july'],
                           aLangText['template_01.month.august'],
                           aLangText['template_01.month.september'],
                           aLangText['template_01.month.october'],
                           aLangText['template_01.month.november'],
                           aLangText['template_01.month.december']];
}

function switchAdminMode(){                 // ADMIN EDIT MODE
    //  switch admin mode on/off
    if( vEditMode ){ 
        vEditMode = false;
        $('.cls_edit').hide();
    }else{ 
        vEditMode = true;
        $('.cls_edit').show(); 
    };
}


function clearAll(){                                        //  -----------  CLEAR ALL  ----------  //
    // $('#div_main').empty();
    $('#div_modal_menu').empty().remove();
    // $('#div_header').empty().remove();
    //$('#div_content').empty().remove();
    $('*').unbind();
    $(window).off("resize");
}



function setCurrentView( vView ){                         //  remove a View if it is already in the list and add the new View
    for( var i=0; i<aCurrentView.length; i++ ){
        if( aCurrentView[i] == vView ) aCurrentView.splice( i, 1 );
    }
    aCurrentView.unshift( vView );
    aCurrentView.splice( 10, 100 );             // remove all entries after position 9
}



function template_01CheckTemplate_01Date( vDate ){                    // checks the input of template_01 date
    var vSplit   = vDate.split( /[\s\/., |]+/ );        // date-separator may be " " or "." or "/" or "," or "|" ....
    var vNewDate = new Date( vSplit[2], vSplit[1]-1, vSplit[0] );
    vNewDate.setFullYear(vSplit[2]);
    if( !isNaN( vNewDate.getTime() ) ){
        var vYear    = vNewDate.getFullYear();
        var vMonth   = vNewDate.getMonth() + 1;
        if( vMonth < 10 ) vMonth = "0"+vMonth;
        var vDay     = vNewDate.getDate();
        if( vDay < 10 ) vDay = "0"+vDay;
        if( vYear == vSplit[2] && parseInt(vMonth) == vSplit[1] && parseInt(vDay) == vSplit[0] ){
            //alert( vYear + "" + vMonth + "" + vDay );
            return vYear + "" + vMonth + "" + vDay;
        }
    }
    return 0;
}


function sortTheArray( vData, vColumn, vOrder ){
    var vChecker = 0;
    //alert( typeof( vData[0][vColumn] ));
    for( var i = 0; i < vData.length; i++ ){
        if( i > 0 ){
            var vA = vData[i-1];
            var vB = vData[i];
            if( vOrder == "ASC" && vA[vColumn] > vB[vColumn] ){
                vData[i-1] = vB;
                vData[i] = vA;
                vChecker++;
            }
            if( vOrder == "DESC" && vA[vColumn] < vB[vColumn] ){
                vData[i-1] = vB;
                vData[i] = vA;
                vChecker++;
            }
        }
    }
    if( vChecker > 0 ) {
        sortTheArray( vData, vColumn, vOrder )
    }else{
        return vData;
    }
}

function template_01GetTime( vTime ){                    // checks the input of template_01 date
    var vSplit   = vTime.split( /[\s\/:., |]+/ );        // date-separator may be ":" or " " or "." or "/" or "," or "|" ....
    if( !vSplit[0] ) vSplit[0] = 0;
    if( !vSplit[1] ) vSplit[1] = 0;
    if( !vSplit[2] ) vSplit[2] = 0;
    var vNewTime = new Date( 2000, 2, 2, vSplit[0], vSplit[1], vSplit[2], 0 );
    if( !isNaN( vNewTime.getTime() ) ){
        var vHour   = vNewTime.getHours();
        var vMinute = vNewTime.getMinutes();
        var vSecond = vNewTime.getSeconds();
        if( vSecond == parseInt(vSplit[2]) && parseInt(vMinute) == vSplit[1] && parseInt(vHour) == vSplit[0] ){
            var vTotalSecond = vSecond + ( vMinute * 60 ) + ( vHour * 3600 );
            return vTotalSecond;
        }
    }
    return 0;
}



//  ------  DATE  -------


function template_01GetMonthFromDate( vDate ){
    if ( !vDate || vDate.length != 8 ) return false;
    var vMonth = datum.substr(4,2);
    return vMonth
}

function template_01GetDateToShow( vDate, vFormatType ){            // returns formated date from "yyyymmdd" as "longday dd.mm.yyyy"
    vDayLong  = ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'];
    vDayShort = ['So','Mo','Di','Mi','Do','Fr','Sa'];
    if (!vDate) return false;
    vDate    = vDate.toString();
    vYear    = vDate.substr(0,vDate.length-4);
    //console.log( "Date: " + vDate + "Year: " + vYear);
    vMonth   = vDate.substr(vDate.length-4,2);
    vDay     = vDate.substr(vDate.length-2,2);
    vDateNew = new Date();
    vDateNew.setDate( vDay );
    vDateNew.setMonth( vMonth );
    vDateNew.setFullYear( vYear );
    if( vFormatType == "short" ){
        return vDayShort[ vDateNew.getDay() ] + " " + vDay + "." + vMonth + "." + vYear;
    }else if( vFormatType == "long" ){
        return vDayLong[ vDateNew.getDay() ] + " " + vDay + "." + vMonth + "." + vYear;
    }else if( vFormatType == "dd.mm.yyyy" ){
        return vDay + "." + vMonth + "." + vYear;
    }
}

function template_01GetTimeToShow( vTime ){
    if (!vTime) return "nicht bekannt";
    var vHour   = Math.floor( vTime / 3600 );
    var vModulu = vTime % 3600;
    var vMinute = Math.floor( vModulu / 60 );
    var vSecond = vModulu % 60;
    if( vHour < 10 )   vHour   = "0" + vHour;
    if( vMinute < 10 ) vMinute = "0" + vMinute;
    if( vSecond < 10 ) vSecond = "0" + vSecond;
    return vHour + ":" + vMinute + ":" + vSecond;
}

function template_01GetDateTimeToShow( vSec ){            // returns formated date
    vDayShort = ['So','Mo','Di','Mi','Do','Fr','Sa'];
    if (!vSec) return false;
    vDate   = new Date();
    vDate.setTime( vSec * 1000 );
    vYear   = vDate.getFullYear();
    vMonth  = vDate.getMonth() + 1; if( vMonth  < 10 ) vMonth  = "0" + vMonth;
    vDay    = vDate.getDate();      if( vDay    < 10 ) vDay    = "0" + vDay;
    vWeekday= vDate.getDay();
    vHour   = vDate.getHours();     if( vHour   < 10 ) vHour   = "0" + vHour;
    vMinute = vDate.getMinutes();   if( vMinute < 10 ) vMinute = "0" + vMinute;
    vSecond = vDate.getSeconds();   if( vSecond < 10 ) vSecond = "0" + vSecond;
    return vDayShort[vWeekday] + " " + vDay + "." + vMonth + "." + vYear + " - " + vHour + ":" + vMinute + ":" + vSecond + " ";
}



//  from web to round a decimal number to two digit after point
Number.prototype.round = function(places) {
  return +(Math.round(this + "e+" + places)  + "e-" + places);
}

function template_01GetSizeFormat( vSize ){
    if(vSize > 1000000000){            // biger than 1 Mega
        return Math.round(vSize/1000000)/1000 + " GB";
    }else if(vSize > 1000000){            // biger than 1 Million
        return Math.round(vSize/1000)/1000 + " MB";
    }else if( vSize > 1000 ){
        return Math.round(vSize/1000) + " KB";
    }
}





