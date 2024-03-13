import 'package:flutter/material.dart';

class SliderList extends StatelessWidget {
  final List<Map<String, dynamic>> sliders;
  final Function(Map<String, dynamic>) onUpdate;
  final String baseUrl;

  const SliderList({
    Key? key,
    required this.sliders,
    required this.onUpdate,
    required this.baseUrl,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: sliders.length,
      itemBuilder: (context, index) {
        final slider = sliders[index];
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
                  slider['category']?.toUpperCase() ?? '',
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 15,
                  ),
                ),
                Text(
                  slider['created_at']?.toUpperCase() ?? '',
                  style: const TextStyle(color: Colors.white70, fontSize: 11),
                ),
              ],
            ),
            trailing: const Icon(Icons.brush),
            onTap: () {
              onUpdate(slider); // Pass the selected slider's data
            },
          ),
        );
      },
    );
  }
}
