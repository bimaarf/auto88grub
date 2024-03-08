import 'package:flutter/material.dart';
import 'package:frontend/Pages/Components/Home/Context/ListMenu/__FirstMenuList.dart';
import 'package:frontend/Pages/Components/Home/Context/ListMenu/__ListDataCar.dart';
import 'package:frontend/Pages/Components/Home/Context/ListMenu/__ListDataMaster.dart';
import 'package:frontend/Pages/Components/Home/Context/ListMenu/__ListDataSite.dart';
import 'package:frontend/Pages/Components/Home/PromotionalCar/CardCarList.dart';
import 'package:frontend/Pages/Profile.dart';

class Cars extends StatefulWidget {
  const Cars({
    Key? key,
    required this.theme,
  }) : super(key: key);

  final ThemeData theme;

  @override
  State<Cars> createState() => _CarsState();
}

class _CarsState extends State<Cars> {
  // Function to navigate to the profile screen

  void _navigateToProfileScreen(String profileName) {
    // Use Navigator to push a new route
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

                const Text(
                  'AUTO88GROUP',
                  style: TextStyle(
                    color: Colors.red,
                    fontSize: 12,
                    fontWeight: FontWeight.w500,
                  ),
                ),
                const CardCarList(),

                Container(
                  margin: const EdgeInsets.only(top: 10, bottom: 10),
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: const FirstMenuList(),
                ),

                const ListDataCar(),
                const ListDataSite(),
                const ListDataMaster(),
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
                onTap: () => _navigateToProfileScreen('Jokow'),
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
                                child: const Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  mainAxisAlignment: MainAxisAlignment.start,
                                  children: [
                                    Text(
                                      'Selamat Datang,',
                                      style: TextStyle(
                                          fontSize: 12,
                                          fontWeight: FontWeight.normal,
                                          color: Colors.white),
                                    ),
                                    Text(
                                      'Bima Arifa R.',
                                      style: TextStyle(
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
