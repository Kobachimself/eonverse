from mcstatus import MinecraftServer
import json

# Replace with your Minecraft server IP
server_ip = "eonverse.club"

server = MinecraftServer.lookup(server_ip)

try:
    status = server.status()
    online_players = status.players.online
    motd = status.description
except:
    online_players = 0
    motd = "Server Offline"

data = {
    "onlinePlayers": online_players,
    "motd": motd
}

print(json.dumps(data))
