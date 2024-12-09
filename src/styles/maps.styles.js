export const customStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#eaf1fb', // Fondo del mapa, un tono muy claro
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#746855',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#eaf1fb', // Fondo para que el borde no se vea blanco
      },
    ],
  },
  {
    featureType: 'administrative.locality', // Ciudades, zonas administrativas
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'poi', // Points of Interest - Todos los puntos de interés
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'poi.park', // Parques
    elementType: 'geometry',
    stylers: [
      {
        color: '#263c3f', // Mantener el color oscuro para los parques
      },
    ],
  },
  {
    featureType: 'poi.park', // Etiquetas de parques
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#6b9a76', // Texto de parques
      },
    ],
  },
  {
    featureType: 'road', // Calles pequeñas
    elementType: 'geometry',
    stylers: [
      {
        color: '#ffffff', // Calles pequeñas en blanco
      },
    ],
  },
  {
    featureType: 'road', // Eliminar bordes de calles pequeñas
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#eaf1fb', // Eliminar el borde gris de las calles pequeñas
      },
    ],
  },
  {
    featureType: 'road', // Etiquetas de calles pequeñas
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9ca5b3',
      },
    ],
  },
  {
    featureType: 'road.highway', // Carreteras principales
    elementType: 'geometry',
    stylers: [
      {
        color: '#c2d4e7', // Gris pastel para las carreteras principales
      },
    ],
  },
  {
    featureType: 'road.highway', // Eliminar bordes en autopistas
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#eaf1fb', // Eliminar el borde gris en las autopistas
      },
    ],
  },
  {
    featureType: 'road.highway', // Etiquetas de autopistas
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#f3d19c', // Texto de autopistas en color suave
      },
    ],
  },
  {
    featureType: 'transit', // Transporte público
    elementType: 'geometry',
    stylers: [
      {
        color: '#2f3948', // Color oscuro para el transporte
      },
    ],
  },
  {
    featureType: 'transit.station', // Estaciones de transporte público
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'water', // Agua (lagos, ríos, océanos)
    elementType: 'geometry',
    stylers: [
      {
        color: '#17263c', // Color oscuro para el agua
      },
    ],
  },
  {
    featureType: 'water', // Etiquetas de agua
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#515c6d', // Texto de cuerpos de agua
      },
    ],
  },
  {
    featureType: 'water', // Borde de agua
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#17263c', // Borde oscuro para agua
      },
    ],
  },
  // Ocultar los puntos de interés menos importantes (pequeños restaurantes, tiendas, etc.)
  {
    featureType: 'poi.business',
    stylers: [
      {
        visibility: 'off', // Ocultar negocios (tiendas, restaurantes)
      },
    ],
  },
  {
    featureType: 'poi.sports_complex', // Ocultar complejos deportivos
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.medical', // Ocultar hospitales, clínicas, etc.
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.school', // Ocultar escuelas
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.place_of_worship', // Ocultar lugares de culto (iglesias, templos)
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
];
