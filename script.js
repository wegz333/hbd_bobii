$(document).ready(function() {
    var envelope = $('#envelope');
    var btn_open = $("#open");
    var btn_reset = $("#reset");
    var music = $("#backgroundMusic")[0];

    // Open the envelope and show the words, hearts, and balloons
    btn_open.click(function() {
        open();
    });

    // Reset the envelope to its initial state
    btn_reset.click(function() {
        close();
    });

    function open() {
        // Open the envelope
        envelope.addClass("open").removeClass("close");

        music.play();

        // First triggering of heart animations
        triggerHeartAnimations();

        // Trigger the second sequence of heart animations after 6 seconds
        setTimeout(function() {
            resetHearts(); // Reset the hearts to initial state
            triggerHeartAnimations(); // Re-trigger heart animations from inside the envelope
        }, 6000);  // 6000 milliseconds delay (6 seconds)
    }

    function close() {
        // Close the envelope and reset everything
        envelope.removeClass("open").addClass("close");
        $(".words").css({
            "opacity": "0",
            "transform": "translateY(50px)"
        });
        $(".balloon").css({
            "opacity": "0",
            "transform": "translateY(0)"
        });
        $(".heart").removeClass("animate").css({
            "opacity": "0",
            "left": "0%",
            "bottom": "0"
        });
    }

    function triggerHeartAnimations() {
        // Trigger hearts animation with random position and delay
        $(".heart").each(function(index) {
            var randomDelay = Math.random() * 1500; // Randomize delay
            var randomAnimationDuration = 4 + Math.random() * 2; // Randomize animation speed
            var positionZone = Math.floor(Math.random() * 3);  // Randomly pick a zone: 0 = left, 1 = center, 2 = right
            var leftPosition;

            if (positionZone === 0) {
                // Left zone
                leftPosition = Math.random() * 30;
            } else if (positionZone === 1) {
                // Center zone
                leftPosition = 35 + Math.random() * 30;
            } else {
                // Right zone
                leftPosition = 70 + Math.random() * 30;
            }

            $(this).css({
                "left": leftPosition + "%",
                "animation-delay": randomDelay + "ms",
                "animation-duration": randomAnimationDuration + "s",
                "opacity": "0", // Start with opacity 0
                "bottom": "0" // Start at the bottom inside the envelope
            });

            // Start the animation
            $(this).addClass("animate").css("opacity", "1"); // Ensure visibility
        });
    }

    function resetHearts() {
        // Reset the hearts back to the original position (inside the envelope)
        $(".heart").each(function() {
            $(this).removeClass("animate").css({
                "opacity": "0",
                "bottom": "0",  // Start position inside the envelope
                "left": "50%",  // Optional: reset horizontal position to the center (adjust as needed)
                "animation-delay": "0ms",
                "animation-duration": "0s"
            });
        });
    }
});
