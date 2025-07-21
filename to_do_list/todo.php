<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./todo.css">
    <title>To Do List</title>
</head>

<body>

    <div class="to_do">
        <div class="content">
            <h1>To Do List</h1>

            <div class="display">
                <!-- <div class="data">
                    <p class="todo_text">Doin' CRUD with Ajax and PHP</p>
                    <p class="data_hour">07/20/2025 11:32 PM</p>
                    <div class="buttons">
                        <button data-state="false"><img width="50" height="50" src="https://img.icons8.com/ios-filled/50/40C057/filled-circle.png" alt="filled-circle"/></button>
                        <button><img width="50" height="50" src="https://img.icons8.com/color/50/cancel--v1.png" alt="cancel--v1"/></button>
                        <button><img width="67" height="67" src="https://img.icons8.com/external-others-inmotus-design/67/external-Edit-virtual-keyboard-others-inmotus-design.png" alt="external-Edit-virtual-keyboard-others-inmotus-design"/></button>
                    </div>
                </div> -->
            </div>

            <form class="form">
                <input required type="text" name="text" placeholder="Message" autocomplete="off" id="text">
                <button class="submit_btn" type="submit" data-action="add_task"><p>+</p></button>
            </form>


            <div class="modal_msg"></div>
        </div>
    </div>


    <script src="todo.js"></script>

</body>

</html>