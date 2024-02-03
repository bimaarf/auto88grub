import 'package:flutter/material.dart';
import 'package:frontend/Pages/Components/Home/PromotionalCar/CardCarList.dart';
import 'package:frontend/Pages/Components/Home/FirstMenuList.dart';

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
  // Function to navigate to the profile screen
  var carItem;
  void _navigateToProfileScreen(String profileName) {
    // Use Navigator to push a new route
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => ProfileScreen(profileName: profileName),
      ),
    );
  }

  void initState() {
    super.initState();
    carItem = [
      {
        'id': '1',
        'imageUrl':
            'https://www.carscoops.com/wp-content/uploads/2022/04/BYD-Seal-1024x555.jpg',
        'title': 'DAIHATSU GRANMAX (GREY) TIPE BOX 1.5 M/T (2018)',
        'subtitle': 'Rp 1x9.000.000',
        'note': 'booet',
      },
      {
        'id': '2',
        'imageUrl':
            'https://www.carscoops.com/wp-content/uploads/2022/04/BYD-Seal-9.jpg',
        'title': 'DAIHATSU GRANMAX (RED) TIPE BOX 1.5 M/T (2018)',
        'subtitle': 'Rp 2x9.000.000',
        'note': 'booet',
      },
      {
        'id': '3',
        'imageUrl':
            'https://cf-images.us-east-1.prod.boltdns.net/v1/static/1078702682/f0f68b26-e5a5-4f34-a46b-f386813d3d1a/d7b81a61-a041-446e-9226-4e2ef533bae9/652x366/match/image.jpg',
        'title': 'DAIHATSU GRANMAX (BLACK) TIPE BOX 1.5 M/T (2018)',
        'subtitle': 'Rp 3x9.000.000',
        'note': 'booet',
      },
      {
        'id': '4',
        'imageUrl':
            'https://www.carscoops.com/wp-content/uploads/2022/04/BYD-Seal-Interior-1.jpg',
        'title': 'DAIHATSU GRANMAX (YELLOW) TIPE BOX 1.5 M/T (2018)',
        'subtitle': 'Rp 4x9.000.000',
        'note': 'booet',
      },
      {
        'id': '5',
        'imageUrl':
            'https://www.carscoops.com/wp-content/uploads/2022/04/BYD-Seal-9.jpg',
        'title': 'DAIHATSU GRANMAX (PINK) TIPE BOX 1.5 M/T (2018) ',
        'subtitle': 'Rp 5x9.000.000',
        'note': 'booet',
      },
    ];
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
              gradient: LinearGradient(
                colors: [Colors.blue.shade500, Colors.blue.shade800],
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
              ),
              color: Colors.blue.withOpacity(0.9),
            ),
            child: Container(
              margin: const EdgeInsets.all(10),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  GestureDetector(
                    onTap: () => _navigateToProfileScreen('Profile 1'),
                    child: Material(
                      color: Colors.transparent,
                      child: InkResponse(
                        onTap: () {
                          // Handle the tap
                          _navigateToProfileScreen('Profile 1');
                        },
                        splashColor: Colors.white
                            .withOpacity(0.5), // Customize the splash color
                        highlightShape: BoxShape.rectangle,
                        containedInkWell: true,
                        borderRadius: BorderRadius.circular(10.3),
                        child: const Row(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            Icon(
                              Icons.account_circle_rounded,
                              color: Colors.white,
                              size: 40,
                            ),
                            Text(
                              'Adm. Name',
                              style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 17,
                                  fontWeight: FontWeight.bold),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                  Container(
                    decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(20)),
                    width: double.infinity,
                    padding: const EdgeInsets.symmetric(vertical: 10),
                    margin: const EdgeInsets.symmetric(vertical: 10),
                    child: const Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        SingleChildScrollView(
                          scrollDirection: Axis.horizontal,
                          child: FirstMenuList(),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
          Container(
            color: Colors.white,
            padding: const EdgeInsets.all(10),
            width: double.infinity,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                CardCarList(
                  carItem:
                      carItem, // Replace with your actual list of car items
                ),
                Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Expanded(
                      child: Container(
                        decoration: BoxDecoration(
                            color: Colors.blue.withOpacity(0.05),
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
                            color: Colors.blue.withOpacity(0.05),
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
                  ],
                ),

                Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Expanded(
                      child: Container(
                        decoration: BoxDecoration(
                            color: Colors.blue.withOpacity(0.05),
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
                            color: Colors.blue.withOpacity(0.05),
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
                  ],
                ),
                Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Expanded(
                      child: Container(
                        decoration: BoxDecoration(
                            color: Colors.blue.withOpacity(0.05),
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
                            color: Colors.blue.withOpacity(0.05),
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
                  ],
                ),
                Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Expanded(
                      child: Container(
                        decoration: BoxDecoration(
                            color: Colors.blue.withOpacity(0.05),
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
                            color: Colors.blue.withOpacity(0.05),
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
}

class ProfileScreen extends StatelessWidget {
  final String profileName;

  const ProfileScreen({required this.profileName});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Profile: $profileName'),
      ),
      body: Center(
        child: Text('Profile details for $profileName'),
      ),
    );
  }
}
