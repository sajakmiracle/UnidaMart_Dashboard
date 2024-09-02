import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Muat data dari file CSV
df = pd.read_csv('/home/jack/Downloads/CSV/File Analisis dashboar/Mengidentifikasi Kategori Produk dengan Fluktuasi Tertinggi.csv')

# Lihat beberapa baris pertama untuk memastikan data terload dengan benar
print(df.head())

# Set seaborn theme
sns.set_theme(style="whitegrid")

# Plot fluktuasi penjualan per kategori produk
plt.figure(figsize=(14, 8))
sns.barplot(x='bulan', y='selisih', hue='NmCategory', data=df, ci=None)

# Atur label dan judul
plt.title('Fluktuasi Penjualan per Kategori Produk')
plt.xlabel('Bulan')
plt.ylabel('Selisih Penjualan')
plt.legend(title='Kategori Produk', loc='upper right')

plt.show()

# Plot total penjualan per kategori produk
plt.figure(figsize=(14, 8))
sns.barplot(x='NmCategory', y='jumlah_produk_terjual', data=df, ci=None)

# Atur label dan judul
plt.title('Total Penjualan per Kategori Produk')
plt.xlabel('Kategori Produk')
plt.ylabel('Jumlah Produk Terjual')

plt.show()





