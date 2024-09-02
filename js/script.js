
// CHART Pola Penjualan Bulanan
const charts = document.querySelectorAll(".chart-pola-penjualan-bulanan");

fetch("/U3 Analisis/assets/CSV/file json/Pola penjualan bulanan revisi.json")
  .then(response => response.json())
  .then(data => {
    // Urutkan data berdasarkan tahun dan bulan
    data.sort((a, b) => {
      if (a.tahun !== b.tahun) return a.tahun - b.tahun;
      return a.bulan - b.bulan;
    });

    const namaBulan = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const labels = data.map(item => `${namaBulan[item.bulan - 1]},${item.tahun}`);
    const values = data.map(item => item.total_penjualan);

    charts.forEach(function (chart) {
      var ctx = chart.getContext("2d");
      var myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Total Penjualan Bulanan",
              data: values,
              backgroundColor: "rgba(0, 123, 255, 0.2)",
              borderColor: "rgba(0, 123, 255, 1)",
              borderWidth: 2,
              tension: 0.1
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Total Penjualan (Rp)'
              },
              ticks: {
                callback: function(value, index, values) {
                  return 'Rp ' + value.toLocaleString('id-ID');
                }
              }
            },
            x: {
              title: {
                display: true,
                text: 'Bulan, Tahun'
              },
              ticks: {
                maxRotation: 45,
                minRotation: 45
              }
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.y !== null) {
                    label += 'Rp ' + context.parsed.y.toLocaleString('id-ID');
                  }
                  return label;
                }
              }
            }
          }
        },
      });
    });
  })
  .catch(error => {
    console.error("Error fetching or processing data:", error);
  });

$(document).ready(function () {
  $(".data-table").each(function (_, table) {
    $(table).DataTable();
  });
});


// CHART Perubahan Penjualan Berdasarkan Periode
const chart2 = document.querySelector(".chart-perubahan-penjualan");

fetch("/U3 Analisis/assets/CSV/file json/hipotesis1.json")
  .then(response => response.json())
  .then(data => {
    // Mengelompokkan data berdasarkan Bulan dan Periode
    const groupedData = data.reduce((acc, item) => {
      const key = `${item.Bulan}-${item.Periode}`;
      if (!acc[key]) {
        acc[key] = { ...item, TotalPenjualan: 0 };
      }
      acc[key].TotalPenjualan += item.TotalPenjualan;
      return acc;
    }, {});

    const sortedData = Object.values(groupedData).sort((a, b) => {
      if (a.Tahun !== b.Tahun) return a.Tahun - b.Tahun;
      return a.Bulan - b.Bulan;
    });

    const bulan = [...new Set(sortedData.map(item => `${item.Bulan},${item.Tahun}`))];
    const periode = ['Awal Bulan', 'Tengah Bulan', 'Akhir Bulan'];

    const datasets = periode.map(p => ({
      label: p,
      data: bulan.map(b => {
        const [month, year] = b.split(',');
        const item = sortedData.find(d => d.Bulan === parseInt(month) && d.Tahun === parseInt(year) && d.Periode === p);
        return item ? item.TotalPenjualan : 0;
      }),
      backgroundColor: p === 'Awal Bulan' ? 'rgba(0, 123, 255, 0.7)' :
                       p === 'Tengah Bulan' ? 'rgba(255, 193, 7, 0.7)' :
                       'rgba(40, 167, 69, 0.7)'
    }));

    const namaBulan = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

    new Chart(chart2, {
      type: 'bar',
      data: {
        labels: bulan.map(b => {
          const [month, year] = b.split(',');
          return `${namaBulan[parseInt(month) - 1]},${year}`;
        }),
        datasets: datasets
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Total Penjualan per Bulan dan Periode'
          },
          legend: {
            position: 'top',
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Bulan, Tahun'
            },
            ticks: {
              maxRotation: 45,
              minRotation: 45
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Total Penjualan'
            },
            ticks: {
              callback: function(value) {
                return 'Rp ' + value.toLocaleString('id-ID');
              }
            }
          }
        }
      }
    });
  })
  .catch(error => {
    console.error("Error fetching or processing data:", error);
  });


  
// Total penjualan
  const totalPenjualan = document.getElementById("total-penjualan");
fetch("/U3 Analisis/assets/CSV/file json/Pola penjualan bulanan revisi.json")
  .then(response => response.json())
  .then(data => {
    // Pastikan data adalah array
    const dataArray = Array.isArray(data) ? data : [data];
    
    // Hitung total penjualan
    const total = dataArray.reduce((acc, item) => acc + (parseFloat(item.total_penjualan) || 0), 0);
    
    console.log(`Total Penjualan: ${total.toFixed(2)}`);  // Format pesan log

    // Menampilkan total penjualan
    totalPenjualan.textContent = `Rp ${total.toLocaleString('id-ID')}`;
  })
  .catch(error => {
    console.error("Error fetching or processing data:", error);
    totalPenjualan.textContent = "Error loading data.";
  });



  // Produk Penjualan
  const totalProdukTerjual = document.getElementById("produk-penjualan");

fetch("/U3 Analisis/assets/CSV/file json/Apakah ada produk tertentu yang mengalami fluktuasi penjualan yang lebih signifikan.json")
  .then(response => response.json())
  .then(data => {
    // Pastikan data adalah array
    const dataArray = Array.isArray(data) ? data : [data];
    
    // Hitung total produk terjual
    const total = dataArray.reduce((acc, item) => acc + (parseInt(item.TotalTerjual) || 0), 0);
    
    console.log(`Total Produk Terjual: ${total}`);  // Format pesan log

    // Menampilkan total produk terjual
    totalProdukTerjual.textContent = total.toLocaleString('id-ID');
  })
  .catch(error => {
    console.error("Error fetching or processing data:", error);
    totalProdukTerjual.textContent = "Error loading data.";
  });



    // Total keuntungan
    const totalKeuntungan = document.getElementById("total-keuntungan");

    fetch("/U3 Analisis/assets/CSV/file json/nota_data.json")
      .then(response => response.json())
      .then(data => {
        // Pastikan data.nota_data adalah array
        const dataArray = Array.isArray(data.nota_data) ? data.nota_data : [data.nota_data];
        
        // Hitung total keuntungan
        const total = dataArray.reduce((acc, item) => {
          const nilaiBeli = parseFloat(item.NilaiBeli.replace(',', '.'));
          const nilaiJual = parseFloat(item.NilaiJual);
          const keuntungan = nilaiJual - nilaiBeli;
          return acc + (keuntungan || 0);
        }, 0);
        
        console.log(`Total Keuntungan: ${total.toFixed(2)}`);  // Format pesan log
    
        // Menampilkan total keuntungan
        totalKeuntungan.textContent = `Rp ${total.toLocaleString('id-ID', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
      })
      .catch(error => {
        console.error("Error fetching or processing data:", error);
        totalKeuntungan.textContent = "Error loading data.";
      });



    // Total Pelanggan
    const totalPelanggan = document.getElementById("total-pelanggan");

    fetch("/U3 Analisis/assets/CSV/file json/nota_data.json")
      .then(response => response.json())
      .then(data => {
        // Pastikan data.nota_data adalah array
        const dataArray = Array.isArray(data.nota_data) ? data.nota_data : [data.nota_data];
        
        // Menggunakan Set untuk menyimpan NoNota unik
        const uniqueNoNota = new Set();
        
        // Menambahkan setiap NoNota ke dalam Set
        dataArray.forEach(item => {
          uniqueNoNota.add(item.NoNota);
        });
        
        // Menghitung jumlah NoNota unik
        const totalPelangganUnik = uniqueNoNota.size;
        
        console.log(`Total Pelanggan: ${totalPelangganUnik}`);  // Format pesan log
    
        // Menampilkan total pelanggan
        totalPelanggan.textContent = totalPelangganUnik.toLocaleString('id-ID');
      })
      .catch(error => {
        console.error("Error fetching or processing data:", error);
        totalPelanggan.textContent = "Error loading data.";
      });


    // CHART-->
  // Memuat data dari jadwalkegiatan_jumlah.json
// ... existing code ...
fetch('/U3 Analisis/assets/CSV/file json/jadwalkegiatan_jumlah.json') // Pastikan jalur ini benar
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    const labels = data.map(item => item.nama_kegiatan);
    const totals = data.map(item => item.total_penjualan_selama_kegiatan);
    console.log('Data untuk grafik:', totals);
    const ctx = document.getElementById('chart-penjualan-perevent').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Total Penjualan per Kegiatan',
          data: totals,
          backgroundColor: 'rgba(75, 192, 192, 0.7)', // Warna lebih gelap untuk tampilan modern
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        elements: {
          bar: {
            borderWidth: 2,
          }
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
          }
        }
      },
    });
  })

  
  .catch(error => console.error('Error fetching the JSON data:', error));
// ... existing code ...


// chart kategori produk fluktuasi tertinggi
fetch('./assets/CSV/file json/Mengidentifikasi Kategori Produk dengan Fluktuasi Tertinggi.json')
        .then(response => response.json())
        .then(data => {
            const labels = data.map(item => item.NmCategory);
            const dataValues = data.map(item => item.selisih);

            const ctx = document.querySelector('.chart-kategori-fluktuasi').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Selisih Penjualan',
                        data: dataValues,
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));




    // TABLE 
// Pola penjualan perbulan
fetch('assets/CSV/file json/Pola penjualan bulanan revisi.json')
.then(response => response.json())
.then(data => {
  const tableBody = document.querySelector('#dataTable tbody');
  data.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.tahun}</td>
      <td>${item.bulan}</td>
      <td>${item.total_penjualan.toLocaleString()}</td>
    `;
    tableBody.appendChild(row);
  });

  // Inisialisasi DataTable
  $('#dataTable').DataTable();
})
.catch(error => console.error('Error loading the JSON data:', error));



// total penjualan perbulan
// Memuat data dari hipotesis1.json
fetch('assets/CSV/file json/hipotesis1.json')
  .then(response => response.json())
  .then(data => {
    const tableBody = document.querySelector('#dataTable1 tbody');
    // Pastikan data adalah array
    if (Array.isArray(data)) {
      data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.NmBarang}</td>
          <td>${item.Tahun}</td>
          <td>${item.Bulan}</td>
          <td>${item.Periode}</td>
          <td>${item.TotalPenjualan.toLocaleString()}</td>
          <td>${item.PenjualanBulanSebelumnya || 'N/A'}</td>
        `;
        tableBody.appendChild(row);
      });
    } else {
      console.error('Data tidak dalam format array');
    }

    // Inisialisasi DataTable
    $('#dataTable1').DataTable();
  })
  .catch(error => console.error('Error loading the JSON data:', error));



  //total penjualan perevent
  fetch('assets/CSV/file json/jadwalkegiatan_jumlah.json')
  .then(response => response.json())
  .then(data => {
    const tableBody2 = document.querySelector('#dataTable2 tbody');
    // Pastikan data adalah array
    if (Array.isArray(data)) {
      data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.nama_kegiatan}</td>
          <td>${item.total_penjualan_selama_kegiatan.toLocaleString()}</td>
        `;
        tableBody2.appendChild(row);
      });
    } else {
      console.error('Data tidak dalam format array');
    }

    // Inisialisasi DataTable untuk dataTable2
    $('#dataTable2').DataTable();
  })
  .catch(error => console.error('Error loading the JSON data:', error));



  //tabel jadwal event
 
    // Mengambil data dari file JSON
    fetch('./assets/CSV/file json/jadwal_kegiatan_202409010014.json')
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#tabel-kegiatankampus tbody');
            data.jadwal_kegiatan.forEach(kegiatan => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${kegiatan.nama_kegiatan}</td>
                    <td>${kegiatan.tanggal_mulai}</td>
                    <td>${kegiatan.tanggal_selesai}</td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching data:', error));


// kategori fultuasi
fetch('assets/CSV/file json/Mengidentifikasi Kategori Produk dengan Fluktuasi Tertinggi.json')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.querySelector('#dataTable3 tbody');
        // Pastikan data adalah array
        if (Array.isArray(data)) {
            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.NmCategory}</td>
                    <td>${item.tahun}</td>
                    <td>${item.bulan}</td>
                    <td>${item.jumlah_produk_terjual}</td>
                    <td>${item.bulan_sebelumnya}</td>
                    <td>${item.selisih}</td>
                `;
                tableBody.appendChild(row);
            });
        } else {
            console.error('Data tidak dalam format array');
        }

        // Inisialisasi DataTable
        $('#dataTable3').DataTable();
    })
    .catch(error => console.error('Error loading the JSON data:', error));