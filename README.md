# HUD Moderno para FiveM

Este es un **HUD moderno y funcional** para FiveM, diseñado para ser atractivo, personalizable y compatible con recursos de voz y radio.

---

## Características principales

- Compatible con **pma-voice** (ESX).  
- Compatible con **pma-radio**.  
- Posible compatibilidad con otras radios (aún no testeado).  
- Muestra información del jugador como:
  - Salud
  - Armadura
  - Stamina
  - Hambre y sed
- Detecta automáticamente si el jugador está hablando:
  - Voz normal
  - Por radio
- Integración completa con el minimapa del juego usando archivos:
  - `minimap.gfx`
  - `minimap.ytd`

---

## Requisitos

- [ESX Framework](https://esx-framework.github.io/)  
- [pma-voice](https://github.com/modeppp/pma-voice)  
- [pma-radio](https://github.com/modeppp/pma-radio) (opcional)  

---

## Instalación

1. Copia la carpeta del HUD en tu carpeta `resources` del servidor.  
2. Añade la línea siguiente en tu `server.cfg`:
  - `ensure 18_hud`
3. Asegúrate de que **pma-voice** y **pma-radio** estén funcionando correctamente.  
4. Los archivos `minimap.gfx` y `minimap.ytd` se usan para la representación del minimapa dentro del HUD.  

---

## Uso

- El HUD se ajusta automáticamente al minimapa y cambia de posición si el jugador cambia la interfaz del juego.  
- Detecta automáticamente si estás hablando por **voz normal** o **radio**.  
- Puedes personalizar:
- Posición del HUD
- Colores
- Elementos visibles  
Editando los archivos HTML, CSS y JS dentro de la carpeta del HUD.

---

## Exportaciones adicionales para el HUD

Para que tu HUD pueda detectar el **modo de voz** y si el jugador está hablando por radio, añade al final de `pma-voice/shared.lua` las siguientes líneas:

```lua
exports('getVoiceMode', function()
 return mode
end)

exports('isTalkingOnRadio', function()
 return radioPressed
end)