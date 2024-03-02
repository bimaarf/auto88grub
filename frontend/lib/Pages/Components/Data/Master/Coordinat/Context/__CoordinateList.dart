import 'package:flutter/material.dart';

class CoordinateList extends StatelessWidget {
  final List<Map<String, dynamic>> coordinates;
  final Function(Map<String, dynamic>) onUpdate;

  const CoordinateList(
      {Key? key, required this.coordinates, required this.onUpdate})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: coordinates.length,
      itemBuilder: (context, index) {
        final coordinate = coordinates[index];
        return Container(
          margin: const EdgeInsets.symmetric(horizontal: 3),
          decoration: const BoxDecoration(
              border: Border(bottom: BorderSide(color: Colors.white10))),
          child: ListTile(
            title: Text(
              coordinate['name'].toUpperCase(),
              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
            ),
            subtitle: Row(
              crossAxisAlignment: CrossAxisAlignment.end,
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Latitude: ${coordinate['latitude']}',
                      style:
                          const TextStyle(fontSize: 12, color: Colors.white70),
                    ),
                    Text(
                      'Longitude: ${coordinate['longitude']}',
                      style:
                          const TextStyle(fontSize: 12, color: Colors.white70),
                    ),
                  ],
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Text(
                      'Is Unlimited: ${coordinate['is_unlimited']}',
                      style:
                          const TextStyle(fontSize: 12, color: Colors.white70),
                    ),
                    Text(
                      'Limitation: ${coordinate['limitation']}',
                      style:
                          const TextStyle(fontSize: 12, color: Colors.white70),
                    ),
                    Text(
                      'Is Visible: ${coordinate['is_visible']}',
                      style:
                          const TextStyle(fontSize: 12, color: Colors.white70),
                    ),
                  ],
                ),
              ],
            ),
            onTap: () {
              onUpdate(coordinate); // Call the onUpdate function
            },
          ),
        );
      },
    );
  }
}
