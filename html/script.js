window.addEventListener("message", (event) => {
  const data = event.data;
  const health = document.getElementById("health");
  const armor = document.getElementById("armor");
  const stamina = document.getElementById("stamina");
  const hunger = document.getElementById("hunger");
  const thirst = document.getElementById("thirst");

  if (data.action === "setHudPosition") {
    const hud = document.getElementById("hudC");
    hud.style.display = "flex";

    // Borde derecho → en vw
    hud.style.left = ((data.x * 100) + 0.2) + "vw";

    // Centrado vertical respecto al minimapa
    hud.style.top = (data.top * 100) + "vh";   // anclamos arriba
    hud.style.height = (data.height * 90) + "vh"; // altura real
  }

  if (data.action === "hideHud") {
    const hudC = document.getElementById("hudC");
    hudC.style.display = "none";
  }

  if(data.action === "setVoiceMode") {
    const voiceMode = data.mode
    if(voiceMode === 1) {
      document.getElementById("proximityBar").style.width = "33%";
    } else if(voiceMode === 2) {
      document.getElementById("proximityBar").style.width = "66%";
    } else if(voiceMode === 3) {
      document.getElementById("proximityBar").style.width = "100%";
    }
  }

  if(data.action === "setHudInfo") {
    document.getElementById("healthBar").style.width = data.health + "%";
    document.getElementById("armorBar").style.width = data.armor + "%";
    document.getElementById("staminaBar").style.width = data.stamina + "%";
    document.getElementById("hungerBar").style.width = data.hunger + "%";
    document.getElementById("thirstBar").style.width = data.thirst + "%"; 
    if(data.health >= 50)
    {
      hideElement(health, 1);
    } else {
      showElement(health, 0);
    }
    if(data.armor === 0)
    {
      hideElement(armor, 1);
    } else {
      showElement(armor, 0);
    }
    if(data.stamina === 100)
    {
      hideElement(stamina, 1);
    } else {
      showElement(stamina, 0);
    }
    //Si el hambre es mayor o igual a 50 que no se muestre
    if(data.hunger >= 50) {
      hideElement(hunger, 1);
    } else {
      showElement(hunger, 0);
    }
    //Si la sed es mayor o igual a 50 que no se muestre
    if(data.thirst >= 50) {
      hideElement(thirst, 1);
    } else {
      showElement(thirst, 0);
    }
  }

  if(data.action === "toggleTalking") {
    if(data.talkingMode === "radio")
    {
      document.getElementById("micIcon").classList.remove("fa-microphone")
      document.getElementById("micIcon").classList.add("fa-walkie-talkie")
    } else {
      document.getElementById("micIcon").classList.remove("fa-walkie-talkie")
      document.getElementById("micIcon").classList.add("fa-microphone")
    }
    if(data.talking) {
      document.getElementById("micIcon").classList.add("talking")
    } else {
      document.getElementById("micIcon").classList.remove("talking")
    }
  }
});

function hideElement(elem, finalOrder) {
  elem.classList.remove("appear");
  elem.classList.add("disappear");

  const onAnimationEnd = () => {
    elem.style.order = finalOrder;
    elem.removeEventListener("animationend", onAnimationEnd);
  };

  elem.addEventListener("animationend", onAnimationEnd, { once: true });
}

function showElement(elem, finalOrder) {
  elem.classList.remove("disappear");
  elem.style.order = finalOrder;
  elem.classList.add("appear");
}