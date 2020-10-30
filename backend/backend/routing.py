
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack

from django.urls import path
from app import consumer

websocket_urlPattern = [
    path('ws/visualizer/', consumer.Classification),
]

application = ProtocolTypeRouter({
    # 'http':
    'websocket': AuthMiddlewareStack(URLRouter(websocket_urlPattern))

})
