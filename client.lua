local ped = PlayerPedId()
local health, currentHealth, armor, stamina, hunger, thirst
local talkingMode = "normal"

function GetMinimapAnchor()
    local safezone = GetSafeZoneSize()
    local aspectRatio = GetAspectRatio(false)
    local resolutionX, resolutionY = GetActiveScreenResolution()

    local scaleX = 1.0 / resolutionX
    local scaleY = 1.0 / resolutionY

    local minimap = {}
    minimap.width = scaleX * (resolutionX / (4 * aspectRatio))
    minimap.height = scaleY * (resolutionY / 5.674)
    minimap.leftX = scaleX * (resolutionX * (1.0 - safezone) * 0.5)
    minimap.bottomY = 1.0 - scaleY * (resolutionY * (1.0 - safezone) * 0.5)
    minimap.rightX = minimap.leftX + minimap.width
    minimap.topY = minimap.bottomY - minimap.height
    return minimap
end

--Bucle más rápido para cosas más fluidas
Citizen.CreateThread(function()
    while true do
        --Calcular stamina
        local playerId = PlayerId()
        stamina = 100 - GetPlayerSprintStaminaRemaining(playerId) -- 0 = agotado, 100 = lleno

        --Mandar info de si el jugador está hablando
        local isTalking = NetworkIsPlayerTalking(playerId)
        local radioChannel = exports['pma-voice']:isTalkingOnRadio()
        local talkingMode = "normal"

        if isTalking then
            if radioChannel ~= false then
                talkingMode = "radio"
            else
                talkingMode = "normal"
            end

            SendNUIMessage({
                action = "toggleTalking",
                talking = true,
                talkingMode = talkingMode
            })
        else
            SendNUIMessage({
                action = "toggleTalking",
                talking = false,
                talkingMode = "normal"
            })
        end

        --Mandar info del minimapa y localizacion del hud
        local minimap = GetMinimapAnchor()
        if IsPauseMenuActive() then
            SendNUIMessage({
                action = "hideHud"
            })
        else
            SendNUIMessage({
                action = "setHudPosition",
                x = minimap.rightX,
                y = minimap.bottomY,
                top = minimap.topY,
                height = minimap.height
            })
        end

        Citizen.Wait(50) -- actualizamos cada 50ms para que sea fluido
    end
end)

Citizen.CreateThread(function()
    while true do
        local currentMode = exports['pma-voice']:getVoiceMode()
        --Mandar info del rango de voz
        SendNUIMessage({
            action = "setVoiceMode",
            mode = currentMode
        })
        --Mandar info de los atributos del pj
        health = GetEntityHealth(ped)
        currentHealth = health - 100
        armor = GetPedArmour(ped)
        TriggerEvent('esx_status:getStatus', 'hunger', function(status)
            hunger = status.val / 10000
        end)
        TriggerEvent('esx_status:getStatus', 'thirst', function(status)
            thirst = status.val / 10000
        end)

        SendNUIMessage({
            action = "setHudInfo",
            health = currentHealth,
            armor = armor,
            stamina = stamina,
            hunger = hunger,
            thirst = thirst
        })
        Citizen.Wait(500)
    end
end)

RegisterCommand("shield", function()
    SendNUIMessage({
        action = "toggleShield",
    })
end, false)
