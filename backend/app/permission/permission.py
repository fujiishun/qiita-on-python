from rest_framework import permissions

class IsAuthenticatedForUserActions(permissions.BasePermission):
    def has_permission(self, request, view):
        if view.action in ['update', 'partial_update']:
            return request.user and request.user.is_authenticated
        return True

class IsAuthenticatedForPostActions(permissions.BasePermission):
    def has_permission(self, request, view):
        if view.action in ['create', 'update', 'destroy']:
            return request.user and request.user.is_authenticated
        return True

class IsAuthenticatedForCommentActions(permissions.BasePermission):
    def has_permission(self, request, view):
        if view.action in ['create', 'destroy']:
            return request.user and request.user.is_authenticated
        return True