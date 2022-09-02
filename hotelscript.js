var rooms = []; // Highend 0:5, Midrange 6:11, Budget 12:17

function Start() {
    var arr = JSON.parse(localStorage.getItem("rooms"));
    if(arr == null) {
        rooms = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    } else {
        rooms = arr;
    }
    //generates price for each room type
    let room_price = {
        "Highend": Math.floor((Math.random() * (400 - 100 + 1)) + 100),
        "Midrange": Math.floor((Math.random() * (300 - 100 + 1)) + 100),
        "Budget": Math.floor((Math.random() * (200 - 100 + 1)) + 100)
    }; 

    //array of sorted rooms/prices
    let prc_srt = []; 
    for (let type in room_price) {
        prc_srt.push([type, room_price[type]]);
    }
    prc_srt.sort(function (a, b) {
        return a[1] - b[1];
    });//sorts rooms according to price in ascending order
    displayInfo(prc_srt)
}

// checks room availibility
function getAvailibility(rm_type) {
    let rm_avl;
    if (rm_type == "Highend") {
        if (rooms.slice(0,6).includes(0) == true) {
            rm_avl = "Available";
          } else {
            rm_avl = "Unavailable";
          }
    } else if (rm_type == "Midrange") {
        if (rooms.slice(6,12).includes(0) == true) {
            rm_avl = "Available";
          } else {
            rm_avl = "Unavailable";
          }
    } else if (rm_type == "Budget") {
        if (rooms.slice(12,18).includes(0) == true) {
            rm_avl = "Available";
          } else {
            rm_avl = "Unavailable";
          }
        }
        return rm_avl
}

//displays information about room type, price, and availibility
function displayInfo(prc_srt) {
    if (getAvailibility(prc_srt[0][0]) == "Unavailable" && getAvailibility(prc_srt[1][0]) == "Unavailable" && getAvailibility(prc_srt[2][0]) == "Unavailable") {
        window.alert("NO VACANT. COME BACK LATER")
    } 

    if (getAvailibility(prc_srt[0][0]) == "Available") {
        document.getElementById("ltype").innerHTML = prc_srt[0][0];
        document.getElementById("lprc").innerHTML = "Room Price: $" + prc_srt[0][1];
        document.getElementById("lavl").innerHTML = "Room Status: " + getAvailibility(prc_srt[0][0]);
    } else {
        document.getElementById("ltype").innerHTML = prc_srt[0][0];
        document.getElementById("lprc").innerHTML = "Room Price: $" + prc_srt[0][1];
        document.getElementById("lavl").innerHTML = "Room Status: " + getAvailibility(prc_srt[0][0]);
        document.getElementById("lowest").value= "Unavailable";
        document.getElementById("lowest").disabled = true;
    }

    if (getAvailibility(prc_srt[1][0]) == "Available") {
        document.getElementById("mtype").innerHTML = prc_srt[1][0];
        document.getElementById("mprc").innerHTML = "Room Price: $" + prc_srt[1][1];
        document.getElementById("mavl").innerHTML = "Room Status: " + getAvailibility(prc_srt[1][0]);
    } else {
        document.getElementById("mtype").innerHTML = prc_srt[1][0];
        document.getElementById("mprc").innerHTML = "Room Price: $" + prc_srt[1][1];
        document.getElementById("mavl").innerHTML = "Room Status: " + getAvailibility(prc_srt[1][0]);
        document.getElementById("middle").value= "Unavailable";
        document.getElementById("middle").disabled = true;
    } 

    if (getAvailibility(prc_srt[2][0]) == "Available") {
        document.getElementById("htype").innerHTML = prc_srt[2][0];
        document.getElementById("hprc").innerHTML = "Room Price: $" + prc_srt[2][1];
        document.getElementById("havl").innerHTML = "Room Status: " + getAvailibility(prc_srt[2][0]);
    } else {
        document.getElementById("htype").innerHTML = prc_srt[2][0];
        document.getElementById("hprc").innerHTML = "Room Price: $" + prc_srt[2][1];
        document.getElementById("havl").innerHTML = "Room Status: " + getAvailibility(prc_srt[2][0]);
        document.getElementById("highest").value= "Unavailable";
        document.getElementById("highest").disabled = true;
    }

    //for booking buttons relative to each options
    var bookL = document.getElementById("lowest");
    var bookM = document.getElementById("middle");
    var bookH = document.getElementById("highest");


    bookL.addEventListener("click", function() {bookLow(prc_srt);}, false);
    bookM.addEventListener("click", function() {bookMid(prc_srt);}, false);
    bookH.addEventListener("click", function() {bookHigh(prc_srt);}, false);

}

//for booking of lowest priced item
function bookLow(prc_srt) {
    rm_info = prc_srt

    let ltype = rm_info[0][0]
    let lprc = rm_info[0][1]
    let lnum;
    if (ltype == "Highend") {
        lnum = rooms.slice(0,6).indexOf(0) + 1;
    } else if (ltype == "Midrange") {
        lnum = rooms.slice(6,12).indexOf(0) + 7;
    } else if (ltype == "Budget") {
        lnum = rooms.slice(12,18).indexOf(0) + 13;
    }
    rooms[lnum - 1] = 1;
    localStorage.setItem("rooms", JSON.stringify(rooms));

    let name = window.prompt("Please enter your name");

    document.write("<body style=\"background-color:rgb(149,130,142); align:center; font-color:rgb(102,72,106); font-size: 20px; \">");
    document.write("Thank you " + name + ", You have successfully booked " + ltype + " room number " + lnum + " for $" + lprc)

}

//for booking of middle priced item
function bookMid(prc_srt) {
    rm_info = prc_srt

    let mtype = rm_info[1][0];
    let mprc = rm_info[1][1];
    let mnum;
    if (mtype == "Highend") {
        mnum = rooms.indexOf(0) + 1;
    } else if (mtype == "Midrange") {
        mnum = rooms.slice(6,12).indexOf(0) + 7;
    } else if (mtype == "Budget") {
        mnum = rooms.slice(12,18).indexOf(0) + 13;
    }

    rooms[mnum - 1] = 1;
    localStorage.setItem("rooms", JSON.stringify(rooms));

    let name = window.prompt("Please enter your name");
    document.write("<body style=\"background-color:rgb(149,130,142); align:center; font-color:rgb(102,72,106); font-size: 20px; \">");
    document.write("Thank you " + name + ", You have successfully booked " + mtype + " room number " + mnum + " for $" + mprc)
}

//for booking of highest priced item
function bookHigh(prc_srt) {
    rm_info = prc_srt

    let htype = rm_info[2][0];
    let hprc = rm_info[2][1];
    let hnum;
    if (htype == "Highend") {
        hnum = rooms.indexOf(0) + 1;
    } else if (htype == "Midrange") {
        hnum = rooms.slice(6,12).indexOf(0) + 7;
    } else if (htype == "Budget") {
        hnum = rooms.slice(12,18).indexOf(0) + 13;
    }

    rooms[hnum - 1] = 1;
    localStorage.setItem("rooms", JSON.stringify(rooms));

    let name = window.prompt("Please enter your name");
    document.write("<body style=\"background-color:rgb(149,130,142); align:center; font-color:rgb(102,72,106); font-size: 20px; \">");
    document.write("Thank you " + name + ", You have successfully booked " + htype + " room number " + hnum + " for $" + hprc)
}


window.addEventListener("load", Start(), false);

