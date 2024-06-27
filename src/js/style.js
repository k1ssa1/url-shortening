const socialIcons = document.getElementsByClassName("footer__section-socials-icons");

Array.from(socialIcons).forEach(icon => {
  icon.addEventListener("mouseover", () => {
    icon.style.filter = "brightness(1.2) hue-rotate(210deg)";
    icon.style.cursor = "pointer"
  })
})