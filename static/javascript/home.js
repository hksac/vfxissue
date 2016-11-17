function adjustHead(){
    var toplineDiv         = document.getElementById('topline')
    var headtailDiv        = document.getElementById('headtail');
    var searchdiv          = document.getElementById('search');
    var logindiv           = document.getElementById('logindiv');
    var logindivcontentdiv = document.getElementById('logindivcontent');    
    var width              = document.documentElement.clientWidth;


    searchdiv.style.left   = width * 0.4 + 'px' ;
    searchdiv.style.top    = toplineDiv.offsetTop + 13 + 'px' ;



    if (width * 0.4 >= width*0.04 + 390){
        searchdiv.style.display = 'block';
        headtailDiv.style.left  = width*0.04 + 210 + 'px' ;
        headtailDiv.style.top   = toplineDiv.offsetTop + 10 + 'px' ;
        toplineDiv.style.height = '36px';
        logindivcontentdiv.style.width       = '130px';
        logindivcontentdiv.style.marginLeft  = '0px';
    }
    if (width * 0.4 < width*0.04 + 390 && width * 0.4 >= width*0.04 + 280){
        searchdiv.style.display = 'block';
        searchdiv.style.left    = headtailDiv.offsetLeft + headtailDiv.clientWidth + 'px';
        headtailDiv.style.left  = width*0.04 + 210 + 'px' ;
        headtailDiv.style.top   = toplineDiv.offsetTop + 10 + 'px' ;
        toplineDiv.style.height = '36px';
        logindivcontentdiv.style.width       = '130px';
        logindivcontentdiv.style.marginLeft  = '0px';
    }
    if (width * 0.4 < width*0.04 + 280 && width * 0.4 >= width*0.04 + 210){
        searchdiv.style.display = 'none';
        headtailDiv.style.left  = width*0.04 + 210 + 'px' ;
        headtailDiv.style.top   = toplineDiv.offsetTop + 10 + 'px' ;
        toplineDiv.style.height = '36px';
        logindivcontentdiv.style.width       = '130px';
        logindivcontentdiv.style.marginLeft  = '0px';
    }
    if (width * 0.4 < width*0.04 + 210 && logindiv.clientWidth <= width * 0.92){
        searchdiv.style.display = 'none';
        headtailDiv.style.left  = width*0.04 + 'px' ;
        headtailDiv.style.top   = toplineDiv.offsetTop + 30 + 'px' ;
        toplineDiv.style.height = '50px';
        logindivcontentdiv.style.width = '130px';
        logindivcontentdiv.style.marginLeft  = '0px';
    }
    if (width * 0.4 < width*0.04 + 210 && logindiv.clientWidth > width * 0.92){
        searchdiv.style.display = 'none';
        headtailDiv.style.left  = width*0.04 + 'px' ;
        headtailDiv.style.top   = toplineDiv.offsetTop + 30 + 'px' ;
        toplineDiv.style.height = '50px';
        logindivcontentdiv.style.width       = 130 - logindiv.clientWidth + width * 0.92 + 'px';
        logindivcontentdiv.style.marginLeft  = logindiv.clientWidth - width * 0.92 + 'px';
    }


    var leftdiv          = document.getElementsByName('nagavition')[0];
    var height           = leftdiv.offsetTop;
    logindiv.style.top   = height + 'px';
    logindiv.style.right = '4%';

}



function showsidediv(){
    var width    = document.documentElement.clientWidth;
    var subquestiondiv = $('#subquestion');
    var questionItemDiv = $('.questionItem');
    var sidediv     = $('#side');

    if (width*0.92 > 800){
        sidediv.css('display','block');
        subquestiondiv.css('width','500px');
        questionItemDiv.css('width','420px');
    }
    if ( (width*0.92 <= 800) && (width*0.92 > 500) ){
        sidediv.css('display','none');
        subquestiondiv.css('width',width*0.92+'px');
        questionItemDiv.css('width',width*0.92-100+'px');
    }
    if (width*0.92 < 500){
        sidediv.css('display','none');
        subquestiondiv.css('width','500px');
        questionItemDiv.css('width','300px');
    }
}



function adjustquestionItemBox(){
    var questionItemDivList = $('.questionItem');
    for (var index=0; index < questionItemDivList.length; index++ ){
        var questionItemDiv = questionItemDivList[index];
        var preItem = questionItemDiv.previousSibling;
        preItem.style.marginTop = questionItemDiv.offsetHeight*0.5+'px';
    }
}



function adjustPreloadPage(){
    var loginpageDiv       = document.getElementById('loginpage');
    var addquestionpageDiv = document.getElementById('addquestionpage');
    var registerpageDiv    = document.getElementById('registerpage');
    var policypageDiv      = document.getElementById('policypage');

    var loginpageDivWidth        = loginpageDiv.clientWidth;
    var addquestionpageDivWidth  = addquestionpageDiv.clientWidth;
    var registerpageDivWidth     = registerpageDiv.clientWidth;
    var policypageDivWidth       = policypageDiv.clientWidth;


    var screenWidth        = document.documentElement.clientWidth;

    if (loginpageDivWidth < screenWidth*0.92){
        loginpageDiv.style.left = (screenWidth-loginpageDivWidth)/2 + 'px';
    }
    else{
        loginpageDiv.style.left = '4%';
    }
    if (addquestionpageDivWidth < screenWidth*0.92){
        addquestionpageDiv.style.left = (screenWidth-addquestionpageDivWidth)/2 + 'px';
    }
    else{
        addquestionpageDiv.style.left = '4%';
    }
    if (registerpageDivWidth < screenWidth*0.92){
        registerpageDiv.style.left = (screenWidth-registerpageDivWidth)/2 + 'px';
    }
    else{
        registerpageDiv.style.left = '4%';
    }
    if (policypageDivWidth < screenWidth*0.92){
        policypageDiv.style.left = (screenWidth-policypageDivWidth)/2 + 'px';
    }
    else{
        policypageDiv.style.left = '4%';
    }
}



function globalAdjust(){
    adjustHead();
    howsidediv();
    adjustquestionItemBox();
    adjustPreloadPage;
}



//create item of answer page.
function createAnswerItem(retItem){
    var jsonItem = retItem;
    var itemContent = jsonItem['content'];
    // itemContent = htmlDecode(itemContent);
    itemContent = itemContent.replace(/[\r\n]/g,'<br>');
    $('#questions').append( "<div><p style='padding:5%;font-size:15px;color:#444444;'>" + itemContent + '</p>' );
    $('#questions').append( "<p style='padding-left:5%;font-size:15px;color:#444444;'><a class='questiontime'>" + jsonItem['From'] + "</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class='questiontime'>" + jsonItem['time'] + '</a></p>' );
    $('#questions').append( "<br/></div>" );
    $('#questions').append( "<p style='border-top:1px dotted #bbddff;overflow:hidden;height:1px;margin-left:5%;'/></p>");
}



//create question content in answer page.
function createQuestionFullFrame(questioncontent){
    //$('#questions').append( "<hr style='border:1px dashed #bbccff'/>");

    var titleInfo = "<p><a class='questionblocktitle' onclick='showAnswerPage(" + questioncontent['id'] + ");'>" + questioncontent['title'] + "</a><br /><a class='questiontime'>" + questioncontent['From'] + "</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class='questiontime'>" + questioncontent['time'] + "</a>&nbsp;&nbsp;&nbsp;&nbsp;";
    
    var tagArray = new Array();
    tagArray = questioncontent['tag'].split(',');
    for ( var i = 0 ; i < tagArray.length ; i++ ){
        titleInfo += "<a class='questiontag'>" + tagArray[i] + '</a>&nbsp;';
    }
    titleInfo += "</p>";
    $('#questions').append( titleInfo );

    var tempContent = questioncontent['content'];
    // tempContent = htmlDecode(tempContent);
    tempContent = tempContent.replace(/[\r\n]/g,'<br>');

    $('#questions').append( "<p style='padding:5%;font-size:15px;color:#444444;'>" + tempContent + "</p>" );

    $('#questions').append( "<div style='border-top:2px dotted #bbddff;overflow:hidden;height:1px;'/></div>");
}



//set ajax request for question content in answer page.
function createAnswerHeader(id){

    $.getJSON('/q/' + id, function(ret){
        for (var i = ret.length - 1; i >= 0; i--) {
            createQuestionFullFrame(ret[i]);
        };
        //set answer content after createAnswerHeader(id).
        createAnswerContent(id);
    });
}



//set ajax request for answer content in answer page.
function createAnswerContent(id){

    $.get('/a/' + id, function(ret){
        
        if ( ret.length > 0 ){
            for (var i = ret.length - 1; i >= 0; i--) {
                createAnswerItem(ret[i]);
            };
        }
        //create answer frame after createAnswerContent(id);
        createAnswerFrame(id);
    });
}



//set ajax request of answer page.
function showAnswerPage(id){

    $('#questions').empty();

    createAnswerHeader(id);
    try{window.history.pushState(null,null,'/a/' + id);}catch(e){;}
    
}



//create answer frame in answer page.
function createAnswerFrame(id){
    $('#questions').append( "<div style='padding:5%' id='answerFrame'><form><textarea id='textareaComment' cols='60' rows='4' style='overflow:hidden;resize:none;font-size:12px;font-family:sans-serif;'></textarea><br /><br /><a class='submitComment' onclick='submitComment(" + id + ")'>提交答案</a></form></div>" );
    $('#questions').append( "" )
    $('#questions').append( "" )
    // HTMLpagenation();
    // if (window.pageNavigate != null){
    //     window.pageNavigate = null;
    // }
    $('#pageAlgorithm').css('display','none');

}



//create item of question page.
function createQuestionItem(retItem){
    var jsonItem = retItem;

    $('#questions').append( "<hr style='border:1px dashed #ddeeff;clear:both;'/>" );

    $('#questions').append( "<div class='answernum' style='float:left;'>有" + jsonItem['answernumber'] + "个回答</div>" );
    
    var questionBlock = '';
    questionBlock += "<div class='questionItem' style='float:left;margin:10px;'><a class='questionfrom'>" + jsonItem['From'];
    questionBlock += "</a>&nbsp;&nbsp;<a class='questiontime'>" + jsonItem['time'] + '</a><br>'
    questionBlock += "<a class='questiontitle' onclick='showAnswerPage(" + jsonItem['id'] + ")'>" + jsonItem['title'];
    questionBlock += "</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    // alert(htmlDecode(jsonItem['title']));

    var tagArray = new Array();
    tagArray = jsonItem['tag'].split(',');
    for ( var i = 0 ; i < tagArray.length-1 ; i++ ){
        questionBlock += "<a class='questiontag'>" + tagArray[i] + '</a>&nbsp;' ;
    }

    questionBlock += "</div>";

    // $('#questions').append( questionBlock );

    $('#questions').append( questionBlock );
    // var questionItem = document.getElementById('questions').lastChild;
    // questionItem.previousSibling.style.marginTop = questionItem.style.offsetHeight*0.5 + 'px';
}



//set ajax request of question page.
function showQuestionPage( requestType , pageIndex ){
    var requestType = arguments[0] ? arguments[0] : 'all';
    var pageIndex   = arguments[1] ? arguments[1] : 1;
    $('#questions').empty();
    $.getJSON('/ajax_recent/' + requestType + '/' + pageIndex , function(ret){
        for (var i = 0 ; i <= ret['_question'].length - 1 ; i++) {
            createQuestionItem(ret['_question'][i]);
        };
        $('#questions').append( "<hr style='border:1px dashed #ddeeff;clear:both;'/>");
        adjustquestionItemBox();
        try{window.history.pushState(null,null,'/');}catch(e){;}
        
        // HTMLpagenation();
        if (window.pageNavigate == null){
            window.pageNavigate = HTMLpagenation();
        }
        else{
            HTMLpagenation.initialize(pageIndex);
        }
        $('#pageAlgorithm').css('display','block');
    });
}



//set ajax request of HotUser page.
function showHotUserPage(){
    // $('#hotuser').empty();
    var hotuserDiv = $('#hotuser');
    hotuserLiList  = hotuserDiv.find('div.person');
    activeTimeList = hotuserDiv.find('div.activetime');
    $.getJSON('/ajax_hotuser/' , function(ret){
        for (var i = 0 ; i <= ret.length-1 ; i++) {
            hotuserLiList[i].innerHTML = "<img src='" + ret[i]['pict'] + "' width='30px' height='30px'>";
            hotuserLiList[i].innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;"
            hotuserLiList[i].innerHTML += ret[i]['name'];

            if (i==0){
                activeTimeList[i].innerHTML = "<a style='color:#FF0000;'>+" + ret[i]['time'] + "</a>";
            }
            if (i==1){
                activeTimeList[i].innerHTML = "<a style='color:#00FF00;'>+" + ret[i]['time'] + "</a>";
            }
            if (i>1){
                activeTimeList[i].innerHTML = "<a>+" + ret[i]['time'] + "</a>";
            }
        };
    });
}



//set ajax request of HotQuestion page.
function showHotQuestionPage(){
    var hotquestionrDiv = $('#hotquestion');
    hotquestionLiList   = hotquestionrDiv.find('div.hotquestionTitle');
    answerTimeList      = hotquestionrDiv.find('div.hotquestionAnswerNumber');
    DataList_1 = 0;
    DataList_2 = 0;
    DataList_3 = 0;
    DataList_4 = 0;
    DataList_5 = 0;
    $.getJSON('/ajax_hotquestion/' , function(ret){
        for (var i = 0 ; i <= ret.length-1 ; i++) {
            hotquestionLiList[i].innerHTML = ret[i]['title'];
            answerTimeList[i].innerHTML    = ret[i]['answernumber'] + "个答案";
            if( i == 0 ){
                DataList_1 = eval(ret[i]['id']);
                hotquestionLiList[i].onclick   = function(){ showAnswerPage(DataList_1); };
            }
            else if( i == 1 ){
                DataList_2 = eval(ret[i]['id']);
                hotquestionLiList[i].onclick   = function(){ showAnswerPage(DataList_2); };
            }
            else if( i == 2 ){
                DataList_3 = eval(ret[i]['id']);
                hotquestionLiList[i].onclick   = function(){ showAnswerPage(DataList_3); };
            }
            else if( i == 3 ){
                DataList_4 = eval(ret[i]['id']);
                hotquestionLiList[i].onclick   = function(){ showAnswerPage(DataList_4); };
            }
            else if( i == 4 ){
                DataList_5 = eval(ret[i]['id']);
                hotquestionLiList[i].onclick   = function(){ showAnswerPage(DataList_5); };
            }
        };
    });
}



function openLogin(){
    closeLogin();
    var logincontext = $("a[name='nagavition']:eq(6)").html();

    if(logincontext.match('登陆/退出') != null)
    {
        $.post("/login/", {} ,
            function(ret){
                document.getElementById("loginpage").innerHTML = ret;
                document.getElementById("loginpage").style.display="block";
                try{window.history.pushState(null,null,'/login/');}catch(e){;}
            });
    }
    else
    {
        submitlogout();
    }
}



function closeLogin(){
   document.getElementById("loginpage").style.display="none";
   try{window.history.pushState(null,null,'/');}catch(e){;}
}



//login in with your id.
function submitlogin(){

    var usernameContent = $("a[name='Username']").children().val();
    usernameContent = htmlEncode(usernameContent)
    var passwordContent = $("a[name='Password']").children().val();
    passwordContent = htmlEncode(passwordContent)
    $.post("/login/", {username:usernameContent,password:passwordContent} ,
        function(ret){
        if( ret['status']=='ture' ){
            $("a[name='nagavition']:eq(6)").html(usernameContent + '/退出');
            closeLogin();
            showQuestionPage('all');
            alert('登录成功!');
        }
        else{
            closeLogin();
            showQuestionPage('all');
            alert('登录失败!');
        }
        // $.ajaxSetup({
        // data: {csrfmiddlewaretoken: '{{ csrf_token }}' },
        // });
    });
}



//login in with your id.
function submitlogout(){
    var usernameContent = $("a[name='Username']").children().val();
    $.post("/logout/", {username:usernameContent} ,
        function(ret){
        if( ret['status']=='ture' ){
            $("a[name='nagavition']:eq(6)").html('登陆/退出');
            try{window.history.pushState(null,null,'/');}catch(e){;}
            closeLogin();
            showQuestionPage('all');
        }
    });
}



function openRegister(){
    closeLogin();
    $.post("/register/", {} ,
        function(ret){
            if( ret['status'] ){
                closeRegister();
            }
            else{
                document.getElementById("registerpage").innerHTML = ret;
                document.getElementById("id_username").value  = '用户名';
                document.getElementById("id_password1").value = '12345678';
                document.getElementById("id_password2").value = '12345678';
                document.getElementById("registerpage").style.display="block";
                try{window.history.pushState(null,null,'/register/');}catch(e){;}
            }
        }
    );
}



function closeRegister(){
    document.getElementById("registerpage").style.display="none";
    try{window.history.pushState(null,null,'/');}catch(e){;}
}



//register your id and password.
function submitregister(){
    var csrftoken        = $("input[name='csrfmiddlewaretoken']").val();
    var usernameContent  = $("a[name='registerusername']").children().val();
    var emailContent     = $("a[name='registeremail']").children().val();
    var passwordContent1 = $("a[name='registerpassword1']").children().val();
    var passwordContent2 = $("a[name='registerpassword2']").children().val();
    closeLogin();
    closeRegister();
    //alert(usernameContent+emailContent+passwordContent);
    $.post("/register/", {csrfmiddlewaretoken:csrftoken,username:usernameContent,email:emailContent,password1:passwordContent1,password2:passwordContent2} ,
        function(ret){
            if( ret['status']=='ture' ){
                alert('register successful!');
                closeRegister();
            }
            if( ret['status']=='false' ){
                alert('register failed!');
            } 
            if( ret['status']!='ture' && ret['status']!='false' ){
                document.getElementById("registerpage").style.display="block";
                alert(ret['error']);
            }                     
        }
    );
}



//submit a new question to server.
function openAddQuestion(){
    $.post("/addquestion/", {} ,
        function(ret){
            if ( ret['status'] == 'ture' ){
                document.getElementById("addquestionpage").style.display="none";
            }
            if ( ret['status'] == 'false' ){
                alert('请先登陆!');
                document.getElementById("addquestionpage").style.display="none";
            }
            else{
                document.getElementById("addquestionpage").innerHTML = ret;
                document.getElementById("id_title").style.width = '615px';
                document.getElementById("id_content").cols = 76;
                document.getElementById("id_content").style.resize='none';
                document.getElementById("addquestionpage").style.display="block";
                try{window.history.pushState(null,null,'/addquestion/');}catch(e){;}
            }
        });
}



//submit a new question to server.
function submitAddQuestion(){
    var csrftoken        = $("#addquestionpage").find("input[name='csrfmiddlewaretoken']").attr('value');
    var title   = document.getElementById("id_title").value;
    title       = htmlEncode(title);

    var tag     = Array();
    for (var i = 0; i <= 5; i++)
    {
        var temp = "id_tag_"+i;
        if (document.getElementById(temp).checked)
        {
            tag.push(document.getElementById(temp).value);
            //tag += document.getElementById(temp).value + ' ';
        }
    }
    
    var content = document.getElementById("id_content").value;
    content     = htmlEncode(content);
    // 
    $.post("/addquestion/", {'csrfmiddlewaretoken':csrftoken,'title':title,'tag':tag,'content':content} ,
        function(ret){
            if( ret['status'] == 'ture' ){
                document.getElementById("addquestionpage").style.display="none";
                try{window.history.pushState(null,null,'/');}catch(e){;}
                window.location.reload();
                alert('提交成功!');
            }
            if( ret['status'] == 'false' ){
                alert('提交失败!');
            }
            if( ret.match('questionTitle') ){
                alert('提交失败!');
            }
        });
}



function closeQuestion(){
    document.getElementById("addquestionpage").style.display="none";
    try{window.history.pushState(null,null,'/');}catch(e){;}
}



//submit comment to question.
function submitComment(id){
    var comment = document.getElementById("textareaComment").value;
    comment = htmlEncode(comment);
    $.post("/" + id + "/addanswer/",
    {
    questionid:id,
    content:comment,
    },
    function(ret){
        if( ret['status']=='ture' ){
            alert('提交成功!');
            showAnswerPage(id);
        }
        if( ret['status']=='false' ){
            alert('提交失败!');
        }
    });
}



function submitsearch(){
    var content = $("#search").find('input').val();//nodeName;
    content = htmlEncode(content);
    // content = htmlDecode(content);
    $('#questions').empty();
    $.getJSON('/search/' + content + "/", function(ret){
        for (var i = 0 ; i <= ret['_question'].length - 1 ; i++) {
            createQuestionItem(ret['_question'][i]);
        };
        $('#questions').append("<hr style='border:1px dashed #ddeeff;clear:both;'/>");

        adjustquestionItemBox();
        try{window.history.pushState(null,null,'/');}catch(e){;}
    });
}



function showPolicyPage(){
    $.post("/policy/", {} ,
        function(ret){
            document.getElementById("policypage").innerHTML = ret;
            document.getElementById("policypage").style.display="block";
            try{window.history.pushState(null,null,'/');}catch(e){;}
        }
    );
}



function closePolicyPage(){
    document.getElementById("policypage").style.display="none";
    try{window.history.pushState(null,null,'/');}catch(e){;}
}



function setlogindivcontent(){
    if($.cookie("_username") == 'Anonymous' || !$.cookie("_username")){
        document.getElementById("logindivcontent").innerHTML = "登陆/退出";
    }
    else{
        document.getElementById("logindivcontent").innerHTML = $.cookie("_username") + "/退出";
    }
}



function checkInternetExplore(){
    if (navigator.appName == "Microsoft Internet Explorer"){
        alert('Please use other browser to visit this website!\n请用其他浏览器来访问本网站以获得更好的体验效果！');
    }
}



function htmlEncode(content){
    return $('<span/>').text(content).html();
}



function htmlDecode(content){
    return $('<span/>').html(content).text();
}



//event for this page.
try{
    window.addEventListener('popstate',function(e){
        window.location.assign(location.href);
    });
}catch(e){;}
try{
    window.attachEvent('popstate',function(e){
        window.location.assign(location.href);
    });
}catch(e){;}