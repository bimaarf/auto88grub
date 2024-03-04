import 'package:flutter/material.dart';

class CylinderList extends StatelessWidget {
  final List<Map<String, dynamic>> cylinders;
  final Function(Map<String, dynamic>) onUpdate;

  const CylinderList({
    Key? key,
    required this.cylinders,
    required this.onUpdate,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: cylinders.length,
      itemBuilder: (context, index) {
        final cylinder = cylinders[index];
        return Container(
          margin: const EdgeInsets.symmetric(horizontal: 3),
          decoration: const BoxDecoration(
            border: Border(bottom: BorderSide(color: Colors.white10)),
          ),
          child: ListTile(
            title: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  '${cylinder['volume']}', // Gunakan string interpolation untuk menampilkan nilai volume
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 15,
                  ),
                ),
                Text(
                  cylinder['created_at']
                      .toString()
                      .toUpperCase(), // Pastikan untuk memastikan bahwa nilai 'created_at' adalah String
                  style: const TextStyle(color: Colors.white70, fontSize: 11),
                ),
              ],
            ),
            trailing: const Icon(Icons.brush),
            onTap: () {
              onUpdate(cylinder);
            },
          ),
        );
      },
    );
  }
}
