const manageUsers = '<ul class="list-group">'+
'<% allThePeople.forEach(person=>{%><li class="list-group-item">'+
    '<span class="text-info mr-2">Frank namshe</span><span class="text-muted mr-2"><%=allThePeople.email%></span>'
    +'<button class="btn btn-info m-1">Make Admin</button>'+
    '<button class="btn btn-info m-1">De-activate user</button>'

+'</li><%})'

+'</ul>'  ;

// console.log(manageUsers)

const blogLog = '<div class="media border p-2 bg-light">'+
'<span class="h1 mr-1 fab fa-blogger"></span>'+
'<div class="media-body">'+
    '<h1 class="h4 text-info">nHub Foundation TGIF</h1>'+
    '<p>TGif just kicked of is going on a high pace everything is going high alright</p>'+
    '<span class="text-muted">pending</span> <button class="btn btn-info">'+
        'publish post'+
    '</button>'+
'</div>'+

'</div>'+
'<div class="bg-light media border p-2">'+
    '<span class="h1 mr-1 fab fa-blogger"></span>'+
'<div class="media-body">'+
    '<h1 class="h4 text-info">Mr Bash to have a meeting with all interns</h1>'
    +
    '<p>TGif just kicked of is going on a high pace everything is'+
        'is going high alright'
        +
    '</p>'+
    '<span class="text-muted">pending</span> <button class="btn btn-info">'+
    'publish post'+
'</button>'+
'</div>'+
'</div>';

const Messages = '<div class="bg-light"><div class="bg-light card">'+
        '<div class="card-header">'+
        '<span class="text-danger">norbertmbafrank@gmail.com</span>'+
        '</div>'+
        '<div class="card-body">'+
            '<p class="text-info">my account seems blown</p>'+
        '</div>'+
        '</div>'+

        '<div class="card bg-light">'+
        '<div class="card-header">'+
        '<span class="text-danger">petermbafrank@gmail.com</span>'+
        '</div>'+
        '<div class="card-body">'+
            '<p class="text-info">my account seems blown</p>'+
        '</div>'+
        '</div></div>';

document.querySelector('.adminContent').innerHTML = manageUsers
document.querySelector('.page2').style.backgroundColor = "rgba(243, 241, 170, 0.952)";
document.querySelector('.page3').style.backgroundColor = "rgba(243, 241, 170, 0.952)";
document.querySelector('.page1').style.backgroundColor = "white";

function showPage(pageName){
    if (pageName=="ManageUsers"){
        document.querySelector('.adminContent').innerHTML = manageUsers
        document.querySelector('.page2').style.backgroundColor = "rgba(243, 241, 170, 0.952)";
        document.querySelector('.page3').style.backgroundColor = "rgba(243, 241, 170, 0.952)";
        document.querySelector('.page1').style.backgroundColor = "white";


    }
   else if (pageName=="blogLog"){
        document.querySelector('.adminContent').innerHTML = blogLog
        document.querySelector('.page1').style.backgroundColor = "rgba(243, 241, 170, 0.952)";
        document.querySelector('.page3').style.backgroundColor = "rgba(243, 241, 170, 0.952)";
        document.querySelector('.page2').style.backgroundColor = "white";

    }
    else if (pageName=="Messages"){
        document.querySelector('.adminContent').innerHTML = Messages
        document.querySelector('.page1').style.backgroundColor = "rgba(243, 241, 170, 0.952)";
        document.querySelector('.page2').style.backgroundColor = "rgba(243, 241, 170, 0.952)";
        document.querySelector('.page3').style.backgroundColor = "white";

    }
    
}