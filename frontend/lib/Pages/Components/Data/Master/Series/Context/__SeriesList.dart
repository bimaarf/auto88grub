import 'package:flutter/material.dart';

class SeriesList extends StatelessWidget {
  final List<Map<String, dynamic>> seriess;
  final Function(Map<String, dynamic>) onUpdate;

  const SeriesList({Key? key, required this.seriess, required this.onUpdate})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: seriess.length,
      itemBuilder: (context, index) {
        final series = seriess[index];
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
                  series['name'].toUpperCase(),
                  style: const TextStyle(
                      fontWeight: FontWeight.bold, fontSize: 15),
                ),
                Text(
                  series['created_at'].toUpperCase(),
                  style: const TextStyle(color: Colors.white70, fontSize: 11),
                ),
              ],
            ),
            trailing: const Icon(Icons.brush),
            onTap: () {
              onUpdate(series);
            },
          ),
        );
      },
    );
  }
}
