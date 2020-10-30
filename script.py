import json
import requests
import websocket
import redis
import random
import time

ws = websocket.WebSocket()

ws.connect('ws://localhost:8000/ws/visualizer/')


for i in range(1000):
    time.sleep(3)
    ws.send(json.dumps({'value': random.randint(1, 100)}))
