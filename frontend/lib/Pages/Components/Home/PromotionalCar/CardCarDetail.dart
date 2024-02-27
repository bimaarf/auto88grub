import 'package:flutter/material.dart';

class CardCarDetail extends StatelessWidget {
  final String imageUrl;
  final String title;
  final String subtitle;
  final String note;

  const CardCarDetail({
    Key? key,
    required this.imageUrl,
    required this.title,
    required this.subtitle,
    required this.note,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        actions: <Widget>[
          IconButton(
            icon: const Icon(
              Icons.notifications,
              color: Colors.white,
            ),
            onPressed: () {
              const AlertDialog.adaptive(
                title: Text('New Arrival'),
              );
            },
          ),
          IconButton(
            icon: const Icon(
              Icons.settings,
              color: Colors.white,
            ),
            onPressed: () {
              // do something
              const AlertDialog(
                title: Text('asd'),
              );
            },
          )
        ],
      ),
      body: NotificationListener<ScrollNotification>(
        onNotification: (scrollNotification) {
          return false;
        },
        child: Stack(
          children: [
            Positioned.fill(
              child: SingleChildScrollView(
                physics: const AlwaysScrollableScrollPhysics(),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Image.network(
                      imageUrl,
                      height: 275,
                      width: double.infinity,
                      fit: BoxFit.cover,
                    ),
                    ListTile(
                      title: Text(
                        title,
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                    ),
                    Container(
                      color: Colors.black45,
                      padding: const EdgeInsets.all(10),
                      width: double.infinity,
                      child: const Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Row(
                                children: [
                                  Icon(
                                    Icons.car_crash,
                                    color: Colors.white,
                                  ),
                                  SizedBox(width: 5),
                                  Text(
                                    "MPV",
                                    style: TextStyle(
                                      color: Colors.white,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ],
                              ),
                              SizedBox(width: 15),
                              Row(
                                children: [
                                  Icon(
                                    Icons.settings,
                                    color: Colors.white,
                                  ),
                                  SizedBox(width: 5),
                                  Text(
                                    "4x2",
                                    style: TextStyle(
                                      color: Colors.white,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ],
                              ),
                              SizedBox(width: 15),
                              Row(
                                children: [
                                  Icon(
                                    Icons.local_gas_station_sharp,
                                    color: Colors.white,
                                  ),
                                  SizedBox(width: 5),
                                  Text(
                                    "Premium",
                                    style: TextStyle(
                                      color: Colors.white,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ],
                              ),
                              SizedBox(width: 15),
                              Row(
                                children: [
                                  Icon(
                                    Icons.chair,
                                    color: Colors.white,
                                  ),
                                  SizedBox(width: 5),
                                  Text(
                                    "3 Rows",
                                    style: TextStyle(
                                      color: Colors.white,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                          SizedBox(height: 10),
                          Text(
                            "*Deskripsi:",
                            style: TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          SizedBox(height: 5),
                          Text(
                            "- IDR 1x9.000.000,- (Harga kredit)\n"
                            "- Jarak Tempuh Original 58.673 KM\n"
                            "- Pajak Hidup\n"
                            "- Masuk Kategori Green Car (Ramah Lingkungan)\n"
                            "- Desain Kekinian & Stylish Untuk Anak Muda\n"
                            "- Kabin Nyaman & Lega\n"
                            "- Mobil Mulus & Terawat\n"
                            "- Interior Bersih \n"
                            "- Mobil Lulus Inspeksi Dijamin Cakep & Aman",
                            style: TextStyle(color: Colors.white),
                          ),
                          SizedBox(height: 10),
                          Text(
                            "*Spesifikasi:",
                            style: TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          SizedBox(height: 5),
                          Text(
                            "- 4 Cylinder 16 Valve DOHC\n"
                            "- Ground Clerance 160 mm\n"
                            "- Kapasitas Penumpang 5 Orang\n"
                            "- Kapasitas Mesin 1,298 cc\n"
                            "- Suspensi Depan McPherson Strut\n"
                            "- Suspensi Belakang Torsion Beam\n"
                            "- Dual SRS Airbags\n"
                            "- Pretensioner & Force Limited Seat Belt\n"
                            "- Pengereman ABS & EDB",
                            style: TextStyle(color: Colors.white),
                          ),
                          SizedBox(height: 10),
                          Text(
                            "*Keunggulan Kami:",
                            style: TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          SizedBox(height: 5),
                          Text(
                            "- Sobat Bisa Mendapatkan GRATIS JASA SERVICE HINGGA 2 (DUA) TAHUN\n"
                            "- Sobat Tidak Perlu Khawatir, Jaminan Surat-surat Aman\n"
                            "- Sobat Bisa Mendapatkan Garansi Mesin & Transmisi Selama 1 Tahun\n"
                            "- Mesin Bermasalah? Tenang, kami Menyediakan Garansi Mesin\n"
                            "- Sobat bisa Free Test Drive Sepuasnya\n"
                            "- Showroom Kami Tetap Buka di Hari Minggu / Libur",
                            style: TextStyle(color: Colors.white),
                          ),
                          SizedBox(height: 10),
                          Text(
                            "AUTO88GROUP - \"WE BRING A QUALITY\"\n"
                            "WHATSAPP/CALL: 0812-2601-7788 (FAST RESPONSE)\n"
                            "atau KLIK LINK: https://wa.me/6281226017788?text=Halo...\n"
                            "WEBSITE: www.auto88group.com\n"
                            "GOOGLE/IG/FB/YT/TIKTOK/TWITTER: \"Auto88group\"\n"
                            "\n"
                            "Alamat Showroom:\n"
                            "- Jln Sei. Raya Dalam No. A2 Kuburaya (Patokan 350m dari simpang Polda sebelah kiri)\n"
                            "- Jln Prof. M. Yamin No. A88 Kota Baru Pontianak (Patokan 1km dari bundaran kota baru, sebelah kiri)\n"
                            "- Jln Dr. Wahidin No. A88 Pontianak (Sebelah kiri Patokan 1km dari simpang lampu merah Dr. Soetomo)\n"
                            "\n"
                            "* Selama Promo Masih Berlaku\n"
                            "* Deskripsi/Spesifikasi yang tertera di atas tidak dapat dijadikan alat bukti apapun\n"
                            "* Syarat ketentuan berlaku sesuai dengan Leasing Yang Ada MoU\n"
                            "* Melayani kredit seluruh Indonesia (Syarat ketentuan berlaku)\n"
                            "\n"
                            "Harga tertera merupakan harga kredit",
                            style: TextStyle(color: Colors.white),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
            AnimatedBuilder(
              animation: ModalRoute.of(context)!.animation!,
              builder: (context, child) {
                return Positioned(
                  top: 0,
                  left: 0,
                  right: 0,
                  child: Container(
                    padding: const EdgeInsets.fromLTRB(16, 16, 16, 16),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [
                        InkWell(
                          onTap: () {},
                          child: const Icon(Icons.stars,
                              color: Colors.red, size: 30),
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
