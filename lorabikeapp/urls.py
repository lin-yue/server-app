from django.urls import path

from . import views

urlpatterns = [
    path('uplink/', views.uplink, name='uplink'),
    path('livemap/', views.livemap, name='livemap'),
    path('livemap/ajax/', views.livemap_ajax, name='livemap-ajax'),
    path('datarecord/<int:record_num>/', views.data_record, name='data-record'),
]
