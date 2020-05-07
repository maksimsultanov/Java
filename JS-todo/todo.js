window.onload = function () {
    // ===========VARIABLE=GLOBAL============
    // ================START=================
    //create object for text input field
    var input = document.querySelector(".block__input");
    //create object for btn add
    var btn = document.querySelector(".block__btn");
    //create object for block text do
    var blockList = document.querySelector(".block__list");
    //create object for radio btn filer
    var radio = document.getElementsByName("todo_radio");
    // Temp arrays for Do and radio
    var storageDo = [];
    //tmp var for radio state
    var storageRadio = "all";
    // ===========VARIABLE=GLOBAL============
    // =================END==================

    // ===========FUNCTION=GLOBAL============
    // ================START=================
    // function write to local storage
    function write_into_storage() {
        localStorage.setItem("DoRadio", JSON.stringify(storageRadio));
        localStorage.setItem("DoList", JSON.stringify(storageDo));
    }
    //function read from local storage
    function read_from_storage() {
        storageDo = JSON.parse(localStorage.getItem("DoList"));
        storageRadio = JSON.parse(localStorage.getItem("DoRadio"));
    }
    // function cleare list Do on the form
    function clear_listDo() {
        while (blockList.firstChild) {
            blockList.removeChild(blockList.firstChild);
        }
    }
    // function for print DoList with filter
    function filtered_printDo() {
        if ((localStorage.getItem("DoList") != undefined)) {
            // if DoList exist in local storage read it
            read_from_storage();
            if (storageRadio == "complete") {
                // if filtered only complete Do
                for (let key in storageDo) {
                    if (storageDo[key].checkState) {
                        createDo(storageDo[key].txtDo, storageDo[key].checkState);
                    }
                }
            } else if (storageRadio == "no complete") {
                for (let key in storageDo) {
                // if filtered only no complete Do
                if (!storageDo[key].checkState) {
                        createDo(storageDo[key].txtDo, storageDo[key].checkState);
                    }
                }
            } else if ((storageRadio == undefined) || (storageRadio == "all")) {
                // if filtered all Do
                for (let key in storageDo) {
                    createDo(storageDo[key].txtDo, storageDo[key].checkState);
                }
            }
        }
    }
    // function create do and set queries for object
    function createDo(txt, checkState) {
        // temp dict for new do
        let oneDo = {};
        // new do object
        let newDo = document.createElement("p");
        // create text field for new Do
        let text_newDo = document.createElement("input");
        // create new span for delete
        let deleteSpan = document.createElement("span");
        // create new input for check box
        let chBox = document.createElement("input");
        // create edit span
        let editSpan = document.createElement("span");
        // set newDo class
        newDo.className = "block__list-do";
        // set text new Do
        text_newDo.className = "block__list-do-input";
        text_newDo.type = "text";
        text_newDo.value = txt;
        text_newDo.placeholder = txt;
        // append text new Do to the new Do
        newDo.appendChild(text_newDo);
        // set chBox for new Do
        chBox.className = "block__list-check";
        chBox.type = "checkbox";
        chBox.checked = checkState;
        // append chBox to new Do
        newDo.appendChild(chBox);
        // create event listener for chekbox
        chBox.addEventListener("click", function () {
            // find the same element in sorage Do and remember it
            for (let key in storageDo) {
                if (storageDo[key].txtDo == this.parentElement.firstChild.value) {
                    storageDo[key].checkState = this.checked;
                }
            }
            // rewrite local storage
            write_into_storage();
        });
        // set edit span
        editSpan.className = "block__list-edite";
        editSpan.textContent = "Save";
        // append edit span
        newDo.appendChild(editSpan);
        // create event listener for edit span
        editSpan.addEventListener("click", function(){
            editInput = this.parentNode.querySelector(".block__list-do-input");
            if (editInput.value != editInput.placeholder){
                if (!(the_sameDo(editInput.value)) || (editInput.value == "")) {
                    // if empty or the same Do return old text
                    editInput.value = editInput.placeholder;
                }
                else {
                    // find Do with old text and update it
                    storageDo[storageDo.findIndex(ei => ei.txtDo == editInput.placeholder)].txtDo = editInput.value;
                    editInput.placeholder = editInput.value;
                    // rewrite local storage
                    write_into_storage();
                }
            }
        });
        //set delete span
        deleteSpan.className = "block__list-delete";
        deleteSpan.textContent = "Delete";
        // append deletespan into the new Do
        newDo.appendChild(deleteSpan);
        // create event listener for delete
        deleteSpan.addEventListener("click", function () {
            // delete from storageDo
            storageDo.splice(storageDo.findIndex(x => x.txtDo == this.parentElement.firstChild.value), 1);
            // rewrite local storage
            write_into_storage();
            // delete from block list
            blockList.removeChild(this.parentNode);
        });
        // append new Do in the Do list
        blockList.appendChild(newDo);
        // append new do in the tmp dict
        oneDo.txtDo = text_newDo.value;
        oneDo.checkState = chBox.checked;
        return oneDo;
    }
    // check exist the same Do
    function the_sameDo(txt) {
        let notTheSameDo = true;
        // storageDo.forEach(oneDo => {
        //     if (oneDo.txt == txt) {
        //         notTheSameDo = false;
        //     }
        //     console.log(notTheSameDo);
        // });
        for (let key in storageDo) {
            if (storageDo[key].txtDo == txt){
                return false;
            }
        }
        return notTheSameDo;
    }
    // function for set value radio
    function setRadio() {
        storageRadio = this.value;
        write_into_storage();
        window.onload();
    }
    // ===========FUNCTION=GLOBAL============
    // =================END==================

    // ===========EVENTS=GLOBAL============
    // ================START===============
    // event for radio btn
    for (let i = 0; i < radio.length; i++) {
        radio[i].onclick = setRadio;
    }
    // add task into todo list
    btn.addEventListener("click", function (e) {
        e.preventDefault();
        if (!((input.value === "Enter text") || (input.value === "")) && (the_sameDo(input.value))) {
            let i = storageDo.length;
            storageDo[i] = createDo(input.value, false);
            write_into_storage();
            input.value = "Enter text";
        }
    });
    // clr when set focus on input
    input.addEventListener("focus", function () {
        input.value = "";
    });
    input.addEventListener("blur", function () {
        if (input.value == "") {
            input.value = "Enter text";
        }
    });
    // ===========EVENTS=GLOBAL============
    // =================END================
    
    // all times on load
    // clear list in document
    clear_listDo();
    // prin with radio options
    filtered_printDo();
}