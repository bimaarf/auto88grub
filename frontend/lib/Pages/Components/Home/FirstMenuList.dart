import 'package:flutter/material.dart';

class FirstMenuList extends StatefulWidget {
  const FirstMenuList({
    super.key,
  });

  @override
  State<FirstMenuList> createState() => _FirstMenuListState();
}

class _FirstMenuListState extends State<FirstMenuList> {
  var menu;

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
        'icon': Icons.car_crash_sharp
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
        'label': 'Testimonti',
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
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Center(
          child: SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: List.generate(
                menu.length,
                (index) => Container(
                  padding: const EdgeInsets.all(3),
                  width: 80,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Container(
                        padding: const EdgeInsets.all(14),
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
                          color: Colors.black87,
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
        ),
      ],
    );
  }
}
