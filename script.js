/* ==========================================================
   SCRIPT.JS — PART 1
   Core Engine + Phase Navigation + Dots + Line Reveal
   Continue directly into Part 2
========================================================== */

/* ==========================================================
   DOM READY
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================================
       ELEMENTS
    ====================================================== */

    const phases =
    document.querySelectorAll(".phase");

    const dots =
    document.querySelectorAll(".dot");

    const nextButtons =
    document.querySelectorAll(".next-btn");

    const transitionOverlay =
    document.getElementById(
        "transition-overlay"
    );

    let currentPhase = 0;

    /* ======================================================
       INITIALIZE
    ====================================================== */

    initializeWebsite();

    function initializeWebsite(){

        showPhase(0);

        setupNextButtons();

        revealLines(
            document.querySelector(
                "#phase0"
            )
        );
    }

    /* ======================================================
       SHOW PHASE
    ====================================================== */

    function showPhase(index){

        phases.forEach((phase)=>{

            phase.classList.remove(
                "active"
            );

        });

        if(phases[index]){

            phases[index]
            .classList.add(
                "active"
            );

            currentPhase = index;

            updateDots(index);

            revealLines(
                phases[index]
            );
        }
    }

    /* ======================================================
       UPDATE DOTS
    ====================================================== */

    function updateDots(index){

        dots.forEach((dot)=>{

            dot.classList.remove(
                "active"
            );

        });

        if(dots[index]){

            dots[index]
            .classList.add(
                "active"
            );

        }
    }

    /* ======================================================
       NEXT BUTTONS
    ====================================================== */

    function setupNextButtons(){

        nextButtons.forEach((button)=>{

            button.addEventListener(
                "click",
                ()=>{

                    const next =
                    Number(
                        button.dataset.next
                    );

                    phaseTransition(
                        next
                    );

                }
            );

        });

    }

    /* ======================================================
       TRANSITION EFFECT
    ====================================================== */

    function phaseTransition(nextPhase){

        if(
            !phases[nextPhase]
        ){
            return;
        }

        transitionOverlay.classList.add(
            "active"
        );

        setTimeout(()=>{

            showPhase(
                nextPhase
            );

        },350);

        setTimeout(()=>{

            transitionOverlay.classList.remove(
                "active"
            );

        },800);
    }

    /* ======================================================
       LINE BY LINE REVEAL
    ====================================================== */

    function revealLines(container){

        if(!container){
            return;
        }

        const lines =
        container.querySelectorAll(
            ".line"
        );

        lines.forEach(
            (line,index)=>{

                line.classList.remove(
                    "show"
                );

                setTimeout(()=>{

                    line.classList.add(
                        "show"
                    );

                }, index * 400);

            }
        );

    }

    /* ======================================================
       PHASE DOT CLICK SUPPORT
    ====================================================== */

    dots.forEach((dot)=>{

        dot.addEventListener(
            "click",
            ()=>{

                const phaseIndex =
                Number(
                    dot.dataset.phase
                );

                phaseTransition(
                    phaseIndex
                );

            }
        );

    });

    /* ======================================================
       EXPOSE GLOBALLY
    ====================================================== */

    window.phaseTransition =
    phaseTransition;

    window.showPhase =
    showPhase;

    window.revealLines =
    revealLines;

    /* ======================================================
       CONTINUE IN PART 2
       - POPUPS
       - STAR BUTTONS
       - ENVELOPE SYSTEM
    ====================================================== */

});
/* ==========================================================
   SCRIPT.JS — PART 2
   Popups + Hidden Letters + Envelope System
   Continue INSIDE the same DOMContentLoaded block
   Place this directly BEFORE the closing });

   from Part 1
========================================================== */

/* ======================================================
   POPUP SYSTEM
====================================================== */

const popupTriggers =
document.querySelectorAll(
    ".hidden-trigger"
);

const popupOverlays =
document.querySelectorAll(
    ".popup-overlay"
);

const popupCloseButtons =
document.querySelectorAll(
    ".close-popup"
);

/* ======================================================
   OPEN POPUPS
====================================================== */

popupTriggers.forEach((trigger)=>{

    trigger.addEventListener(
        "click",
        ()=>{

            const popupId =
            trigger.dataset.popup;

            const popup =
            document.getElementById(
                popupId
            );

            if(popup){

                popup.classList.add(
                    "show"
                );

            }

        }
    );

});

/* ======================================================
   CLOSE BUTTON
====================================================== */

popupCloseButtons.forEach((button)=>{

    button.addEventListener(
        "click",
        ()=>{

            const popup =
            button.closest(
                ".popup-overlay"
            );

            if(popup){

                popup.classList.remove(
                    "show"
                );

            }

        }
    );

});

/* ======================================================
   CLICK OUTSIDE TO CLOSE
====================================================== */

popupOverlays.forEach((popup)=>{

    popup.addEventListener(
        "click",
        (event)=>{

            if(
                event.target === popup
            ){

                popup.classList.remove(
                    "show"
                );

            }

        }
    );

});

/* ======================================================
   ESC KEY CLOSE
====================================================== */

document.addEventListener(
    "keydown",
    (event)=>{

        if(
            event.key === "Escape"
        ){

            popupOverlays.forEach(
                (popup)=>{

                    popup.classList.remove(
                        "show"
                    );

                }
            );

        }

    }
);

/* ======================================================
   ENVELOPE OPENING
====================================================== */

const envelopeOne =
document.getElementById(
    "envelopeOne"
);

if(envelopeOne){

    envelopeOne.addEventListener(
        "click",
        ()=>{

            envelopeOne.classList.add(
                "open"
            );

            setTimeout(()=>{

                envelopeOne.innerHTML =
                "💌";

            },500);

        }
    );

}

/* ======================================================
   FINAL LETTER ENVELOPE
====================================================== */

const finalEnvelope =
document.getElementById(
    "finalEnvelope"
);

const finalLetterPopup =
document.getElementById(
    "finalLetterPopup"
);

if(
    finalEnvelope &&
    finalLetterPopup
){

    finalEnvelope.addEventListener(
        "click",
        ()=>{

            finalLetterPopup.classList.add(
                "show"
            );

        }
    );

}

/* ======================================================
   ENVELOPE FLOAT EFFECT
====================================================== */

const allEnvelopes =
document.querySelectorAll(
    ".envelope, .final-envelope"
);

allEnvelopes.forEach(
    (envelope)=>{

        let rotation = 0;

        setInterval(()=>{

            rotation += 0.4;

            envelope.style.transform =
            `translateY(${
                Math.sin(rotation)*5
            }px)`;

        },30);

    }
);

/* ======================================================
   BUTTON PRESS MICRO ANIMATION
====================================================== */

const allButtons =
document.querySelectorAll(
    "button"
);

allButtons.forEach((button)=>{

    button.addEventListener(
        "click",
        ()=>{

            button.animate(
                [
                    {
                        transform:
                        "scale(1)"
                    },
                    {
                        transform:
                        "scale(.94)"
                    },
                    {
                        transform:
                        "scale(1)"
                    }
                ],
                {
                    duration:250
                }
            );

        }
    );

});

/* ======================================================
   CONTINUE IN PART 3
   - MUSIC BUTTON
   - FLOATING HEARTS
   - PARTICLE SYSTEM
====================================================== */
/* ==========================================================
   SCRIPT.JS — PART 3
   Music Toggle + Floating Hearts + Particle System
   Continue INSIDE the same DOMContentLoaded block
========================================================== */

/* ======================================================
   MUSIC SYSTEM
====================================================== */

const musicButton =
document.querySelector(".music-btn");

const bgMusic =
document.getElementById("bgMusic");

let musicPlaying = false;

if(musicButton && bgMusic){

    musicButton.addEventListener(
        "click",
        ()=>{

            if(!musicPlaying){

                bgMusic.play()
                .then(()=>{

                    musicPlaying = true;

                    musicButton.innerHTML =
                    "🔊";

                })
                .catch(()=>{

                    console.log(
                        "Audio blocked until user interaction."
                    );

                });

            }else{

                bgMusic.pause();

                musicPlaying = false;

                musicButton.innerHTML =
                "🔇";
            }

        }
    );

}

/* ======================================================
   PARTICLE SYSTEM
====================================================== */

const particleContainer =
document.getElementById(
    "particle-container"
);

function createParticle(){

    if(!particleContainer){
        return;
    }

    const particle =
    document.createElement("span");

    const symbols = [

        "💗",
        "✨",
        "⭐",
        "💖",
        "🌸"

    ];

    particle.classList.add(
        "particle"
    );

    particle.innerHTML =
    symbols[
        Math.floor(
            Math.random() *
            symbols.length
        )
    ];

    particle.style.left =
    Math.random() * 100 + "%";

    particle.style.fontSize =
    (
        Math.random() * 18 + 12
    ) + "px";

    particle.style.animationDuration =
    (
        Math.random() * 8 + 8
    ) + "s";

    particleContainer.appendChild(
        particle
    );

    setTimeout(()=>{

        particle.remove();

    },17000);

}

setInterval(
    createParticle,
    500
);

/* ======================================================
   HEART BURST EFFECT
====================================================== */

function createHeartBurst(
    x,
    y,
    amount = 5
){

    for(
        let i = 0;
        i < amount;
        i++
    ){

        const heart =
        document.createElement(
            "div"
        );

        heart.classList.add(
            "floating-heart"
        );

        heart.innerHTML =
        ["💗","💖","💕","💘"][
            Math.floor(
                Math.random()*4
            )
        ];

        heart.style.left =
        x + "px";

        heart.style.top =
        y + "px";

        heart.style.fontSize =
        (
            Math.random()*18+18
        ) + "px";

        heart.style.transform =
        `translate(
            ${Math.random()*120-60}px,
            ${Math.random()*50}px
        )`;

        document.body.appendChild(
            heart
        );

        setTimeout(()=>{

            heart.remove();

        },3000);

    }

}

window.createHeartBurst =
createHeartBurst;

/* ======================================================
   GLOBAL HEART CLICK EFFECT
====================================================== */

document.addEventListener(
    "click",
    (event)=>{

        createHeartBurst(
            event.clientX,
            event.clientY,
            3
        );

    }
);

/* ======================================================
   FLOATING MESSAGE ANIMATION
====================================================== */

const floatingMessages =
document.querySelectorAll(
    ".floating-message"
);

floatingMessages.forEach(
    (message)=>{

        let direction = 1;

        setInterval(()=>{

            const current =
            Number(
                message.dataset.pos || 0
            );

            let next =
            current + direction;

            if(next > 40){

                direction = -1;
            }

            if(next < -40){

                direction = 1;
            }

            message.dataset.pos =
            next;

            message.style.transform =
            `translateX(${next}px)`;

        },60);

    }
);

/* ======================================================
   AUTO ENTRANCE ANIMATIONS
====================================================== */

const animatedElements =
document.querySelectorAll(

    ".phase-title," +
    ".letter-card," +
    ".solution-card," +
    ".gif-large," +
    ".gif-medium," +
    ".gif-small"

);

animatedElements.forEach(
    (element)=>{

        element.classList.add(
            "fade-up"
        );

    }
);

/* ======================================================
   CONTINUE IN PART 4
   - FORGIVE METER
   - CONFETTI SYSTEM
   - CELEBRATION UNLOCK
====================================================== */
/* ==========================================================
   SCRIPT.JS — PART 4
   Forgive Meter + Confetti + Celebration Unlock
   Continue INSIDE the same DOMContentLoaded block
========================================================== */

/* ======================================================
   FORGIVE METER
====================================================== */

const meterFill =
document.getElementById(
    "meterFill"
);

const meterPercent =
document.getElementById(
    "meterPercent"
);

const meterMessage =
document.getElementById(
    "meterMessage"
);

const forgiveBtn =
document.getElementById(
    "forgiveBtn"
);

const unlockCelebrationBtn =
document.getElementById(
    "unlockCelebrationBtn"
);

let forgiveness = 0;

/* ======================================================
   MESSAGES
====================================================== */

const forgivenessMessages = {

    10:
    "Oh... he actually pressed it 👀",

    20:
    "He's thinking about it... 🥺",

    30:
    "Something is softening in there... 💙",

    40:
    "Halfway to forgiveness 😭",

    50:
    "He's coming around omg 🎉",

    60:
    "I can feel it... 💗",

    70:
    "The walls are coming down 🌸",

    80:
    "Almost there... please 😍",

    90:
    "ONE MORE PRESS JAANA 😭💗",

    100:
    "HE FORGAVE ME 🎉💗"
};

/* ======================================================
   BUTTON CLICK
====================================================== */

if(forgiveBtn){

    forgiveBtn.addEventListener(
        "click",
        ()=>{

            if(
                forgiveness >= 100
            ){
                return;
            }

            forgiveness += 10;

            updateMeter();

            createHeartBurst(
                window.innerWidth / 2,
                window.innerHeight / 2,
                6
            );

        }
    );

}

/* ======================================================
   UPDATE METER
====================================================== */

function updateMeter(){

    meterFill.style.height =
    forgiveness + "%";

    meterPercent.textContent =
    forgiveness + "%";

    if(
        forgivenessMessages[
            forgiveness
        ]
    ){

        meterMessage.textContent =
        forgivenessMessages[
            forgiveness
        ];

    }

    if(
        forgiveness === 100
    ){

        meterFill.style.boxShadow =
        `
        0 0 30px #fff,
        0 0 60px #ffb6c1
        `;

        forgiveBtn.disabled = true;

        forgiveBtn.textContent =
        "Forgiven 💗";

        launchConfetti(
            120
        );

        unlockCelebrationBtn.style.display =
        "inline-flex";
    }

}

/* ======================================================
   CELEBRATION BUTTON
====================================================== */

if(
    unlockCelebrationBtn
){

    unlockCelebrationBtn.addEventListener(
        "click",
        ()=>{

            phaseTransition(
                14
            );

        }
    );

}

/* ======================================================
   CONFETTI SYSTEM
====================================================== */

const confettiContainer =
document.getElementById(
    "confetti-container"
);

function launchConfetti(
    amount = 60
){

    if(
        !confettiContainer
    ){
        return;
    }

    for(
        let i = 0;
        i < amount;
        i++
    ){

        const confetti =
        document.createElement(
            "div"
        );

        confetti.classList.add(
            "confetti"
        );

        confetti.innerHTML =
        [
            "🎉",
            "✨",
            "💗",
            "🌸",
            "💖"
        ][
            Math.floor(
                Math.random() * 5
            )
        ];

        confetti.style.left =
        Math.random() * 100 +
        "%";

        confetti.style.fontSize =
        (
            Math.random() * 20 +
            18
        ) + "px";

        confetti.style.animationDuration =
        (
            Math.random() * 3 +
            3
        ) + "s";

        confettiContainer.appendChild(
            confetti
        );

        setTimeout(()=>{

            confetti.remove();

        },7000);

    }

}

/* ======================================================
   CELEBRATION SCREEN EFFECTS
====================================================== */

const phase14 =
document.getElementById(
    "phase14"
);

function startCelebrationMode(){

    document.body.classList.add(
        "celebration-mode"
    );

    launchConfetti(
        180
    );

    setInterval(()=>{

        launchConfetti(
            30
        );

    },2500);

}

/* ======================================================
   WATCH FOR PHASE 14
====================================================== */

const phaseObserver =
new MutationObserver(()=>{

    if(
        phase14 &&
        phase14.classList.contains(
            "active"
        )
    ){

        startCelebrationMode();

    }

});

if(phase14){

    phaseObserver.observe(
        phase14,
        {
            attributes:true
        }
    );

}

/* ======================================================
   FINAL ENVELOPE PULSE
====================================================== */

const finalEnvelopeElement =
document.getElementById(
    "finalEnvelope"
);

if(
    finalEnvelopeElement
){

    setInterval(()=>{

        finalEnvelopeElement.animate(
            [
                {
                    transform:
                    "scale(1)"
                },
                {
                    transform:
                    "scale(1.08)"
                },
                {
                    transform:
                    "scale(1)"
                }
            ],
            {
                duration:1800
            }
        );

    },2200);

}

/* ======================================================
   CONTINUE IN PART 5
   - Flip Cards
   - Mobile Fixes
   - Viewport Fix
   - Script Closing
====================================================== */
/* ==========================================================
   SCRIPT.JS — PART 5
   Flip Cards + Mobile Fixes + Final Closures
   FINAL PART
========================================================== */

/* ======================================================
   FLIP CARDS
====================================================== */

const flipCards =
document.querySelectorAll(
    ".flip-card"
);

flipCards.forEach((card)=>{

    card.addEventListener(
        "click",
        ()=>{

            card.classList.toggle(
                "flipped"
            );

        }
    );

});

/* ======================================================
   MOBILE VIEWPORT FIX
====================================================== */

function updateViewportHeight(){

    let vh =
    window.innerHeight * 0.01;

    document.documentElement
    .style.setProperty(
        "--vh",
        `${vh}px`
    );

}

updateViewportHeight();

window.addEventListener(
    "resize",
    updateViewportHeight
);

window.addEventListener(
    "orientationchange",
    ()=>{

        setTimeout(
            updateViewportHeight,
            300
        );

    }
);

/* ======================================================
   PREVENT DOUBLE TAP ZOOM
====================================================== */

let lastTouchEnd = 0;

document.addEventListener(
    "touchend",
    (event)=>{

        const now =
        Date.now();

        if(
            now - lastTouchEnd <= 300
        ){

            event.preventDefault();

        }

        lastTouchEnd = now;

    },
    {
        passive:false
    }
);

/* ======================================================
   SAFE AUDIO START
====================================================== */

document.addEventListener(
    "click",
    ()=>{

        if(
            bgMusic &&
            musicPlaying
        ){

            bgMusic.play()
            .catch(()=>{});

        }

    },
    {
        once:true
    }
);

/* ======================================================
   PRELOAD GIFS
====================================================== */

const gifUrls = [

"https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZncwNGI5NXFmb2V2NWtuaTNocG1iMXU2cnJpYXNpYWl1aG1waGRhbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWZfYnlfaWQmY3Q9Zw/xdOaEIyjpG0bpNwVrn/giphy.gif",

"https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZndlY3RpM3ZrbmNwcHlkempqOGJlZmdzYzIxcWg2ZmFpbTczb2p1NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/P53TSsopKicrm/giphy.gif",

"https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnl0YTJmNnJvNHJlOXg2amdzeWNva2JxMTFsaTJnNzZyMmo5ZXdnNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ROF8OQvDmxytW/giphy.gif",

"https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnNoYW43OTBuZnlncndqZGhzNzUxbWM1dHdya2dweXl3YnhtajdoYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/GpkXJI9bqlhZ3JRgwQ/giphy.gif",

"https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2ZjcDZoOHl4Z3ltbXRpMXJmbGlpcXYxaXE3Z3EyaW5tc3B6amphOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fV8iuSEwLQ6005diSh/giphy.gif",

"https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnloNmRwZTNscGpndDltZXhyNHB1a2o3NXRsZDVweXd5dW53Y2E2aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fxU6WfJ8eembhmZBC6/giphy.gif",

"https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGgxMWZ3NWxyZXN5bTBkOHV5dTJteW5rNWNiM2F2d3lmc3U3amdmNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jhIK0Mx3aZTPgvkPWh/giphy.gif"

];

gifUrls.forEach((url)=>{

    const img =
    new Image();

    img.src = url;

});

/* ======================================================
   SAFETY CHECKS
====================================================== */

console.log(
    "💗 Apology Website Loaded Successfully"
);

console.log(
    "✨ All phases initialized"
);

console.log(
    "🎉 Forgive Meter Ready"
);

/* ======================================================
   AUTO-REVEAL CURRENT ACTIVE PHASE
====================================================== */

const activePhase =
document.querySelector(
    ".phase.active"
);

if(
    activePhase &&
    typeof revealLines ===
    "function"
){

    revealLines(
        activePhase
    );

}

/* ======================================================
   SCRIPT END
====================================================== */

});
