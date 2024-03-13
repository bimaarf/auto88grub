import 'package:flutter/material.dart';

class KindList extends StatelessWidget {
  final List<Map<String, dynamic>> kinds;
  final Function(Map<String, dynamic>) onUpdate;
  final String baseUrl;

  const KindList({
    Key? key,
    required this.kinds,
    required this.onUpdate,
    required this.baseUrl,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: kinds.length,
      itemBuilder: (context, index) {
        final brand = kinds[index];
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
                  brand['name']?.toUpperCase() ?? '',
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 15,
                  ),
                ),
                Text(
                  brand['created_at']?.toUpperCase() ?? '',
                  style: const TextStyle(color: Colors.white70, fontSize: 11),
                ),
              ],
            ),
            trailing: const Icon(Icons.brush),
            onTap: () {
              onUpdate(brand); // Pass the selected brand's data
            },
          ),
        );
      },
    );
  }
}
