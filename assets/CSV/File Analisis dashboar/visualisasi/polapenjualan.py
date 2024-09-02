import matplotlib.pyplot as plt

# Data from the table
data = {
    'Year-Month': ['2023-12', '2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06'],
    'Total Sales': [246049410, 264441460, 242151680, 85331628, 153060900, 281613000, 250531360]
}

# Creating the plot
plt.figure(figsize=(10, 6))
plt.plot(data['Year-Month'], data['Total Sales'], marker='o', linestyle='-', color='b')

# Setting the title and labels
plt.title('Pola Penjualan Bulanan', fontsize=16)
plt.xlabel('Tahun-Bulan', fontsize=14)
plt.ylabel('Total Penjualan', fontsize=14)

# Display the plot
plt.grid(True)
plt.show()