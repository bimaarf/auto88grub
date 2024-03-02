import 'package:flutter/material.dart';

class BrankasList extends StatelessWidget {
  final List<Map<String, dynamic>> brankas;
  final Function(Map<String, dynamic>) onUpdate;

  const BrankasList({Key? key, required this.brankas, required this.onUpdate})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: brankas.length,
      itemBuilder: (context, index) {
        final brand = brankas[index];
        return Container(
          margin: const EdgeInsets.symmetric(horizontal: 3),
          decoration: const BoxDecoration(
              border: Border(bottom: BorderSide(color: Colors.white10))),
          child: ListTile(
            title: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  brand['name'].toUpperCase(),
                  style: const TextStyle(
                      fontWeight: FontWeight.bold, fontSize: 15),
                ),
                Text(
                  brand['created_at'].toUpperCase(),
                  style: const TextStyle(color: Colors.white70, fontSize: 11),
                ),
              ],
            ),
            trailing: const Icon(Icons.brush),
            onTap: () {
              onUpdate(brand);
            },
          ),
        );
      },
    );
  }
}
