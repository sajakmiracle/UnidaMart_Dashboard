import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Define the data
df = pd.read_csv('/home/jack/Downloads/CSV/File Analisis dashboar/jadwalkegiatan_jumlah.csv')

# Plotting
plt.figure(figsize=(10, 8))
sns.barplot(y='nama_kegiatan', x='total_penjualan_selama_kegiatan', data=df, palette='viridis')
plt.title('Total Penjualan Selama Kegiatan')
plt.xlabel('Total Penjualan')
plt.ylabel('Nama Kegiatan')
plt.xticks(rotation=45, ha='right')

# Format total penjualan dengan koma sebagai pemisah ribuan
for container in plt.gca().containers:
    plt.gca().bar_label(container, fmt='%.0f', labels=[f'{int(x):,}' for x in container.datavalues])

plt.tight_layout()

# Show plot
plt.show()
