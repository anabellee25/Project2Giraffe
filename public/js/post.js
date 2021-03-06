$(document).ready(function () {

    let userId = JSON.parse(localStorage.getItem("userId"));
    console.log(userId.userId)
    $("#submitPostBtn").on("click", function () {
        var newPost = {
            userId: userId.userId,
            itemName: $("#postItemName").val().trim(),
            zipcode: $("#zipCode").val(),
            image: $("#postItemurl").val().trim(),
            description: $("#postDescription").val().trim(),
            category: $("input[name='categoryType']:checked").val(), 
            // created_at: moment().format("MM-DD-YYYY HH:mm:ss")
        };
        console.log(newPost)
        $('#post-modal').modal('close');
        $.ajax({
            contentType: "application/JSON",
            url: "/api/posts",
            method: "POST",
               data: JSON.stringify(newPost)
        }).then(function (postResponse) {
            // console.log(postResponse);
            // var postcard = $("<div>");
            // postcard.addClass("postcard");

            // postcard.append("<p id='newPostItem'>" + postResponse.itemName +"</p>");
            // postcard.append("<img id='newPostImage src='" + postResponse.image + "'>");
            // postcard.append("<p id='newPostDescription'>" + postResponse.description + "</p>");
            // postcard.append("<p id='newPostCategory'>" + postResponse.category + "</p>");
            // postcard.append("<p id='newPostZipcode'>" + postResponse.zipcode + "</p>");

            // $("#feedcontainer").prepend(postcard);
            window.location.href = "/userpage";
        })
    })

    //js for rendering posted item data related to the user
    $("#your-posts").on("click", function () {
    
        $.ajax({
            contentType: "application/JSON",
            url: "/api/yourpost/"+ userId.userId,
            type: "GET",
        }).then(function (postResponse) {
            console.log(postResponse);
            window.location.href = "/api/yourpost/"+userId.userId;
        })
    })
    $(document).on("click", "#deleteButton",function (e) {
        e.preventDefault();
        console.log($(this).attr("data-postID"))
        // var newPost = {
        //     id: $(this).attr("data-postID")
        // }
        // console.log(newPost)
        $.ajax({
            contentType: "application/JSON",
            url: "/api/yourPost/"+$(this).attr("data-postID"),
            method: "DELETE",
            // data: newPost
        }).then(function (postResponse) {
            window.location.href = "/api/yourpost/"+userId.userId;
        })
    });
}
)