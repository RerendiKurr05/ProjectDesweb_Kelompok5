-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 31 Bulan Mei 2025 pada 13.37
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `atk`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `barang`
--

CREATE TABLE `barang` (
  `Id_barang` varchar(100) NOT NULL,
  `barcode` varchar(20) NOT NULL,
  `Nama_barang` varchar(50) NOT NULL,
  `Kategori` varchar(20) NOT NULL,
  `Satuan` varchar(20) NOT NULL,
  `Harga` double NOT NULL,
  `Stok` int(11) NOT NULL,
  `Id_Supplier` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `barang`
--

INSERT INTO `barang` (`Id_barang`, `barcode`, `Nama_barang`, `Kategori`, `Satuan`, `Harga`, `Stok`, `Id_Supplier`) VALUES
('BRG-298B2522', 'TIPALPC250527194814', 'Tip-x', 'Alat Tulis', 'Pcs', 4000, 11, 9),
('BRG-35FCE926', 'BUKALPC250529221539', 'Buku', 'Alat Tulis', 'Pcs', 2000, 98, 9),
('BRG-4686B90F', 'BOLALPC250529221632', 'Bolpoin', 'Alat Tulis', 'Pcs', 3000, 66, 9);

-- --------------------------------------------------------

--
-- Struktur dari tabel `barang_rusak`
--

CREATE TABLE `barang_rusak` (
  `id_barangrusak` varchar(100) NOT NULL,
  `Id_barang` varchar(100) NOT NULL,
  `jumlah_rusak` int(11) NOT NULL,
  `Tgl_rusak` date NOT NULL,
  `keterangan` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `pembelian`
--

CREATE TABLE `pembelian` (
  `id_pembelian` varchar(100) NOT NULL,
  `Id_Supplier` int(11) NOT NULL,
  `id_user` varchar(100) NOT NULL,
  `Tgl_Pembelian` date NOT NULL,
  `diskon` double NOT NULL,
  `bayar` double NOT NULL,
  `Total` double NOT NULL,
  `kembalian` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `pembelianrinci`
--

CREATE TABLE `pembelianrinci` (
  `id_pembelianrinci` varchar(100) NOT NULL,
  `Jumlah_Beli` int(11) NOT NULL,
  `Harga_Satuan` double NOT NULL,
  `Satuan` varchar(10) NOT NULL,
  `Total` double NOT NULL,
  `id_pembelian` varchar(100) NOT NULL,
  `Id_Barang` varchar(100) NOT NULL,
  `barcode` varchar(20) NOT NULL,
  `Id_Supplier` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `penjualan`
--

CREATE TABLE `penjualan` (
  `id_Penjualan` varchar(100) NOT NULL,
  `Id_user` varchar(100) NOT NULL,
  `tanggal` date NOT NULL,
  `total` int(11) NOT NULL,
  `diskon` int(11) NOT NULL,
  `bayar` int(11) NOT NULL,
  `kembalian` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `penjualan`
--

INSERT INTO `penjualan` (`id_Penjualan`, `Id_user`, `tanggal`, `total`, `diskon`, `bayar`, `kembalian`) VALUES
('DTL-209D23', 'MyVfJQpLCT', '2025-05-30', 13000, 0, 20000, 7000),
('DTL-A0645F', 'RkdUdvNU22', '2025-05-30', 3000, 0, 5000, 2000),
('DTL-C87DF8', '2cJk2jOgFC', '2025-05-30', 16000, 1600, 20000, 5600);

-- --------------------------------------------------------

--
-- Struktur dari tabel `penjualanrinci`
--

CREATE TABLE `penjualanrinci` (
  `id_detail` varchar(100) NOT NULL,
  `Jumlah_Jual` int(11) NOT NULL,
  `Satuan` varchar(10) NOT NULL,
  `Harga_Satuan` double NOT NULL,
  `Total` double NOT NULL,
  `id_Penjualan` varchar(100) NOT NULL,
  `Id_Barang` varchar(100) NOT NULL,
  `barcode` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `penjualanrinci`
--

INSERT INTO `penjualanrinci` (`id_detail`, `Jumlah_Jual`, `Satuan`, `Harga_Satuan`, `Total`, `id_Penjualan`, `Id_Barang`, `barcode`) VALUES
('DTL-3B5922', 1, 'Pcs', 2000, 2000, 'DTL-C87DF8', 'BRG-35FCE926', 'BUKALPC250529221539'),
('DTL-694371', 2, 'Pcs', 4000, 8000, 'DTL-209D23', 'BRG-298B2522', 'TIPALPC250527194814'),
('DTL-848569', 2, 'Pcs', 4000, 8000, 'DTL-C87DF8', 'BRG-298B2522', 'TIPALPC250527194814'),
('DTL-A83DE7', 2, 'Pcs', 3000, 6000, 'DTL-C87DF8', 'BRG-4686B90F', 'BOLALPC250529221632'),
('DTL-D32946', 1, 'Pcs', 3000, 3000, 'DTL-A0645F', 'BRG-4686B90F', 'BOLALPC250529221632'),
('DTL-DF6C70', 1, 'Pcs', 2000, 2000, 'DTL-209D23', 'BRG-35FCE926', 'BUKALPC250529221539'),
('DTL-F28508', 1, 'Pcs', 3000, 3000, 'DTL-209D23', 'BRG-4686B90F', 'BOLALPC250529221632');

-- --------------------------------------------------------

--
-- Struktur dari tabel `supplier`
--

CREATE TABLE `supplier` (
  `Id_Supplier` int(11) NOT NULL,
  `Nama` varchar(20) DEFAULT NULL,
  `Nomor_Telepon` varchar(50) DEFAULT NULL,
  `Alamat` text DEFAULT NULL,
  `Nama_Pemilik` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `supplier`
--

INSERT INTO `supplier` (`Id_Supplier`, `Nama`, `Nomor_Telepon`, `Alamat`, `Nama_Pemilik`) VALUES
(9, 'Dot', '+6287609779111', 'JEMBER', 'PT.Bahagia'),
(11, 'Dono', '+6289534213891', 'SITUBONDO', 'PT.Amanah');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `Id_user` varchar(100) NOT NULL,
  `RFID` varchar(100) NOT NULL,
  `Nama` varchar(100) NOT NULL,
  `Username` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Role` enum('admin','kasir') NOT NULL,
  `Jenis_kelamin` varchar(20) NOT NULL,
  `No_Telepon` varchar(100) DEFAULT NULL,
  `Alamat` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`Id_user`, `RFID`, `Nama`, `Username`, `Password`, `Role`, `Jenis_kelamin`, `No_Telepon`, `Alamat`, `created_at`, `updated_at`) VALUES
('2cJk2jOgFC', '131', 'q', 'wq`', '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b', 'kasir', 'Laki-laki', '+628908737788', 'sqsqsq', '2025-05-29 21:28:32', '2025-05-30 11:50:22'),
('htyi1zZ3P4', '121', 'rendi', 'rendi', 'dc2ff5a50a7e66c0b005ed6ebb0fc9724ba2cf1f71811ba0fae7c79f15a59058', 'admin', 'Laki-laki', '+62892929292966', 'tegal', '2025-05-28 02:01:13', '2025-05-29 22:37:09'),
('MyVfJQpLCT', '0513233278', 'Dinda', 'Dinda', '874fcb568e20ec7fc15abc599f08e1860e63c6e0cad825497563db78a548bfd8', 'kasir', 'Perempuan', '+6287685436545', 'Situbondo', '2025-05-28 00:55:36', '2025-05-29 22:36:46'),
('pHoEO7pT0b', '3599813755', 'Saskia', 'Saskia', '4462e12302db47d6606e8b7d3ffe2865bdf193faee2a94b7be5a303fe9c14d93', 'admin', 'perempuan', '+6280952564546', 'Bondowoso', '2025-05-28 00:54:13', '2025-05-28 00:54:13'),
('RkdUdvNU22', '0513260654', 'Awanda', 'Awanda', '68d4ae6ca09b9b841ff802ac1866b4a517f7666c894cef8e62bdb48fba0d960c', 'admin', 'Laki-laki', '+6289526345765', 'Situbondo, Jl Raya Banyuwangi', '2025-05-29 22:13:26', '2025-05-29 22:13:26'),
('Ss6VOYz0EL', '0513287038', 'Randi', 'Randi', '2a2ff118a13598eaf40e216d45958203f9a422d103592838b45c3e9074d04988', 'admin', 'Laki-laki', '+6289087643411', 'Banyuwangi', '2025-05-28 02:08:26', '2025-05-29 21:27:41');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `barang`
--
ALTER TABLE `barang`
  ADD PRIMARY KEY (`Id_barang`),
  ADD KEY `Id_Supplier` (`Id_Supplier`);

--
-- Indeks untuk tabel `barang_rusak`
--
ALTER TABLE `barang_rusak`
  ADD PRIMARY KEY (`id_barangrusak`),
  ADD KEY `Id_barang` (`Id_barang`);

--
-- Indeks untuk tabel `pembelian`
--
ALTER TABLE `pembelian`
  ADD PRIMARY KEY (`id_pembelian`),
  ADD KEY `Id_Supplier` (`Id_Supplier`,`id_user`),
  ADD KEY `id_user` (`id_user`);

--
-- Indeks untuk tabel `pembelianrinci`
--
ALTER TABLE `pembelianrinci`
  ADD PRIMARY KEY (`id_pembelianrinci`),
  ADD KEY `id_pembelian` (`id_pembelian`,`Id_Barang`),
  ADD KEY `Id_Supplier` (`Id_Supplier`);

--
-- Indeks untuk tabel `penjualan`
--
ALTER TABLE `penjualan`
  ADD PRIMARY KEY (`id_Penjualan`),
  ADD KEY `Id_user` (`Id_user`);

--
-- Indeks untuk tabel `penjualanrinci`
--
ALTER TABLE `penjualanrinci`
  ADD PRIMARY KEY (`id_detail`),
  ADD KEY `id_Penjualan` (`id_Penjualan`),
  ADD KEY `Id_Barang` (`Id_Barang`);

--
-- Indeks untuk tabel `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`Id_Supplier`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Id_user`),
  ADD UNIQUE KEY `Username` (`Username`),
  ADD UNIQUE KEY `RFID_Id` (`RFID`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `supplier`
--
ALTER TABLE `supplier`
  MODIFY `Id_Supplier` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `barang`
--
ALTER TABLE `barang`
  ADD CONSTRAINT `barang_ibfk_1` FOREIGN KEY (`Id_Supplier`) REFERENCES `supplier` (`Id_Supplier`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `barang_rusak`
--
ALTER TABLE `barang_rusak`
  ADD CONSTRAINT `barang_rusak_ibfk_1` FOREIGN KEY (`Id_barang`) REFERENCES `barang` (`Id_barang`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `pembelian`
--
ALTER TABLE `pembelian`
  ADD CONSTRAINT `pembelian_ibfk_2` FOREIGN KEY (`Id_Supplier`) REFERENCES `supplier` (`Id_Supplier`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pembelian_ibfk_3` FOREIGN KEY (`id_user`) REFERENCES `users` (`Id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `pembelianrinci`
--
ALTER TABLE `pembelianrinci`
  ADD CONSTRAINT `pembelianrinci_ibfk_1` FOREIGN KEY (`id_pembelian`) REFERENCES `pembelian` (`id_pembelian`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pembelianrinci_ibfk_2` FOREIGN KEY (`Id_Supplier`) REFERENCES `supplier` (`Id_Supplier`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `penjualan`
--
ALTER TABLE `penjualan`
  ADD CONSTRAINT `penjualan_ibfk_1` FOREIGN KEY (`Id_user`) REFERENCES `users` (`Id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `penjualanrinci`
--
ALTER TABLE `penjualanrinci`
  ADD CONSTRAINT `penjualanrinci_ibfk_1` FOREIGN KEY (`Id_Barang`) REFERENCES `barang` (`Id_barang`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `penjualanrinci_ibfk_2` FOREIGN KEY (`id_Penjualan`) REFERENCES `penjualan` (`id_Penjualan`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
