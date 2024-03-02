import 'package:flutter/material.dart';
import 'package:frontend/Pages/Components/Data/Master/Brand/BrandMenu.dart';
import 'package:frontend/Pages/Components/Data/Master/Brankas/BrankasMenu.dart';
import 'package:frontend/Pages/Components/Data/Master/Coordinate/CoordinateMenu.dart';
import 'package:frontend/Pages/Components/Data/Master/Model/ModelMenu.dart';
import 'package:frontend/Pages/Components/Data/Master/Type/TypeMenu.dart';

class FirstMenuList extends StatefulWidget {
  const FirstMenuList({
    Key? key, // Added key parameter
  }) : super(key: key); // Added super constructor

  @override
  State<FirstMenuList> createState() => _FirstMenuListState();
}

class _FirstMenuListState extends State<FirstMenuList> {
  late List<Map<String, dynamic>> menu;
  final ScrollController _scrollController = ScrollController();
  @override
  void initState() {
    super.initState();
    menu = [
      {
        'label': 'Mobil',
        'gradient': {
          'beginColor': Colors.blueAccent.shade200,
          'endColor': Colors.blueAccent.shade700
        },
        'icon': Icons.car_rental
      },
      {
        'label': 'Promo',
        'gradient': {
          'beginColor': Colors.purpleAccent.shade400,
          'endColor': Colors.purpleAccent.shade700
        },
        'icon': Icons.discount
      },
      {
        'label': 'Prospek',
        'gradient': {
          'beginColor': Colors.pinkAccent.shade400,
          'endColor': Colors.pinkAccent.shade700
        },
        'icon': Icons.accessibility
      },
      {
        'label': 'Testimoni',
        'gradient': {
          'beginColor': Colors.orangeAccent.shade400,
          'endColor': Colors.orangeAccent.shade700
        },
        'icon': Icons.accessibility
      },
      {
        'label': 'Data Panjar',
        'gradient': {
          'beginColor': Colors.greenAccent.shade400,
          'endColor': Colors.greenAccent.shade700
        },
        'icon': Icons.accessibility
      },
      {
        'label': 'Data Penjualan',
        'gradient': {
          'beginColor': Colors.greenAccent.shade400,
          'endColor': Colors.greenAccent.shade700
        },
        'icon': Icons.accessibility
      },
      {
        'label': 'Lainnya',
        'gradient': {
          'beginColor': const Color.fromARGB(199, 0, 0, 0),
          'endColor': const Color.fromARGB(199, 0, 0, 0),
        },
        'icon': Icons.more
      },
    ];
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Row(
            children: List.generate(
              menu.length,
              (index) => Padding(
                padding: const EdgeInsets.all(10),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Container(
                      padding: const EdgeInsets.all(19),
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          colors: [
                            menu[index]['gradient']['beginColor']!,
                            menu[index]['gradient']['endColor']!,
                          ],
                          begin: Alignment.centerLeft,
                          end: Alignment.centerRight,
                        ),
                        borderRadius: BorderRadius.circular(50),
                      ),
                      child: Icon(
                        menu[index]['icon'] as IconData,
                        color: Colors.white,
                        size: 24,
                      ),
                    ),
                    const SizedBox(height: 3),
                    Text(
                      menu[index]['label'] as String,
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                      ),
                      overflow: TextOverflow.ellipsis,
                      maxLines: 1,
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
        TextButton(
          onPressed: () {
            showModalBottomSheet(
              context: context,
              isScrollControlled: true,
              builder: (context) => DraggableScrollableSheet(
                initialChildSize: 0.8,
                minChildSize: 0.2,
                maxChildSize: 1,
                expand: false,
                builder:
                    (BuildContext context, ScrollController scrollController) {
                  return Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(Icons.horizontal_rule_outlined),
                      Expanded(
                        child: SingleChildScrollView(
                          scrollDirection: Axis.vertical,
                          child: Container(
                            padding: const EdgeInsets.symmetric(horizontal: 4),
                            child: const Column(
                              crossAxisAlignment: CrossAxisAlignment.center,
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Row(
                                  crossAxisAlignment: CrossAxisAlignment.center,
                                  mainAxisAlignment: MainAxisAlignment.start,
                                  children: [
                                    Icon(
                                      Icons.arrow_right,
                                      size: 20,
                                    ),
                                    Text(
                                      'Operational Menu',
                                      style: TextStyle(
                                        fontSize: 12,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                  ],
                                ),
                                OperationalMenu(),
                                OperationalMenu(),
                                OperationalMenu(),
                                OperationalMenu(),
                                OperationalMenu(),
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.start,
                                  children: [
                                    Icon(
                                      Icons.arrow_right,
                                      size: 20,
                                    ),
                                    Text(
                                      'Master Data',
                                      style: TextStyle(
                                        fontSize: 12,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                  ],
                                ),
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    BrankasMenuGeneral(),
                                    CoordinatMenuGeneral(),
                                    BrandMenuGeneral(),
                                    ModelMenuGeneral()
                                  ],
                                ),
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    TypeMenuGeneral(),
                                  ],
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ],
                  );
                },
              ),
            );
          },
          child: const Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                'Tap menu lainnya',
                style: TextStyle(
                  fontSize: 11,
                  color: Colors.white,
                ),
              ),
              Icon(
                Icons.arrow_drop_up,
                color: Colors.white,
              ),
            ],
          ),
        ),
      ],
    );
  }
}

class OperationalMenu extends StatelessWidget {
  const OperationalMenu({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return const Row(
      crossAxisAlignment: CrossAxisAlignment.center,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        OptItem(),
        SizedBox(width: 4),
        OptItem(),
        SizedBox(width: 4),
        OptItem(),
        SizedBox(width: 4),
        OptItem(),
      ],
    );
  }
}

class OptItem extends StatelessWidget {
  const OptItem({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(10),
      width: 90,
      height: 90,
      child: Ink(
        decoration: BoxDecoration(
          color: Colors.white.withOpacity(0.04),
          borderRadius: BorderRadius.circular(100),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0),
              spreadRadius: 3,
              blurRadius: 5,
              offset: const Offset(0, 3),
            ),
          ],
        ),
        child: InkWell(
          onTap: () {
            print('tesd');
          },
          borderRadius: BorderRadius.circular(100),
          child: const Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Icon(
                Icons.settings,
                size: 30,
                color: Colors.blue,
              ),
              Text(
                'Label',
                style: TextStyle(
                  fontSize: 12,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class MainItem extends StatelessWidget {
  const MainItem({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(10),
      width: 90,
      height: 90,
      child: Ink(
        decoration: BoxDecoration(
          color: Colors.white.withOpacity(0.04),
          borderRadius: BorderRadius.circular(100),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0),
              spreadRadius: 3,
              blurRadius: 5,
              offset: const Offset(0, 3),
            ),
          ],
        ),
        child: InkWell(
          onTap: () {
            print('main menu');
          },
          borderRadius: BorderRadius.circular(100),
          child: const Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Icon(
                Icons.settings,
                size: 30,
                color: Colors.green,
              ),
              Text(
                'Label',
                style: TextStyle(
                  fontSize: 12,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
