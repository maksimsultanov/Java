window.onload = function () {
    var input = document.querySelector(".block__input"); //variable input text
    var btn = document.querySelector(".block__btn"); //variable btn
    var blockList = document.querySelector(".block__list"); //variable content list
    var radio = document.getElementsByName("todo_radio"); //get list of radio btn
    var storageDo = []; //for exchange with local storage
    var storageRadio = "all"; // for change  radio state

    for (var i = 0; i < radio.length; i++) {
        radio[i].onclick = setRadio;
    }

    function setRadio() {
        storageRadio = this.value;
        localStorage.setItem("DoRadio", JSON.stringify(storageRadio));
        window.onload();
    }

    // clear before print new list
    while (blockList.firstChild) {
        blockList.removeChild(blockList.firstChild);
    }

    storageRadio = localStorage.getItem("DoRadio");
    //if in localstorage exist DoList
    if (localStorage.getItem("DoList") != undefined) {
        storageDo = JSON.parse(localStorage.getItem("DoList")); // load todo list from local storage
        if (storageRadio == "\"complete\"") {
            for (let key in storageDo) {
                //pritn only completed Do

                if (storageDo[key].checkState == true) {
                    createDo(storageDo[key].txtDo, storageDo[key].checkState);
                }
            }
        } else if (storageRadio == "\"no complete\"") {
            for (let key in storageDo) {
                //pritn only completed Do
                if (storageDo[key].checkState == false) {
                    createDo(storageDo[key].txtDo, storageDo[key].checkState);
                }
            }
        } else {
            //print all do 
            for (let key in storageDo) {
                createDo(storageDo[key].txtDo, storageDo[key].checkState);
            }
        }
    }


    // ===Start===
    function createDo(txt, checkState) {
        var OneDo = {}; // tmp dict
        var newDo = document.createElement("p"); //new Do objec
        var deleteSpan = document.createElement("span"); // new span object for delete
        var editeSpan = document.createElement("span"); // new span object for edit
        var chBox = document.createElement("input"); //new input for checkbox
        chBox.type = "checkbox"; //set type input as checkbox
        chBox.className = "block__list-check"; // set class for checkbox
        deleteSpan.className = "block__list-delete"; //class delete span
        deleteSpan.textContent = "Delete"; // text for Delete span
        editeSpan.className = "block__list-edite"; //class delete span
        editeSpan.textContent = "Edite"; // text for Delete span
        newDo.className = "block__list-do"; // new Do class
        chBox.value = txt; //set value check box
        newDo.textContent = chBox.value; //set text for Do
        chBox.checked = checkState;
        newDo.appendChild(chBox); //add checkbox
        newDo.appendChild(deleteSpan); // add deletespan
        newDo.appendChild(editeSpan); // add deletespan
        //remember state chekboxes
        chBox.addEventListener("click", function () {
            // find Do in sorage wiht the same value of checkbox
            for (var key in storageDo) {
                if (storageDo[key].txtDo == chBox.value) {
                    storageDo[key].checkState = chBox.checked;
                }
            }
            write_to_localstorage();
        });
        //delete Do from list
        deleteSpan.addEventListener("click", function () {
            var deleteIndex; //index of delete Do
            blockList.removeChild(newDo); //delete from html
            //find index of delete Do
            for (var key in storageDo) {
                if (storageDo[key].txtDo == newDo.textContent) {
                    deleteIndex = storageDo.indexOf(key);
                }
            }
            storageDo.splice(deleteIndex, 1); // delete item from Do array
            write_to_localstorage(); // rewrite localstorage
        });
        //edit Do
        function applyEdite(editIndex) {
            var notTheSameValue = true;
            for (let key in storageDo) {
                if (storageDo[key].txtDo == this.value) {
                    notTheSameValue = false;
                }
            }
            let ch = storageDo[editIndex].checkState;
            if (!((this.value === "Enter text") || (this.value === "")) && notTheSameValue) {
                // chBox.value = this.value; //set value check box
                // newDo.textContent = this.value; //set text for Do
                storageDo[editIndex] = createDo(this.value, ch); //create edite Do
                write_to_localstorage(); //rewrite local storage
                // this.remove();// edit input
                window.onload();
            }
            // this.remove();// edit input
        }
        editeSpan.addEventListener("click", function () {
            var editeInput = document.createElement("input");
            let editeIndex;
            editeInput.type = "text";
            editeInput.className = "edite__input";
            newDo.appendChild(editeInput);
            for (let key in storageDo) {
                if (storageDo[key].txtDo == txt) {
                    editeIndex = storageDo.indexOf(key);
                }
            }
            
            editeInput.ondblclick = applyEdite(editeIndex);
        });
        blockList.appendChild(newDo); //add new Do
        OneDo.txtDo = chBox.value;
        OneDo.checkState = chBox.checked;
        return OneDo;
    }
    // ===End===

    // write to localStorage
    function write_to_localstorage() {
        localStorage.setItem("DoList", JSON.stringify(storageDo));
    }


    //add task into todo list
    btn.addEventListener("click", function (e) {
        e.preventDefault();
        var notTheSameValue = true;
        for (var key in storageDo) {
            if (storageDo[key].txtDo == input.value) {
                notTheSameValue = false;
            }
        }
        if (!((input.value === "Enter text") || (input.value === "")) && notTheSameValue) {
            var i = storageDo.length; //get new last index of sterageDo
            storageDo[i] = createDo(input.value, false); //create new Do
            write_to_localstorage(); //rewrite local storage
            input.value = "Enter text"; //return default value
        }
    });
    // clear input when set focus
    input.addEventListener("focus", function () {
        input.value = "";
    });
    // set input when blur
    input.addEventListener("blur", function () {
        if (input.value === "") {
            input.value = "Enter text";
        }
    });
}