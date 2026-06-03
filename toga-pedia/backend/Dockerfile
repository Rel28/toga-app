# Menggunakan Python versi ringan
FROM python:3.12-slim

# Menyiapkan folder kerja di dalam server GCP
WORKDIR /app

# Menyalin requirements dan menginstalnya
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Menyalin seluruh kode Flask kamu ke dalam server GCP
COPY . .

# Menjalankan aplikasi menggunakan Gunicorn pada port 8080
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "app:app"]