
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Muat data dari file CSV
df = pd.read_csv('/home/jack/Downloads/CSV/File Analisis dashboar/hipotesis1.csv')

# Lihat beberapa baris pertama untuk memastikan data terload dengan benar
print(df.head())

# Set seaborn theme
sns.set_theme(style="whitegrid")

# Plot total penjualan per bulan dan periode untuk setiap produk
plt.figure(figsize=(12, 6))
sns.barplot(x='Bulan', y='TotalPenjualan', hue='Periode', data=df, errorbar=None)

# Atur label dan judul
plt.title('Total Penjualan per Bulan dan Periode')
plt.xlabel('Bulan')
plt.ylabel('Total Penjualan')
plt.legend(title='Periode', loc='upper right')

plt.show()




import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# Konversi kolom 'Bulan' menjadi string
df['Bulan'] = df['Bulan'].astype(str)

# Plot total penjualan per periode untuk setiap produk
plt.figure(figsize=(12, 6))
sns.lineplot(x='Bulan', y='TotalPenjualan', hue='Periode', data=df, errorbar=None, marker='o')

# Atur urutan sumbu X sesuai dengan urutan yang diinginkan
bulan_urutan = ['12', '1', '2', '3', '4', '5', '6']
plt.xticks(ticks=range(len(bulan_urutan)), labels=bulan_urutan)

# Atur label dan judul
plt.title('Perubahan Penjualan Berdasarkan Periode')
plt.xlabel('Bulan')
plt.ylabel('Total Penjualan')
plt.legend(title='Periode', loc='upper right')

plt.show()





