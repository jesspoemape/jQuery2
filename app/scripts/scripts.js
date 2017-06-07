$(document).ready(function() {
    //ALL CODE GOES IN HERE

    // this hides the new task form 
    $("#newTaskForm").hide();

    //to advance the task
    var advanceTask = function(task) {
        var modified = task.innerText.trim()
        for (var i = 0; i < listo.length; i++) {
            if (listo[i].task === modified) {
                if (listo[i].id === "new") {
                    listo[i].id = "inProgress";
                } 
                else if (listo[i].id === "inProgress") {
                    listo[i].id = "archived";
                }
                else {
                    listo.splice(i, 1);
                }
                break;
            }
        }
        task.remove();
    }

    var listo = [];

    var Task = function(task) {
        this.task = task;
        this.id = "new";
    }

    var addTask = function(task) {
        if(task) {
            task = new Task(task);
            listo.push(task);

            $("#newItemInput").val('');
                $("#newList").append(
                    "<a href='#finish' class='' id='item'>" +
                    "<li class='list-group-item'>" +
                    "<h3>" + task.task + "</h3>" +
                    "<span class='arrow pull-right'>" +
                    "<i class='glyphicon glyphicon-arrow-right'>" + 
                    "</span>" + 
                    "</li>" +
                    "</a>"
                );
        }
        // new button will hide, and show the input form at the same time 
        $("#newTaskForm").slideToggle("fast", "linear");
    };
// calls the addTask function when we click the saveNewItem button
    $("#saveNewItem").on("click", function(e) {
        e.preventDefault();
        var task = $("#newItemInput").val().trim();
        addTask(task);
    })

    //opens form
    $("#add-todo").on("click", function() {
        $("#newTaskForm").fadeToggle("fast", "linear");
    });

    //closes form
    $("#cancel").on("click", function (e) {
        e.preventDefault();
        $("#newTaskForm").fadeToggle("fast", "linear");
    });

    //change the status of an item from "new" to "inProgress"
    // we call the document so that as we create and manipulate items, the DOM realizes they are there
    //e.preventDefault prevents the default action from beign triggered
    $(document).on("click", "#item", function(e) {
        e.preventDefault();
        var task = this;
        advanceTask(task);
        this.id = "inProgress";
    })

    });