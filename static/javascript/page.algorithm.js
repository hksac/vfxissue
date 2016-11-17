function HTMLpagenation(){with(this){

    //get Page Algorithm division.
    this.divTarget = $("#pageAlgorithm");

    //create Last Button.
    this.pageLastNode = $("<a></a>");
    this.pageLastNode.attr('class','pageLast');

    //create Next Button.
    this.pageNextNode = $("<a></a>");
    this.pageNextNode.attr('class','pageNext');

    //create Ellipsis Button.
    this.pageEllipsisNode = $("<a></a>");
    this.pageEllipsisNode.attr('class','pageEllipsis');

    //Initialized this class.
    HTMLpagenation.initialize(1);

    return this;
}};



HTMLpagenation.initialize=function(currentIndex){with (this)
{
    //add lastpage button to document.
    divTarget.empty();
    pageLastNode.html('上一页');
    var pagetype = $.cookie('_pagetype');
    pageLastNode.attr("href","javascript:showQuestionPage('" + pagetype + "'," + (currentIndex-1) +");");
    // pageLastNode.attr("onclick","HTMLpagenation.clickEvent("+ (currentIndex-1) +");" );
    if (currentIndex>1){
        divTarget.append( pageLastNode );
    }

    //add number button to document.
    //create Index Button.
    this.IndexNodeArray = new Array(6);
    HTMLpagenation.arrangeIndex(currentIndex);

    //add ellipsis button to document.
    pageEllipsisNode.html('...');
    pageEllipsisNode.attr("href","javascript:showQuestionPage('" + pagetype + "'," + (currentIndex) +");");
    // pageEllipsisNode.attr("onclick","HTMLpagenation.clickEvent("+ (currentIndex-1) +");" );
    divTarget.append( pageEllipsisNode );

    //add lastpage button to document.
    pageNextNode.html('下一页');
    pageNextNode.attr("href","javascript:showQuestionPage('" + pagetype + "'," + (currentIndex+1) +");");
    // pageNextNode.attr("onclick","HTMLpagenation.clickEvent("+ (currentIndex+1) +");" );
    divTarget.append( pageNextNode );
    return this;
}};



HTMLpagenation.firstPage=function(){with (this){
    alert(IndexNodeArray[0].name);
    HTMLpagenation.initialize(1);
    IndexNodeArray[0].name = 'currentPage';
}};



HTMLpagenation.arrangeIndex=function(currentIndex){with (this)
{
    if (currentIndex >= 4){
        for (var i=0 ; i < IndexNodeArray.length ; i++ ){
            IndexNodeArray[i] = $("<a></a>");
            if ( i == 3 ){
                IndexNodeArray[i].attr('name','currentPage');
            }
            else{
                IndexNodeArray[i].attr('name','preparePage');
            }
            IndexNodeArray[i].attr("class",'pageIndex');
            IndexNodeArray[i].html(currentIndex - 3 + i);
            var pagetype = $.cookie('_pagetype');
            IndexNodeArray[i].attr("href","javascript:showQuestionPage('" + pagetype + "'," + (currentIndex - 3 + i) +");");

            divTarget.append( IndexNodeArray[i] );
        }
    }
    else{
        for (var i=0 ; i < IndexNodeArray.length ; i++ ){
            IndexNodeArray[i] = $("<a></a>");
            if ( i == currentIndex-1 ){
                IndexNodeArray[i].attr('name','currentPage');
            }
            else{
                IndexNodeArray[i].attr('name','preparePage');
            }
            IndexNodeArray[i].attr("class",'pageIndex');
            IndexNodeArray[i].html(i+1);
            var pagetype = $.cookie('_pagetype');
            IndexNodeArray[i].attr("href","javascript:showQuestionPage('" + pagetype + "'," + (i+1) +");");

            // IndexNodeArray[i].attr("onclick","HTMLpagenation.clickEvent(this.innerHTML);" );
            divTarget.append( IndexNodeArray[i] );
        }
    }
}};



// HTMLpagenation.clickEvent=function(number){with (this)
// {   
//     HTMLpagenation.initialize(number);
// }};



// HTMLpagenation.previous=function(){
//     ;
// }



// HTMLpagenation.goto=function(){
//     ;
// }



// HTMLpagenation.next=function(){
//     ;
// }


