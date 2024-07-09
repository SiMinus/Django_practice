from django.shortcuts import render, redirect
from django.conf import settings
from api.models import Room

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from requests import Request, post
from .util import update_or_create_user_tokens, is_spotify_authenticated, get_user_tokens

class AuthURL(APIView):
    def get(self, request, format=None):
        force_auth = request.GET.get('force_auth', 'false').lower() == 'true'
        scopes = 'user-read-playback-state user-modify-playback-state user-read-currently-playing'

        url = Request('GET', 'https://accounts.spotify.com/authorize', params={
            'scope': scopes,
            'response_type': 'code',
            'redirect_uri': settings.REDIRECT_URI,
            'client_id': settings.CLIENT_ID
        }).prepare().url

        if force_auth:
            url += "&show_dialog=true"

        return Response({'url': url}, status=status.HTTP_200_OK)
    
def spotify_callback(request, format=None):
    code = request.GET.get('code')
    error = request.GET.get('error')

    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': settings.REDIRECT_URI,
        'client_id': settings.CLIENT_ID,
        'client_secret': settings.CLIENT_SECRET
    }).json()

    access_token = response.get('access_token')
    refresh_token = response.get('refresh_token')
    token_type = response.get('token_type')
    expires_in = response.get('expires_in')
    error = response.get('error')

    if not request.session.exists(request.session.session_key):
        request.session.create()

    update_or_create_user_tokens(request.session.session_key, access_token, refresh_token, token_type, expires_in)

    return redirect('frontend:')


class IsAuthenticated(APIView):
    def get(self, request, format=None):
        is_authenticated = is_spotify_authenticated(self.request.session.session_key)
        return Response({'status': is_authenticated}, status=status.HTTP_200_OK)