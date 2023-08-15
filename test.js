$(function() {
    let current_amount = 0;
    let intervalId;
    let isHovering = false;
    let debounceInterval = 100; // Debounce interval time in milliseconds

    var div = $('.btns_container');
    var width = div.width() * (100 / 100);
    div.css('height', width);

    setInterval(oneSecondFunction, 200);

    function oneSecondFunction() {
        var div = $('.btns_container');
        var width = div.width() * (50 / 100);
        div.css('height', width);
    }

    // Track mouse movement over btn_2 to reset inactivityTime and trigger hover behavior
    $(".btn_2").mousemove(function() {
        if (!isHovering) {
            isHovering = true;
            intervalId = setInterval(function() {
                current_amount += 3 * comboValue;
                update_score();
                if (hoverTime < 5) {
                    hoverTime++;
                    console.log("Hover time increased:", hoverTime);
                    handleHover(true);
                }
            }, debounceInterval); // Debounce the interval start
        }
        resetInactivity();
    });

    $(".btn_2").mouseout(function() {
        console.log("Mouse left btn_2");
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
        isHovering = false;
        hoverTime = 0;
        handleHover(false);
        update_combo();

    },
    function() {
        console.log("Hover ended");
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
        isHovering = false;
        hoverTime = 0; // Reset hoverTime when hover ends
        resetInactivity();
    
    });

    // ...

   // Function to handle button hover
   function handleHover(isHoverStart) {
        if (isHoverStart) {
            console.log("handleHover() called!");
            hoverTime = Math.min(5, hoverTime + 1); // Increase hover time, max value is 5
            console.log("Hover time increased:", hoverTime);
        } else {
            hoverTime = 0; // Reset hover time
            console.log("Hover time reset");
        }
        resetInactivity(); // Reset inactivity when hovering changes
    }

    
    $(".btn_4").click(function() {
        resetInactivity()
        setInterval(current_amount += parseInt($(this).text().replace("+", "") * comboValue), 50);
        update_score();
        update_combo();
        comboValue = comboValue + 5;
    });
    
    $(".btn_3").click(function() {
        resetInactivity()
        current_amount += parseInt($(this).text().replace("+", "") * comboValue);
        update_score();
        handleClick();
        update_combo();
    });

    $(".btn_1").hover(function() {
        resetInactivity()
        setInterval(current_amount += parseInt($(this).text().replace("+", "") * comboValue), 50);
        update_score();
        handleClick();
        update_combo();
    });


    function update_score() {
        var scoreDisplay = document.getElementsByClassName('score_display')[0];
        scoreDisplay.innerHTML = current_amount;

        // Add animation class
        scoreDisplay.classList.add('animate_score');

        // Remove animation class after a delay
        setTimeout(function() {
            scoreDisplay.classList.remove('animate_score');
        }, 25); // Adjust the delay as needed (e.g., 1000ms = 1 second)
    }

    let comboValue = 1;
    let hoverTime = 0;
    let clickCount = 0;
    let inactivityTime = 0;

    // Interval to check and update the combo
    setInterval(() => {
        console.log("hoverTime:", hoverTime);
        console.log("clickCount:", clickCount);
        console.log("inactivityTime:", inactivityTime);
    
        if (clickCount >= 5) {
            comboValue++;
            console.log("Combo increased! New comboValue:", comboValue);
            clickCount = 0; // Reset clickCount after reaching 5
        } else if (clickCount > 0) {
            clickCount = 0; // Reset clickCount if clicked once
        }
    
        if (hoverTime >= 5) {
            comboValue++;
            console.log("Combo increased! New comboValue:", comboValue);
            hoverTime = 0; // Reset hoverTime after increasing combo
        }
    
        if (inactivityTime >= 1 && comboValue > 1) {
            comboValue = 1; // Reset comboValue if no interaction for 1 second
            console.log("Combo reset!");
            inactivityTime = 0; // Reset inactivityTime
        } else if (hoverTime === 0 && clickCount === 0) {
            inactivityTime++;
        }
    
        update_combo(); // Update combo display value
    
    }, 1000);

    // Function to handle button click
    function handleClick() {
        console.log("handleClick() called!");
        clickCount++;
        inactivityTime = 0; // Reset inactivityTime when interaction occurs
    }

    // Function to update combo display
    function update_combo() {
        var comboDisplay = document.getElementsByClassName('combo_display')[0];
        comboDisplay.innerHTML = "x" + comboValue;
    }

function resetInactivity() {
    inactivityTime = 0; // Reset inactivityTime when interaction occurs
}
});

let offset_left = "-20%";
let offset_top = "-120%";
let offset_rotate = "90deg";
let offset_scale = "150%";

var r = document.querySelector(':root');

function get_var() {
var rs = getComputedStyle(r);
}

function change_btn_offset_left() {
r.style.setProperty('--left_mod', offset_left);
}

function change_btn_offset_top() {
r.style.setProperty('--top_mod', offset_top);

}

function change_btn_offset_rotate() {
r.style.setProperty('--rotate_mod', offset_rotate);

}

function fix_btn_offset_rotate() {
r.style.setProperty('--rotate_fix', "-" + offset_rotate);
    
    }

function change_btn_offset_scale() {
r.style.setProperty('--scale_mod', offset_scale);

}

function randomizemod1() {
    
    fix_btn_offset_rotate();
    change_btn_offset_rotate();

    change_btn_offset_left();

    change_btn_offset_top();

    change_btn_offset_scale();

}


function randomizemodvalues() {

offset_rotate = Math.floor((Math.random() * 500) + 1) + "deg";
offset_scale = Math.max(Math.min(Math.floor((Math.random() * 500) + 1), 150), 25) + "%";
offset_left = Math.floor((Math.random() * 10) + 1) + "%";
offset_top = Math.floor((Math.random() * 10) + 1) + "%";

}

setInterval(randomizemodvalues, 500);

setInterval(randomizemod1, 20000);
