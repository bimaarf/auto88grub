import 'package:flutter/material.dart';

class TransmissionList extends StatelessWidget {
  final List<Map<String, dynamic>> transmissions;
  final Function(Map<String, dynamic>) onUpdate;

  const TransmissionList(
      {Key? key, required this.transmissions, required this.onUpdate})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: transmissions.length,
      itemBuilder: (context, index) {
        final transmission = transmissions[index];
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
                  transmission['name'].toUpperCase(),
                  style: const TextStyle(
                      fontWeight: FontWeight.bold, fontSize: 15),
                ),
                Text(
                  transmission['created_at'].toUpperCase(),
                  style: const TextStyle(color: Colors.white70, fontSize: 11),
                ),
              ],
            ),
            trailing: const Icon(Icons.brush),
            onTap: () {
              onUpdate(transmission);
            },
          ),
        );
      },
    );
  }
}
