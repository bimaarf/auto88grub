import 'package:flutter/material.dart';
import 'package:frontend/Model/Services/Cars/fetchCar.dart';
import 'package:frontend/Pages/Components/Home/Context/List/__FirstMenuList.dart';
import 'package:frontend/Pages/Profile.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Home extends StatefulWidget {
  const Home({
    super.key,
    required this.theme,
  });

  final ThemeData theme;

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  List<Map<String, dynamic>> _dataCars = [];
  bool isLoading = false;
  var carItem;

  String? name;
  void _navigateToProfileScreen(String name) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => const ProfileScreen(),
      ),
    );
  }

  @override
  void initState() {
    super.initState();
    carItem = [
      {
        'id': '1',
        'imageUrl':
            'https://www.auto88group.com/image/car/1775/20240201113209.jpg',
        'title': 'DAIHATSU GRANMAX (GREY) TIPE BOX 1.5 M/T (2018)',
        'subtitle': 'Rp 1x9.000.000',
        'note': 'booet',
      },
      {
        'id': '2',
        'imageUrl':
            'https://www.auto88group.com/image/car/1775/20240201113209.jpg',
        'title': 'DAIHATSU GRANMAX (RED) TIPE BOX 1.5 M/T (2018)',
        'subtitle': 'Rp 2x9.000.000',
        'note': 'booet',
      },
      {
        'id': '3',
        'imageUrl':
            'https://www.auto88group.com/image/car/1775/20240201113209.jpg',
        'title': 'DAIHATSU GRANMAX (BLACK) TIPE BOX 1.5 M/T (2018)',
        'subtitle': 'Rp 3x9.000.000',
        'note': 'booet',
      },
      {
        'id': '4',
        'imageUrl':
            'https://www.auto88group.com/image/car/1775/20240201113209.jpg',
        'title': 'DAIHATSU GRANMAX (YELLOW) TIPE BOX 1.5 M/T (2018)',
        'subtitle': 'Rp 4x9.000.000',
        'note': 'booet',
      },
      {
        'id': '5',
        'imageUrl':
            'https://www.auto88group.com/image/car/1775/20240201113209.jpg',
        'title': 'DAIHATSU GRANMAX (PINK) TIPE BOX 1.5 M/T (2018) ',
        'subtitle': 'Rp 5x9.000.000',
        'note': 'booet',
      },
      {
        'id': '6',
        'imageUrl':
            'https://www.auto88group.com/image/car/1775/20240201113209.jpg',
        'title': 'DAIHATSU GRANMAX (BLACK) TIPE BOX 1.5 M/T (2018)',
        'subtitle': 'Rp 3x9.000.000',
        'note': 'booet',
      },
      {
        'id': '7',
        'imageUrl':
            'https://www.auto88group.com/image/car/1775/20240201113209.jpg',
        'title': 'DAIHATSU GRANMAX (RED) TIPE BOX 1.5 M/T (2018)',
        'subtitle': 'Rp 2x9.000.000',
        'note': 'booet',
      },
    ];
    SharedPreferences.getInstance().then((prefs) {
      setState(() {
        name = prefs.getString('name');
      });
    });
    _fetchCar();
  }

  Future<void> _fetchCar() async {
    setState(() {
      isLoading = true;
    });
    try {
      final List<Map<String, dynamic>> responseData =
          await ServiceCarList.fetchCar();
      setState(() {
        isLoading = false;
        _dataCars = responseData;
      });
    } catch (e) {
      print('Error: $e');
      showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: const Text('Server error'),
            content: const Text('Data not found'),
            actions: <Widget>[
              TextButton(
                onPressed: () {
                  Navigator.of(context).pop();
                },
                child: const Text('OK'),
              ),
            ],
          );
        },
      );
      setState(() {
        isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.only(top: 30),
            width: double.infinity,
            decoration: BoxDecoration(
              border: Border(
                  top: BorderSide(
                      width: 1, color: Colors.white.withOpacity(0.1))),
              color: Colors.black,
            ),
            child: profileBox(),
          ),
          Container(
            color: Colors.black,
            padding: const EdgeInsets.all(10),
            width: double.infinity,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Stack(
                //   alignment: Alignment.topLeft,
                //   children: [
                //     Image.network(
                //       'https://c.pxhere.com/photos/13/e8/automobile_automotive_black_and_white_car_dark_vehicle-915436.jpg!d',
                //       fit: BoxFit.contain,
                //     ),
                //   ],
                // ),
                // CardCarList(
                //   carItem:
                //       carItem, // Replace with your actual list of car items
                // ),

                const Text(
                  'Administrator',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 18,
                    fontWeight: FontWeight.w500,
                  ),
                ),
                const Text(
                  'AUTO88GROUP',
                  style: TextStyle(
                    color: Colors.red,
                    fontSize: 12,
                    fontWeight: FontWeight.w500,
                  ),
                ),
                Container(
                  margin: const EdgeInsets.only(top: 10, bottom: 10),
                  padding: const EdgeInsets.only(bottom: 10),
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(
                        0.1), // Set the background color here if needed
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: const FirstMenuList(),
                ),

                Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Expanded(
                      child: Container(
                        decoration: BoxDecoration(
                            color: Colors.white.withOpacity(0.1),
                            borderRadius: BorderRadius.circular(10)),
                        padding: const EdgeInsets.all(10),
                        margin: const EdgeInsets.all(10),
                        child: const Column(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            Icon(
                              Icons.car_rental,
                              size: 50,
                              color: Colors.blue,
                            ),
                            Text('Mobil'),
                          ],
                        ),
                      ),
                    ),
                    Expanded(
                      child: Container(
                        decoration: BoxDecoration(
                            color: Colors.white.withOpacity(0.1),
                            borderRadius: BorderRadius.circular(10)),
                        padding: const EdgeInsets.all(10),
                        margin: const EdgeInsets.all(10),
                        child: const Column(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            Icon(
                              Icons.card_membership,
                              size: 44,
                              color: Colors.blue,
                            ),
                            Text('Promo'),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),

                Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Expanded(
                      child: Container(
                        decoration: BoxDecoration(
                            color: Colors.white.withOpacity(0.1),
                            borderRadius: BorderRadius.circular(10)),
                        padding: const EdgeInsets.all(10),
                        margin: const EdgeInsets.all(10),
                        child: const Column(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            Icon(
                              Icons.car_rental,
                              size: 50,
                              color: Colors.blue,
                            ),
                            Text('Prospek'),
                          ],
                        ),
                      ),
                    ),
                    Expanded(
                      child: Container(
                        decoration: BoxDecoration(
                            color: Colors.white.withOpacity(0.1),
                            borderRadius: BorderRadius.circular(10)),
                        padding: const EdgeInsets.all(10),
                        margin: const EdgeInsets.all(10),
                        child: const Column(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            Icon(
                              Icons.car_rental,
                              size: 50,
                              color: Colors.blue,
                            ),
                            Text('Testimoni'),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
                Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Expanded(
                      child: Container(
                        decoration: BoxDecoration(
                            color: Colors.white.withOpacity(0.1),
                            borderRadius: BorderRadius.circular(10)),
                        padding: const EdgeInsets.all(10),
                        margin: const EdgeInsets.all(10),
                        child: const Column(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            Icon(
                              Icons.car_rental,
                              size: 50,
                              color: Colors.blue,
                            ),
                            Text('Data Panjar'),
                          ],
                        ),
                      ),
                    ),
                    Expanded(
                      child: Container(
                        decoration: BoxDecoration(
                            color: Colors.white.withOpacity(0.1),
                            borderRadius: BorderRadius.circular(10)),
                        padding: const EdgeInsets.all(10),
                        margin: const EdgeInsets.all(10),
                        child: const Column(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            Icon(
                              Icons.car_rental,
                              size: 50,
                              color: Colors.blue,
                            ),
                            Text('Data Penjualan'),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
                Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Expanded(
                      child: Container(
                        decoration: BoxDecoration(
                            color: Colors.white.withOpacity(0.1),
                            borderRadius: BorderRadius.circular(10)),
                        padding: const EdgeInsets.all(10),
                        margin: const EdgeInsets.all(10),
                        child: const Column(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            Icon(
                              Icons.car_rental,
                              size: 50,
                              color: Colors.blue,
                            ),
                            Text('Data Hutang'),
                          ],
                        ),
                      ),
                    ),
                    Expanded(
                      child: Container(
                        decoration: BoxDecoration(
                            color: Colors.white.withOpacity(0.1),
                            borderRadius: BorderRadius.circular(10)),
                        padding: const EdgeInsets.all(10),
                        margin: const EdgeInsets.all(10),
                        child: const Column(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            Icon(
                              Icons.car_rental,
                              size: 50,
                              color: Colors.blue,
                            ),
                            Text('Data Pencairan'),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
                // Add more widgets inside the Column if needed
              ],
            ),
          )
        ],
      ),
    );
  }

  Container profileBox() {
    return Container(
      margin: const EdgeInsets.all(10),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          GestureDetector(
            child: Material(
              color: Colors.transparent,
              child: InkResponse(
                onTap: () => _navigateToProfileScreen('Jokoww'),
                splashColor: Colors.white.withOpacity(0.5),
                highlightShape: BoxShape.rectangle,
                containedInkWell: true,
                borderRadius: BorderRadius.circular(20),
                child: Container(
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  width: double.infinity,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Row(
                            crossAxisAlignment: CrossAxisAlignment.center,
                            mainAxisAlignment: MainAxisAlignment.start,
                            children: [
                              Container(
                                padding: const EdgeInsets.all(10),
                                decoration: BoxDecoration(
                                  borderRadius: BorderRadius.circular(50),
                                ),
                                child: ClipRRect(
                                  borderRadius: BorderRadius.circular(50),
                                  child: Image.network(
                                    'https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/17bf0771-8286-435d-a536-bf85cdffad11/width=450/4545904.jpeg',
                                    width: 60,
                                  ),
                                ),
                              ),
                              const SizedBox(width: 20),
                              Container(
                                padding:
                                    const EdgeInsets.fromLTRB(0, 10, 4, 10),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  mainAxisAlignment: MainAxisAlignment.start,
                                  children: [
                                    const Text(
                                      'Selamat Datang,',
                                      style: TextStyle(
                                          fontSize: 12,
                                          fontWeight: FontWeight.normal,
                                          color: Colors.white),
                                    ),
                                    Text(
                                      name ?? 'User',
                                      style: const TextStyle(
                                          fontSize: 18,
                                          fontWeight: FontWeight.bold,
                                          color: Colors.white),
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                          Container(
                              padding: const EdgeInsets.all(10),
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(50),
                              ),
                              child: const Icon(Icons.settings)),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
