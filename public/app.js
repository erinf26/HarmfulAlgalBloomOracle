document.addEventListener('DOMContentLoaded', () => {
  const map = L.map('map').setView([42.6918, -76.9202], 8);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  let lakeMarkers = [];
  let lakesData = [];

  fetch('/api/lakes')
    .then(response => response.json())
    .then(data => {
      lakesData = data;
      data.forEach(lake => {
        const marker = L.marker([lake.latitude, lake.longitude]).addTo(map);
        marker.bindPopup(`<b>${lake.name}</b>`);
        lakeMarkers.push({ marker, name: lake.name, latitude: lake.latitude, longitude: lake.longitude });
      });
    })
    .catch(error => console.error('Error fetching lake data:', error));

  const searchBar = document.getElementById('search-bar');
  const searchResultsContainer = document.createElement('div');
  searchResultsContainer.id = 'search-results';
  document.getElementById('sidebar').appendChild(searchResultsContainer);

  searchBar.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    searchResultsContainer.innerHTML = '';

    const filteredLakes = lakesData.filter(lake => lake.name.toLowerCase().includes(query));

    filteredLakes.forEach(lake => {
      const resultItem = document.createElement('div');
      resultItem.className = 'search-result-item';
      resultItem.textContent = lake.name;
      resultItem.addEventListener('click', () => {
        map.setView([lake.latitude, lake.longitude], 13);
        lakeMarkers.forEach(({ marker, name }) => {
          if (name === lake.name) {
            marker.openPopup();
          }
        });
        searchResultsContainer.innerHTML = '';
        searchBar.value = lake.name;
      });
      searchResultsContainer.appendChild(resultItem);
    });

    if (query === '') {
      searchResultsContainer.innerHTML = '';
    }
  });

  const pointIcon = L.icon({
    iconUrl: 'point.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const customMarker = L.marker([42.681396, -76.913649], { icon: pointIcon }).addTo(map);

  const popupContent = `
    <div class="custom-popup">
      <a href="https://www.google.com/search?q=algae&rlz=1C5CHFA_enUS1075US1075&oq=algae&gs_lcrp=EgZjaHJvbWUqCggAEAAYsQMYgAQyCggAEAAYsQMYgAQyDQgBEC4YgwEYsQMYgAQyDQgCEAAYgwEYsQMYgAQyDQgDEAAYgwEYsQMYgAQyEwgEEC4YgwEYxwEYsQMY0QMYgAQyCggFEC4YsQMYgAQyBwgGEAAYgAQyCggHEAAYsQMYgAQyDQgIEAAYgwEYsQMYgAQyBwgJEAAYjwLSAQc2NjJqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8" target="_blank">
        <img src="algae.png" alt="Algae">
      </a>
      <a href="https://www.google.com/search?q=time&rlz=1C5CHFA_enUS1075US1075&oq=time&gs_lcrp=EgZjaHJvbWUyEggAEEUYORiDARixAxjJAxiABDINCAEQABiDARixAxiABDINCAIQABiDARixAxiABDIHCAMQABiABDINCAQQABiDARixAxiABDITCAUQLhivARjHARixAxiABBiOBTIHCAYQABiABDIGCAcQRRg80gEHNTgxajBqOagCALACAA&sourceid=chrome&ie=UTF-8" target="_blank">
        <img src="time-series.png" alt="Time">
      </a>
    </div>
  `;

  customMarker.bindPopup(popupContent);

  const imageUrl = '/path/to/your/tif/file.tif';
  const imageBounds = [[42.5, -77.0], [42.9, -76.8]]; 

  L.imageOverlay(imageUrl, imageBounds).addTo(map);
});