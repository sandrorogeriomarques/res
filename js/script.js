// Exemplo de uso de JavaScript para interatividade
document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector("header");
    header.addEventListener("click", function () {
      alert("Cabeçalho clicado!");
    });
  });
  
// configura as opções do mapa
var mapOptions = {
  mapTypeControl: false,
  zoom: 12,
  styles: [
      {
          "featureType": "all",
          "elementType": "all",
          "stylers": [
              {
                  "invert_lightness": true
              },
              {
                  "saturation": 10
              },
              {
                  "lightness": 30
              },
              {
                  "gamma": 0.5
              },
              {
                  "hue": "#435158"
              }
          ]
      }
  ],
  disableDefaultUI: true // oculta os controles padrão do mapa
};

// cria mapa
var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

// define os ícones para marcador de origem e destino
var originIcon = {
  url: 'img/pin_1128123.png', // URL do ícone personalizado para a origem
  scaledSize: new google.maps.Size(50, 50) // ajuste o tamanho do ícone conforme necessário
};

var destinationIcon = {
  url: 'img/mapsmark.png', // URL do ícone personalizado para o destino
  scaledSize: new google.maps.Size(50, 50) // ajuste o tamanho do ícone conforme necessário
};

// cria um objeto DirectionsService para usar o método de rota e obter um resultado para nossa solicitação
var directionsService = new google.maps.DirectionsService();

// cria um objeto DirectionsRenderer que usaremos para exibir a rota
var directionsDisplay = new google.maps.DirectionsRenderer({
  suppressMarkers: true, // suprime os marcadores padrão do DirectionsRenderer
  polylineOptions: {
    strokeColor: 'orange' // cor do trajeto em preto
  }
});

// vincula o DirectionsRenderer ao mapa
directionsDisplay.setMap(map);

// define a função calcRoute
function calcRouteAuto() {
  if (navigator.geolocation) {
    
    // Obter localização do usuário
    navigator.geolocation.getCurrentPosition(function (position) {
      var origin = position.coords.latitude + ',' + position.coords.longitude;

      // create request
      var request = {
        origin: origin,
        destination: "-25.394225, -49.225400",
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false,
      };

      // passa a requisição para o método de rota
      directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          
          // Obter distância e tempo Saídas
          const output = document.querySelector('#output');
          output.innerHTML =
            result.routes[0].legs[0].distance.text;
          
          const output2 = document.querySelector('#output2');
          output2.innerHTML =              
            result.routes[0].legs[0].duration.text;

          // display route
          directionsDisplay.setDirections(result);

          // cria um marcador de origem
          var originMarker = new google.maps.Marker({
            position: result.routes[0].legs[0].start_location,
            map: map,
            icon: originIcon, // ícone personalizado para o marcador de origem
            label: {} // oculta completamente o ícone padrão do marcador de origem
          });

          // cria um marcador de destino
          var destinationMarker = new google.maps.Marker({
            position: result.routes[0].legs[0].end_location,
            map: map,
            icon: destinationIcon, // ícone personalizado para o marcador de destino
            label: {} // oculta completamente o ícone padrão do marcador de destino
          });
        } else {
          // delete route from map
          directionsDisplay.setDirections({ routes: [] });

          // mapa do centro de Curitiba
          var myLatLng = { lat: -25.436068, lng: -49.262403 };
          map.setCenter(myLatLng);

          // show error message
          output.innerHTML =
            "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Não foi possível recuperar a distância percorrida.</div>";
        }
      });
    });
  } else {
    console.log('Geolocation is not supported by this browser.');
  }
}

// executar a função calcRoute automaticamente
calcRouteAuto();

function changeTab(tabIndex) {
  const tabContents = document.querySelectorAll('.tab-content');
  const tabButtons = document.querySelectorAll('.tab-button');

  tabContents.forEach((content, index) => {
    content.classList.remove('active');
    tabButtons[index].classList.remove('active');
  });

  tabContents[tabIndex].classList.add('active');
  tabButtons[tabIndex].classList.add('active');
}


function toggleMenu() {
  const navList = document.querySelector('.nav-list');
  const bars = document.querySelectorAll('.bar');
  
  navList.classList.toggle('active');
  
  bars.forEach(bar => {
    bar.classList.toggle('change');
  });
}



